require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:4200'
}));

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  port: process.env.POSTGRES_PORT,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Database connected successfully');
    release();
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Function to create a table
app.post('/create-table', async (req, res) => {
  try {
    const client = await pool.connect();
    const tableExists = await client.query(
      "SELECT EXISTS (SELECT FROM pg_tables WHERE tablename = 'messages');"
    );

    if (!tableExists.rows[0].exists) {
      await client.query(`
        CREATE TABLE messages (
          id SERIAL PRIMARY KEY,
          message TEXT
        );
      `);
      res.json({ message: 'Table created successfully' });
    } else {
      res.json({ message: 'Table already exists' });
    }

    client.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to insert an entry into the table
app.post('/insert-message', async (req, res) => {
  const { message } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO messages (message) VALUES ($1) RETURNING *',
      [message]
    );

    res.json({ message: 'Message inserted successfully', data: result.rows });
    client.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to get all entries from the table
app.get('/messages', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM messages');

    res.json({ messages: result.rows });
    client.release();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
