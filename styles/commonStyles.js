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

  topAlignedContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
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
    marginBottom: 8,
  },

  adminBadgeHeader: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 1000,
  },

  adminBadgeInner: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  adminBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },

  // User specific styles
  userBadge: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },

  userBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },

  // Hamburger Menu styles
  hamburgerIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  hamburgerImage: {
    width: 20,
    height: 16,
    tintColor: '#2c3e50',
  },

  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
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
      width: -4,
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

  // Category Card styles
  cardContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },

  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },

  categoryCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
    textAlign: 'left',
    flex: 1,
  },

  categoryCardDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'left',
    lineHeight: 20,
    flex: 2,
  },

  categoryCardContent: {
    flex: 1,
    marginLeft: 16,
  },

  // Category specific colors
  listeningCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },

  speakingCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },

  readingCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },

  writingCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#f39c12',
  },

  // 5E Model specific styles
  fiveESection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },

  fiveETitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },

  fiveEInputContainer: {
    marginBottom: 16,
  },

  // Formatting toolbar styles
  formattingToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },

  formattingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 12,
  },

  formatButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e1e8ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  formatButtonActive: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },

  formatButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },

  formatButtonTextActive: {
    color: '#ffffff',
  },

  fontSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },

  fontSizeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 8,
  },

  fontSizeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 6,
  },

  fontSizeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
  },

  // Font Size Picker Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fontSizePickerModal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },

  fontSizeOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },

  fontSizeOptionSelected: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },

  fontSizeOptionText: {
    color: '#2c3e50',
    fontWeight: '500',
  },

  fontSizeOptionTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },

  modalCancelButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },

  modalCancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Back button styles
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  backButtonImage: {
    width: 24,
    height: 24,
    tintColor: '#2c3e50',
  },

  // Chip styles (for section tabs)
  chip: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e1e8ed',
    paddingHorizontal: 12,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2c3e50',
  },

  // Header with user icon styles
  headerContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },

  userIconButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e8ed',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1000,
  },

  userIconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
  },

  // Forgot password link styles
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },

  forgotPasswordText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '500',
  },

  // Logo styles
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#e1e8ed',
  },

  logo: {
    width: 80,
    height: 80,
  },

  // Step-by-step wizard styles
  stepIndicator: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },

  stepIndicatorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 12,
  },

  stepProgressBar: {
    height: 6,
    backgroundColor: '#e1e8ed',
    borderRadius: 3,
    overflow: 'hidden',
  },

  stepProgressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 3,
  },

  stepNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 10,
  },
});

