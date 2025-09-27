// DOCS: Role constants + helpers shared across app.

export type Role = "admin" | "store" | "customer"

export const ROLES = {
  ADMIN: "admin" as Role,
  STORE: "store" as Role,
  CUSTOMER: "customer" as Role,
}

export const DEFAULT_ROLE: Role = ROLES.CUSTOMER

export const hasRole = (actual?: Role, ...allowed: Role[]) =>
  !!actual && allowed.includes(actual)
