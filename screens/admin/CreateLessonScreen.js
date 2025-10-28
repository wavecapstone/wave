import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import { commonStyles } from '../../styles/commonStyles';
import { globalStyles } from '../../styles/globalStyles';
import { firestore } from '../../config/firebase';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';

const CreateLessonScreen = ({ navigation, route }) => {
  const isAdmin = route?.params?.isAdmin || false;
  const isEdit = route?.params?.mode === 'edit';
  const lessonId = route?.params?.lessonId || null;
  const initialData = route?.params?.initialData || null;
  
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    learningOutcome: '',
    engage: {
      subtitle: '',
      description: '',
      subtitleFormat: { bold: false, italic: false, fontSize: 16 }
    },
    explore: {
      subtitle: '',
      description: '',
      subtitleFormat: { bold: false, italic: false, fontSize: 16 }
    },
    explain: {
      subtitle: '',
      description: '',
      subtitleFormat: { bold: false, italic: false, fontSize: 16 }
    },
    elaborate: {
      subtitle: '',
      description: '',
      subtitleFormat: { bold: false, italic: false, fontSize: 16 }
    },
    evaluate: {
      subtitle: '',
      description: '',
      subtitleFormat: { bold: false, italic: false, fontSize: 16 }
    }
  });

  const [selectedCategory, setSelectedCategory] = useState('');
  const [fontSizePickerVisible, setFontSizePickerVisible] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32];

  const categories = [
    { key: 'listening', label: '🎧 Listening', color: '#3498db' },
    { key: 'speaking', label: '🎤 Speaking', color: '#e74c3c' },
    { key: 'reading', label: '📖 Reading', color: '#27ae60' },
    { key: 'writing', label: '✍️ Writing', color: '#f39c12' }
  ];

  // Prefill when editing
  React.useEffect(() => {
    if (isEdit && initialData) {
      setSelectedCategory(
        initialData.category === '🎧 Listening' ? 'listening' :
        initialData.category === '🎤 Speaking' ? 'speaking' :
        initialData.category === '📖 Reading' ? 'reading' :
        initialData.category === '✍️ Writing' ? 'writing' : ''
      );
      setFormData({
        category: initialData.category || '',
        title: initialData.title || '',
        learningOutcome: initialData.learningOutcome || '',
        engage: initialData.engage || { subtitle: '', description: '', subtitleFormat: { bold: false, italic: false, fontSize: 16 } },
        explore: initialData.explore || { subtitle: '', description: '', subtitleFormat: { bold: false, italic: false, fontSize: 16 } },
        explain: initialData.explain || { subtitle: '', description: '', subtitleFormat: { bold: false, italic: false, fontSize: 16 } },
        elaborate: initialData.elaborate || { subtitle: '', description: '', subtitleFormat: { bold: false, italic: false, fontSize: 16 } },
        evaluate: initialData.evaluate || { subtitle: '', description: '', subtitleFormat: { bold: false, italic: false, fontSize: 16 } }
      });
    }
  }, [isEdit, initialData]);

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
            navigation.navigate('Login');
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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.key);
    setFormData(prev => ({ ...prev, category: category.label }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handle5EInputChange = (phase, field, value) => {
    setFormData(prev => ({
      ...prev,
      [phase]: {
        ...prev[phase],
        [field]: value
      }
    }));
  };

  const handleFormatChange = (phase, formatField, value) => {
    setFormData(prev => ({
      ...prev,
      [phase]: {
        ...prev[phase],
        subtitleFormat: {
          ...prev[phase].subtitleFormat,
          [formatField]: value
        }
      }
    }));
  };

  const showFontSizePicker = (phase) => {
    setCurrentPhase(phase);
    setFontSizePickerVisible(true);
  };

  const selectFontSize = (size) => {
    handleFormatChange(currentPhase, 'fontSize', size);
    setFontSizePickerVisible(false);
  };

  const saveLessonToDatabase = async (lessonData) => {
    try {
      const docRef = await addDoc(collection(firestore, 'lessons'), {
        ...lessonData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active',
        difficulty: 'Beginner', // Default difficulty, can be made configurable
        estimatedTime: '30 minutes' // Default time, can be made configurable
      });
      console.log('Lesson saved with ID:', docRef.id);
      return true;
    } catch (error) {
      console.error('Error saving lesson:', error);
      return false;
    }
  };

  const updateLessonInDatabase = async (lessonIdToUpdate, lessonData) => {
    try {
      const ref = doc(firestore, 'lessons', lessonIdToUpdate);
      await updateDoc(ref, { ...lessonData, updatedAt: serverTimestamp() });
      return true;
    } catch (error) {
      console.error('Error updating lesson:', error);
      return false;
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // Category only
        if (!selectedCategory) {
          Alert.alert('Validation Error', 'Please select a category');
          return false;
        }
        return true;
      case 2: // Title & Learning Outcomes
        if (!formData.title.trim()) {
          Alert.alert('Validation Error', 'Please enter a lesson title');
          return false;
        }
        if (!formData.learningOutcome.trim()) {
          Alert.alert('Validation Error', 'Please enter learning outcomes');
          return false;
        }
        return true;
      
      case 3: // Engage
        if (!formData.engage.subtitle.trim() || !formData.engage.description.trim()) {
          Alert.alert('Validation Error', 'Please complete the Engage section');
          return false;
        }
        return true;
      
      case 4: // Explore
        if (!formData.explore.subtitle.trim() || !formData.explore.description.trim()) {
          Alert.alert('Validation Error', 'Please complete the Explore section');
          return false;
        }
        return true;
      
      case 5: // Explain
        if (!formData.explain.subtitle.trim() || !formData.explain.description.trim()) {
          Alert.alert('Validation Error', 'Please complete the Explain section');
          return false;
        }
        return true;
      
      case 6: // Elaborate
        if (!formData.elaborate.subtitle.trim() || !formData.elaborate.description.trim()) {
          Alert.alert('Validation Error', 'Please complete the Elaborate section');
          return false;
        }
        return true;
      
      case 7: // Evaluate (final step before submission)
        if (!formData.evaluate.subtitle.trim() || !formData.evaluate.description.trim()) {
          Alert.alert('Validation Error', 'Please complete the Evaluate section');
          return false;
        }
        return true;
      
      default:
        return false;
    }
  };

  const validateForm = () => {
    if (!selectedCategory) {
      Alert.alert('Validation Error', 'Please select a category');
      return false;
    }
    if (!formData.title.trim()) {
      Alert.alert('Validation Error', 'Please enter a lesson title');
      return false;
    }
    if (!formData.learningOutcome.trim()) {
      Alert.alert('Validation Error', 'Please enter learning outcomes');
      return false;
    }
    
    // Check 5E Model fields
    const phases = ['engage', 'explore', 'explain', 'elaborate', 'evaluate'];
    for (const phase of phases) {
      if (!formData[phase].subtitle.trim() || !formData[phase].description.trim()) {
        Alert.alert('Validation Error', `Please complete the ${phase.charAt(0).toUpperCase() + phase.slice(1)} section`);
        return false;
      }
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFirstIncompleteStep = () => {
    // Step 1: Category
    if (!selectedCategory) return 1;
    // Step 2: Title & Outcomes
    if (!formData.title.trim() || !formData.learningOutcome.trim()) return 2;
    // Step 3-7: 5E phases
    if (!formData.engage.subtitle.trim() || !formData.engage.description.trim()) return 3;
    if (!formData.explore.subtitle.trim() || !formData.explore.description.trim()) return 4;
    if (!formData.explain.subtitle.trim() || !formData.explain.description.trim()) return 5;
    if (!formData.elaborate.subtitle.trim() || !formData.elaborate.description.trim()) return 6;
    if (!formData.evaluate.subtitle.trim() || !formData.evaluate.description.trim()) return 7;
    return null;
  };

  const handleFinalSubmit = () => {
    const firstIncomplete = getFirstIncompleteStep();
    if (firstIncomplete !== null) {
      Alert.alert(
        'Review Required',
        'Some required fields are missing. We\'ll take you to the first incomplete step to review.',
        [
          {
            text: 'Go to step ' + firstIncomplete,
            onPress: () => setCurrentStep(firstIncomplete)
          },
          { text: 'OK' }
        ]
      );
      return;
    }

    Alert.alert(
      isEdit ? 'Update Lesson' : 'Submit Lesson',
      isEdit ? 'Do you want to save your changes?' : 'Do you want to submit this lesson now?',
      [
        { text: 'Review', onPress: () => setCurrentStep(1) },
        { text: isEdit ? 'Save' : 'Submit', style: 'destructive', onPress: handleSubmit }
      ]
    );
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Show loading state
        Alert.alert(isEdit ? 'Updating Lesson' : 'Creating Lesson', isEdit ? 'Please wait while we save your changes...' : 'Please wait while we save your lesson...');
        
        // Prepare lesson data for database
        const lessonData = {
          category: formData.category,
          title: formData.title,
          learningOutcome: formData.learningOutcome,
          engage: formData.engage,
          explore: formData.explore,
          explain: formData.explain,
          elaborate: formData.elaborate,
          evaluate: formData.evaluate
        };

        // Save or update in database
        const success = isEdit && lessonId
          ? await updateLessonInDatabase(lessonId, lessonData)
          : await saveLessonToDatabase(lessonData);
        
        if (success) {
          Alert.alert(
            isEdit ? 'Lesson Updated Successfully!' : 'Lesson Created Successfully!',
            isEdit ? 'Your changes have been saved.' : 'Your lesson has been saved and is now available to users.',
            [
              {
                text: 'OK',
                onPress: () => {
                  // Reset form
                  setFormData({
                    category: '',
                    title: '',
                    learningOutcome: '',
                    engage: { subtitle: '', description: '', subtitleFormat: { bold: false, italic: false, fontSize: 16 } },
                    explore: { subtitle: '', description: '', subtitleFormat: { bold: false, italic: false, fontSize: 16 } },
                    explain: { subtitle: '', description: '', subtitleFormat: { bold: false, italic: false, fontSize: 16 } },
                    elaborate: { subtitle: '', description: '', subtitleFormat: { bold: false, italic: false, fontSize: 16 } },
                    evaluate: { subtitle: '', description: '', subtitleFormat: { bold: false, italic: false, fontSize: 16 } }
                  });
                  setSelectedCategory('');
                  if (isEdit) {
                    navigation.goBack();
                  } else {
                    navigation.navigate('Home', { isAdmin: true });
                  }
                }
              }
            ]
          );
        } else {
          Alert.alert('Error', 'Failed to save lesson. Please try again.');
        }
      } catch (error) {
        console.error('Error in handleSubmit:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  const renderFormattingToolbar = (phase) => (
    <View style={commonStyles.formattingToolbar}>
      <Text style={commonStyles.formattingLabel}>Format:</Text>
      
      {/* Bold Toggle */}
      <TouchableOpacity
        style={[
          commonStyles.formatButton,
          formData[phase].subtitleFormat.bold && commonStyles.formatButtonActive
        ]}
        onPress={() => handleFormatChange(phase, 'bold', !formData[phase].subtitleFormat.bold)}
      >
        <Text style={[
          commonStyles.formatButtonText,
          formData[phase].subtitleFormat.bold && commonStyles.formatButtonTextActive
        ]}>
          B
        </Text>
      </TouchableOpacity>

      {/* Italic Toggle */}
      <TouchableOpacity
        style={[
          commonStyles.formatButton,
          formData[phase].subtitleFormat.italic && commonStyles.formatButtonActive
        ]}
        onPress={() => handleFormatChange(phase, 'italic', !formData[phase].subtitleFormat.italic)}
      >
        <Text style={[
          commonStyles.formatButtonText,
          formData[phase].subtitleFormat.italic && commonStyles.formatButtonTextActive
        ]}>
          I
        </Text>
      </TouchableOpacity>

      {/* Font Size Selector */}
      <View style={commonStyles.fontSizeContainer}>
        <Text style={commonStyles.fontSizeLabel}>Size:</Text>
        <TouchableOpacity
          style={commonStyles.fontSizeButton}
          onPress={() => showFontSizePicker(phase)}
        >
          <Text style={commonStyles.fontSizeText}>
            {formData[phase].subtitleFormat.fontSize}px
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const render5ESection = (phase, title, color) => (
    <View style={[commonStyles.fiveESection, globalStyles.blw4, { borderLeftColor: color }]}>
      <Text style={[commonStyles.fiveETitle, { color }]}>
        {title}
      </Text>
      
      <View style={commonStyles.fiveEInputContainer}>
        <Text style={commonStyles.label}>Sub Title</Text>
        {renderFormattingToolbar(phase)}
        <TextInput
          style={[
            commonStyles.input,
            {
              fontWeight: formData[phase].subtitleFormat.bold ? 'bold' : 'normal',
              fontStyle: formData[phase].subtitleFormat.italic ? 'italic' : 'normal',
              fontSize: formData[phase].subtitleFormat.fontSize
            }
          ]}
          value={formData[phase].subtitle}
          onChangeText={(value) => handle5EInputChange(phase, 'subtitle', value)}
          placeholder={`Enter ${title} subtitle`}
          multiline={false}
        />
      </View>

      <View style={commonStyles.inputContainer}>
        <Text style={commonStyles.label}>Description</Text>
        <TextInput
          style={[commonStyles.input, globalStyles.h120, globalStyles.tavTop, globalStyles.pt14]}
          value={formData[phase].description}
          onChangeText={(value) => handle5EInputChange(phase, 'description', value)}
          placeholder={`Enter detailed ${title.toLowerCase()} description`}
          multiline={true}
        />
      </View>
    </View>
  );

  const renderStepIndicator = () => (
    <View style={commonStyles.stepIndicator}>
      <Text style={commonStyles.stepIndicatorText}>
        Step {currentStep} of {totalSteps}
      </Text>
      <View style={commonStyles.stepProgressBar}>
        <View 
          style={[
            commonStyles.stepProgressFill, 
            { width: `${(currentStep / totalSteps) * 100}%` }
          ]} 
        />
      </View>
    </View>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View>
            <Text style={[commonStyles.welcomeText, globalStyles.fs24, globalStyles.mb20]}>
              Choose Category
            </Text>
            <Text style={[commonStyles.userInfo, globalStyles.mb30]}>
              Select the most relevant skill area for this lesson
            </Text>

            {/* Category Selection */}
            <View style={commonStyles.cardContainer}>
              <Text style={[commonStyles.categoryCardTitle, globalStyles.mb16, globalStyles.textLeft]}>
                Categories
              </Text>
              <View style={[globalStyles.row, globalStyles.wrap, globalStyles.justifyBetween]}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.key}
                    style={[
                      commonStyles.categoryCard,
                      globalStyles.w48,
                      selectedCategory === category.key ? { backgroundColor: category.color } : globalStyles.bgWhite,
                      { borderColor: category.color },
                      globalStyles.bw2
                    ]}
                    onPress={() => handleCategorySelect(category)}
                  >
                    <Text style={[
                      commonStyles.categoryCardTitle,
                      selectedCategory === category.key ? globalStyles.textWhite : { color: category.color },
                      globalStyles.textCenter,
                      globalStyles.fs16
                    ]}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={[commonStyles.welcomeText, globalStyles.fs24, globalStyles.mb20]}>
              Title & Outcomes
            </Text>
            <Text style={[commonStyles.userInfo, globalStyles.mb30]}>
              Provide a clear title and expected learning outcomes
            </Text>

            {/* Basic Information */}
            <View style={commonStyles.cardContainer}>
              <View style={commonStyles.inputContainer}>
                <Text style={commonStyles.label}>Lesson Title</Text>
                <TextInput
                  style={commonStyles.input}
                  value={formData.title}
                  onChangeText={(value) => handleInputChange('title', value)}
                  placeholder="Enter lesson title"
                />
              </View>

              <View style={commonStyles.inputContainer}>
                <Text style={commonStyles.label}>Learning Outcomes</Text>
                <TextInput
                  style={[commonStyles.input, globalStyles.h80, globalStyles.tavTop]}
                  value={formData.learningOutcome}
                  onChangeText={(value) => handleInputChange('learningOutcome', value)}
                  placeholder="Describe what students will learn from this lesson"
                  multiline={true}
                />
              </View>
            </View>
          </View>
        );

      case 3:
        return (
          <View>
            <Text style={[commonStyles.welcomeText, globalStyles.fs24, globalStyles.mb20]}>
              Engage Phase
            </Text>
            <Text style={[commonStyles.userInfo, globalStyles.mb30]}>
              Hook students' attention and activate prior knowledge
            </Text>
            {render5ESection('engage', 'Engage', '#3498db')}
          </View>
        );

      case 4:
        return (
          <View>
            <Text style={[commonStyles.welcomeText, globalStyles.fs24, globalStyles.mb20]}>
              Explore Phase
            </Text>
            <Text style={[commonStyles.userInfo, globalStyles.mb30]}>
              Allow students to investigate and discover concepts
            </Text>
            {render5ESection('explore', 'Explore', '#e74c3c')}
          </View>
        );

      case 5:
        return (
          <View>
            <Text style={[commonStyles.welcomeText, globalStyles.fs24, globalStyles.mb20]}>
              Explain Phase
            </Text>
            <Text style={[commonStyles.userInfo, globalStyles.mb30]}>
              Provide clear explanations and introduce key concepts
            </Text>
            {render5ESection('explain', 'Explain', '#27ae60')}
          </View>
        );

      case 6:
        return (
          <View>
            <Text style={[commonStyles.welcomeText, globalStyles.fs24, globalStyles.mb20]}>
              Elaborate Phase
            </Text>
            <Text style={[commonStyles.userInfo, globalStyles.mb30]}>
              Extend learning and apply concepts to new situations
            </Text>
            {render5ESection('elaborate', 'Elaborate', '#f39c12')}
          </View>
        );

      case 7:
        return (
          <View>
            <Text style={[commonStyles.welcomeText, globalStyles.fs24, globalStyles.mb20]}>
              Evaluate Phase
            </Text>
            <Text style={[commonStyles.userInfo, globalStyles.mb30]}>
              Assess student understanding and provide feedback
            </Text>
            {render5ESection('evaluate', 'Evaluate', '#9b59b6')}
          </View>
        );

      // Step 7 is the final step (Evaluate); submit button will appear in footer

      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView 
      style={globalStyles.flex1} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={commonStyles.homeContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={commonStyles.backButton}
          onPress={() => {
            Alert.alert(
              'Cancel Lesson Creation',
              'Are you sure you want to cancel creating this lesson? Your current inputs will be lost.',
              [
                { text: 'No', style: 'cancel' },
                { text: 'Yes, Cancel', style: 'destructive', onPress: () => navigation.goBack() }
              ]
            );
          }}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../../assets/back-button.png')} 
            style={commonStyles.backButtonImage}
          />
        </TouchableOpacity>

        {/* Admin badge removed */}
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={globalStyles.pb40}>
            {/* Admin badge removed */}
            
            {currentStep === 1 && (
              <>
                <Text style={[commonStyles.welcomeText, globalStyles.mt30, globalStyles.textLeft]} >
                  {isEdit ? 'Edit Lesson' : 'Create New Lesson'}
                </Text>
                
                <Text style={[commonStyles.userInfo, globalStyles.textLeft]}>
                  {isEdit ? 'Update the details below and save your changes.' : 'Follow the step-by-step process to create a comprehensive lesson using the 5E Model.'}
                </Text>
              </>
            )}

            {/* Step Indicator */}
            {renderStepIndicator()}

            {/* Step Content */}
            {renderStepContent()}

            {/* Navigation Buttons */}
            <View style={commonStyles.stepNavigation}>
              {currentStep > 1 && (
                <TouchableOpacity
                  style={[commonStyles.button, commonStyles.buttonSecondary, globalStyles.flex1, globalStyles.mr10]}
                  onPress={prevStep}
                >
                  <Text style={[commonStyles.buttonText, commonStyles.buttonSecondaryText]}>
                    Previous
                  </Text>
                </TouchableOpacity>
              )}
              
              {currentStep < totalSteps ? (
                <TouchableOpacity
                  style={[commonStyles.button, globalStyles.flex1, currentStep === 1 ? null : globalStyles.ml10]}
                  onPress={nextStep}
                >
                  <Text style={commonStyles.buttonText}>
                    Next
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[commonStyles.button, globalStyles.flex1, currentStep === 1 ? null : globalStyles.ml10]}
                  onPress={handleFinalSubmit}
                >
                  <Text style={commonStyles.buttonText}>
                    {isEdit ? 'Save Changes' : 'Submit Lesson'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Cancel button removed per request (Back button handles cancel confirmation) */}
          </View>
        </ScrollView>
      </View>

      {/* Font Size Picker Modal */}
      <Modal
        visible={fontSizePickerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFontSizePickerVisible(false)}
      >
        <View style={commonStyles.modalOverlay}>
          <View style={commonStyles.fontSizePickerModal}>
            <Text style={commonStyles.modalTitle}>Select Font Size</Text>
            
            <FlatList
              data={fontSizes}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    commonStyles.fontSizeOption,
                    formData[currentPhase]?.subtitleFormat?.fontSize === item && 
                    commonStyles.fontSizeOptionSelected
                  ]}
                  onPress={() => selectFontSize(item)}
                >
                  <Text style={[
                    commonStyles.fontSizeOptionText,
                    { fontSize: item },
                    formData[currentPhase]?.subtitleFormat?.fontSize === item && 
                    commonStyles.fontSizeOptionTextSelected
                  ]}>
                    {item}px - Sample Text
                  </Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
            
            <TouchableOpacity
              style={commonStyles.modalCancelButton}
              onPress={() => setFontSizePickerVisible(false)}
            >
              <Text style={commonStyles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default CreateLessonScreen;
