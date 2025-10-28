import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import User screens
import LoginScreen from './screens/user/LoginScreen';
import SignUpScreen from './screens/user/SignUpScreen';
import ForgotPasswordScreen from './screens/user/ForgotPasswordScreen';
import HomeScreen from './screens/user/HomeScreen';

// Import Admin screens
import AdminLoginScreen from './screens/admin/AdminLoginScreen';
import DashboardCRUDScreen from './screens/admin/DashboardLessonsScreen';
import CreateLessonScreen from './screens/admin/CreateLessonScreen';

// Import Category screens
import ListeningScreen from './screens/categories/listening/ListeningScreen';
import SpeakingScreen from './screens/categories/speaking/SpeakingScreen';
import ReadingScreen from './screens/categories/reading/ReadingScreen';
import WritingScreen from './screens/categories/writing/WritingScreen';
import ReadLessonScreen from './screens/admin/ReadLessonScreen';
import LessonViewScreen from './screens/admin/LessonViewScreen';
import UpdateLessonScreen from './screens/admin/UpdateLessonScreen';
import DeleteLessonScreen from './screens/admin/DeleteLessonScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DashboardLessons" component={DashboardCRUDScreen} />
        <Stack.Screen name="CreateLesson" component={CreateLessonScreen} />
        <Stack.Screen name="Listening" component={ListeningScreen} />
        <Stack.Screen name="Speaking" component={SpeakingScreen} />
        <Stack.Screen name="Reading" component={ReadingScreen} />
        <Stack.Screen name="Writing" component={WritingScreen} />
        <Stack.Screen name="ReadLesson" component={ReadLessonScreen} />
        <Stack.Screen name="LessonView" component={LessonViewScreen} />
        <Stack.Screen name="UpdateLesson" component={UpdateLessonScreen} />
        <Stack.Screen name="DeleteLesson" component={DeleteLessonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
