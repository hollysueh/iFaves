import React from 'react';
import SearchAPI from '../Components/SearchAPI';
import renderer from 'react-test-renderer';

//Test SearchAPI.js renders correctly
test('renders correctly', () => {
  const tree = renderer
  .create(<SearchAPI />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});

//Test SearchAPI.js renders correctly when states populated
/* code referenced from https://www.digitalocean.com/community/tutorials/how-to-write-snapshot-tests-for-react-components-with-jest */
test('renders states correctly when populated', () => {
  const searchTerm = 'usher';
  const searchResult = ['test'];
  const tree = renderer
  .create(<SearchAPI searchTerm={searchTerm} searchResult={searchResult} />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});

//Test fetch() function used in SearchAPI.js is working correctly
test('fetch search request from server', () => {
  fetch("/search", { //send POST request to server
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }, // send server search terms to enter in API
    body: JSON.stringify({
        searchTerm: 'arctic monkeys',
        media: 'music'
    }),
})
  .then(res => {
    expect(res.results[0].artistName).toBe('Arctic Monkeys');
  });
});
