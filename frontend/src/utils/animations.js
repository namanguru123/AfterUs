// Reusable animation variants for Framer Motion

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, margin: "0px 0px -100px 0px" },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, margin: "0px 0px -100px 0px" },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, margin: "0px 0px -100px 0px" },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, margin: "0px 0px -100px 0px" },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
  viewport: { once: true, margin: "0px 0px -100px 0px" },
};

export const staggerContainer = {
  initial: "initial",
  whileInView: "animate",
  viewport: { once: true, margin: "0px 0px -100px 0px" },
  variants: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
};

export const staggerItem = {
  variants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
};

export const slideInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
  viewport: { once: true, margin: "0px 0px -80px 0px" },
};

export const hoverScale = {
  whileHover: { scale: 1.05, transition: { duration: 0.3 } },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: "0 0 30px rgba(99, 102, 241, 0.3)",
    transition: { duration: 0.3 },
  },
};

export const buttonHover = {
  whileHover: { scale: 1.02, transition: { duration: 0.2 } },
  whileTap: { scale: 0.98 },
};

export const bounceInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  viewport: { once: true, margin: "0px 0px -100px 0px" },
};

export const rotateInUp = {
  initial: { opacity: 0, y: 40, rotate: -10 },
  whileInView: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  viewport: { once: true, margin: "0px 0px -100px 0px" },
};

export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const pulse = {
  animate: {
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
