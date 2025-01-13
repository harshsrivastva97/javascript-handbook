import React from "react";
import { motion } from "framer-motion";
import "./TypingAnimation.scss";

interface TypingAnimationProps {
    text: string;
    className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
    text,
    className = "",
}) => {
    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { 
                staggerChildren: 0.03,
                delayChildren: 0.02 * i,
            },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
            },
        },
        hidden: {
            opacity: 0,
            x: -20,
            y: 10,
            scale: 0.9,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
            },
        },
    };

    return (
        <motion.div
            className={`text-animation ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {text.split('').map((char, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className={`char ${char === ' ' ? 'space' : ''}`}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default TypingAnimation;