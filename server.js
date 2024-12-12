const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Supabase credentials
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.post('/upload', async (req, res) => {
  const { data } = req.body;

  try {
    const { error } = await supabase
      .from('your_table_name')
      .insert([data]);

    if (error) {
      throw error;
    }

    res.status(200).send('Data uploaded successfully');
  } catch (error) {
    res.status(500).send('Error uploading data: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
