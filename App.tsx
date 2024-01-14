import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './src/hook/store';

import HomeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';
import CartScreen from './src/screens/CartScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="Movie"
              options={{ headerShown: false }}
              component={MovieScreen}
            />
            <Stack.Screen
              name="Cart"
              options={{ headerShown: false }}
              component={CartScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}
