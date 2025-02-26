import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent = Ionicons;

          if (route.name === 'index') {
            iconName = 'home';
          } else if (route.name === 'explore') {
            iconName = 'trophy';
            IconComponent = FontAwesome;
          } else if (route.name === 'my-tasks') {
            iconName = 'game-controller';
          } else if (route.name === 'profile') {
            iconName = 'person';
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF5252',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: '首页',
          headerShown: false
        }} 
      />
      <Tabs.Screen 
        name="explore" 
        options={{ 
          title: '悬赏大厅', 
          headerShown: true
        }} 
      />
      <Tabs.Screen 
        name="my-tasks" 
        options={{ 
          title: '更多赚钱', 
          headerShown: true
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: '我的', 
          headerShown: true
        }} 
      />
    </Tabs>
  );
}
