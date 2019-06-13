window.addEventListener('load', function() {
  document.getElementById('word-query-form').onsubmit = makeQuery;
});

function makeNewRow(tableID, word, count, found_in) {
  // Get a reference to the table
  const table = document.getElementById(tableID);

  // Insert a row at the end of the table
  const newRow = table.insertRow(-1);

  // Insert a cell in the row at index 0
  const wordCell = newRow.insertCell();
  const countCell = newRow.insertCell();
  const foundCell = newRow.insertCell();

  wordCell.appendChild(document.createTextNode(word));
  countCell.appendChild(document.createTextNode(count));
  foundCell.appendChild(document.createTextNode(found_in));
}
function makeQuery(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  sendQuery(formData.get('query-word'));
  console.log('Query for this word:', formData.get('query-word'));
  e.target[0].value = '';
}
function sendQuery(query_word) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/wordcount?word=${query_word}`);
  xhr.onload = handleResponse;
  xhr.send(null);
}
function handleResponse() {
  const res = JSON.parse(this.response);
  makeNewRow('output-table', res.word, res.count, res.found_in);
}
