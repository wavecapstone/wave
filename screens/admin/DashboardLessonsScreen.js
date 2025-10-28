import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { commonStyles } from '../../styles/commonStyles';
import { globalStyles } from '../../styles/globalStyles';
import HamburgerMenu from '../../components/HamburgerMenu';

const DashboardCRUDScreen = ({ navigation, route }) => {
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

  const handleLessonAction = (action) => {
    Alert.alert(
      'Lesson Management',
      `${action} functionality will be implemented in the next update.`,
      [{ text: 'OK' }]
    );
  };

  // Sample lesson data
  const sampleLessons = [
    {
      id: 1,
      title: 'Basic English Grammar',
      category: 'Writing',
      difficulty: 'Beginner',
      students: 45,
      status: 'Active'
    },
    {
      id: 2,
      title: 'Conversation Practice',
      category: 'Speaking',
      difficulty: 'Intermediate',
      students: 32,
      status: 'Active'
    },
    {
      id: 3,
      title: 'Reading Comprehension',
      category: 'Reading',
      difficulty: 'Advanced',
      students: 28,
      status: 'Draft'
    },
    {
      id: 4,
      title: 'Listening Skills',
      category: 'Listening',
      difficulty: 'Beginner',
      students: 51,
      status: 'Active'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#27ae60';
      case 'Draft': return '#f39c12';
      case 'Inactive': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Listening': return '#3498db';
      case 'Speaking': return '#e74c3c';
      case 'Reading': return '#27ae60';
      case 'Writing': return '#f39c12';
      default: return '#7f8c8d';
    }
  };

  return (
    <View style={commonStyles.homeContainer}>
      {/* Hamburger Menu */}
      <HamburgerMenu
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onFeaturePress={handleFeaturePress}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyles.pb40}>
          <View style={commonStyles.adminBadge}>
            <Text style={commonStyles.adminBadgeText}>ADMIN DASHBOARD</Text>
          </View>
          
          <Text style={[commonStyles.welcomeText, globalStyles.mt24]}>
            Dashboard Lessons
          </Text>
          
          <Text style={commonStyles.userInfo}>
            Manage all lessons across categories. View, create, edit, and delete lesson content.
          </Text>

          {/* Quick Actions */}
          <View style={commonStyles.cardContainer}>
            <TouchableOpacity 
              style={[commonStyles.categoryCard, globalStyles.bgPrimary]}
              onPress={() => handleLessonAction('Create New Lesson')}
            >
              <Text style={[globalStyles.fs32, globalStyles.textWhite]}>➕</Text>
              <View style={commonStyles.categoryCardContent}>
                <Text style={[commonStyles.categoryCardTitle, globalStyles.textWhite]}>Create Lesson</Text>
                <Text style={[commonStyles.categoryCardDescription, globalStyles.textWhite]}>
                  Add new lesson content
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[commonStyles.categoryCard, globalStyles.bgSuccess]}
              onPress={() => handleLessonAction('View All Lessons')}
            >
              <Text style={[globalStyles.fs32, globalStyles.textWhite]}>📚</Text>
              <View style={commonStyles.categoryCardContent}>
                <Text style={[commonStyles.categoryCardTitle, globalStyles.textWhite]}>View Lessons</Text>
                <Text style={[commonStyles.categoryCardDescription, globalStyles.textWhite]}>
                  Browse all lesson content
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Lessons List */}
          <Text style={[commonStyles.welcomeText, globalStyles.fs24, globalStyles.mt24, globalStyles.mb20]}>
            Recent Lessons
          </Text>

          {sampleLessons.map((lesson) => (
            <View key={lesson.id} style={commonStyles.categoryCard}>
              <View style={commonStyles.categoryCardContent}>
                <View style={[globalStyles.rowBetween, globalStyles.itemsCenter, globalStyles.mb8]}>
                  <Text style={[commonStyles.categoryCardTitle, globalStyles.flex1]}>{lesson.title}</Text>
                  <View style={[
                    { backgroundColor: getStatusColor(lesson.status) },
                    globalStyles.px8,
                    globalStyles.py4,
                    globalStyles.br12,
                  ]}>
                    <Text style={[globalStyles.textWhite, globalStyles.fs12, globalStyles.bold]}>
                      {lesson.status}
                    </Text>
                  </View>
                </View>
                
                <View style={[globalStyles.rowBetween, globalStyles.itemsCenter]}>
                  <View style={[globalStyles.row, globalStyles.itemsCenter]}>
                    <View style={[
                      { backgroundColor: getCategoryColor(lesson.category) },
                      globalStyles.px8,
                      globalStyles.py4,
                      globalStyles.br12,
                      globalStyles.mr8,
                    ]}>
                      <Text style={[globalStyles.textWhite, globalStyles.fs12, globalStyles.bold]}>
                        {lesson.category}
                      </Text>
                    </View>
                    <Text style={[commonStyles.categoryCardDescription, globalStyles.mr8]}>
                      {lesson.difficulty}
                    </Text>
                  </View>
                  <Text style={[commonStyles.categoryCardDescription, globalStyles.fs12]}>
                    {lesson.students} students
                  </Text>
                </View>

                <View style={[globalStyles.row, globalStyles.mt12]}>
                  <TouchableOpacity 
                    style={[
                      commonStyles.button,
                      globalStyles.bgPrimary,
                      globalStyles.py8,
                      globalStyles.px12,
                      globalStyles.mr8,
                      globalStyles.flex1,
                    ]}
                    onPress={() => handleLessonAction('Edit')}
                  >
                    <Text style={commonStyles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      commonStyles.button,
                      globalStyles.bgDanger,
                      globalStyles.py8,
                      globalStyles.px12,
                      globalStyles.flex1,
                    ]}
                    onPress={() => handleLessonAction('Delete')}
                  >
                    <Text style={commonStyles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardCRUDScreen;
