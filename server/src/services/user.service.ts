import { query } from "../config/database.js";
import { USER_TABLE_SQL, type UserRecord, type CreateUserInput } from "../models/user.model.js";

export async function ensureUsersTableExists(): Promise<void> {
  await query(USER_TABLE_SQL);
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const result = await query<UserRecord>(
    `SELECT * FROM users WHERE email = $1 LIMIT 1;`,
    [email.toLowerCase().trim()]
  );

  return result.rows[0] ?? null;
}

export async function createUser({
  firstName,
  lastName,
  email,
  password,
}: CreateUserInput): Promise<UserRecord> {
  const result = await query<UserRecord>(
    `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `,
    [firstName.trim(), lastName.trim(), email.toLowerCase().trim(), password]
  );

  return result.rows[0];
}
