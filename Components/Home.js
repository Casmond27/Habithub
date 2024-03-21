import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useFormData } from './FormData';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './Loading';
import { useTranslationContext } from './Translation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useHabitContext } from './HabitProgress';

const Home = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [formDataArray, setFormDataArray] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const { translations } = useTranslationContext();
  const { completedDates, markedDates } = useHabitContext();

  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);
      setCurrentDate(formattedDate);
    };

    getCurrentDate();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const fetchFormData = async () => {
    try {
      const storedFormData = await AsyncStorage.getItem('formDataArray');
      if (storedFormData) {
        const parsedFormData = JSON.parse(storedFormData);
        const formDataWithDates = parsedFormData.map(data => ({
          ...data,
          startDate: data.startDate ? new Date(data.startDate) : null,
          endDate: data.endDate ? new Date(data.endDate) : null,
        }));
        setFormDataArray(formDataWithDates);
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        fetchFormData();
      });
      return unsubscribe;
    }, [navigation]);

  const handleCreate = () => {
    navigation.navigate('Form', { setFormDataArray });
  };


  const handleDetailPress = (formData) => {
    const { habit, startDate, endDate, gainLose, priority } = formData;
    navigation.navigate('Detail', {
      habit: habit,
      startDate: startDate,
      endDate: endDate,
      gainLose: gainLose,
      priority: priority,
    });
  };

 const handleDelete = async (index) => {
    try {
      const activityToDelete = formDataArray[index];
      if (!activityToDelete) {
      console.error('Activity not found for deletion');
      return;
    }

      const { startDate, endDate, activityImage  } = activityToDelete;

      if (activityImage) {
      await AsyncStorage.removeItem(String(activityImage));
    }

      const updatedFormDataArray = [...formDataArray];
      updatedFormDataArray.splice(index, 1);

      await AsyncStorage.setItem('formDataArray', JSON.stringify(updatedFormDataArray));
      setFormDataArray(updatedFormDataArray);

      const startDateISO = startDate.toISOString().split('T')[0];
      const endDateISO = endDate.toISOString().split('T')[0];

      const updatedCompletedDates = { ...completedDates };
      const updatedMarkedDates = { ...markedDates };

      const keysToRemove = Object.keys(completedDates).filter(dateKey => {
        return dateKey >= startDateISO && dateKey <= endDateISO;
      });

      keysToRemove.forEach(dateKey => {
        delete updatedCompletedDates[dateKey];
        delete updatedMarkedDates[dateKey];
      });

      await AsyncStorage.setItem('completedDates', JSON.stringify(updatedCompletedDates));
      await AsyncStorage.setItem('markedDates', JSON.stringify(updatedMarkedDates));
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

 if (isLoading) {
   return <Loading />;
 }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.header}>
         <Text style={styles.headerText}>{translations['Welcome']}</Text>
      </View>
      <View>
       <Text style={styles.currentDateText}>{translations['TodayIs']} {currentDate}</Text>
     </View>

      <View>
        <Text style={styles.activeHeader}>{translations['TodaysActivity']} </Text>

      </View>
      {formDataArray.length === 0 ? (
        <View>
          <Image source={require('./../assets/wind.jpg')} style={styles.noActivityImage}/>
        <Text style={styles.noActivityText}>{translations['NoActivity']}</Text>
        </View>
    ) : (
      <View>
        {formDataArray.map((data, index) => (
          <View key={index} style={styles.habitContainer}>
            <View style={styles.itemLeft}>
              <View style={styles.square}></View>
              <Image source={data.activityImage} style={styles.activityImage} />
              <TouchableOpacity onPress={() => handleDetailPress(data, index)}>
                <Text>{translations['Activity']} {data.habit}</Text>
                <Text>{translations['StartDate']} {data.startDate && new Date(data.startDate).toDateString()}</Text>
                <Text>{translations['EndDate']} {data.endDate && new Date(data.endDate).toDateString()}</Text>
                <Text>{translations['Type']} {data.gainLose}</Text>
                <Text>{translations['Priority']} {data.priority}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                  <Icon name="trash" size={20} />
              </TouchableOpacity>
          </View>
        ))}
      </View>
    )}
      <TouchableOpacity style={styles.submitButton} onPress={handleCreate}>
        <Text style={styles.submitButtonText}>{translations['CreateActivity']}</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20
  },
  submitButton: {
    backgroundColor: '#5c6ac4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  habitContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  square: {
    width: 18,
    height: 18,
    backgroundColor: '#5c6ac4',
    borderRadius: 3,
    marginRight: 15,
  },
  activeHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  currentDateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#777',
  },
  noActivityImage: {
    width: 180,
    height: 160,
    alignSelf: 'center',
  },
  noActivityText: {
    fontSize: 18,
    color: '#777',
    alignSelf: 'center',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#c0392b',
    padding: 6,
    borderRadius: 8,
  },
  activityImage: {
  width: 50,
  height: 50,
  marginRight: 15,
},

});

export default Home;
