BEGIN TRANSACTION;

CREATE TABLE login (
  id serial PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password varchar(100) NOT NULL
  created TIMESTAMP NOT NULL
);

CREATE TABLE profiles (
  id INTEGER NOT NULL,
  FOREIGN KEY (id) REFERENCES login(id),
  name VARCHAR(100),
  email text UNIQUE NOT NULL,
  created TIMESTAMP NOT NULL
);

COMMIT;
