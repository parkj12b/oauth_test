import algoliasearch from 'https://cdn.jsdelivr.net/npm/algoliasearch@4.24.0/dist/algoliasearch.esm.browser.js';
import instantsearch from 'https://cdn.jsdelivr.net/npm/instantsearch.js@4.73.2/dist/instantsearch.production.min.js';

export async function getAlgoliaData() {
  fetch("http://ec2-35-77-196-143.ap-northeast-1.compute.amazonaws.com:3000/test")
  .then((data) => data.json())
  .then((records) => {
    const client = algoliasearch(
      "D92FAAH3QP",
      "763689b3f235c53aca520209cf84c0eb"
    );

    const index = client.initIndex("your_index_name");

	console.log({index});
    index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });
  })
  .catch((error) => {
    console.error(error);
  });
}

window.getAlgoliaData = getAlgoliaData;


const searchClient = algoliasearch('D92FAAH3QP', '5d528996ae02dbe0b55596d1736f1ed0');

const search = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: "#searchbox"
  }),

  instantsearch.widgets.hits({
    container: "#hits"
  })
]);

search.start();

const renderAutocomplete = (renderOptions, isFirstRender) => {
    const { currentRefinement } = renderOptions;
  
    document.querySelector('#autocomplete').innerHTML = `
      <input type="search" value="${currentRefinement}" />
    `;
  };
