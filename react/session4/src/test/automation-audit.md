# Automation Audit

**1. Coverage**

- **Branch coverage:** 79.68%
- **Worst branch coverage:** `contexts` (50%)


**2. Speed**

- **Slowest test:** Playwright visual regression test (`assertions.spec.ts` / `self-learning1.spec.ts`)
- **Reason:** It opens the browser, loads the page, and compares screenshots.

 **3. Pyramid Shape**

- The test suite is not a perfect test pyramid.
- It has more End-to-End tests than Unit and Component tests.
- More Unit and Component tests should be added.

**4. Critical Paths**

The three most important user journeys are:

1. Add a new intern.
2. Search interns by name.
3. Update an intern's attendance or score.

These user journeys should each be covered by at least one End-to-End test.

 **5. What Breaks Silently**

If `intern-context.tsx` returns interns in a different order:

- **Component and End-to-End tests** that verify the displayed order would catch the issue.
- **Unit tests** that only check business logic would not detect the change.