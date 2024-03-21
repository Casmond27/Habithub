import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTranslationContext } from './Translation';

const Settings = ({navigation}) => {
  const { translations } = useTranslationContext();
  const navigateToDynamicSettingScreen = (pageName) => {
    navigation.navigate('DynamicSettingScreen', { pageName });
  };



  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>

        <Image
          source={require('./../assets/user.png')}
          style={styles.profileImage}
        />

        <Text style={styles.profileName}>Casmond</Text>
      </View>
      <View style={styles.menuContainer}>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateToDynamicSettingScreen('Profile')}>
          <View style={styles.iconContainer}>
            <Icon name="user-circle" size={20} style={styles.menuIcon}/>
            <Text style={styles.menuItemText}>{translations['ViewProfile']}</Text>
          </View>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateToDynamicSettingScreen('Theme')}>
          <View style={styles.iconContainer}>
            <Icon name="moon-o" size={20} style={styles.menuIcon}/>
            <Text style={styles.menuItemText}>{translations['DarkMode']}</Text>
          </View>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateToDynamicSettingScreen('Language')}>
          <View style={styles.iconContainer}>
            <Icon name="language" size={20} style={styles.menuIcon}/>
            <Text style={styles.menuItemText}>{translations['Language']}</Text>
          </View>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateToDynamicSettingScreen('Notification')}>
          <View style={styles.iconContainer}>
            <Icon name="bell" size={20} style={styles.menuIcon}/>
            <Text style={styles.menuItemText}>{translations['Notification']}</Text>
          </View>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigateToDynamicSettingScreen('FAQs')}>
          <View style={styles.iconContainer}>
            <Icon name="question-circle" size={20} style={styles.menuIcon}/>
            <Text style={styles.menuItemText}>{translations['FAQs']}</Text>
          </View>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateToDynamicSettingScreen('Contact Us')}>
          <View style={styles.iconContainer}>
            <Icon name="envelope" size={20} style={styles.menuIcon}/>
            <Text style={styles.menuItemText}>{translations['ContactUs']}</Text>
          </View>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigateToDynamicSettingScreen('Review')}>
          <View style={styles.iconContainer}>
            <Icon name="star" size={20} style={styles.menuIcon}/>
            <Text style={styles.menuItemText}>{translations['ReviewAndSupport']}</Text>
          </View>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#5c6ac4',
    borderWidth: 2,
    marginRight: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 18,
    color: '#555',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuIcon: {
    marginRight: 15,
  },
});


export default Settings;
