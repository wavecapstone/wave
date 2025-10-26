import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { commonStyles } from '../../styles/commonStyles';

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
          onPress: () => navigation.navigate('Login'),
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
    <ScrollView style={commonStyles.homeContainer} showsVerticalScrollIndicator={false}>
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

        {isAdmin ? (
          // Admin features
          <>
            <TouchableOpacity
              style={commonStyles.homeButton}
              onPress={() => handleFeaturePress('User Management')}
            >
              <Text style={commonStyles.homeButtonText}>👥 User Management</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={commonStyles.homeButton}
              onPress={() => handleFeaturePress('Analytics Dashboard')}
            >
              <Text style={commonStyles.homeButtonText}>📊 Analytics Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={commonStyles.homeButton}
              onPress={() => handleFeaturePress('System Settings')}
            >
              <Text style={commonStyles.homeButtonText}>⚙️ System Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={commonStyles.homeButton}
              onPress={() => handleFeaturePress('Reports')}
            >
              <Text style={commonStyles.homeButtonText}>📋 Reports</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={commonStyles.homeButton}
              onPress={() => handleFeaturePress('Security Logs')}
            >
              <Text style={commonStyles.homeButtonText}>🔒 Security Logs</Text>
            </TouchableOpacity>
          </>
        ) : (
          // Regular user features
          <>
            <TouchableOpacity
              style={commonStyles.homeButton}
              onPress={() => handleFeaturePress('Profile')}
            >
              <Text style={commonStyles.homeButtonText}>👤 My Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={commonStyles.homeButton}
              onPress={() => handleFeaturePress('Settings')}
            >
              <Text style={commonStyles.homeButtonText}>⚙️ Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={commonStyles.homeButton}
              onPress={() => handleFeaturePress('Notifications')}
            >
              <Text style={commonStyles.homeButtonText}>🔔 Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={commonStyles.homeButton}
              onPress={() => handleFeaturePress('Help & Support')}
            >
              <Text style={commonStyles.homeButtonText}>❓ Help & Support</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={commonStyles.homeButton}
              onPress={() => handleFeaturePress('Privacy Policy')}
            >
              <Text style={commonStyles.homeButtonText}>🔒 Privacy Policy</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={[commonStyles.button, commonStyles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={[commonStyles.buttonText, commonStyles.logoutButtonText]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
