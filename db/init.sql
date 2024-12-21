CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  message TEXT
);

INSERT INTO messages (message) VALUES ('Hello, World!');
INSERT INTO messages (message) VALUES ('This is a test message.');