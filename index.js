const express = require('express');
// Import the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');
const app = express();

app.use(express.static('frontend'));
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});

app.get('/wordcount', async (req, res) => {
  try {
    const data = await queryStackOverflow(req.query.word);
    res.send(JSON.stringify(data));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});


async function queryStackOverflow(word_query) {
  // Queries a public Stack Overflow dataset.

  // Create a client
  const bigqueryClient = new BigQuery();

  // The SQL query to run
  const sqlQuery = `
SELECT
  *
FROM (
  SELECT
    STRING_AGG(DISTINCT corpus) AS found_in,
    LOWER(word) AS lowered_word,
    SUM(word_count) AS total_word_count
  FROM
    \`bigquery-public-data.samples.shakespeare\`
  GROUP BY
    lowered_word
  ORDER BY
    total_word_count DESC
    ) w
WHERE
  lowered_word = @word_query;
`;
  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
    params: {
      word_query,
    },
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  if (rows.length) {
    const output = {
      word: '',
      count: '',
      found_in: '',
    };
    output.word = rows[0]['lowered_word'];
    output.count = rows[0]['total_word_count'];
    output.found_in = rows[0]['found_in'];
    return output;
  } else {
    throw new Error(`No results found for ${word_query}`);
  }
}
