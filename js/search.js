const searchClient = algoliasearch('D92FAAH3QP', '5d528996ae02dbe0b55596d1736f1ed0');
const index = client.initIndex("your_index_name");

const { connectAutocomplete } = instantsearch.connectors;
// or directly use instantsearch.connectors.connectAutocomplete()
const search = instantsearch({
  indexName: 'demo_ecommerce',
  searchClient,
});

// Helper for the render function
const renderIndexListItem = ({ indexId, hits }) => `
  <li>
    Index: ${indexId}
    <ol>
      ${hits
        .map(
          (hit, hitIndex) =>
            `
              <li>
                <p>${instantsearch.highlight({ attribute: 'name', hit })}</p>
                <button
                  type="button"
                  class="btn-add-to-cart"
                  data-index-id="${indexId}"
                  data-hit-index="${hitIndex}"
                >
                  Add to Cart
                </button>
              </li>
            `
        )
        .join('')}
    </ol>
  </li>
`;

// Create the render function
const renderAutocomplete = (renderOptions, isFirstRender) => {
  const { indices, currentRefinement, refine, widgetParams } = renderOptions;

  if (isFirstRender) {
    const input = document.createElement('input');
    const ul = document.createElement('ul');

    input.addEventListener('input', event => {
      refine(event.currentTarget.value);
    });

    widgetParams.container.appendChild(input);
    widgetParams.container.appendChild(ul);

    ul.addEventListener('click', (event) => {
      if (event.target.className === 'btn-add-to-cart') {
        const indexId = event.target.getAttribute('data-index-id');
        const hitIndex = event.target.getAttribute('data-hit-index');
        const index = indices.find(index => index.indexId === indexId);
        const hit = index.hits[hitIndex];

        index.sendEvent('conversion', hit, 'Product Added');
      }
    });
  }

  widgetParams.container.querySelector('input').value = currentRefinement;
  widgetParams.container.querySelector('ul').innerHTML = indices
    .map(renderIndexListItem)
    .join('');
};

// Create the custom widget
const customAutocomplete = connectAutocomplete(
  renderAutocomplete
);

// Instantiate the custom widget
search.addWidgets([
  index({ indexName: 'instant_search_price_asc' }),
  index({ indexName: 'instant_search_price_desc' }),

  customAutocomplete({
    container: document.querySelector('#autocomplete'),
  })
]);

search.start();
