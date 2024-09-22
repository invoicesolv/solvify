CREATE TABLE IF NOT EXISTS files (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  size INTEGER NOT NULL,
  last_modified TIMESTAMP NOT NULL,
  preview JSONB NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY,
  account VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  contacts TEXT,
  amount VARCHAR(255),
  "accountValue" VARCHAR(255),
  priority VARCHAR(50),
  industry VARCHAR(255),
  epost VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS new_boards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projektstavla (
  id SERIAL PRIMARY KEY,
  column1 VARCHAR(255),
  column2 VARCHAR(255),
  column3 VARCHAR(255)
  -- Add more columns as needed
);

-- Add other tables as needed for different pages