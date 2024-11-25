import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FilterCard from './src/components/FilterCard';
import { setSearchedQuery } from '@/redux/jobSlice';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);
jest.mock('@/redux/jobSlice', () => ({
  setSearchedQuery: jest.fn(),
}));

describe('FilterCard Component', () => {
  let store;
  let dispatch;

  beforeEach(() => {
    // Mock Redux store and dispatch
    store = mockStore({});
    dispatch = jest.fn();
    store.dispatch = dispatch;
  });

  test('renders the FilterCard component with all filters', () => {
    render(
      <Provider store={store}>
        <FilterCard />
      </Provider>
    );

    // Verify filter section headers
    expect(screen.getByText(/Filter Jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
    expect(screen.getByText(/Industry/i)).toBeInTheDocument();
    expect(screen.getByText(/Salary/i)).toBeInTheDocument();

    // Verify specific filter options
    expect(screen.getByText(/Delhi NCR/i)).toBeInTheDocument();
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/0-40k/i)).toBeInTheDocument();
  });

  test('updates the selected value when a filter option is clicked', () => {
    render(
      <Provider store={store}>
        <FilterCard />
      </Provider>
    );

    // Simulate selecting a filter option
    const radioOption = screen.getByLabelText(/Bangalore/i);
    fireEvent.click(radioOption);

    // Verify that the selected option is updated
    expect(radioOption).toBeChecked();
  });

  test('dispatches setSearchedQuery when a filter option is selected', () => {
    render(
      <Provider store={store}>
        <FilterCard />
      </Provider>
    );

    // Simulate selecting a filter option
    const radioOption = screen.getByLabelText(/Bangalore/i);
    fireEvent.click(radioOption);

    // Verify that the Redux action is dispatched with the correct value
    expect(dispatch).toHaveBeenCalledWith(setSearchedQuery('Bangalore'));
  });
});
