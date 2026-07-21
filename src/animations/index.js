export const fadeIn = {
  hidden: { opacity: 0, y: 40},
  show: { opacity: 1, y: 0, transition: {duration: 0.75 } }
}

export const fadeInSlow = {
  hidden: { opacity: 0, y: 40},
  show: { opacity: 1, y: 0, transition: {duration: 1.5 } }
}

export const fadeInSm = {
  hidden: { opacity: 0, y: 10},
  show: { opacity: 1, y: 0, transition: {duration: 0.75 } }
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25 } }
}

export const notifVariant = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.8 } }
}