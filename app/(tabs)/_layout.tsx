import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'explore') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'my-tasks') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B00',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: '首页',
          headerShown: true
        }} 
      />
      <Tabs.Screen 
        name="explore" 
        options={{ 
          title: '任务', 
          headerShown: true
        }} 
      />
      <Tabs.Screen 
        name="my-tasks" 
        options={{ 
          title: '我的任务', 
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
