// Task A
type UserId = string;
type ProductId = string;
type Timestamp = number;
type Status = "active" | "inactive" | "pending";
type Direction = "north" | "south" | "east" | "west";

// Task B
function getUserById(id: UserId): void {
  console.log(id);
}

function updateStatus(id: UserId, status: Status): void {
  console.log(id, status);
}

function move(direction: Direction, steps: number): void {
  console.log(direction, steps);
}

getUserById("U001");
updateStatus("U001", "active");
move("north", 5);

// Task C
const id: UserId = "U123";
getUserById("ABC123");


// TypeScript does NOT give an error because UserId is just an alias for string.
// Any string value can be passed where a UserId is expected.


// TypeScript uses "structural typing" not "nominal typing".
// TypeScript checks the shape of a type, not its name.
// So UserId and ProductId are treated the same because both are strings.