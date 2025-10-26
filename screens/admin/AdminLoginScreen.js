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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../config/firebase';
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminId)) {
      newErrors.adminId = 'Please enter a valid email address';
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

  const handleAdminLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // For admin login, we'll treat adminId as email
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, formData.adminId, formData.password);
      
      // Check if user has admin privileges in Firestore
      const userDoc = await getDoc(doc(firestore, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const isAdmin = userData.isAdmin === true;
        
        if (isAdmin) {
          // Successful admin login
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
        } else {
          // Sign out since user is not an admin
          await auth.signOut();
          Alert.alert(
            'Access Denied',
            'This account does not have admin privileges. Please contact your administrator to grant admin access.',
            [{ text: 'OK' }]
          );
        }
      } else {
        // Sign out since user is not in database
        await auth.signOut();
        console.log('User UID:', userCredential.user.uid);
        console.log('Email:', userCredential.user.email);
        Alert.alert(
          'Account Not Found',
          `Your account exists in the system but your user profile is not configured.\n\nUser ID: ${userCredential.user.uid}\n\nPlease contact your administrator to set up your admin account in the database.`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Admin login error:', error);
      let errorMessage = 'Invalid admin credentials. Please try again.';
      
      // Firebase error handling
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid credentials. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid admin ID (email).';
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
            <Text style={commonStyles.label}>Admin Email</Text>
            <TextInput
              style={[
                commonStyles.input,
                errors.adminId && commonStyles.inputError,
              ]}
              placeholder="Enter your admin email"
              value={formData.adminId}
              onChangeText={(value) => handleInputChange('adminId', value)}
              keyboardType="email-address"
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
              {isLoading ? 'Signing In...' : 'Sign In'}
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
