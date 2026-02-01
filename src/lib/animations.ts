export const fadeIn = {
  initial: { opacity: 0.35 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: "80px" },
};

export const slideInUp = {
  initial: { opacity: 0.35, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: "80px" },
};

export const slideInDown = {
  initial: { opacity: 0.35, y: -10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: "80px" },
};

export const slideInDownShort = {
  initial: { opacity: 0, y: -10, height: 0 },
  animate: { opacity: 1, y: 0, height: 'auto' },
  exit: { opacity: 0, y: -10, height: 0 },
  transition: { duration: 0.2 },
};

export const slideInLeft = {
  initial: { opacity: 0.35, x: -10 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: "80px" },
};

export const slideInRight = {
  initial: { opacity: 0.35, x: 10 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: "80px" },
};

export const scaleIn = {
  initial: { opacity: 0.35, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: "80px" },
};
