import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslationContext } from './Translation';
import Home from './Home';
import Creation from './Creation';
import Settings from './Settings';
import Detail from './Detail';
import Overall from './Overall';
import CustomCreation from './CustomCreation';
import DynamicSettingScreen from './DynamicSettingScreen';
import Loading from './Loading';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeStackScreen = () => {
  const { translations } = useTranslationContext();
  return (
    <Stack.Navigator initialRouteName="Loading" screenOptions={{headerStyle: { backgroundColor: '#5c6ac4' }, headerTintColor: 'white'}}>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: true, headerTitle: translations['Home'],  headerLeft: () => <Icon name="home" size={20} color="white" style={{ marginLeft: 20 }} />  }}  />
      <Stack.Screen name="Form" component={Creation} options={{ headerShown: true, headerTitle: translations['Form'], headerLeft: () => <Icon name="pencil" size={20} color="white" style={{ marginLeft: 20 }} /> }} />
      <Stack.Screen name="Detail" component={Detail} options={{ headerShown: true, headerTitle: translations['Detail'], headerLeft: () => <Icon name="info-circle" size={20} color="white" style={{ marginLeft: 20 }} /> }} />
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: true, headerLeft: () => <Icon name="gear" size={20} color="white" style={{ marginLeft: 20 }} /> }}/>
      <Stack.Screen name="DynamicSettingScreen" component={DynamicSettingScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { translations } = useTranslationContext();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#5c6ac4' },
        tabBarStyle: { backgroundColor: 'lightgray' },
      }}
    >
      <Tab.Screen
        name="HabitHub"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={20} color={'black'} />
          ),
          tabBarLabel: translations['HabitHub'],
          headerShown: false
        }}
      />
      <Tab.Screen
        name="CustomActivity"
        component={CustomCreation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="plus" size={20} color={'black'} />
          ),
          tabBarLabel: translations['CustomActivity'],
          headerTintColor: 'white',
          headerTitle: translations['CustomActivity'],
          headerLeft: () => <Icon name="pencil" size={20} color="white" style={{ marginLeft: 20 }} />
        }}
      />
      <Tab.Screen
        name="Overall"
        component={Overall}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" size={20} color={'black'} />
          ),
          tabBarLabel: translations['Overall'],
          headerTintColor: 'white',
          headerTitle: translations['Overall'],
          headerLeft: () => <Icon name="book" size={20} color="white" style={{ marginLeft: 20 }} />
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="gear" size={20} color={'black'} />
          ),
          tabBarLabel: translations['Settings'],
          headerTintColor: 'white',
          headerTitle: translations['Settings'],
          headerLeft: () => <Icon name="gear" size={20} color="white" style={{ marginLeft: 20 }} />
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
