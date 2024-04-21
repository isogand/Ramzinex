/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRoutes} from './components/Navigation.tsx';
import {HomeNavigator} from './src/Home';
import {store} from './store';
import {Provider, useSelector} from 'react-redux';
import {StatusBar, View} from 'react-native';
import {I18nextProvider} from 'react-i18next'; // Import I18nextProvider
import i18n from './constants/translations'; // Import your i18n instance
/**
 * Main component of the application.
 * Sets up navigation, status bar, and Redux store provider.
 */
function App(): React.JSX.Element {
  // Create a stack navigator for app routes
  const AppStack = createStackNavigator<AppRoutes>();

  // Define the stack navigator component
  const StackNavigator = () => {
    // Get theme and dark mode state from Redux store
    const {isDarkMode, theme} = useSelector((state: any) => state.themeReducer);

    return (
      // Wrap the stack navigator component in a view with full width and height
      <View style={{width: '100%', height: '100%'}}>
        {/* Set status bar properties based on theme and dark mode */}
        <StatusBar
          backgroundColor={theme.SECONDARY_BACKGROUND_COLOR}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        {/* Render the app stack navigator */}
        <AppStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <AppStack.Screen name="Home" component={HomeNavigator} />
        </AppStack.Navigator>
      </View>
    );
  };

  return (
    // Wrap the entire application in Redux store provider and navigation container
    <Provider store={store}>
      {/* Wrap with I18nextProvider */}
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <SafeAreaProvider>
            {/* Render the custom stack navigator */}
            <StackNavigator />
          </SafeAreaProvider>
        </NavigationContainer>
      </I18nextProvider>
    </Provider>
  );
}

export default App;
