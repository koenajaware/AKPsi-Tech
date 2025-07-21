import React, { useEffect, useRef, useState } from 'react';
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
  // struct to store change in position and velocity of each logo
  const positions = useRef(logos.map(() => ({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    vx: 0,
    vy: 0
  })));
  // track original window size
  const originalWindowSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight
  });
  // state to control logo visibility
  const [logosVisible, setLogosVisible] = useState(true);

  /*
  in HTML, the coordinate system is (0,0) at the top left corner, 
  and the x-coordinate increases as you go right, 
  and the y-coordinate increases as you go down.
  */

  // update initial positions
  useEffect(() => {
    const updateInitialPositions = () => {
      // make sure container exists
      const container = logoRefs.current[0]?.parentElement;
      if (!container) return;

      // gets dimensions of the containers
      const containerRect = container.getBoundingClientRect();
      containerDimensions.current = {
        width: containerRect.width,
        height: containerRect.height
      };

      // updates the initial positions of every logo
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

    // makes sure the website works when the window is resized
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      
      // Check if window size has changed from original
      if (currentWidth !== originalWindowSize.current.width || 
          currentHeight !== originalWindowSize.current.height) {
        setLogosVisible(false);
      } else {
        /*
        setLogosVisible(true);
        updateInitialPositions();
        */
       // SCUFFED: instead of the above two lines (which don't work as intended), the entire page is reloaded
       // when the window is reverted back to its original size.
       window.location.reload();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // changes velocity and position of each logo relative to the amount scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (!logosVisible) return;
      
      // figure out the amount scrolled
      const scrollDelta = window.scrollY - scrollPosition.current;
      // limit the max scroll so that logos don't jump around too much
      const clampedScrollDelta = Math.max(-100, Math.min(100, scrollDelta));
      // get current scroll position
      scrollPosition.current = window.scrollY;

      // apply a random velocty to each logo relative to the clamped scroll delta
      positions.current.forEach(pos => {
        pos.vx += (Math.random() - 0.5) * clampedScrollDelta * 0.05;
        pos.vy += (Math.random() - 0.5) * clampedScrollDelta * 0.05;
      });

      // starts the animation frame
      if (!physicsEnabled.current) {
        physicsEnabled.current = true;
        animate();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [logosVisible]);

  const animate = () => {
    const container = logoRefs.current[0]?.parentElement;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const containerLeft = containerRect.left;
    const containerTop = containerRect.top;

    // First apply velocity and damping
    positions.current.forEach((pos) => {
      pos.vx *= 0.93; // Increased damping
      pos.vy *= 0.93;
      pos.x += pos.vx;
      pos.y += pos.vy;
    });

    // Process all collisions in a single pass with force-based resolution
    for (let i = 0; i < logos.length; i++) {
      const initial = initialPositions.current[i];
      if (!initial) continue;
      const radius = initial.width / 2;
      const pos = positions.current[i];

      // Calculate logo center
      const logoCenterX = containerLeft + initial.left + pos.x + radius;
      const logoCenterY = containerTop + initial.top + pos.y + radius;

      // 2. Boundary constraints (container edges)
      const minX = -initial.left;
      const maxX = containerDimensions.current.width - initial.left - initial.width;
      const minY = -initial.top;
      const maxY = containerDimensions.current.height - initial.top - initial.height;

      // Soft boundary constraints
      if (pos.x < minX) {
        pos.vx += 0.2 * (minX - pos.x);
        pos.x = minX;
      } else if (pos.x > maxX) {
        pos.vx += 0.2 * (maxX - pos.x);
        pos.x = maxX;
      }

      if (pos.y < minY) {
        pos.vy += 0.2 * (minY - pos.y);
        pos.y = minY;
      } else if (pos.y > maxY) {
        pos.vy += 0.2 * (maxY - pos.y);
        pos.y = maxY;
      }

      // 3. Logo-to-logo collisions (processed after center box)
      for (let j = i + 1; j < logos.length; j++) {
        const otherInitial = initialPositions.current[j];
        const otherPos = positions.current[j];
        if (!otherInitial) continue;

        const otherRadius = otherInitial.width / 2;
        const otherCenterX = containerLeft + otherInitial.left + otherPos.x + otherRadius;
        const otherCenterY = containerTop + otherInitial.top + otherPos.y + otherRadius;

        const dx = otherCenterX - logoCenterX;
        const dy = otherCenterY - logoCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = radius + otherRadius;

        if (distance < minDist && distance > 0) {
          // Soft collision response with damping
          const overlap = (minDist - distance) / distance;
          const repelForce = 0.15; // Softer logo-to-logo repulsion
          const dampingFactor = 0.95; // New damping factor for collisions

          // Apply forces to both logos
          const fx = dx * overlap * repelForce;
          const fy = dy * overlap * repelForce;

          pos.vx -= fx;
          pos.vy -= fy;
          otherPos.vx += fx;
          otherPos.vy += fy;

          // Apply damping to both logos' velocities
          pos.vx *= dampingFactor;
          pos.vy *= dampingFactor;
          otherPos.vx *= dampingFactor;
          otherPos.vy *= dampingFactor;
        }
      }

      // Apply position changes to DOM
      logoRefs.current[i].style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    }

    // Continue animation if there's still movement
    if (positions.current.some(p => Math.abs(p.vx) > 0.05 || Math.abs(p.vy) > 0.05)) {
      animationFrame.current = requestAnimationFrame(animate);
    } else {
      physicsEnabled.current = false;
    }
  };

  return (
    <div className="logo-physics-wrapper">
      <div className="logo-heading">
        <h2 style={{ fontSize: '3rem', color: 'var(--color-white)', fontFamily: "'Times New Roman', Times, serif" }}>Organizations We Have Impacted</h2>
      </div>

      <div className="logo-container">
        {logos.map((logo, i) => (
          <img
            key={i}
            ref={el => logoRefs.current[i] = el}
            className="logo organization-logo"
            src={logo}
            alt={`Organization ${i + 1}`}
            style={{ 
              borderRadius: '50%',
              opacity: logosVisible ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LogoPhysics;