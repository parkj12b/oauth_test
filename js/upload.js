import algoliasearch from 'https://cdn.jsdelivr.net/npm/algoliasearch@4.24.0/dist/algoliasearch.esm.browser.js';

async function getAlgoliaData() {
  fetch("http://ec2-35-77-196-143.ap-northeast-1.compute.amazonaws.com:3000/test")
  .then((data) => data.json())
  .then((records) => {
    const client = algoliasearch(
      "P9B9TDIMRS",
      "21f8ebaed5bfa1b68a6bee00259b0b0e"
    );

    const index = client.initIndex("your_index_name");

	console.log({index});
    index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });
  })
  .catch((error) => {
    console.error(error);
  });
}
