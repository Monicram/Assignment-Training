// 1. Interface is used for object shapes and can be reused with different types.
interface PaginationResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T[];
}

// 2. Type is used because this is a union type.
type StringOrStrings = string | string[];

// 3. Interface is used because notifications can be extended by other interfaces.
interface Notification {
  id: string;
  message: string;
  createdAt: Date;
}

// 4. Type is used for function signatures.
type NumberCallback = (value: number) => void;

// 5. Type is used because this is a union of string literals.
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Use interface for object shapes that may be extended.
// Use type for unions, primitives, and function types.