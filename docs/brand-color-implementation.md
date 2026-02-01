# Brand Color System Implementation

Tracking checklist for migrating from dark-dominant theme to light-dominant brand color system.

Reference: `/Users/airborneshellback/Downloads/steelmotion-brand-colors.md`

---

## Phase 1: Foundation
- [x] 1. Add CSS custom properties (`--sm-*`) to `globals.css` `:root`
- [x] 2. Add Tailwind v4 `@theme` color tokens (`--color-sm-*`) in `globals.css`
- [x] 3. Update skip-link colors in `globals.css`

## Phase 2: Homepage Sections
- [x] 4. Migrate `hero.tsx` — stays dark (surface-inverse), replace neon cyan with teal
- [x] 5. Migrate `services.tsx` — convert to light theme (surface-primary/secondary)
- [x] 6. Migrate `products.tsx` — convert to light theme with elevated cards
- [x] 7. Migrate `why-steel-motion.tsx` — convert to light theme
- [x] 8. Migrate `contact.tsx` — stays dark, white form container
- [x] 9. Migrate `footer.tsx` — stays dark (surface-inverse)

## Phase 3: Navigation
- [x] 10. Migrate `navbar.tsx` — convert to light nav per brand doc recommendation

## Phase 4: Blog / Articles
- [x] 11. Migrate `articles/page.tsx` — light page background
- [x] 12. Migrate `articles/[slug]/page.tsx` — light with elevated article container
- [x] 13. Migrate `articles/category/[slug]/page.tsx` — light page background
- [x] 14. Migrate `blog-hero.tsx` — short dark hero
- [x] 15. Migrate `featured-posts.tsx` — light cards
- [x] 16. Migrate `blog-post-grid.tsx` — light cards
- [x] 17. Migrate `blog-post-content.tsx` — light article container
- [x] 18. Migrate `blog-sidebar.tsx` — light elevated card
- [x] 19. Migrate `blog-search.tsx` — light input styling
- [x] 20. Migrate `blog-pagination.tsx` — light theme

## Phase 5: Other Pages
- [x] 21. Migrate `about.tsx` section component — light theme
- [x] 22. Migrate `service-page.tsx` — light with short dark hero
- [x] 23. Migrate `portfolio/page.tsx` — light theme
- [x] 24. Migrate `partnerships` page — light with dark CTA
- [x] 25. Migrate `privacy/page.tsx` — light with elevated content card
- [x] 26. Migrate `terms/page.tsx` — light with elevated content card

## Phase 6: Shared UI Components
- [x] 27. Migrate `form-field.tsx` — update input colors
- [x] 28. Migrate `skeleton.tsx` — update loading colors
- [x] 29. Migrate `interactive-image-accordion.tsx` — if still used

## Phase 7: Email Templates
- [x] 30. Update `api/contact/route.ts` email template colors
- [x] 31. Update `api/partnerships/route.ts` email template colors

## Phase 8: Remaining Components & Cleanup
- [x] 32. Migrate `engagement-process.tsx`, `mission.tsx`, `veteran-partnerships.tsx` — if still referenced
- [x] 33. Remove all remaining `#00F2FF` / `#00ffff` from codebase
- [x] 34. Verify WCAG AA contrast across all pages
- [x] 35. Build verification — `pnpm run build` passes clean
