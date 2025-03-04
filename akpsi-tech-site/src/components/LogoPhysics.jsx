import React, { useEffect, useRef } from 'react';
import '../styles/LogoPhysics.css';

const LogoPhysics = ({ logos }) => {
  const logoRefs = useRef([]);
  const scrollPosition = useRef(0);
  const animationFrame = useRef(null);
  const physicsEnabled = useRef(false);
  const initialPositions = useRef([]);
  const containerDimensions = useRef({ width: 0, height: 0 });
  const centerBox = useRef({
    width: 300,
    height: 100,
    x: 0,
    y: 0
  });

  const positions = useRef(logos.map(() => ({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0
  })));

  useEffect(() => {
    const updateInitialPositions = () => {
      const container = logoRefs.current[0]?.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      containerDimensions.current = {
        width: containerRect.width,
        height: containerRect.height
      };

      // Update center box position
      centerBox.current.x = containerRect.width / 2 - centerBox.current.width / 2;
      centerBox.current.y = containerRect.height / 2 - centerBox.current.height / 2;

      initialPositions.current = logoRefs.current.map(logo => {
        if (!logo) return null;
        const logoRect = logo.getBoundingClientRect();
        return {
          left: logoRect.left - containerRect.left,
          top: logoRect.top - containerRect.top,
          width: logoRect.width,
          height: logoRect.height
        };
      });
    };

    updateInitialPositions();
    const handleResize = () => updateInitialPositions();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollDelta = window.scrollY - scrollPosition.current;
      scrollPosition.current = window.scrollY;

      positions.current.forEach(pos => {
        pos.vx += (Math.random() - 0.5) * scrollDelta * 0.1;
        pos.vy += (Math.random() - 0.5) * scrollDelta * 0.1;
      });

      if (!physicsEnabled.current) {
        physicsEnabled.current = true;
        animate();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkCenterBoxCollision = (logoPos, initialPos) => {
    const box = centerBox.current;
    const logoLeft = initialPos.left + logoPos.x;
    const logoRight = logoLeft + initialPos.width;
    const logoTop = initialPos.top + logoPos.y;
    const logoBottom = logoTop + initialPos.height;

    const boxLeft = box.x;
    const boxRight = box.x + box.width;
    const boxTop = box.y;
    const boxBottom = box.y + box.height;

    // Check for collision
    if (logoRight < boxLeft || logoLeft > boxRight || logoBottom > boxTop || logoTop > boxBottom) {
      return false;
    }

    // Calculate overlap
    const overlapX = Math.min(logoRight - boxLeft, boxRight - logoLeft);
    const overlapY = Math.min(logoBottom - boxTop, boxBottom - logoTop);
    const minOverlap = Math.min(overlapX, overlapY);

    if (minOverlap <= 0) return false;

    // Determine collision direction
    if (overlapX < overlapY) {
      const direction = logoPos.x < box.x ? -1 : 1;
      return { x: overlapX * direction, y: 0 };
    } else {
      const direction = logoPos.y < box.y ? -1 : 1;
      return { x: 0, y: overlapY * direction };
    }
  };

  const animate = () => {
    positions.current.forEach(pos => {
      pos.vx *= 0.92;
      pos.vy *= 0.92;
      pos.x += pos.vx;
      pos.y += pos.vy;
    });

    // Logo-to-logo collisions (existing code)
    for (let i = 0; i < logos.length; i++) {
      for (let j = i + 1; j < logos.length; j++) {
        const a = initialPositions.current[i];
        const b = initialPositions.current[j];
        const posA = positions.current[i];
        const posB = positions.current[j];

        if (!a || !b) continue;

        // Calculate current centers
        const aCenter = {
          x: a.left + posA.x + a.width/2,
          y: a.top + posA.y + a.height/2
        };
        const bCenter = {
          x: b.left + posB.x + b.width/2,
          y: b.top + posB.y + b.height/2
        };

        // Distance calculations
        const dx = bCenter.x - aCenter.x;
        const dy = bCenter.y - aCenter.y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        // Minimum distance to prevent overlap (using diagonal as radius)
        const minDist = (Math.sqrt((a.width/2)**2 + (a.height/2)**2) +
                      Math.sqrt((b.width/2)**2 + (b.height/2)**2));

        // Collision response
        if (distance < minDist && distance > 0) {
          const overlap = (minDist - distance)/2;
          const nx = dx/distance;  // Normal vector X
          const ny = dy/distance;  // Normal vector Y

          // Position correction
          posA.x -= nx * overlap;
          posA.y -= ny * overlap;
          posB.x += nx * overlap;
          posB.y += ny * overlap;

          // Velocity adjustment (repel force)
          const repel = 0.7;
          posA.vx -= nx * repel;
          posA.vy -= ny * repel;
          posB.vx += nx * repel;
          posB.vy += ny * repel;
        }
      }
    }

    // Logo-to-center-box collisions
    positions.current.forEach((pos, i) => {
      const initial = initialPositions.current[i];
      if (!initial) return;

      // Check collision with center box
      const collision = checkCenterBoxCollision(pos, initial);
      if (collision) {
        const repelForce = 0.7;
        pos.x -= collision.x * 0.5;
        pos.y -= collision.y * 0.5;
        pos.vx -= collision.x * repelForce;
        pos.vy -= collision.y * repelForce;
      }

      // Boundary constraints
      const minX = -initial.left;
      const maxX = containerDimensions.current.width - initial.left - initial.width;
      const minY = -initial.top;
      const maxY = containerDimensions.current.height - initial.top - initial.height;

      if (pos.x < minX) {
        pos.x = minX;
        pos.vx *= -0.5;
      } else if (pos.x > maxX) {
        pos.x = maxX;
        pos.vx *= -0.5;
      }

      if (pos.y < minY) {
        pos.y = minY;
        pos.vy *= -0.5;
      } else if (pos.y > maxY) {
        pos.y = maxY;
        pos.vy *= -0.5;
      }

      logoRefs.current[i].style.transform = 
        `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    });

    if (positions.current.some(p => Math.abs(p.vx) > 0.1 || Math.abs(p.vy) > 0.1)) {
      animationFrame.current = requestAnimationFrame(animate);
    } else {
      physicsEnabled.current = false;
    }
  };

  return (
    <div className="logo-container">
      {/* Center Box */}
      <div className="center-box" 
           style={{
             width: centerBox.current.width,
             height: centerBox.current.height,
             transform: `translate(${centerBox.current.x}px, ${centerBox.current.y}px)`
           }}>
        <h2>Organizations we have impacted</h2>
      </div>

      {/* Logos */}
      {logos.map((logo, i) => (
        <img
          key={i}
          ref={el => logoRefs.current[i] = el}
          className="logo organization-logo"
          src={logo}
          alt={`Organization ${i+1}`}
        />
      ))}
    </div>
  );
};

export default LogoPhysics;

