import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { commonStyles } from '../../styles/commonStyles';
import { globalStyles } from '../../styles/globalStyles';

const ReadLessonScreen = ({ navigation }) => {

  const handleCategoryPress = (category) => {
    navigation.navigate(category, { isAdmin: true });
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

          <Text style={[commonStyles.welcomeText, globalStyles.textLeft, globalStyles.mt58]}>Published Lessons</Text>

          <View style={[commonStyles.cardContainer, globalStyles.mt24]}>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default ReadLessonScreen;


