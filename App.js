import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Planetas from './Pages/Planetas';
import PlanetaDetalles from './Pages/PlanetaDetalles';
import AgregarPlaneta from './Pages/AgregarPlaneta';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Planetas">
        <Stack.Screen name="Planetas" component={Planetas} />
        <Stack.Screen name="PlanetaDetalles" component={PlanetaDetalles} />
        <Stack.Screen name="AgregarPlaneta" component={AgregarPlaneta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}