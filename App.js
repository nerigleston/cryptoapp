import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/home/index";
import Calculator from "./pages/calculator/index";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
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
          },
        }}
      >
        <Tab.Screen
          name="Cryptos"
          component={Home}
          options={{
            tabBarLabel: 'Cryptos',
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Calculator"
          component={Calculator}
          options={{
            tabBarLabel: 'Calculadora',
            tabBarIcon: ({ color }) => (
              <Icon name="calculator" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
