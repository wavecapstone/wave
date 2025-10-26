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
import { commonStyles } from '../../styles/commonStyles';

const AdminLoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    adminId: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.adminId.trim()) {
      newErrors.adminId = 'Admin ID is required';
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

  const handleAdminLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful admin login
      Alert.alert(
        'Admin Access Granted',
        'Welcome to the admin dashboard.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home', { isAdmin: true }),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Invalid admin credentials. Please try again.');
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
          <View style={commonStyles.adminBadge}>
            <Text style={commonStyles.adminBadgeText}>ADMIN ACCESS</Text>
          </View>
          
          <Text style={commonStyles.header}>Admin Login</Text>
          <Text style={commonStyles.subHeader}>
            Enter your admin credentials to access the dashboard
          </Text>

          <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Admin ID</Text>
            <TextInput
              style={[
                commonStyles.input,
                errors.adminId && commonStyles.inputError,
              ]}
              placeholder="Enter your admin ID"
              value={formData.adminId}
              onChangeText={(value) => handleInputChange('adminId', value)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.adminId && (
              <Text style={commonStyles.errorText}>{errors.adminId}</Text>
            )}
          </View>

          <View style={commonStyles.inputContainer}>
            <Text style={commonStyles.label}>Password</Text>
            <TextInput
              style={[
                commonStyles.input,
                errors.password && commonStyles.inputError,
              ]}
              placeholder="Enter your admin password"
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
            onPress={handleAdminLogin}
            disabled={isLoading}
          >
            <Text style={commonStyles.buttonText}>
              {isLoading ? 'Signing In...' : 'Admin Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[commonStyles.button, commonStyles.buttonSecondary]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[commonStyles.buttonText, commonStyles.buttonSecondaryText]}>
              Back to User Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AdminLoginScreen;
