import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {Picker} from '@react-native-picker/picker';
import LanguageAPI from './languageAPI';
import countries from './countries.json';
import { useTranslationContext } from './Translation';
import { Cell, TableView } from 'react-native-tableview-simple';

const DynamicSettingScreen = ({ route }) => {
  const { pageName } = route.params;
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const { translations } = useTranslationContext();
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  const [formData, setFormData] = useState({
      firstName: 'Casmond',
      lastName: 'Lim',
      email: 'cas123@gmail.com',
      country: 'Singapore',
    });

    const [editMode, setEditMode] = useState(false);


    const handleUpdate = () => {
      console.log('Form Data:', formData);
      console.log('First Name:', formData.firstName);
      console.log('Last Name:', formData.lastName);
      console.log('Email:', formData.email);
      console.log('Country:', formData.country);
      alert("Profile has been updated");

      setEditMode(false);
    };

    const handleCancel = () => {
        navigation.navigate('Settings');

    }


    const renderEditProfile = () => (
      <View>
          <Text style={styles.header}>{translations['EditProfile']}</Text>
          <Text style={styles.label}>{translations['FirstName']} </Text>
          <TextInput style={styles.input} placeholder="First name" name='firstName' value={formData.firstName}
            onChangeText={(text) => setFormData({ ...formData, firstName: text })}/>
          <Text style={styles.label}> {translations['LastName']} </Text>
          <TextInput style={styles.input} placeholder="Last name" name='lastName' value={formData.lastName}
            onChangeText={(text) => setFormData({ ...formData, lastName: text })}/>
          <Text style={styles.label}> {translations['Email']} </Text>
          <TextInput style={styles.input} placeholder="Email" name='email' value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}/>
          <Text style={styles.label}> {translations['Country']} </Text>
          <Picker
             style={styles.input}
             selectedValue={formData.country}
             onValueChange={(itemValue) => setFormData({ ...formData, country: itemValue })}
           >
             {countries.map((country) => (
               <Picker.Item label={country.name} value={country.name} />
             ))}
          </Picker>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setEditMode(false)}>
              <Text style={styles.buttonText}>{translations['Back']}</Text>
            </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}  >
            <Text style={styles.buttonText}>{translations['Update']}</Text>
          </TouchableOpacity>
          </View>
      </View>
  );

  const renderViewProfile = () => (
    <ScrollView>
    <View>
    <Image source={require('./../assets/user.png')} style={styles.profileImage}/>
      <Text style={styles.header}>{translations['ViewProfile']}</Text>
      <Text style={styles.viewHeader}>{translations['FirstName']}</Text>
      <Text style={styles.viewLabel}>{formData.firstName}</Text>
      <Text style={styles.viewHeader}>{translations['LastName']}</Text>
      <Text style={styles.viewLabel}>{formData.lastName}</Text>
      <Text style={styles.viewHeader}>{translations['Email']}</Text>
      <Text style={styles.viewLabel}>{formData.email}</Text>
      <Text style={styles.viewHeader}>{translations['Country']}</Text>
      <Text style={styles.viewLabel}>{formData.country}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCancel} >
          <Text style={styles.buttonText}>{translations['Back']}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setEditMode(true)} >
          <Text style={styles.buttonText}>{translations['Edit']}</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );

  const renderLanguageSettings = () => (
    <View>
       <LanguageAPI/>
    </View>
  );

  const handleNotificationToggle = () => {
      setNotificationEnabled(!notificationEnabled);
    };

const renderNotificationView = () => (
  <View>
      <TableView>
      <Cell cellStyle="Basic" title={translations['TurnOnNotification']}
      cellAccessoryView={<Switch
        value={notificationEnabled}
        onValueChange={handleNotificationToggle}
        trackColor={{ true: 'green', false: 'grey' }}
        thumbColor={notificationEnabled ? 'white' : 'white'}
        />}
      contentContainerStyle={{ paddingVertical: 4 }}/>
      </TableView>

      <TouchableOpacity style={styles.button} onPress={handleCancel}>
        <Text style={styles.buttonText}>{translations['Back']}</Text>
      </TouchableOpacity>
  </View>
);

