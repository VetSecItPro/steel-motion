'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { DEVICE_THRESHOLDS } from '@/lib/constants/breakpoints';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceContextValue {
  /** Current window width (0 during SSR) */
  width: number;
  /** Current window height (0 during SSR) */
  height: number;
  /** Device classification based on width */
  deviceType: DeviceType;
  /** True if width < 768px */
  isMobile: boolean;
  /** True if width >= 768px and < 1024px */
  isTablet: boolean;
  /** True if width >= 1024px */
  isDesktop: boolean;
  /** True if device has coarse pointer (touch) */
  hasCoarsePointer: boolean;
  /** True if device prefers reduced motion */
  prefersReducedMotion: boolean;
  /** True if initial hydration is complete */
  isHydrated: boolean;
}

const DeviceContext = createContext<DeviceContextValue | null>(null);

/**
 * SSR-safe default values
 * Assumes mobile-first for initial render to avoid layout shift
 */
const SSR_DEFAULTS: DeviceContextValue = {
  width: 0,
  height: 0,
  deviceType: 'mobile',
  isMobile: true,
  isTablet: false,
  isDesktop: false,
  hasCoarsePointer: false,
  prefersReducedMotion: false,
  isHydrated: false,
};

/**
 * Determine device type from width
 */
function getDeviceType(width: number): DeviceType {
  if (width < DEVICE_THRESHOLDS.mobile) return 'mobile';
  if (width < DEVICE_THRESHOLDS.desktop) return 'tablet';
  return 'desktop';
}

interface DeviceProviderProps {
  children: ReactNode;
  /** Override initial values for testing */
  initialWidth?: number;
  initialHeight?: number;
}

/**
 * DeviceProvider - Centralized device detection context
 *
 * Wrap your app with this provider to enable device-aware rendering.
 * Uses a single resize listener for optimal performance.
 *
 * @example
 * ```tsx
 * // In your root layout
 * <DeviceProvider>
 *   {children}
 * </DeviceProvider>
 * ```
 */
export function DeviceProvider({ children, initialWidth, initialHeight }: DeviceProviderProps) {
  const [dimensions, setDimensions] = useState({
    width: initialWidth ?? 0,
    height: initialHeight ?? 0,
  });
  const [hasCoarsePointer, setHasCoarsePointer] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Initial measurement
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Check media queries
    const checkMediaQueries = () => {
      setHasCoarsePointer(window.matchMedia('(pointer: coarse)').matches);
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    // Initial values
    updateDimensions();
    checkMediaQueries();
    setIsHydrated(true);

    // Resize listener with throttling via requestAnimationFrame
    let rafId: number;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateDimensions);
    };

    // Media query listeners
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleCoarsePointerChange = (e: MediaQueryListEvent) => setHasCoarsePointer(e.matches);
    const handleReducedMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    window.addEventListener('resize', handleResize, { passive: true });
    coarsePointerQuery.addEventListener('change', handleCoarsePointerChange);
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      coarsePointerQuery.removeEventListener('change', handleCoarsePointerChange);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  const value = useMemo<DeviceContextValue>(() => {
    const { width, height } = dimensions;
    const deviceType = getDeviceType(width);

    return {
      width,
      height,
      deviceType,
      isMobile: deviceType === 'mobile',
      isTablet: deviceType === 'tablet',
      isDesktop: deviceType === 'desktop',
      hasCoarsePointer,
      prefersReducedMotion,
      isHydrated,
    };
  }, [dimensions, hasCoarsePointer, prefersReducedMotion, isHydrated]);

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
}

/**
 * useDevice - Hook to access device context
 *
 * @throws Error if used outside DeviceProvider
 *
 * @example
 * ```tsx
 * const { isMobile, isDesktop, deviceType } = useDevice();
 *
 * if (isMobile) {
 *   return <MobileLayout />;
 * }
 * ```
 */
export function useDevice(): DeviceContextValue {
  const context = useContext(DeviceContext);

  if (!context) {
    // Return SSR defaults if outside provider (graceful degradation)
    if (typeof window === 'undefined') {
      return SSR_DEFAULTS;
    }
    throw new Error('useDevice must be used within a DeviceProvider');
  }

  return context;
}

/**
 * Safe hook that returns SSR defaults outside provider
 */
export function useDeviceSafe(): DeviceContextValue {
  const context = useContext(DeviceContext);
  return context ?? SSR_DEFAULTS;
}

// ============================================================================
// Conditional Render Components
// ============================================================================

interface ConditionalProps {
  children: ReactNode;
  /** Fallback content during SSR/hydration */
  fallback?: ReactNode;
}

/**
 * MobileOnly - Renders children only on mobile devices (< 768px)
 */
export function MobileOnly({ children, fallback = null }: ConditionalProps) {
  const { isMobile, isHydrated } = useDeviceSafe();

  if (!isHydrated) return <>{fallback}</>;
  if (!isMobile) return null;

  return <>{children}</>;
}

/**
 * TabletOnly - Renders children only on tablet devices (768px - 1023px)
 */
export function TabletOnly({ children, fallback = null }: ConditionalProps) {
  const { isTablet, isHydrated } = useDeviceSafe();

  if (!isHydrated) return <>{fallback}</>;
  if (!isTablet) return null;

  return <>{children}</>;
}

/**
 * DesktopOnly - Renders children only on desktop devices (>= 1024px)
 */
export function DesktopOnly({ children, fallback = null }: ConditionalProps) {
  const { isDesktop, isHydrated } = useDeviceSafe();

  if (!isHydrated) return <>{fallback}</>;
  if (!isDesktop) return null;

  return <>{children}</>;
}

/**
 * NotMobile - Renders children on tablet and desktop (>= 768px)
 */
export function NotMobile({ children, fallback = null }: ConditionalProps) {
  const { isMobile, isHydrated } = useDeviceSafe();

  if (!isHydrated) return <>{fallback}</>;
  if (isMobile) return null;

  return <>{children}</>;
}

/**
 * NotDesktop - Renders children on mobile and tablet (< 1024px)
 */
export function NotDesktop({ children, fallback = null }: ConditionalProps) {
  const { isDesktop, isHydrated } = useDeviceSafe();

  if (!isHydrated) return <>{fallback}</>;
  if (isDesktop) return null;

  return <>{children}</>;
}

/**
 * TouchOnly - Renders children only on touch devices
 */
export function TouchOnly({ children, fallback = null }: ConditionalProps) {
  const { hasCoarsePointer, isHydrated } = useDeviceSafe();

  if (!isHydrated) return <>{fallback}</>;
  if (!hasCoarsePointer) return null;

  return <>{children}</>;
}
