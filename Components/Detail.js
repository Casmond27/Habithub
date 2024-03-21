import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { useTranslationContext } from './Translation';
import Modal from 'react-native-modal';
import moment from 'moment';
import { useHabitContext } from './HabitProgress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


const Detail = ({ route, onActivityCompleted }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDateCompleted, setIsDateCompleted] = useState(false);
  const navigation = useNavigation();
  const [isCompleted, setIsCompleted] = useState(false);
  const [dateString, setDateString] = useState('');
  const { translations } = useTranslationContext();
  const [progress, setProgress] = useState(0)

  if (!route.params || !route.params.habit) {
    return <View style={styles.container}>No data available.</View>;
  }

  const { habit, startDate, endDate, gainLose, priority } = route.params;
  const { completedDates, markedDates, setCompletedDates, setMarkedDates } = useHabitContext();

  const calculateTotalDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const daysCount = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;
    console.log("Total days:", daysCount);
    return daysCount;
  };

  useEffect(() => {
    const currentDate = new Date(startDate);
    const endDateTime = endDate.getTime();

    const updatedMarkedDates = {};
    while (currentDate.getTime() <= endDateTime) {
      const dateString = currentDate.toISOString().split('T')[0];
      updatedMarkedDates[dateString] = { color: 'grey', textColor: 'white' };
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setMarkedDates(updatedMarkedDates);
  }, [startDate, endDate]);

  const targetTime = moment().set({ hour: 7, minute: 0, second: 0 });

  useEffect(() => {
    console.log('Checking modal visibility...');
    const checkModalVisibility = async () => {
      const lastPromptDate = await AsyncStorage.getItem('lastPromptDate');
      console.log('lastPromptDate:', lastPromptDate);
      const isBefore = moment(lastPromptDate).isBefore(targetTime);
      console.log('isBefore:', isBefore);
      const isModalVisible = !lastPromptDate || isBefore;
      console.log('isModalVisible:', isModalVisible);
      setIsModalVisible(isModalVisible);
    };
 checkModalVisibility();

  }, []);

const storeLastPromptDate = async (dateString) => {
  try {
    await AsyncStorage.setItem('lastPromptDate', dateString);
    console.log('Stored lastPromptDate:', dateString);
  } catch (error) {
    console.error('Error storing last prompt date:', error);
  }
};



  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedCompletedDates = await AsyncStorage.getItem('completedDates');
        const storedMarkedDates = await AsyncStorage.getItem('markedDates');

        if (storedCompletedDates) {
          setCompletedDates(JSON.parse(storedCompletedDates));
        }

        if (storedMarkedDates) {
          setMarkedDates(JSON.parse(storedMarkedDates));
        }
      } catch (error) {
        console.error('Error loading stored data:', error);
      }
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const storedCompletedDates = await AsyncStorage.getItem('completedDates');
        if (storedCompletedDates) {
          const parsedCompletedDates = JSON.parse(storedCompletedDates);
          const completedDateKeys = Object.keys(parsedCompletedDates[habit] || {});
          const daysCount = calculateTotalDays(startDate, endDate);
          const updatedProgress = (completedDateKeys.length / daysCount) * 100;
          setProgress(updatedProgress);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    };

    loadProgress();
  }, [habit, startDate, endDate]);


  const handleCrossPress = async () => {
  setIsModalVisible(false);
  storeLastPromptDate(moment().toISOString());
  const currentDate = new Date();
  const dateString = currentDate.toISOString().split('T')[0];

  const updatedCompletedDates = {
      ...completedDates,
      [habit]: {
        ...(completedDates[habit] || {}),
        [dateString]: { color: 'red', textColor: 'white' },
      },
    };

    const updatedMarkedDates = {
      ...markedDates,
      [habit]: {
        ...(markedDates[habit] || {}),
        [dateString]: { color: 'red', textColor: 'white' },
      },
    };

  await setCompletedDates(updatedCompletedDates);
  await setMarkedDates(updatedMarkedDates);

  try {
    await AsyncStorage.setItem('completedDates', JSON.stringify(updatedCompletedDates));
    await AsyncStorage.setItem('markedDates', JSON.stringify(updatedMarkedDates));
  } catch (error) {
    console.error('Error storing completed dates and marked dates:', error);
  }
};


 const handleTickPress = async () => {
  setIsModalVisible(false);
  storeLastPromptDate(moment().toISOString());
  const currentDate = new Date();
  const dateString = currentDate.toISOString().split('T')[0];

  const updatedCompletedDates = {
      ...completedDates,
      [habit]: {
        ...(completedDates[habit] || {}),
        [dateString]: { color: 'green', textColor: 'white' },
      },
    };

    const updatedMarkedDates = {
      ...markedDates,
      [habit]: {
        ...(markedDates[habit] || {}),
        [dateString]: { color: 'green', textColor: 'white' },
      },
    };

  await setCompletedDates(updatedCompletedDates);
  await setMarkedDates(updatedMarkedDates);

  try {
      await AsyncStorage.setItem('completedDates', JSON.stringify(updatedCompletedDates));
      await AsyncStorage.setItem('markedDates', JSON.stringify(updatedMarkedDates));
    } catch (error) {
      console.error('Error storing completed dates and marked dates:', error);
    }

    const daysCount = calculateTotalDays(startDate, endDate);
    console.log("daysCount:", daysCount);
   const completedDateKeys = Object.keys(updatedCompletedDates[habit] || {});
   console.log("completedDateKeys:", completedDateKeys);
   const progress = (completedDateKeys.length / daysCount) * 100;
   console.log("progress:", progress);

   setProgress(progress);

};

  const gainLoseColorChange = () => {
    return gainLose === 'Gain' ? 'green' : 'red';
  }

  const priorityColorChange = () => {
    if (priority === 'low') return 'green';
    else if (priority === 'medium') return 'orange';
    else return 'red';
  }


