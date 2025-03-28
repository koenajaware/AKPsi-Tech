import React, { useEffect, useRef } from 'react';
import '../styles/LogoPhysics.css';

const LogoPhysics = ({ logos }) => {
  // array that stores references to each logo
  const logoRefs = useRef([]);
  // variable that stores where the scroll bar is at
  const scrollPosition = useRef(0);
  // variable that stores which animation frame we are on
  const animationFrame = useRef(null);
  // variable that stores if an animation is already running
  const physicsEnabled = useRef(false);
  // array that stores the initial positions of each logo (can hardcode to match Figma format)
  const initialPositions = useRef([]);
  // struct to store size of container that has logos
  const containerDimensions = useRef({ width: 0, height: 0 });
  // struct to store size of center box
  const centerBox = useRef({
    width: 300,
    height: 100,
    x: (window.innerWidth - 300) / 2,
    y: 0,
  });
  // struct to store change in position and velocity of each logo
  const positions = useRef(logos.map(() => ({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0
  })));

  // update initial positions
  useEffect(() => {
    const updateInitialPositions = () => {
      const container = logoRefs.current[0]?.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      containerDimensions.current = {
        width: containerRect.width,
        height: containerRect.height
      };
      centerBox.current.x = (window.innerWidth - centerBox.current.width) / 2;
      centerBox.current.y = (containerDimensions.current.height - centerBox.current.height) / 2;

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
    const handleResize = () => {
      updateInitialPositions();
      centerBox.current.x = (window.innerWidth - centerBox.current.width) / 2;
      centerBox.current.y = (containerDimensions.current.height - centerBox.current.height) / 2;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollDelta = window.scrollY - scrollPosition.current;
      const clampedScrollDelta = Math.max(-100, Math.min(100, scrollDelta));
      scrollPosition.current = window.scrollY;

      positions.current.forEach(pos => {
        pos.vx += (Math.random() - 0.5) * clampedScrollDelta * 0.05;
        pos.vy += (Math.random() - 0.5) * clampedScrollDelta * 0.05;
      });

      if (!physicsEnabled.current) {
        physicsEnabled.current = true;
        animate();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const animate = () => {
    const container = logoRefs.current[0]?.parentElement;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const containerLeft = containerRect.left;
    const containerTop = containerRect.top;

    positions.current.forEach((pos, i) => {
      pos.vx *= 0.92;
      pos.vy *= 0.92;
      pos.x += pos.vx;
      pos.y += pos.vy;
    });

    // Logo-to-logo collisions
    for (let i = 0; i < logos.length; i++) {
      for (let j = i + 1; j < logos.length; j++) {
        const a = initialPositions.current[i];
        const b = initialPositions.current[j];
        const posA = positions.current[i];
        const posB = positions.current[j];

        if (!a || !b) continue;

        const radiusA = a.width / 2;
        const radiusB = b.width / 2;

        const aCenterX = containerLeft + a.left + posA.x + radiusA;
        const aCenterY = containerTop + a.top + posA.y + radiusA;
        const bCenterX = containerLeft + b.left + posB.x + radiusB;
        const bCenterY = containerTop + b.top + posB.y + radiusB;

        const dx = bCenterX - aCenterX;
        const dy = bCenterY - aCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = radiusA + radiusB;

        if (distance < minDist && distance > 0) {
          const overlap = (minDist - distance) / 2;

          // Adjust positions
          if (posA.x > posB.x) {
            posA.x += overlap;
            posB.x -= overlap;
          } else {
            posA.x -= overlap;
            posB.x += overlap;
          }

          if (posA.y > posB.y){
            posA.y += overlap;
            posB.y += overlap;
          } else {
            posA.y -= overlap;
            posB.y += overlap;
          }
          posA.vx *= -0.8
          posA.vy *= -0.8
          posB.vx *= -0.8
          posB.vy *= -0.8
        }
      }
    }

    const checkCenterBoxCollision = (rx, ry, rw, rh, lx, ly, lr) => {
      let circleDistance = {
        x: Math.abs(lx - rx),
        y: Math.abs(ly - ry)
      };
  
      if (circleDistance.x > (rw / 2 + lr)) { return false; }
      if (circleDistance.y > (rh / 2 + lr)) { return false; }
  
      if (circleDistance.x <= (rw / 2)) { return true; }
      if (circleDistance.y <= (rh / 2)) { return true; }
  
      let cornerDistance_sq = Math.pow(circleDistance.x - (rw / 2), 2) +
        Math.pow(circleDistance.y - (rh / 2), 2);
  
      return (cornerDistance_sq <= Math.pow(lr, 2));
    }
    
    // Logo-to-center-box collisions
    positions.current.forEach((pos, i) => {
      const initial = initialPositions.current[i];
      if (!initial) return;

      const radius = initial.width / 2;
      const logoCenterX = containerLeft + initial.left + pos.x + radius;
      const logoCenterY = containerTop + initial.top + pos.y + radius;
      const box = centerBox.current;
      // Calculate box center coordinates
      const boxCenterX = box.x + box.width / 2;
      const boxCenterY = box.y + box.height / 2;
      /*
      if (checkCenterBoxCollision(boxCenterX, boxCenterY, box.width, box.height, logoCenterX, logoCenterY, radius)) {
        // Calculate closest point on box to circle center
        const closestX = Math.max(box.x, Math.min(logoCenterX, box.x + box.width));
        const closestY = Math.max(box.y, Math.min(logoCenterY, box.y + box.height));
      
        const dx = logoCenterX - closestX;
        const dy = logoCenterY - closestY;
        const distance = Math.sqrt(dx * dx + dy * dy);
      
        // Calculate the minimum distance for collision (edge-to-edge)
        const minDistance = radius;
      
        if (distance <= minDistance) {
          // Calculate the collision normal (direction vector)
          const nx = dx / distance;
          const ny = dy / distance;
      
          // Calculate the overlap (penetration depth)
          const overlap = minDistance - distance;
      
          // Adjust the logo's position to prevent penetration
          pos.x += nx * overlap;
          pos.y += ny * overlap;
      
          // Reflect the logo's velocity with damping
          const dot = pos.vx * nx + pos.vy * ny;
          pos.vx = (pos.vx - 2 * dot * nx) * 0.9;
          pos.vy = (pos.vy - 2 * dot * ny) * 0.9;
        }
      }
      */
      // Boundary constraints within container
      const minX = -initial.left;
      const maxX = containerDimensions.current.width - initial.left - initial.width;
      const minY = -initial.top;
      const maxY = containerDimensions.current.height - initial.top - initial.height;

      pos.x = Math.max(minX, Math.min(pos.x, maxX));
      pos.y = Math.max(minY, Math.min(pos.y, maxY));

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
      <div className="center-box"
        style={{
          width: centerBox.current.width,
          height: centerBox.current.height,
          transform: `translate(${centerBox.current.x}px, ${centerBox.current.y}px)`
        }}>
        <h2>Organizations we have impacted</h2>
      </div>

      {logos.map((logo, i) => (
        <img
          key={i}
          ref={el => logoRefs.current[i] = el}
          className="logo organization-logo"
          src={logo}
          alt={`Organization ${i + 1}`}
          style={{ borderRadius: '50%' }}
        />
      ))}
    </div>
  );
};

export default LogoPhysics;