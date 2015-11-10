CREATE TABLE IF NOT EXISTS moments(
  id SERIAL,
  author VARCHAR(255),
  emotion VARCHAR(255),
  body VARCHAR(255),
  lat DECIMAL,
  lng DECIMAL,
  created_at TIMESTAMP
);