**Task 1.1**
## Bug 1 — Validation rejects valid score

**Reproduce:**
Add an intern with a score of 85. The form always shows "Score must be 0–100" even though 85 is a valid score.

**Isolate:**
The bug is in src/utils/intern-validation.ts inside the score validation function.

**Root cause:**
The validation checks if the score is greater than 10 instead of 100, so all valid scores above 10 are rejected.

**Fix:**
Change the validation condition from:

```ts
if (score < 0 || score > 10) return "Score must be 0–100";
```

to:

```ts
if (score < 0 || score > 100) return "Score must be 0–100";
```

**Verified:**
- Add an intern with a score of 85 and confirm it is accepted.
- Add an intern with a score of 100 and confirm it is accepted.
- Add an intern with a score of 101 and confirm it is rejected.
- Check that the rest of the form still works correctly.

**Task 1.2**
## Expected vs Actual — Add Intern Form

Scenario 1 (working):
  Input:    name='Rahul', score=85, role='Frontend'
  Expected: Intern is added successfully and appears in the list with the role "Frontend".
  Actual:   The intern is added successfully and displayed in the list with the correct role.

Scenario 2 (hypothetical bug):
  Input:    name='', score=85
  Expected: Validation error "Name is required" is displayed and the intern is not added.
  Actual:   If the bug existed, the form would accept the empty name and add the intern to the list.

comment:
Writing the expected vs actual statement helped me understand exactly how the feature should behave for both valid and invalid inputs. It made it easier to identify whether the application was working correctly or not.

**Task 2.1**
## Bug 2 — Stack Trace Reading

**Error type and message:**
TypeError: Cannot read properties of undefined (reading 'value')

**First YOUR-code line in the trace (file and line number):**
src/contexts/intern-context.tsx:63

**What that line does:**
It tries to access intern.nonExistentNested.value for every intern in the array.

**The caller (next YOUR-code line):**
The next file and line from my application shown in the stack trace.

**Root cause (one sentence):**
The code tries to access a property that does not exist on the intern object, so the value is undefined.

**Did you need to add any console.log to find this? Why or why not?**
 Yes,The stack trace showed the error message, file name, and line number where the problem occurred.

**Task 2.2**
## Bug 3 — Finding the Root Cause

**What does the stack trace error say if this throws?**
TypeError: Cannot read properties of undefined (reading 'name')

**Under what exact condition does it throw?**
When the interns array is empty and sorted[0] is undefined.

**Which line is the root cause line?**
return top.name.toUpperCase()

**Fix (one line):**
if (interns.length === 0) return ""

**Task 3.1**
**Error message shown:**
TypeError: Cannot read properties of undefined (reading 'value')

**File and line number from the clickable link:**
src/contexts/intern-context.tsx:63

**Did the line match what you expected from reading the stack trace?**
Yes. It opened the same file and line where the error occurred.

**Task 3.2**
**Successful request URL and status:**
https://jsonplaceholder.typicode.com/users
Status: 200 OK

**Response (first item or summary):**
The response contains a list of user objects. The first item includes fields such as id, name, username, email, address, and phone.

**Failed URL and status:**
https://jsonplaceholder.typicode.com/user
Status: 404 Not Found

**What the Console shows when the fetch fails:**
The Console shows a failed network request with a 404 (Not Found) error because the requested URL does not exist.

**Task 3.3**
## Task 3.3 — Elements panel

**Element inspected:**
Intern row for Rahul.

**CSS class applied:**
intern-row

**Property changed and what happened:**
Changed background-color from the current value to yellow. The background colour changed immediately in the browser.

**Did the source file change? Why not?**
No. The change was only temporary in the browser's DevTools and was not saved to the source code.

**Task 4.1**
**File and line where breakpoint was set:**
src/hooks/useInternSearch.ts:29

**Variables in scope at pause:**
filtered, search, setSearch, stats, filter, interns

**Value of search term:**
"R"

**Number of interns in the array:**
5

**What changed after two Step Overs:**
The filter function executed and returned the filtered list based on the search term.

**Task 4.2**
**Condition used:**
`search === "R"`

**How many times did the breakpoint fire?**
1

**How many times would a line breakpoint have fired?**
Every time the filter function was executed during the search.

**Why is a conditional breakpoint better for this scenario?**
It pauses only when the required condition is met, making it easier to debug without stopping on every execution.

**Task 4.3**
**Line where you started (file:line):**
src/hooks/useInternSearch.ts:30

**Function you stepped into:**
filterInterns() in src/utils/intern-utils.ts

**What did you see inside the function (variables, logic):**
I saw the interns array, the search value, and the filtering logic that checks whether each intern matches the search term.

**After Step Out — where did execution return to:**
Execution returned to return filter(interns, search) in src/hooks/useInternSearch.ts.

**Task 4.4**
## Task 4.4 — Watch expressions

**Expressions added:**
interns.length
search

**Values at pause:**
interns.length = 5
search = "R"

**Did any expression change value as you stepped? Which one and how:**
The search value changed when a different search term was entered, while interns.length remained the same because the list of interns did not change.

**When is a watch expression more useful than hovering over a variable:**
A watch expression is useful when we want to monitor the same value across multiple steps without repeatedly hovering over the variable.

**Task 5.1**
**launch.json URL used:**
http://localhost:5173

**File and line where you set the breakpoint:**
src/hooks/useInternSearch.ts:30

**What inline values appeared when paused:**
The debugger showed inline values for variables such as search, interns, and filter, making it easy to inspect the current state.

**One thing the VS Code debugger shows that console.log cannot:**
The VS Code debugger lets me pause execution, inspect variables at that exact moment, and step through the code line by line without adding or removing any logging statements.

**Task 6.1**

| File | Current log | Labelled? | Action |
|------|-------------|-----------|--------|
| intern-context.tsx | `console.log(data)` | No | Changed to `console.log("fetchInterns response:", data)` |
| intern-context.tsx | `console.log(error)` | No | Changed to `console.log("Error:", error)` |
| InternListwithCallback.tsx | `console.log("Filtered interns:", filtered)` | Yes | Keep while debugging, remove before production |

**Task 6.2**

**Where you added it:**
Inside the form submit handler before validation and submission.

**What the Console output looks like:**
A collapsed submit() group containing the form data and validation result.

**Is the guard important? What would happen without it in production?**
Yes. The guard ensures the logs only appear during development. Without it, users would see unnecessary debug logs in production, making the Console noisy and potentially exposing application data.

## Explore 1

React StrictMode renders components twice in development, so the bug may appear earlier or more than once. A conditional breakpoint helps pause only when the required condition is met, making the bug easier to find.

## Explore 2

The Call Stack shows several React framework functions before reaching my own code. By clicking each frame, I can trace the execution back to the component and utility function where the bug started.

## Explore 3

console.trace() prints the call stack in the Console but does not pause execution or let me inspect variables. A breakpoint allows me to inspect variable values, step through the code, and examine the current state.

## Explore 4

If there is no stack trace, I would follow the five-step debugging process:
1. Reproduce the bug.
2. Isolate the part of the code causing it.
3. Find the root cause.
4. Apply the smallest possible fix.
5. Verify that the bug is fixed and nothing else is broken.