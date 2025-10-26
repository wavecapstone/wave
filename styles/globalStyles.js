import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Global utility styles
export const globalStyles = StyleSheet.create({
  // Utility styles
  textCenter: {
    textAlign: 'center',
  },

  marginTop: {
    marginTop: 20,
  },

  marginBottom: {
    marginBottom: 20,
  },
});

// Screen dimensions
export const screenDimensions = {
  width: width,
  height: height,
};

// Global color palette
export const colors = {
  primary: '#3498db',
  secondary: '#2c3e50',
  success: '#27ae60',
  danger: '#e74c3c',
  warning: '#f39c12',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
  white: '#ffffff',
  gray: '#7f8c8d',
  lightGray: '#e1e8ed',
};