const renderDarkModeView = () => (
  <View>
      <TableView>
      <Cell cellStyle="Basic" title={translations['TurnOnDarkMode']}
      cellAccessoryView={<Switch
        value={notificationEnabled}
        onValueChange={handleNotificationToggle}
        trackColor={{ true: 'green', false: 'grey' }}
        thumbColor={notificationEnabled ? 'white' : 'white'}
        />}
      contentContainerStyle={{ paddingVertical: 4 }}/>
      </TableView>

      <TouchableOpacity style={styles.button} onPress={handleCancel}>
        <Text style={styles.buttonText}>{translations['Back']}</Text>
      </TouchableOpacity>
  </View>
);


  const renderFAQ = () => (
    <View>
      <Text style={styles.faqLabel}>
        1. What is HabitHub?
      </Text>
      <Text style={styles.faqText}>
          HabitHub is a user-friendly mobile application designed to help you develop and maintain positive habits, improve your productivity, and achieve your personal and professional goals.
      </Text>
      <Text style={styles.faqLabel}>
      2. How does HabitHub work?
      </Text>
      <Text style={styles.faqText}>
      HabitHub employs a simple and intuitive interface that allows you to create custom habits or choose from a list of pre-defined ones.
      You can set the frequency, reminders, and specific goals for each habit. The app will send you reminders, track your progress,
     and provide insights to keep you motivated and accountable.
      </Text>
      <Text style={styles.faqLabel}>
        3. Is HabitHub available on all devices?
      </Text>
      <Text style={styles.faqText}>
      Yes, HabitHub is available for download on both iOS and Android devices, ensuring that you can access and manage your habits no matter which platform you prefer.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleCancel}>
        <Text style={styles.buttonText}>{translations['Back']}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderContactUs = () => (
    <View>
        <Text style={styles.faqText}>
        We're here to assist you with any questions, concerns, or feedback you may have about HabitHub.
        Our dedicated support team is ready to help you make the most of your habit-building journey.
        Please feel free to reach out to us through the following channels:
        </Text>
          <Text style={styles.faqLabel}>
            Customer Support Email:
          </Text>
          <Text  style={styles.faqText}>
            support@HabitHub.com
          </Text>
        <Text style={styles.faqLabel}>
        Phone:
        </Text>
        <Text  style={styles.faqText}>
        +65-91234567
        </Text>
        <Text style={styles.faqLabel}>
        Social Media:
        </Text>
        <Text style={styles.faqText}t>
        Twitter: @HabitHubSupport
        </Text>
        <Text style={styles.faqText}>
        Facebook: /HabitHubSupport
        </Text>
        <Text style={styles.faqText}>
        In-App Support:
        For quick assistance, you can also send us a message directly within the HabitHub. Simply navigate to the "Support" section in the app's settings and provide us with your query.
         Our team will respond to you promptly.

        Your satisfaction is our priority, and we are committed to helping you achieve your goals with HabitHub.
        Don't hesitate to contact us whenever you need assistance or have something to share. We look forward to hearing from you!
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>{translations['Back']}</Text>
        </TouchableOpacity>
    </View>
  );

  const renderPageContent = () => {
    switch (pageName) {
      case 'Profile':
        return editMode ? renderEditProfile() : renderViewProfile();
      case 'Theme':
        return renderDarkModeView();
      case 'Language':
        return renderLanguageSettings();
      case 'Notification':
        return renderNotificationView();
      case 'FAQs':
        return renderFAQ();
      case 'Contact Us':
        return renderContactUs();
      case 'Review':
        return <Text>Review & Support Page</Text>;
      default:
        return null;
    }
  };

    navigation.setOptions({
   title: pageName,
 });

  return (
    <View>
      {renderPageContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 10,
    margin: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'flex-start'
  },
  button: {
    backgroundColor: '#5c6ac4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    margin: 30,
    borderRadius: 15,
    width: '30%'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewHeader:{
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'flex-start',
    padding: 10
  },
  viewLabel: {
      fontSize: 18,
      alignSelf: 'flex-start',
      padding: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  faqLabel: {
      fontSize: 18,
      alignSelf: 'flex-start',
      padding: 15
  },
  faqText: {
    padding:15
  },
  profileImage:{
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginBottom: 20
  }

});

export default DynamicSettingScreen;
