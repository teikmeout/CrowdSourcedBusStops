-- \c bus_stop_crowdsourcing
BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS locations CASCADE;

CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  uname VARCHAR NOT NULL,
  hash VARCHAR NOT NULL
  -- woulnd't it be more appropriate to be called hash?
);

CREATE TABLE locations (
  id SERIAL NOT NULL PRIMARY KEY,
  lat DECIMAL(10,8) NOT NULL, -- apparently using decimal is better
  long DECIMAL(11,8) NOT NULL, -- and longitud has one more character
  route VARCHAR DEFAULT '-',
  user_id INT NOT NULL REFERENCES users
);

COMMIT;
