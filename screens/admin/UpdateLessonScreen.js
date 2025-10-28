import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { commonStyles } from '../../styles/commonStyles';
import { globalStyles } from '../../styles/globalStyles';

const UpdateLessonScreen = ({ navigation }) => {
  const isAdmin = true;

  const handleCategoryPress = (category) => {
    navigation.navigate(category, { isAdmin, mode: 'update' });
  };

  return (
    <View style={commonStyles.homeContainer}>
      {/* Back Button */}
      <TouchableOpacity
        style={commonStyles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Image 
          source={require('../../assets/back-button.png')} 
          style={commonStyles.backButtonImage}
        />
      </TouchableOpacity>

      {/* Admin Badge Header */}
      <View style={commonStyles.adminBadgeHeader}>
        <View style={commonStyles.adminBadgeInner}>
          <Text style={commonStyles.adminBadgeText}>ADMIN</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyles.pb40}>
          {/* Admin badge removed */}

          <Text style={[commonStyles.welcomeText, globalStyles.textLeft, globalStyles.mt58, globalStyles.mb0]}>Modify Lessons</Text>

          <View style={[commonStyles.cardContainer, globalStyles.mt24]}>
            <TouchableOpacity 
              style={[commonStyles.categoryCard, commonStyles.listeningCard]}
              onPress={() => handleCategoryPress('Listening')}
            >
              <Text style={globalStyles.fs32}>🎧</Text>
              <View style={commonStyles.categoryCardContent}>
                <Text style={commonStyles.categoryCardTitle}>Listening</Text>
                <Text style={commonStyles.categoryCardDescription}>
                  Choose a Listening lesson to edit
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
                  Choose a Speaking lesson to edit
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
                  Choose a Reading lesson to edit
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
                  Choose a Writing lesson to edit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateLessonScreen;


