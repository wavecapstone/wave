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

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateEmail()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEmailSent(true);
      Alert.alert(
        'Email Sent',
        'Password reset instructions have been sent to your email address.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <View style={commonStyles.centeredContainer}>
        <View style={commonStyles.formContainer}>
          <Text style={commonStyles.header}>Check Your Email</Text>
          <Text style={commonStyles.subHeader}>
            We've sent password reset instructions to {email}
          </Text>
          
          <TouchableOpacity
            style={commonStyles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={commonStyles.buttonText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
          <Text style={commonStyles.header}>Forgot Password</Text>
          <Text style={commonStyles.subHeader}>
            Enter your email address and we'll send you instructions to reset your password
          </Text>

          <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Email Address</Text>
            <TextInput
              style={[
                commonStyles.input,
                error && commonStyles.inputError,
              ]}
              placeholder="Enter your email address"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                if (error) setError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {error && (
              <Text style={commonStyles.errorText}>{error}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[
              commonStyles.button,
              isLoading && commonStyles.buttonDisabled,
            ]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            <Text style={commonStyles.buttonText}>
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.button, commonStyles.buttonSecondary]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[commonStyles.buttonText, commonStyles.buttonSecondaryText]}>
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;
