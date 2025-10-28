import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../../config/firebase';
import { commonStyles } from '../../styles/commonStyles';

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Clear form data when screen is focused (e.g., after logout)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFormData({
        email: '',
        password: '',
      });
      setErrors({});
    });

    return unsubscribe;
  }, [navigation]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Check if user has admin privileges in Firestore
      const userDoc = await getDoc(doc(firestore, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const isAdmin = userData.isAdmin === true;
        
        if (isAdmin) {
          // Sign out admin trying to login through user login
          await auth.signOut();
          Alert.alert(
            'Admin Access Required',
            'This account has admin privileges. Please use Admin Login to access your account.',
            [
              {
                text: 'Go to Admin Login',
                onPress: () => navigation.navigate('AdminLogin'),
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]
          );
          return;
        }
      } else {
        // Auto-create user document if it doesn't exist (legacy accounts or accounts created directly in Firebase Auth)
        const displayName = userCredential.user.displayName || userCredential.user.email.split('@')[0];
        await setDoc(doc(firestore, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          fullName: displayName,
          createdAt: new Date().toISOString(),
          isAdmin: false // Regular users are not admins by default
        });
      }
      
      // Successful user login
      Alert.alert(
        'Welcome Back!',
        'You have successfully logged in.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Invalid email or password. Please try again.';
      
      // Firebase error handling
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled. Please contact support.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={commonStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity
        style={commonStyles.userIconButton}
        onPress={() => navigation.navigate('AdminLogin')}
      >
        <Text style={commonStyles.userIconText}>👤</Text>
      </TouchableOpacity>
      
      <ScrollView
        contentContainerStyle={commonStyles.topAlignedContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={commonStyles.formContainer}>
          <View style={commonStyles.logoContainer}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={commonStyles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={commonStyles.header}>Welcome Back</Text>
          <Text style={commonStyles.subHeader}>
            Sign in to your account to continue
          </Text>

          <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Email Address</Text>
            <TextInput
              style={[
                commonStyles.input,
                errors.email && commonStyles.inputError,
              ]}
              placeholder="Enter your email address"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && (
              <Text style={commonStyles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Password</Text>
            <TextInput
              style={[
                commonStyles.input,
                errors.password && commonStyles.inputError,
              ]}
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.password && (
              <Text style={commonStyles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity
              style={commonStyles.forgotPasswordLink}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={commonStyles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              commonStyles.button,
              isLoading && commonStyles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={commonStyles.buttonText}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.button, commonStyles.buttonSecondary]}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={[commonStyles.buttonText, commonStyles.buttonSecondaryText]}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
