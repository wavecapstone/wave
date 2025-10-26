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

const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
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

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Success',
        'Account created successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
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
          <Text style={commonStyles.header}>Create Account</Text>
          <Text style={commonStyles.subHeader}>
            Join us today and start your journey
          </Text>

          <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Full Name</Text>
            <TextInput
              style={[
                commonStyles.input,
                errors.fullName && commonStyles.inputError,
              ]}
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              autoCapitalize="words"
              autoCorrect={false}
            />
            {errors.fullName && (
              <Text style={commonStyles.errorText}>{errors.fullName}</Text>
            )}
          </View>

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
            style={[
              commonStyles.button,
              isLoading && commonStyles.buttonDisabled,
            ]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <Text style={commonStyles.buttonText}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.button, commonStyles.buttonSecondary]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[commonStyles.buttonText, commonStyles.buttonSecondaryText]}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
