import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { commonStyles } from '../../styles/commonStyles';
import { globalStyles } from '../../styles/globalStyles';

const Section = ({ title, data, color }) => (
  <View style={[commonStyles.fiveESection, globalStyles.blw4, { borderLeftColor: color }]}>
    <Text style={[commonStyles.fiveETitle, { color }]}>{title}</Text>
    {!!data?.subtitle && (
      <Text
        style={[
          data?.subtitleFormat?.bold ? globalStyles.bold : null,
          data?.subtitleFormat?.italic ? globalStyles.italic : null,
          (data?.subtitleFormat?.fontSize === 12) ? globalStyles.fs12 : null,
          (data?.subtitleFormat?.fontSize === 14) ? globalStyles.fs14 : null,
          (data?.subtitleFormat?.fontSize === 16 || !data?.subtitleFormat?.fontSize) ? globalStyles.fs16 : null,
          (data?.subtitleFormat?.fontSize === 18) ? globalStyles.fs18 : null,
          (data?.subtitleFormat?.fontSize === 20) ? globalStyles.fs20 : null,
          (data?.subtitleFormat?.fontSize === 24) ? globalStyles.fs24 : null,
          (data?.subtitleFormat?.fontSize === 32) ? globalStyles.fs32 : null,
          globalStyles.mb8,
        ]}
      >
        {data.subtitle}
      </Text>
    )}
    {!!data?.description && (
      <Text style={commonStyles.categoryCardDescription}>{data.description}</Text>
    )}
  </View>
);

const LessonViewScreen = ({ navigation, route }) => {
  const lesson = route?.params?.lesson;

  if (!lesson) {
    return (
      <View style={[commonStyles.homeContainer, globalStyles.itemsCenter, { justifyContent: 'center' }]}>
        <Text style={commonStyles.categoryCardDescription}>Lesson not found.</Text>
      </View>
    );
  }

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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyles.pb40}>
          <Text style={[commonStyles.welcomeText, globalStyles.textLeft]}>
            {lesson.title}
          </Text>
          <Text style={[commonStyles.userInfo, globalStyles.mb20]}>
            {lesson.category} • ⏱️ {lesson.estimatedTime}
          </Text>

          {!!lesson.learningOutcome && (
            <View style={commonStyles.cardContainer}>
              <View style={[commonStyles.categoryCard, globalStyles.p16]} >
                <Text style={[commonStyles.categoryCardTitle, globalStyles.mb8]}>Learning Outcomes</Text>
                <Text style={commonStyles.categoryCardDescription}>{lesson.learningOutcome}</Text>
              </View>
            </View>
          )}

          <View style={commonStyles.cardContainer}>
            <View style={[commonStyles.categoryCard, globalStyles.p16]} >
              <Section title="Engage" data={lesson.engage} color="#3498db" />
              <Section title="Explore" data={lesson.explore} color="#e74c3c" />
              <Section title="Explain" data={lesson.explain} color="#27ae60" />
              <Section title="Elaborate" data={lesson.elaborate} color="#f39c12" />
              <Section title="Evaluate" data={lesson.evaluate} color="#9b59b6" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LessonViewScreen;


