## Section 1 — Code Smell Audit

**Task 1.2**
## Refactoring Priority List

1. God object in src/contexts/intern-context.tsx — because mixing state management, ID generation, and validation makes it impossible to maintain and violates single responsibility.
2. Long function in src/hooks/useInternForm.ts — because tightly coupling business rules with UI coordination ruins testability and makes the form brittle.
3. Inconsistent returns in src/utils/intern-validation.ts — because returning mixed types (booleans, strings, thrown errors) forces components to guess how to handle failures, causing hidden bugs.

## Section 2 — Rename for Clarity

**Task 2.1**

* **Old name:** `i` (inside the filter callback in useInternSearch)
* **New name:** `intern`
* **Why it's better:** Using a single-letter variable like `i` forces the reader to look up at the array being filtered to understand what it represents. Naming it `intern` instantly clarifies exactly what domain object is being evaluated.

**Task 2.2**
* **Change made:** Extracted the magic number `50` into a constant named `MAX_NAME_LENGTH` in `src/utils/intern-validation.ts`.
* **Where it came from:** It was hardcoded in an if-statement checking the intern's input: `if (name.length > 50)`.
* **Assumption made explicit:** Naming it makes it explicitly clear that 50 is the business rule for the maximum allowed characters for a name, rather than just an arbitrary number. If the database limit changes in the future, developers now know exactly where to update it.

## Section 3 — Extract Function

**Task 3.1**
* **Change made:** Extracted the validation logic out of `useInternForm.ts` into a pure function `validateInternForm` in `src/utils/intern-validation.ts`. 
* **Why it's better:** This decouples the business rules (what makes an intern valid) from the UI state management, allowing the validation logic to be tested independently without needing React.

**Task 3.2**
* **Change made:** Extracted the calculation logic (`calculateScoreStats`) out of the React components into a pure utility function.
* **Why it's better:** Business logic and mathematical calculations shouldn't be tied to component rendering. Extracting it allows us to easily test edge cases (like an empty array of interns) using simple input/output unit tests without having to mock the DOM.

## Section 4 — Remove Duplication

**Task 4.1**
* **Change made:** Removed duplicated validation logic that was hiding inside `src/services/intern-service.ts`.
* **Why it's better:** We now use `validateInternForm` as the single source of truth for validation. If business rules change in the future, we only have to update one file, eliminating the risk of the UI and the service getting out of sync.

**Task 4.2**
* **Change made:** Created test factories (`makeIntern`, `makeForm`) to handle test data generation across the test suite.
* **Why it's better:** Eliminated massive amounts of copy-pasted object setup in the test files. If the `Intern` interface ever requires a new required field, we only have to update the factory function instead of manually fixing dozens of broken tests.

## Section 5 — Simplify Conditionals

**Task 5.1**
* **Change made:** Refactored `evaluateProfile` in `src/utils/profile-evaluator.ts` by replacing 3 levels of nested `if/else` statements with flat guard clauses.
* **Why it's better:** It eliminates the "pyramid of doom." By failing fast and throwing errors at the top of the function, the cognitive load is reduced. The "happy path" is now completely un-nested at the bottom of the function.

**Task 5.2**
* **Change made:** Replaced a long `if/else` chain in `src/utils/role-lookup.ts` with a dictionary lookup object (`ROLE_LABELS`) for `getRoleLabel`.
* **Why it's better:** It separates the data from the execution logic. If a new role needs to be added, we just add a key-value pair to the dictionary—the function logic itself never has to be touched again. It also executes slightly faster as an O(1) property lookup.

## Section 6 — The Full Refactoring Cycle

**Task 6.1 — Full Refactoring Log: `getReport`**

- **Step 1:** Replaced `any[]` with `Partial<Intern>[]` and updated return type to `ReportCard[]` 
  ➔ *Ran tests: GREEN*
- **Step 2:** Renamed variables `data` to `interns`, `n` to `name`, and `s` to `status` 
  ➔ *Ran tests: RED* (Forgot to update the test assertions to look for `name` and `status` instead of `n` and `s`) 
  ➔ *Undid change, updated test file assertions first, then applied variable renames in the function* 
  ➔ *Ran tests: GREEN*
- **Step 3:** Replaced manual `for` loop with array `.map()` 
  ➔ *Ran tests: GREEN*
- **Step 4:** Replaced duplicated `score >= 50` check with shared `getScoreLabel` utility function 
  ➔ *Ran tests: GREEN*

**Final:** 4 changes, 5 test runs.

> **Reflection:** 
> *How many separate test runs did you do?* 
> I ran the test suite 5 times. 
> 
> *Did any step produce a red result? If yes — what did you undo?* 
> Yes, Step 2 went red because I renamed the output keys, but the test was still expecting the old ones. I undid the function change, updated the expected output in the test file first, and then reapplied the function change. This proved the test was actively catching breaking contract changes!

**Task 6.2 — Coverage before and after**

| Metric | Before refactoring | After refactoring |
|--------|--------------------|-------------------|
| Statement % | 95.4% | 95.94% |
| Branch % | 82% | 83.33% |
| Function % | 96.24% | 98.46% |

> **Reflection:**
> 
> *Did coverage go up, down, or stay the same? Why?*
> Coverage went up. By removing duplicated logic and deleting unnecessary nested `else` blocks, the total amount of code decreased while the test suite grew stronger. We also explicitly added new tests for edge cases, driving coverage higher.
> 
> *Did extracting pure functions make it easier to cover edge cases that were previously hidden inside larger functions?*
> Yes, absolutely! Previously, testing edge cases meant having to mount entire React components and mock Context providers. By extracting these into pure functions, we could test every single edge case instantly using simple input-in, output-out unit tests.