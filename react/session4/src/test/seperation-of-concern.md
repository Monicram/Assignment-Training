**Task 1.1**

`intern-context.tsx` combines multiple responsibilities.

**Identified concerns:**

1. React Context setup and custom hook creation.
2. Global state management.
3. API communication and asynchronous data fetching.
4. API boundary validation.
5. Business logic for adding and removing interns.

**Task 1.2**

**Distinct concerns in Snippet A:**

1. Input validation (`!form.name.trim()`).
2. ID generation (`Date.now()`).
3. Business logic (`Math.round(form.score)`).
4. React state updates (`setInterns(...)`).

**Which concern requires the most test setup?**

React state mutation requires the most setup because it depends on a React environment with providers or hooks. The other concerns are pure logic and can be tested independently with minimal setup.

**Task 2.1**

* **Arrange setup:** Each test required only **0–2 lines** of setup using simple object literals.
* **React or mocking tools:** None. Since the functions are pure and independent of React, the tests run quickly without `vi.mock`, `renderHook`, or `render`.

**Task 2.2**

**Why should the service layer avoid React imports?**

Keeping React out of the service layer separates business logic from the UI, making the code reusable, easier to maintain, and straightforward to unit test.

**What if React was imported?**

1. Tests would require a React runtime such as JSDOM.
2. Additional wrappers and lifecycle handling would be needed.
3. Business logic would become tightly coupled to React, reducing reusability.

**Does `intern-repository.test.ts` use `vi.mock`? Why?**

No. The repository manages only local React state and has no external dependencies or side effects that require mocking.

**Task 3.1**

**Difference between testing the repository and the service**

* **Service tests** verify pure functions by checking inputs and outputs directly.
* **Repository tests** validate React hook behavior and require utilities like `renderHook` and `act()`.

**Which is easier to test?**

The service layer is simpler because it contains pure functions with no React dependencies.

**Task 3.2**

**Separation Verified**

`useInternRepository` is responsible only for state management and contains no business logic, following the Single Responsibility Principle.

**Task 4.1**

**Line Count Comparison**

* Refactored `InternProvider`: approximately **18 lines** (around **40 lines** in total).
* Previous implementation: approximately **100–120+ lines**, containing validation, state management, ID generation, calculations, and filtering.

**Can ID generation be changed without modifying `intern-context.tsx`?**

Yes. Only `src/services/intern-service.ts`, specifically the `createIntern` function, needs to be updated.

**Task 4.2**

**Should a presentational component import the service layer directly?**

No. Presentational components should only receive data through props, while container components or the Context should invoke services and pass the processed data.

**Testing impact**

* Direct service imports create tighter coupling and often require mocks.
* Passing values as props makes components predictable and easy to test.

**Which approach is easier?**

Passing props is simpler because it eliminates unnecessary dependencies and mocking.

**Task 5.1**

**Layer Classification**

`useInternForm.ts` belongs to the **UI/Application Hook Layer** (also known as the **Presentation Controller Layer**).

It manages local form state, coordinates validation through the service layer, and forwards valid data to the Context while remaining independent of UI rendering.

**Which layer does `useInternForm` belong to now?**

It functions as a **Coordination Hook** that bridges the UI and Service layers by:

* Managing form state.
* Calling validation logic.
* Passing validated data to the repository or context.

**Task 6.1**

**Does any dependency point upward?**

No. All dependencies follow a one-way flow:

**UI Layer → Context Layer → Service & Repository Layers**

Neither the service nor the repository imports from higher layers, ensuring there are no circular dependencies.

**Task 6.2**

**Did every file improve its single responsibility?**

Yes. Each file now has a clearly defined purpose, making its responsibility easier to understand and maintain.

**Which file is still the hardest to describe?**

`src/contexts/intern-context.tsx` (or `useInternForm.ts`) remains the most complex because it coordinates interactions between multiple layers. However, it now focuses solely on orchestration rather than implementing business logic.
