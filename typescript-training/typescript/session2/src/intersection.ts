// Task A
type Identifiable = {
  readonly id: string;
};

type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type SoftDeletable = {
  deletedAt?: Date;
  isDeleted: boolean;
};

// Task B
type BaseRecord = Identifiable & Timestamped;

type UserRecord = BaseRecord & {
  name: string;
  email: string;
};

type AuditedUserRecord = UserRecord & SoftDeletable;

// Task C
function isDeleted(record: SoftDeletable): boolean {
  return record.isDeleted;
}

// Task D

const baseRecord: BaseRecord = {
  id: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const userRecord: UserRecord = {
  id: "2",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Monica",
  email: "monica@mail.com",
};

const auditedUser: AuditedUserRecord = {
  id: "3",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "John",
  email: "john@mail.com",
  isDeleted: true,
  deletedAt: new Date(),
};

console.log(isDeleted(auditedUser)); 

type A = { value: string };
type B = { value: number };

type C = A & B;

// C becomes never because it cannot be both string and number at the same time.

// const obj: C = {
//   value: "hello",
// };

// const obj2: C = {
//   value: 10,
// };

// Therefore, no valid object of type C can be created.