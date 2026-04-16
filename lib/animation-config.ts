// Centralized animation configuration for the portfolio
// All timing, easing, and motion parameters live here

export const EASING = {
  expoOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  expoInOut: [0.87, 0, 0.13, 1] as [number, number, number, number],
  cinematic: [0.4, 0, 0.2, 1] as [number, number, number, number],
  outQuad: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  inQuad: [0.55, 0.085, 0.68, 0.53] as [number, number, number, number],
  outElastic: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  smooth: [0.45, 0, 0.55, 1] as [number, number, number, number],
} as const;

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  entrance: 1.0,
  hero: 1.2,
  countUp: 2.0,
} as const;

export const STAGGER = {
  fast: 0.08,
  normal: 0.15,
  slow: 0.2,
} as const;

export const SECTION_ANIMATION = {
  quote: {
    scaleFrom: 0.9,
    scaleTo: 1,
    opacityFrom: 0,
    opacityTo: 1,
    duration: DURATION.slow,
    easing: EASING.expoOut,
  },
  projectCard: {
    imageSlideX: -80,
    contentSlideX: 80,
    parallaxMultiplier: 0.5,
    duration: DURATION.entrance,
    stagger: STAGGER.normal,
    easing: EASING.expoOut,
  },
  serviceCard: {
    translateY: 40,
    stagger: STAGGER.normal,
    duration: DURATION.normal,
    easing: EASING.expoOut,
  },
  stats: {
    countDuration: DURATION.countUp,
    stagger: STAGGER.slow,
    easing: EASING.outQuad,
  },
  cta: {
    headingSlideX: -60,
    buttonScale: 0.85,
    duration: DURATION.entrance,
    easing: EASING.expoOut,
  },
} as const;

// Responsive motion intensity — reduces animation distance on smaller screens
export const MOTION_INTENSITY = {
  mobile: 0.6,
  tablet: 0.85,
  desktop: 1.0,
} as const;

// Intersection Observer thresholds for triggering animations
export const VIEWPORT_THRESHOLD = {
  eager: 0.1,    // Trigger early (footer, logos)
  normal: 0.25,  // Standard section entry
  center: 0.4,   // When section is well into view
  late: 0.5,     // Center of viewport
} as const;
