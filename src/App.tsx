// src/App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from 'react-query';
import Orientation from 'react-native-orientation-locker';  // Import the orientation library
// import '../Tibbit/src/components/gesture-handler.native';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Lock the orientation to portrait mode when the app starts
    Orientation.lockToPortrait();

    // Optionally, reset the orientation when the component is unmounted
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
