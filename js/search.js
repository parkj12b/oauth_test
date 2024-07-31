import algoliasearch from 'https://cdn.jsdelivr.net/npm/algoliasearch@4.24.0/dist/algoliasearch-lite.umd.js';
import instantsearch from 'instantsearch.js/es';

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