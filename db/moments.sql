DROP TABLE IF EXISTS moments;

CREATE TABLE moments(
  id SERIAL,
  author VARCHAR(255),
  emotion VARCHAR(255),
  body VARCHAR(255),
  lat DECIMAL,
  lng DECIMAL,
  created_at DATE
);

INSERT INTO moments (author, emotion, body, lat, lng, created_at) VALUES
  ('Charles', 'Excited', 'ORM day!', 37.78075532805877, -122.4125862121582, '2015-11-10'),
  ('Chris', 'Content', 'Amazing meal at HOPR', 37.79350762410675, -122.42273569107056, '2015-11-10'),
  ('Charles', 'Happy', 'Shabu Shabu deliciousness', 37.763726226183614, -122.46644496917725, '2015-11-10'),
  ('Nick', 'Angry', 'Just missed Caltrain, by 5 minutes', 37.77600657051943, -122.39361763000488, '2015-11-10'),
  ('Charles', 'Happy', 'Beautiful sights from the Golden Gate bridge', 37.81887000955133, -122.47841835021973, '2015-11-10'),
  ('Charles', 'Content', 'Great day at the park', 37.770443352285376, -122.46262550354004, '2015-11-10'),
  ('Greg', 'Happy', 'Dolores park party :)', 37.75870494559314, -122.4267053604126, '2015-11-11'),
  ('Charles', 'Content', 'A beautiful view at Cliff House', 37.77824530850988, -122.51330852508545, '2015-11-11'),
  ('Sam', 'Afraid', 'This might not be for me - I dont do great with heights.', 37.80184969073113, -122.40576267242432, '2015-11-11'),
  ('Alyssa', 'Angry', 'So much traffic!', 37.78299392223508, -122.39529132843018, '2015-11-11'),
  ('Charles', 'Happy', 'Cant beat an Anchor Steam', 37.76284413400416, -122.39992618560791, '2015-11-11'),
  ('Charles', 'Excited', 'Football Sundays are the best', 37.786046441392266, -122.44357109069824, '2015-11-11'),
  ('Bill', 'Sad', 'A mediocre sandwich =/', 37.765693932366844, -122.45266914367676, '2015-11-11'),
  ('Charles', 'Content', 'Relaxing across the bay', 37.873227357246435, -122.45121002197266, '2015-11-14'),
  ('Chris', 'Excited', 'So glad we made the trip to Lagunitas!', 38.271812548502815, -122.6624822616577, '2015-11-14'),
  ('John', 'Afraid', 'This oyster is huge. Like, really huge', 38.151229943390476, -122.8880453109741, '2015-11-14'),
  ('Jeff', 'Angry', 'Another huge line at security. Why is it so slow?', 37.61858263247881, -122.37773895263672, '2015-11-14'),
  ('Charles', 'Happy', 'I really enjoyed the art here', 37.78530028168537, -122.50090599060059, '2015-11-14'),
  ('Laura', 'Happy', 'Such a sunny afternoon :)', 37.78401144262929, -122.43206977844238, '2015-11-19'),
  ('Charles', 'Content', 'Happy its Friday! Ready to go relax', 37.397096202696275, -122.08140850067139, '2015-11-20'),
  ('Charles', 'Afraid', 'Huge meeting ... hope it goes well', 37.33092486128152, -122.02922344207764, '2015-11-20');