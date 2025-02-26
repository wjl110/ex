import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from '../src/context/AuthContext';
import theme from '../src/constants/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="task/[id]" options={{ headerShown: true, title: '任务详情' }} />
            <Stack.Screen name="withdraw" options={{ headerShown: true, title: '提现' }} />
            <Stack.Screen name="publish-task" options={{ headerShown: true, title: '发布任务' }} />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
          </Stack>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
