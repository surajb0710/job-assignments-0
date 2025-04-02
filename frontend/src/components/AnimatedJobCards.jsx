import React, { useRef, useMemo } from 'react';
import globe from '../assets/images/globe.png';
import linkedin from '../assets/images/linkedin.png';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { toggleModel } from '../features/jobModelSlice';

const JobCard = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-black rounded-2xl p-6 flex flex-col gap-3 border border-white">
      <div className="flex gap-3">
        <button
          type="button"
          className="px-4 py-2 rounded-xl w-max text-white border border-white text-sm"
        >
          Job
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded-xl w-max text-white border border-white text-sm glow-border"
        >
          Full Time
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-white p-2 rounded-full">
          <img src={linkedin} alt="" />
        </div>
        <div>
          <p className="text-white">Flutter Developer</p>
          <p className="text-white text-[12px]">Persist Ventures</p>
        </div>
      </div>
      <hr className="h-0.5 text-white" />
      <div className="flex gap-4">
        <p className="text-white text-[12px] flex gap-1">
          <span>$</span>1,00,000
        </p>
        <div className="text-white text-[12px] flex gap-2 items-center relative">
          <div className="relative h-3 w-3">
            <img
              src={globe}
              alt=""
              className="absolute h-3 w-3 z-10 animate-ping"
            />
          </div>
          WorldWide
        </div>
      </div>
      <button
        onClick={() => dispatch(toggleModel())}
        className="w-max text-sm bg-[#7e6bd2] px-5 py-2 rounded-xl border-white shadow-[inset_0px_0px_10px_1px_#f7fafc90] cursor-pointer"
      >
        View Details
      </button>
    </div>
  );
};

function AnimatedJobCards() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false });
  const controls = useAnimation();

  const cardVariants = useMemo(() => {
    return {
      hidden: (i) => ({
        x: i * 100 + (Math.random() - 0.5) * 200,
        y: i * 50 + (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 0.5,
      }),
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: 'easeInOut',
        },
      },
    };
  }, []);

  React.useEffect(() => {
    if (isInView) {
      controls.start((i) => ({
        ...cardVariants.visible,
        transition: {
          ...cardVariants.visible.transition,
          delay: i * 0.1,
        },
      }));
    } else {
      controls.start((i) => cardVariants.hidden(i));
    }
  }, [controls, isInView, cardVariants]);

  return (
    <motion.div
      ref={containerRef}
      className="h-100 overflow-clip relative col-start-2 col-end-3 row-start-1 row-end-2 rounded-2xl backdrop-blur-sm shadow-[inset_0px_2px_20px_-3px_rgba(_255,_255,_255,1)]"
    >
      <motion.div
        custom={0}
        animate={controls}
        initial="hidden"
        variants={cardVariants}
        className="absolute bottom-[-10px] right-[-10px] z-20"
      >
        <JobCard />
      </motion.div>
      <motion.div
        custom={1}
        animate={controls}
        initial="hidden"
        variants={cardVariants}
        className="absolute top-[-10px] right-[-70px] z-10"
      >
        <JobCard />
      </motion.div>
      <motion.div
        custom={2}
        animate={controls}
        initial="hidden"
        variants={cardVariants}
        className="absolute bottom-[-40px] right-[190px] z-10"
      >
        <JobCard />
      </motion.div>
      <motion.div
        custom={3}
        animate={controls}
        initial="hidden"
        variants={cardVariants}
        className="absolute bottom-[80px] right-[100px]"
      >
        <JobCard />
      </motion.div>
    </motion.div>
  );
}

export default AnimatedJobCards;
