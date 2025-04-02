import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import rocketImage from '../assets/svgs/rocket.svg';

const RocketAnimation = ({ isApplying, apiSuccess, resetApiSuccess }) => {
  const [showRocket, setShowRocket] = useState(false);
  const [takeOff, setTakeOff] = useState(false);

  useEffect(() => {
    if (isApplying) {
      setShowRocket(true);
    }
  }, [isApplying]);

  useEffect(() => {
    if (apiSuccess) {
      setTakeOff(true);
      setTimeout(() => {
        setShowRocket(false), resetApiSuccess(), setTakeOff(false);
      }, 2000);
    }
  }, [apiSuccess, resetApiSuccess]);

  const rocketVariants = {
    initial: {
      y: 0,
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    takeOff: {
      y: -500,
      opacity: 0,
      scale: 1.5,
      transition: {
        duration: 1,
        ease: 'easeIn',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {showRocket && (
        <motion.div
          key="rocket"
          variants={rocketVariants}
          initial="initial"
          animate={takeOff ? 'takeOff' : 'visible'}
          exit="exit"
          style={{
            position: 'fixed',
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <img src={rocketImage} alt="Rocket" className="w-[100px] h-auto" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RocketAnimation;
