BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL NOT NULL,
  uname VARCHAR NOT NULL,
  pass VARCHAR NOT NULL
);

CREATE TABLE locations (
  id SERIAL NOT NULL,
  lat INT NOT NULL,
  long INT NOT NULL,
  user_id INT NOT NULL references users.id;
)

COMMIT;
