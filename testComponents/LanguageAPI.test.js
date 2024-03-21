import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LanguageAPI from '../Components/languageAPI';
import { NavigationContainer } from '@react-navigation/native';

// Mock the NavigationContainer and useNavigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

// Mock the useTranslationContext hook
jest.mock('../Components/Translation', () => ({
  useTranslationContext: () => ({
    translations: {
      Language: 'Language',
      Back: 'Back',
    },
    updateTranslations: jest.fn(),
  }),
}));

describe('LanguageAPI component', () => {
  it('renders language buttons and back button', () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <LanguageAPI />
      </NavigationContainer>
    );

    // Check if language buttons are rendered
    const enButton = getByText('English');
    const deButton = getByText('Deutsch');

    // Check if back button is rendered
    const backButton = getByText('Back');
      console.log("Running the 'renders language buttons and back button' test");
  });

  it('changes selected language when a language button is pressed', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <LanguageAPI />
      </NavigationContainer>
    );
    const enButton = getByTestId('languageButton_en');
    const deButton = getByTestId('languageButton_de');

    fireEvent.press(enButton);
    fireEvent.press(deButton);
    console.log("Running the 'changes selected language when a language button is pressed' test");
  });

});
