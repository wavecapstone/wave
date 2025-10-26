import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { commonStyles } from '../../styles/commonStyles';
import HamburgerMenu from '../../components/HamburgerMenu';

const HomeScreen = ({ navigation, route }) => {
  const isAdmin = route?.params?.isAdmin || false;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              navigation.navigate('Login');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleFeaturePress = (feature) => {
    Alert.alert(
      'Feature Coming Soon',
      `${feature} functionality will be available in a future update.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={commonStyles.homeContainer}>
      {/* Hamburger Menu */}
      <HamburgerMenu
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onFeaturePress={handleFeaturePress}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 40 }}>
          {isAdmin && (
            <View style={commonStyles.adminBadge}>
              <Text style={commonStyles.adminBadgeText}>ADMIN DASHBOARD</Text>
            </View>
          )}
          
          <Text style={commonStyles.welcomeText}>
            {isAdmin ? 'Admin Dashboard' : 'Welcome to Wave'}
          </Text>
          
          <Text style={commonStyles.userInfo}>
            {isAdmin 
              ? 'Manage your application and users' 
              : 'You are successfully logged in!'
            }
          </Text>

          <Text style={commonStyles.instructionText}>
            Tap the hamburger menu (☰) in the top-left corner to access all features and options.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
