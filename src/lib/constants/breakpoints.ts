/**
 * Canonical Tailwind-aligned breakpoints for consistent device detection
 *
 * These values match Tailwind CSS 4 default breakpoints:
 * - sm: 640px
 * - md: 768px
 * - lg: 1024px
 * - xl: 1280px
 * - 2xl: 1536px
 *
 * Usage:
 * - Mobile: < BREAKPOINTS.md (768px)
 * - Tablet: >= BREAKPOINTS.md && < BREAKPOINTS.lg
 * - Desktop: >= BREAKPOINTS.lg (1024px)
 */

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Device type thresholds
 * - Mobile: width < 768px
 * - Tablet: 768px <= width < 1024px
 * - Desktop: width >= 1024px
 */
export const DEVICE_THRESHOLDS = {
  mobile: BREAKPOINTS.md,
  desktop: BREAKPOINTS.lg,
} as const;

/**
 * Helper to get media query string for a breakpoint
 */
export const getMediaQuery = (breakpoint: BreakpointKey, type: 'min' | 'max' = 'min'): string => {
  const value = BREAKPOINTS[breakpoint];
  return type === 'min' ? `(min-width: ${value}px)` : `(max-width: ${value - 1}px)`;
};
