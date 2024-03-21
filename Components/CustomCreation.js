import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useFormData } from './FormData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslationContext } from './Translation';

const CustomCreation = ({ route }) => {
  const navigation = useNavigation();
  const [habitInput, setHabitInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [gainLose, setGainLose] = useState('gain');
  const [priority, setPriority] = useState("low");
  const { setFormDataArray } = route.params || {};
  const { translations } = useTranslationContext();

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

  const handleSubmit = async () => {
    const existingData = await AsyncStorage.getItem('formDataArray');
    const existingDataArray = existingData ? JSON.parse(existingData) : [];

    const newActivity = {
      habit: habitInput,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      gainLose: gainLose,
      priority: priority,
    };
    const updatedDataArray = [...existingDataArray, newActivity];

    await AsyncStorage.setItem('formDataArray', JSON.stringify(updatedDataArray));

    setHabitInput('');
    setStartDate(new Date());
    setEndDate(null);
    setGainLose('gain');
    setPriority('low');

    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.textContainer}>
        <Text style={styles.formLabel}>{translations['EnterHabit']}</Text>
          <TextInput
            style={styles.textInput}
            value={habitInput}
            onChangeText={setHabitInput}
            placeholder={translations['EnterHabit']}
          />
        </View>


        <View style={styles.inputContainer}>
        <View>
          <Text style={styles.formLabel}>{translations['GainOrLose']}</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              onPress={() => handleGainLoseChange('gain')}
              style={gainLose === 'gain' ? styles.radioButtonSelected : styles.radioButton}
            >
              <Text style={styles.radioButtonLabel}>{translations['Gain']}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleGainLoseChange('lose')}
              style={gainLose === 'lose' ? styles.radioButtonSelected : styles.radioButton}
            >
              <Text style={styles.radioButtonLabel}>{translations['Lose']}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
         <Text style={styles.formLabel}>{translations['Priority']}</Text>
         <View style={styles.radioContainer}>
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
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8
  },
  radioButton: {
    borderWidth: 2,
    borderColor: '#5c6ac4',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
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
  textContainer: {
    marginVertical: 10,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#5c6ac4',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: 'black',
  },
});


export default CustomCreation;
