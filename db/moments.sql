CREATE TABLE IF NOT EXISTS moments(
  id SERIAL,
  author VARCHAR(255),
  emotion VARCHAR(255),
  body VARCHAR(255),
  lat DECIMAL,
  lng DECIMAL,
  created_at TIMESTAMP
);

INSERT INTO 
  moments (author, emotion, body, lat, lng)
VALUES
  ('Breakfast', 'Happy', 'This is an example of a moment.', 37.7758, -122.455),
  ('Earl', 'Sad', 'Another moment!', 37.7858, -122.435);