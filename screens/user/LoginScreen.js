import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { commonStyles } from '../../styles/commonStyles';

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
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
      Alert.alert('Error', 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={commonStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={commonStyles.centeredContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={commonStyles.formContainer}>
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
          </View>

          <TouchableOpacity
            style={commonStyles.link}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={commonStyles.link}>Forgot Password?</Text>
          </TouchableOpacity>

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

          <TouchableOpacity
            style={[commonStyles.button, commonStyles.buttonSecondary, globalStyles.marginTop]}
            onPress={() => navigation.navigate('AdminLogin')}
          >
            <Text style={[commonStyles.buttonText, commonStyles.buttonSecondaryText]}>
              Admin Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
