import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../../styles/Recruitment/RecruitmentSignup.css';
import RecruitmentRegistration from "../../assets/RecruitmentRegistration.png";

const RecruitmentSignup = () => {
    const [windowHeight, setWindowHeight] = useState(0);
    const { scrollY } = useScroll();

    // Create parallax effects with useTransform
    const y = useTransform(scrollY, [0, windowHeight], [0, 150]);
    const opacity = useTransform(scrollY, [0, windowHeight * 0.8], [1, 0.3]);
    const scale = useTransform(scrollY, [0, windowHeight], [1, 1.15]);

    // Update window height on mount and resize
    useEffect(() => {
        setWindowHeight(window.innerHeight);
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <motion.section
            className="recruitment-hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            <div
                className="recruitment-registration-container"
            >
                <div className="recruitment-registration-text-container">
                    <h2
                        className="recruitment-register-title"
                    >
                        REGISTER<br></br>HERE:
                    </h2>
                    <h3
                        className="recruitment-semester-subtitle"
                    >
                        Fall 2025
                    </h3>
                </div>

                <div className="recruitment-registration-img-container">
                    <img
                        src={RecruitmentRegistration}
                        alt="recruitment-registration-image"
                        className="recruitment-registration-image"
                    />
                    <button className="recruitment-registration-button">
                        Register
                    </button>
                </div>


            </div>


        </motion.section>
    )
}

export default RecruitmentSignup