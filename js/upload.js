import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';

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
  searchBox({
    container: "#searchbox"
  }),

  hits({
    container: "#hits"
  })
]);

search.start();
