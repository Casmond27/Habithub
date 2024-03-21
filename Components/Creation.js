import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useFormData } from './FormData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslationContext } from './Translation';



const Creation = ({ route }) => {
  const navigation = useNavigation();
  const [selectedHabit, setSelectedHabit] = useState('Select an option');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const { translations } = useTranslationContext();
  const [priority, setPriority] = useState("low");
  const { setFormDataArray } = route.params || {};

  const categories = [
  { id: '1', label: 'Sports', value: 'Walk', image: require('../assets/walk.jpg') },
  { id: '2', label: 'Sports', value: 'Run', image: require('../assets/run.png') },
  { id: '3', label: 'Sports', value: 'Stand', image: require('../assets/stand.png')  },
  { id: '4', label: 'Sports', value: 'Sit up', image: require('../assets/sitUp.png')  },
  { id: '5', label: 'Sports', value: 'Push up', image: require('../assets/pushup.png')  },
  { id: '6', label: 'Sports', value: 'Weight Training', image: require('../assets/WeightTraining.png')  },
  { id: '7', label: 'Health', value: 'No sugar', image: require('../assets/sugar_free.jpg')  },
  { id: '8', label: 'Health', value: 'Drink Water', image: require('../assets/drinkwater.png') },
  { id: '9', label: 'Health', value: 'Sleep early', image: require('../assets/sleep.png') },
  { id: '10', label: 'Health', value: 'Meditate for 10 minutes', image: require('../assets/meditate.png') },
  { id: '11', label: 'Health', value: 'Practice deep breathing', image: require('../assets/deepBreathing.jpg') },
  { id: '12', label: 'Life', value: 'Keep a diary' , image: require('../assets/diary.png') },
  { id: '13', label: 'Life', value: 'Save money' , image: require('../assets/savemoney.png') },
  { id: '14', label: 'Life', value: 'Track expenses' , image: require('../assets/trackmoney.png') },
  { id: '15', label: 'Life', value: 'Read book', image: require('../assets/read.png') },
  { id: '16', label: 'Life', value: 'Learn a new skill' , image: require('../assets/learn.jpg') },
];


const renderPickerItems = () => {
  return categories.map((item) => (
    <Picker.Item label={`${item.label} - ${item.value}`} value={`${item.value}`} />
  ));
};

  const handleGainLoseChange = (value) => {
    setGainLose(value);
  };
  const handlePriorityChange = (value) => {
    setPriority(value);
  }
  const handleStartDateChange = (date) => {
    setStartDate(date);

  };

  const handleEndDateChange = (date) => {
    if (date < startDate) {
      setEndDate(null);
    } else {
      setEndDate(date);
    }
  };

  const handleSubmit = async () => {
    const existingData = await AsyncStorage.getItem('formDataArray');
    const existingDataArray = existingData ? JSON.parse(existingData) : [];

    const newActivity = {
      habit: selectedHabit,
      activityImage: categories.find(item => item.value === selectedHabit)?.image || null,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      priority: priority,
    };
    const updatedDataArray = [...existingDataArray, newActivity];
    await AsyncStorage.setItem('formDataArray', JSON.stringify(updatedDataArray));

    setSelectedHabit('Select an option');
    setStartDate(new Date());
    setEndDate(null);
    setPriority('low');
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  }

  const renderStartDatePicker = () => {
    if (Platform.OS === 'web') {
      return (
        <input
          type="date"
          value={startDate.toISOString().split('T')[0]}
          onChange={(e) => handleStartDateChange(new Date(e.target.value))}
        />
      );
    } else {
      return (
        <DateTimePicker
          value={startDate}
          onChange={(_, date) => handleStartDateChange(date)}
          mode="date"
          display="spinner"
        />
      );
    }
  };
const renderEndDatePicker = () => {
    if (Platform.OS === 'web') {
      return (
        <input
          type="date"
          value={endDate ? endDate.toISOString().split('T')[0] : ''}
          onChange={(e) => handleEndDateChange(new Date(e.target.value))}
        />
      );
    } else {
      return (
        <DateTimePicker
          value={endDate || startDate}
          onChange={(_, date) => handleEndDateChange(date)}
          mode="date"
          display="spinner"
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.inputContainer}>
        <Text style={styles.formLabel}>{translations['SelectHabit']}</Text>
        <Picker
            selectedValue={selectedHabit}
            onValueChange={(itemValue) => setSelectedHabit(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select an option" value={null} />
            {renderPickerItems()}
          </Picker>
        </View>

        <View>
         <Text style={styles.formLabel}>{translations['Priority']}</Text>
         <View style={styles.inputContainer}>
           <TouchableOpacity
             onPress={() => handlePriorityChange('low')}
             style={priority === 'low' ? styles.radioButtonSelected : styles.radioButton}
           >
             <Text style={styles.radioButtonLabel}>{translations['Low']}</Text>
           </TouchableOpacity>
           <TouchableOpacity
             onPress={() => handlePriorityChange('medium')}
             style={priority === 'medium' ? styles.radioButtonSelected : styles.radioButton}
           >
             <Text style={styles.radioButtonLabel}>{translations['Medium']}</Text>
           </TouchableOpacity>
           <TouchableOpacity
             onPress={() => handlePriorityChange('high')}
             style={priority === 'high' ? styles.radioButtonSelected : styles.radioButton}
           >
             <Text style={styles.radioButtonLabel}>{translations['High']}</Text>
           </TouchableOpacity>
         </View>
       </View>

      <View>
        <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>{translations['StartDate']}</Text>
             {renderStartDatePicker()}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.formLabel}>{translations['EndDate']}</Text>
            {renderEndDatePicker()}
          </View>
      </View>


      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleCancel}>
          <Text style={styles.submitButtonText}>{translations['Cancel']}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>{translations['Submit']}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    marginLeft: 30,
    marginRight: 30
  },
  formLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#5c6ac4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButton: {
    borderWidth: 2,
    borderColor: '#5c6ac4',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    margin: 3
  },
  radioButtonSelected: {
    backgroundColor: '#5c6ac4',
    borderWidth: 2,
    borderColor: '#5c6ac4',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  radioButtonLabel: {
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
  },
});


export default Creation;
