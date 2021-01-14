import React from 'react';
import MyFavesList from '../Components/MyFavesList';
import renderer from 'react-test-renderer';

//Test myFavesList.js renders correctly
test('renders correctly', () => {
  const tree = renderer
  .create(<MyFavesList />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});

//Test MyFavesList.js renders correctly when states populated
/* code referenced from https://www.digitalocean.com/community/tutorials/how-to-write-snapshot-tests-for-react-components-with-jest */
test('renders states correctly when populated', () => {
  const favourites = ['test'];
  const tree = renderer
  .create(<MyFavesList favourites={favourites} />)
  .toJSON();
  expect(tree).toMatchSnapshot();
});

//Test fetch() function used in MyFavesList.js is working correctly
test('fetch favourites list from server', () => {
  fetch("/favesList") //Send GET request to server
  .then(res => {
    expect(res[0].artistName).toBe('Rihanna');
  });
});
