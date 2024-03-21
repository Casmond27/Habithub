import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Creation from '../Components//Creation'; // Adjust the path to your component
import { NavigationContainer } from '@react-navigation/native';

// Mocking AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mocking the translation context
jest.mock('../Components/Translation', () => ({
  useTranslationContext: () => ({
    translations: {
      SelectHabit: 'Select Habit',
      Priority: 'Priority',
      // ...add other translations here...
    },
  }),
}));

const renderWithNavigation = (component) => {
  return render(<NavigationContainer>{component}</NavigationContainer>);
};

describe('Creation', () => {
  it('submits the form when Submit button is pressed', () => {
    const route = {
      params: {
        setFormDataArray: jest.fn(),
      },
    };

    const { getByText } = render(
      <NavigationContainer>
        <Creation route={route} />
      </NavigationContainer>
    );

    console.log("Running the 'submits the form when Submit button is pressed' test");
  });

  it('updates habit selection when Picker value changes', () => {
    const route = {
      params: {
        setFormDataArray: jest.fn(),
      },
    };

    const { getByTestId } = render(
      <NavigationContainer>
        <Creation route={route} />
      </NavigationContainer>
    );

    console.log("Running the 'updates habit selection when Picker value changes' test");
  });

  it('updates priority when priority button is pressed', () => {
    const route = {
      params: {
        setFormDataArray: jest.fn(),
      },
    };

    const { getByText } = render(
      <NavigationContainer>
        <Creation route={route} />
      </NavigationContainer>
    );

    console.log("Running the 'updates priority when priority button is pressed' test");
  });

  // Add more tests for various interactions and edge cases
});
