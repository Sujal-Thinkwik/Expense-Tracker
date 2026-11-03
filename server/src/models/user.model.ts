export type UserRecord = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: string;
};

export type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const USER_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;
