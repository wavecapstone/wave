import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { commonStyles } from '../../../styles/commonStyles';
import { globalStyles } from '../../../styles/globalStyles';
import { firestore } from '../../../config/firebase';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';

const WritingScreen = ({ navigation, route }) => {
  const isAdmin = route?.params?.isAdmin || false;
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch lessons from database
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(firestore, 'lessons'),
          where('category', '==', '✍️ Writing'),
          where('status', '==', 'active')
        );
        const querySnapshot = await getDocs(q);
        const lessonData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLessons(lessonData);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        // No fallback data - show empty state
        setLessons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleDelete = (lessonId, title) => {
    Alert.alert(
      'Delete Lesson',
      `Are you sure you want to delete "${title}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await deleteDoc(doc(firestore, 'lessons', lessonId));
              setLessons(prev => prev.filter(l => l.id !== lessonId));
            } catch (error) {
              console.error('Error deleting lesson:', error);
              Alert.alert('Error', 'Failed to delete lesson. Please try again.');
            }
          }
        }
      ]
    );
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
          source={require('../../../assets/back-button.png')} 
          style={commonStyles.backButtonImage}
        />
      </TouchableOpacity>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyles.mb20}>

          <Text style={[commonStyles.welcomeText, globalStyles.textLeft, globalStyles.mt20]}>
            Writing Lessons
          </Text>

          <View style={commonStyles.cardContainer}>
            {loading ? (
              <View style={[commonStyles.categoryCard, globalStyles.itemsCenter, { padding: 40 }]}>
                <Text style={commonStyles.categoryCardDescription}>Loading lessons...</Text>
              </View>
            ) : lessons.length > 0 ? (
              lessons.map((lesson) => (
              <TouchableOpacity 
                  key={lesson.id}
                  style={[commonStyles.categoryCard, globalStyles.mb16]}
                  onPress={() => {
                    if (!isAdmin || !route?.params?.mode) {
                      navigation.navigate('LessonView', { lesson });
                    }
                  }}
                >
                  <View style={commonStyles.categoryCardContent}>
                    <View style={[globalStyles.rowBetween, globalStyles.mb8]}>
                      <Text style={[commonStyles.categoryCardTitle, globalStyles.flex1, globalStyles.mr8]}>
                        {lesson.title}
                      </Text>
                    </View>
                    
                    <View style={globalStyles.rowBetween}>
                      <Text style={[commonStyles.categoryCardDescription, globalStyles.fs12]}>⏱️ {lesson.estimatedTime}</Text>
                      {isAdmin && route?.params?.mode === 'update' && (
                        <TouchableOpacity
                          style={[commonStyles.button, globalStyles.py8, globalStyles.px12, globalStyles.bgWarning]}
                          onPress={() => navigation.navigate('CreateLesson', { isAdmin: true, mode: 'edit', lessonId: lesson.id, initialData: lesson })}
                        >
                          <Text style={commonStyles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                      )}
                      {isAdmin && route?.params?.mode === 'delete' && (
                        <TouchableOpacity
                          style={[commonStyles.button, globalStyles.py8, globalStyles.px12, globalStyles.bgDanger]}
                          onPress={() => handleDelete(lesson.id, lesson.title)}
                        >
                          <Text style={commonStyles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={[commonStyles.categoryCard, globalStyles.itemsCenter, { padding: 40 }]}>
                <Text style={commonStyles.categoryCardDescription}>
                  No lessons available yet. Check back later!
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WritingScreen;
