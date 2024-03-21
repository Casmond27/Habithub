import React from 'react';
import { render } from '@testing-library/react-native';
import Loading from '../Components/Loading'; // Make sure to provide the correct path to your component

describe('Loading', () => {
  it('renders Splash screen correctly', () => {
    const { getByText, getByTestId } = render(<Loading />);

    const title = getByText('HabitHub');
    const subTitle = getByText('Crafting a Better You, Brick by Brick.');
    const activityIndicator = getByTestId('activity-indicator');

    expect(title).toBeTruthy();
    expect(subTitle).toBeTruthy();
    expect(activityIndicator).toBeTruthy();
      console.log("Running the 'renders Splash screen correctly' test");
  });
});
