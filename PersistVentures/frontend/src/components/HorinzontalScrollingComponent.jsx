import { motion } from 'framer-motion';
import { partners } from '../assets/assets';

const HorizontalScroll = ({ direction }) => {
  const images = [
    partners.amazon,
    partners.atlantic,
    partners.leafe,
    partners.mindfullness,
    partners.monochrome,
    partners.invert,
    partners.hitech,
    partners.flash,
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
          gap: '40px',
          minWidth: '200%',
        }}
        animate={{ x: ['-100%', '0%', '100%'] }}
        transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
      >
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
          gap: '40px',
          minWidth: '200%',
        }}
        animate={{ x: ['0%', '-100%'] }}
        transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
      >
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
