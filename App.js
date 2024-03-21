import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FormDataProvider } from './Components/FormData';
import MainNavigator from './Components/MainNavigator';
import { TranslationProvider } from './Components/Translation';
import { HabitProvider } from './Components/HabitProgress';

const App = () => {
  return (
    <FormDataProvider>

        <NavigationContainer>
          <TranslationProvider>
            <HabitProvider>
              <MainNavigator />
            </HabitProvider>
          </TranslationProvider>
        </NavigationContainer>

    </FormDataProvider>
  );
};

export default App;
