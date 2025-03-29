import { motion } from 'framer-motion';
import { partners } from '../assets/assets';

const HorizontalScroll = ({ direction }) => {
  const images = [
    partners.amazon,
    partners.godaddy,
    partners.google,
    partners.flash,
    partners.snowflake,
    partners.hitech,
    partners.invert,
  ];

  return direction === 'left-to-right' ? (
    <div
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        width: '100%',
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          gap: '20px',
          minWidth: '200%',
        }}
        animate={{ x: ['-100%', '0%', '100%'] }}
        transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
      >
        {/* Duplicate images for seamless looping */}
        {[...images, ...images, ...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`image-${index}`}
            width={150}
            height="auto"
          />
        ))}
      </motion.div>
    </div>
  ) : (
    <div
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        width: '100%',
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          gap: '20px',
          minWidth: '200%',
        }}
        animate={{ x: ['0%', '-100%'] }}
        transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
      >
        {/* Duplicate images for seamless looping */}
        {[...images, ...images, ...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`image-${index}`}
            width={150}
            height="auto"
          />
        ))}
      </motion.div>
    </div>
  );
};
export default HorizontalScroll;
