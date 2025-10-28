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
import { globalStyles } from '../../styles/globalStyles';
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

  const handleCategoryPress = (category) => {
    navigation.navigate(category, { isAdmin });
  };

  return (
    <View style={commonStyles.homeContainer}>
      {/* Hamburger Menu */}
      <HamburgerMenu
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onFeaturePress={handleFeaturePress}
        navigation={navigation}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyles.mb20}>
          {isAdmin ? (
            <View style={commonStyles.adminBadge}>
              <Text style={commonStyles.adminBadgeText}>ADMIN DASHBOARD</Text>
            </View>
          ) : (
            <View style={commonStyles.userBadge}>
              <Text style={commonStyles.userBadgeText}>USER DASHBOARD</Text>
            </View>
          )}
          
          <Text style={[commonStyles.welcomeText, globalStyles.textLeft, globalStyles.mt16]}>
            {isAdmin ? 'Manage Lessons' : 'Welcome to Wave'}
          </Text>
          
          {isAdmin && (
          <View style={[commonStyles.cardContainer, globalStyles.mt16]}>
            <TouchableOpacity 
              style={[commonStyles.categoryCard, globalStyles.mb24, globalStyles.bgPrimary]}
              onPress={() => navigation.navigate('CreateLesson', { isAdmin: true })}
            >
              <Text style={[globalStyles.fs32, globalStyles.textWhite]}>➕</Text>
              <View style={commonStyles.categoryCardContent}>
                <Text style={[commonStyles.categoryCardTitle, globalStyles.textWhite]}>Create Lesson</Text>
                <Text style={[commonStyles.categoryCardDescription, globalStyles.textWhite]}>Add new lesson content</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.categoryCard, globalStyles.mb24, globalStyles.bgSuccess]}
              onPress={() => navigation.navigate('ReadLesson', { isAdmin: true })}
            >
              <Text style={[globalStyles.fs32, globalStyles.textWhite]}>👁️</Text>
              <View style={commonStyles.categoryCardContent}>
                <Text style={[commonStyles.categoryCardTitle, globalStyles.textWhite]}>Read Lesson</Text>
                <Text style={[commonStyles.categoryCardDescription, globalStyles.textWhite]}>Browse all lesson content</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.categoryCard, globalStyles.mb24, globalStyles.bgWarning]}
              onPress={() => navigation.navigate('UpdateLesson', { isAdmin: true })}
            >
              <Text style={[globalStyles.fs32, globalStyles.textWhite]}>✏️</Text>
              <View style={commonStyles.categoryCardContent}>
                <Text style={[commonStyles.categoryCardTitle, globalStyles.textWhite]}>Update Lesson</Text>
                <Text style={[commonStyles.categoryCardDescription, globalStyles.textWhite]}>Edit existing content</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.categoryCard, globalStyles.mb24, globalStyles.bgDanger]}
              onPress={() => navigation.navigate('DeleteLesson', { isAdmin: true })}
            >
              <Text style={[globalStyles.fs32, globalStyles.textWhite]}>🗑️</Text>
              <View style={commonStyles.categoryCardContent}>
                <Text style={[commonStyles.categoryCardTitle, globalStyles.textWhite]}>Delete Lesson</Text>
                <Text style={[commonStyles.categoryCardDescription, globalStyles.textWhite]}>Remove lesson content</Text>
              </View>
            </TouchableOpacity>
          </View>
          )}

          {!isAdmin && (
          <View style={commonStyles.cardContainer}>
            <TouchableOpacity 
              style={[commonStyles.categoryCard, commonStyles.listeningCard]}
              onPress={() => handleCategoryPress('Listening')}
            >
              <Text style={globalStyles.fs32}>🎧</Text>
              <View style={commonStyles.categoryCardContent}>
                <Text style={commonStyles.categoryCardTitle}>Listening</Text>
                <Text style={commonStyles.categoryCardDescription}>
                  Audio exercises and comprehension
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.categoryCard, commonStyles.speakingCard]}
              onPress={() => handleCategoryPress('Speaking')}
            >
              <Text style={globalStyles.fs32}>🎤</Text>
              <View style={commonStyles.categoryCardContent}>
                <Text style={commonStyles.categoryCardTitle}>Speaking</Text>
                <Text style={commonStyles.categoryCardDescription}>
                  Voice practice and conversations
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.categoryCard, commonStyles.readingCard]}
              onPress={() => handleCategoryPress('Reading')}
            >
              <Text style={globalStyles.fs32}>📖</Text>
              <View style={commonStyles.categoryCardContent}>
                <Text style={commonStyles.categoryCardTitle}>Reading</Text>
                <Text style={commonStyles.categoryCardDescription}>
                  Articles, stories, and vocabulary
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.categoryCard, commonStyles.writingCard]}
              onPress={() => handleCategoryPress('Writing')}
            >
              <Text style={globalStyles.fs32}>✍️</Text>
              <View style={commonStyles.categoryCardContent}>
                <Text style={commonStyles.categoryCardTitle}>Writing</Text>
                <Text style={commonStyles.categoryCardDescription}>
                  Essays, grammar, and prompts
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
