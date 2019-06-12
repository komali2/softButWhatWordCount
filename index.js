// Import the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');

async function queryStackOverflow() {
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
  LIMIT
    1000 ) w
WHERE
  lowered_word = 'thou';
`;
  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  console.log('Query Results:');
  rows.forEach(row => {
    const url = row['lowered_word'];
    const viewCount = row['total_word_count'];
    console.log(`url: ${url}, ${viewCount} views`);
  });
}
queryStackOverflow();