const handleCompletedPress = async () => {
  if (progress >= 99.5 && !isCompleted) {
    setIsCompleted(true);

    const completedHabitDetails = {
      habit: habit,
      priority: priority,
      startDate: startDate,
      endDate: endDate,
    };

    let points = 0;
    switch (priority) {
      case 'high':
        points = 10;
        break;
      case 'medium':
        points = 5;
        break;
      case 'low':
        points = 2;
        break;
      default:
        points = 0;
    }

    navigation.navigate('Overall', {
      completedHabitDetails: completedHabitDetails,
      points: points,
    });

    alert('Activity completed');
  }
};

const handleCancel = () => {
  navigation.goBack();
}

  return (
    <View style={styles.container}>
      <Text style={styles.habitName}>{translations['Goal']} {habit}</Text>
      <Calendar markedDates={markedDates[habit] || {}} markingType={'period'}/>
      <View style={styles.habitContainer}>
      </View>
      <View style={styles.progressContainer}>

        <Text>{translations['Progress']}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress.toFixed(2)}%</Text>

        <View style={styles.infoContainer}>
        <Text style={styles.dateText}>{translations['StartDate']} {startDate && startDate.toDateString()}</Text>
        <Text style={styles.dateText}>{translations['EndDate']} {endDate && endDate.toDateString()}</Text>
        <Text style={{...styles.dateText, color: gainLoseColorChange()}}>{translations['Type']} {gainLose}</Text>
        <Text style={{...styles.dateText, color: priorityColorChange()}}>{translations['Priority']} {priority}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>{translations['Back']}</Text>
        </TouchableOpacity>
        {progress >= 99.5 && !isCompleted && (
          <TouchableOpacity style={styles.button} onPress={handleCompletedPress}>
            <Text style={styles.buttonText}>{translations['Completed']}</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeaderText}>{translations['DailyActivityCompleted']}</Text>
          <Text style={styles.modalText}>{translations['SelectOption']}</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={handleCrossPress}>
              <Icon name="times" size={32} color="#5c6ac4" />
              <Text style={styles.modalText}>{translations['No']}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleTickPress}>
              <Icon name="check" size={32} color="#5c6ac4" />
              <Text style={styles.modalText}>{translations['Yes']}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  habitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  habitName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: 20
  },
  progressContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  progressBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#5c6ac4',
    borderRadius: 10,
  },
  progressText: {
    marginTop: 2,
    textAlign: 'right',
    color: '#555',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#5c6ac4',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 12,
    marginTop: 10,
    borderRadius: 10,
    width: '50%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 20,
  },
  modalContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  modalButton: {
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 3,
  },
});

export default Detail;
