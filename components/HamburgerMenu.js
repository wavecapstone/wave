import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
} from 'react-native';
import { commonStyles } from '../styles/commonStyles';

const HamburgerMenu = ({ isAdmin, onLogout, onFeaturePress }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const showMenu = () => {
    setIsMenuVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hideMenu = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsMenuVisible(false);
    });
  };

  const handleMenuPress = () => {
    if (isMenuVisible) {
      hideMenu();
    } else {
      showMenu();
    }
  };

  const handleOptionPress = (option) => {
    hideMenu();
    if (option === 'logout') {
      onLogout();
    } else {
      onFeaturePress(option);
    }
  };

  const getMenuOptions = () => {
    if (isAdmin) {
      return [
        { key: 'user-management', label: '👥 User Management', value: 'User Management' },
        { key: 'analytics', label: '📊 Analytics Dashboard', value: 'Analytics Dashboard' },
        { key: 'settings', label: '⚙️ System Settings', value: 'System Settings' },
        { key: 'reports', label: '📋 Reports', value: 'Reports' },
        { key: 'security', label: '🔒 Security Logs', value: 'Security Logs' },
        { key: 'logout', label: '🚪 Logout', value: 'logout' },
      ];
    } else {
      return [
        { key: 'profile', label: '👤 My Profile', value: 'Profile' },
        { key: 'settings', label: '⚙️ Settings', value: 'Settings' },
        { key: 'notifications', label: '🔔 Notifications', value: 'Notifications' },
        { key: 'help', label: '❓ Help & Support', value: 'Help & Support' },
        { key: 'privacy', label: '🔒 Privacy Policy', value: 'Privacy Policy' },
        { key: 'logout', label: '🚪 Logout', value: 'logout' },
      ];
    }
  };

  return (
    <>
      {/* Hamburger Icon */}
      <TouchableOpacity
        style={commonStyles.hamburgerIcon}
        onPress={handleMenuPress}
        activeOpacity={0.7}
      >
        <View style={commonStyles.hamburgerLine} />
        <View style={commonStyles.hamburgerLine} />
        <View style={commonStyles.hamburgerLine} />
      </TouchableOpacity>

      {/* Menu Modal */}
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={hideMenu}
      >
        <TouchableOpacity
          style={commonStyles.menuOverlay}
          activeOpacity={1}
          onPress={hideMenu}
        >
          <Animated.View
            style={[
              commonStyles.menuContainer,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateX: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-300, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={commonStyles.menuHeader}>
              <Text style={commonStyles.menuTitle}>
                {isAdmin ? 'Admin Menu' : 'User Menu'}
              </Text>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {getMenuOptions().map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={commonStyles.menuOption}
                  onPress={() => handleOptionPress(option.value)}
                  activeOpacity={0.7}
                >
                  <Text style={commonStyles.menuOptionText}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default HamburgerMenu;
