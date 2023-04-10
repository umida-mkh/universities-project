
import { render, screen } from '@testing-library/react';

test('handleSearch filters universities correctly and updates state', () => {
  // Create a mock event object for the button click
  const event = {
    preventDefault: jest.fn(),
    target: {
      value: 'search query',
    },
  };

  // Mock the universities data and set initial state
  const universities = [    { name: 'University of California' },    { name: 'Stanford University' },    { name: 'Harvard University' },  ];
  const setUniversities = jest.fn();
  const setCurrentPage = jest.fn();

   // Call the handleSearch function with the mock event
  // handleSearch(event);

  // Verify that the event.preventDefault function was called
  expect(event.preventDefault).toHaveBeenCalled();

  // Verify that the universities were filtered correctly and the state was updated
  expect(setUniversities).toHaveBeenCalledWith([
    { name: 'University of California' },
    { name: 'Harvard University' },
  ]);
  expect(setCurrentPage).toHaveBeenCalledWith(1);
});
