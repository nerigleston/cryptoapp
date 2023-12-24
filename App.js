import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './pages/home/index';
import Calculator from './pages/calculator/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import CurrencyPage from './pages/moedas';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontSize: 14,
            },
            tabBarStyle: {
              backgroundColor: '#fff',
              elevation: 4,
            },
          }}
        >
          <Tab.Screen
            name="Cryptos"
            component={Home}
            options={{
              tabBarLabel: 'Cryptos',
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Moedas"
            component={CurrencyPage}
            options={{
              tabBarLabel: 'Moedas',
              tabBarIcon: ({ color, size }) => (
                <Icon name="money" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Calculadora"
            component={Calculator}
            options={{
              tabBarLabel: 'Calculadora',
              tabBarIcon: ({ color, size }) => (
                <Icon name="calculator" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
