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

      // calculates the left and top coordinates of the center box
      centerBox.current.x = (window.innerWidth - centerBox.current.width) / 2;
      centerBox.current.y = (containerDimensions.current.height - centerBox.current.height) / 2;

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
      updateInitialPositions();
      centerBox.current.x = (window.innerWidth - centerBox.current.width) / 2;
      centerBox.current.y = (containerDimensions.current.height - centerBox.current.height) / 2;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // changes velocity and position of each logo relative to the amount scrolled
  useEffect(() => {
    const handleScroll = () => {
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
  }, []);

  const animate = () => {
    // define some variables for the container for ease
    const container = logoRefs.current[0]?.parentElement;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const containerLeft = containerRect.left;
    const containerTop = containerRect.top;

    // by default, each logo should decelerate to avoid oscillation
    // also at each frame of the animation, update the position of each logo by adding the velocity to it
    positions.current.forEach((pos, i) => {
      pos.vx *= 0.92;
      pos.vy *= 0.92;
      pos.x += pos.vx;
      pos.y += pos.vy;
    });

    // Logo-to-logo collisions
    // check every pair of logos and make sure they don't intersect with respect to the radius length
    for (let i = 0; i < logos.length; i++) {
      for (let j = i + 1; j < logos.length; j++) {
        // get positions for the two logos
        const a = initialPositions.current[i];
        const b = initialPositions.current[j];
        const posA = positions.current[i];
        const posB = positions.current[j];

        if (!a || !b) continue;

        // get radius for the two logos
        const radiusA = a.width / 2;
        const radiusB = b.width / 2;

        // get center for the two logos based on the position
        const aCenterX = containerLeft + a.left + posA.x + radiusA;
        const aCenterY = containerTop + a.top + posA.y + radiusA;
        const bCenterX = containerLeft + b.left + posB.x + radiusB;
        const bCenterY = containerTop + b.top + posB.y + radiusB;

        // start of calculation
        // get the x and y distance between the centers
        const dx = bCenterX - aCenterX;
        const dy = bCenterY - aCenterY;
        // calculate the actual distance between the centers
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = radiusA + radiusB;

        // if the distance between the centers is less than 2R, the logos have collided
        if (distance < minDist && distance > 0) {
          // figure out overlap
          const overlap = (minDist - distance) / 2;

          // Adjust positions based on the overlap
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
          // decelerate after collision
          posA.vx *= -0.8
          posA.vy *= -0.8
          posB.vx *= -0.8
          posB.vy *= -0.8
        }
      }
    }

    // checks if circular logo is colliding with rectangular center box
    // most likely correct because logic was translated from someone else's code online
    const checkCenterBoxCollision = (rx, ry, rw, rh, lx, ly, lr) => {
      // calculate x and y distances between circle center and rectangle center
      // abs collapses 4 quadrants to 1
      let circleDistance = {
        x: Math.abs(lx - rx),
        y: Math.abs(ly - ry)
      };
      
      // if circle is beyond top or right edges of the rectangle, it is definitely not intersecting
      if (circleDistance.x > (rw / 2 + lr)) { return false; }
      if (circleDistance.y > (rh / 2 + lr)) { return false; }
  
      // if circle is within top of right edges of the rectangle, it is definitely intersecting
      if (circleDistance.x <= (rw / 2)) { return true; }
      if (circleDistance.y <= (rh / 2)) { return true; }
  
      // cover edge case where circle is intersecting top right corner of the rectangle
      let cornerDistance_sq = Math.pow(circleDistance.x - (rw / 2), 2) +
        Math.pow(circleDistance.y - (rh / 2), 2);
  
      return (cornerDistance_sq <= Math.pow(lr, 2));
    }
    
    
    // Logo-to-center-box collisions
    positions.current.forEach((pos, i) => {
      const initial = initialPositions.current[i];
      if (!initial) return;

      // calculate logo radius and center
      const radius = initial.width / 2;
      const logoCenterX = containerLeft + initial.left + pos.x + radius;
      const logoCenterY = containerTop + initial.top + pos.y + radius;
      const box = centerBox.current;
      // calculate box center coordinates
      const boxCenterX = box.x + box.width / 2;
      const boxCenterY = box.y + box.height / 2;
      
      /*
      // if the logo intersects the box, we want to make an adjustment to the logo's position and velocity
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

          // when reversing velocities, need to consider cases.
          // e.g. if box is coming in straight from the left side of the box, only reverse x velocity.
          pos.vx *= -0.9
          pos.vy *= -0.9
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