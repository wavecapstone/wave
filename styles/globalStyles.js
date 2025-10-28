import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Global utility styles
export const globalStyles = StyleSheet.create({
  // Utility styles
  textCenter: {
    textAlign: 'center',
  },
  textLeft: { textAlign: 'left' },
  textRight: { textAlign: 'right' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },

  marginTop: {
    marginTop: 20,
  },

  marginBottom: {
    marginBottom: 20,
  },

  // Flex helpers
  row: {
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wrap: { flexWrap: 'wrap' },
  col: {
    flexDirection: 'column',
  },

  // Spacing helpers
  mt8: { marginTop: 8 },
  mt12: { marginTop: 12 },
  mt16: { marginTop: 16 },
  mt20: { marginTop: 20 },
  mt24: { marginTop: 24 },
  mt30: { marginTop: 30 },
  mt58: { marginTop: 58 },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  mb20: { marginBottom: 20 },
  mb24: { marginBottom: 24 },
  mb30: { marginBottom: 30 },
  mb0: { marginBottom: 0 },
  mr8: { marginRight: 8 },
  mx16: { marginHorizontal: 16 },
  ml10: { marginLeft: 10 },
  mr10: { marginRight: 10 },
  px20: { paddingHorizontal: 20 },
  px12: { paddingHorizontal: 12 },
  px8: { paddingHorizontal: 8 },
  py12: { paddingVertical: 12 },
  py8: { paddingVertical: 8 },
  py4: { paddingVertical: 4 },
  p16: { padding: 16 },
  p20: { padding: 20 },
  p40: { padding: 40 },
  pb40: { paddingBottom: 40 },
  pt14: { paddingTop: 14 },
  bw2: { borderWidth: 2 },

  // Font sizes
  fs12: { fontSize: 12 },
  fs14: { fontSize: 14 },
  fs16: { fontSize: 16 },
  fs18: { fontSize: 18 },
  fs20: { fontSize: 20 },
  fs24: { fontSize: 24 },
  fs32: { fontSize: 32 },

  // Text colors
  textWhite: { color: '#ffffff' },
  textSecondary: { color: '#2c3e50' },
  textGray: { color: '#7f8c8d' },

  // Flex helpers extra
  itemsCenter: { alignItems: 'center' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyCenter: { justifyContent: 'center' },
  flex1: { flex: 1 },

  // Background helpers
  bgPrimary: { backgroundColor: '#3498db' },
  bgSecondary: { backgroundColor: '#2c3e50' },
  bgSuccess: { backgroundColor: '#27ae60' },
  bgDanger: { backgroundColor: '#e74c3c' },
  bgWarning: { backgroundColor: '#f39c12' },
  bgLight: { backgroundColor: '#f8f9fa' },
  bgWhite: { backgroundColor: '#ffffff' },

  // Radius helpers
  br12: { borderRadius: 12 },
  br16: { borderRadius: 16 },

  // Borders helpers
  blw4: { borderLeftWidth: 4 },
  blcPrimary: { borderLeftColor: '#3498db' },
  blcDanger: { borderLeftColor: '#e74c3c' },
  blcSuccess: { borderLeftColor: '#27ae60' },
  blcWarning: { borderLeftColor: '#f39c12' },
  blcPurple: { borderLeftColor: '#9b59b6' },
  bcPrimary: { borderColor: '#3498db' },
  bcDanger: { borderColor: '#e74c3c' },
  bcSuccess: { borderColor: '#27ae60' },
  bcWarning: { borderColor: '#f39c12' },

  // Size helpers
  w48: { width: '48%' },
  h80: { height: 80 },
  h120: { height: 120 },

  // Alignment helpers
  tavTop: { textAlignVertical: 'top' },
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
