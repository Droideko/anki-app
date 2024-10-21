export type User = {
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  id: string;
  name: string;
  email: string;
};
