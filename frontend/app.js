window.addEventListener('load', function() {
  document.getElementById('word-query-form').onsubmit = makeQuery;
});

function makeNewRow(tableId, word, count, appears_in) {
  // Get a reference to the table
  const table = document.getElementById(tableID);

  // Insert a row at the end of the table
  const newRow = table.insertRow(-1);

  // Insert a cell in the row at index 0
  const wordCell = newRow.insertCell();
  const countCell = newRow.insertCell();
  const appearsCell = newRow.insertCell();

  wordCell.appendChild(document.createTextNode(word));
  countCell.appendChild(document.createTextNode(count));
  appearsCell.appendChild(document.createTextNode(appears_in));
}
function makeQuery(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log('Query for this word:', formData.get('query-word'));
  e.target[0].value = '';
}
