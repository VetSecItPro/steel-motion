/**
 * Lighthouse CI Configuration for Steel Motion LLC
 * Performance, Accessibility, SEO, and Best Practices audits
 */
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready',
      startServerReadyTimeout: 30000,
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/about',
        'http://localhost:3000/blog',
        'http://localhost:3000/privacy',
        'http://localhost:3000/terms',
        'http://localhost:3000/services/ai-transformation',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    assert: {
      assertions: {
        // Performance thresholds
        'categories:performance': ['warn', { minScore: 0.8 }],

        // Accessibility - strict for WCAG compliance
        'categories:accessibility': ['error', { minScore: 0.9 }],

        // Best Practices
        'categories:best-practices': ['warn', { minScore: 0.85 }],

        // SEO
        'categories:seo': ['warn', { minScore: 0.9 }],

        // Security-related assertions
        'is-on-https': 'off', // Disabled for local testing
        'uses-http2': 'off', // Disabled for local testing

        // Critical web vitals
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],

        // Accessibility specifics
        'color-contrast': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-description': 'error',
        'image-alt': 'error',
        'link-name': 'error',
        'button-name': 'error',
        'label': 'warn',

        // Security headers (will be checked in production)
        'csp-xss': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
