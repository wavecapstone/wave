import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  
  centeredContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  // Header styles
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },

  subHeader: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Form styles
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2c3e50',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  inputFocused: {
    borderColor: '#3498db',
    shadowOpacity: 0.1,
    elevation: 2,
  },

  inputError: {
    borderColor: '#e74c3c',
  },

  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 4,
  },

  // Button styles
  button: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#3498db',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3498db',
    shadowOpacity: 0,
    elevation: 0,
  },

  buttonSecondaryText: {
    color: '#3498db',
  },

  buttonDisabled: {
    backgroundColor: '#bdc3c7',
    shadowOpacity: 0,
    elevation: 0,
  },

  // Link styles
  link: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
  },

  // Home page styles
  homeContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },

  userInfo: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 40,
    textAlign: 'center',
  },

  instructionText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
    paddingHorizontal: 20,
  },

  homeButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  homeButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: '600',
  },

  logoutButton: {
    backgroundColor: '#e74c3c',
    marginTop: 40,
  },

  logoutButtonText: {
    color: '#ffffff',
  },

  // Admin specific styles
  adminBadge: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },

  adminBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Hamburger Menu styles
  hamburgerIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 24,
    height: 20,
    justifyContent: 'space-between',
    zIndex: 1000,
  },

  hamburgerLine: {
    width: 20,
    height: 2,
    backgroundColor: '#2c3e50',
    borderRadius: 1,
  },

  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  menuContainer: {
    backgroundColor: '#ffffff',
    width: '80%',
    height: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  menuHeader: {
    paddingHorizontal: 0,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#e1e8ed',
    marginBottom: 16,
  },

  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },

  menuOption: {
    paddingHorizontal: 0,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
    marginBottom: 4,
  },

  menuOptionText: {
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: '500',
  },
});

