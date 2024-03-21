import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslationContext } from './Translation';

function LanguageAPI() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { translations, updateTranslations } = useTranslationContext();
  const [translatedText, setTranslatedText] = useState('');
 const navigation = useNavigation();
  const apiKey = '33a0d208-627e-4447-f839-c5549bb40381:fx';

  const languages = {
    en: 'English',
    de: 'Deutsch',
    zh: '中文', // Chinese
    ja: '日本語', // Japanese
    fr: 'Français', // French
    ko: '한국어', // Korean
    ms: 'Bahasa Melayu', // Malay
    ta: 'தமிழ்', // Tamil
    id: 'Bahasa Indonesia', // Indonesian
    th: 'ไทย', // Thai
    vi: 'Tiếng Việt', // Vietnamese
  };


  const handleLanguageChange = (language) => {
  setSelectedLanguage(language);


  const translationPromises = Object.keys(translations).map((word) => {
    return translateText(word, language);
  });


  Promise.all(translationPromises)
    .then((translatedTexts) => {
      const translationsCopy = { ...translations };
      Object.keys(translations).forEach((word, index) => {
        translationsCopy[word] = translatedTexts[index];
      });


      updateTranslations(translationsCopy);
    })
    .catch((error) => {
      console.error('Error fetching translations:', error);
    });
};

    useEffect(() => {
    Object.keys(translations).forEach((word) => {
      translateText(word, selectedLanguage);
    });
  }, [selectedLanguage]);


  const translateText = (text, targetLanguage) => {
  console.log('Translating:', text);
  const url = 'https://api-free.deepl.com/v2/translate';

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `auth_key=${apiKey}&text=${encodeURIComponent(text)}&target_lang=${targetLanguage}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.translations && data.translations.length > 0) {
          resolve(data.translations[0].text);
        } else {
          reject('Translation failed.');
        }
      })
      .catch((error) => {
        console.error('Error fetching translation:', error);
        reject('Translation failed.');
      });
  });
};

  const handleCancel = () => {
      navigation.navigate('Settings');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translations['optionLanguage']}</Text>
      <View style={styles.languageTable}>
      {Object.keys(languages).map((language) => (
        <TouchableOpacity
          key={language}
          style={[
            styles.languageRow,
            selectedLanguage === language && styles.selectedLanguageRow,
          ]}
          onPress={() => handleLanguageChange(language)}
          testID={`languageButton_${language}`}
        >
          <Text style={styles.languageText}>{languages[language]}</Text>
        </TouchableOpacity>
         ))}
      </View>

      <View>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>{translations['Back']}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: 20,
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    width: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10
  },
  languageRow: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderColor: 'black',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  selectedLanguageRow: {
    backgroundColor: '#5c6ac4',
  },
  languageText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#5c6ac4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    margin: 30,
    borderRadius: 10,
    width: '30%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LanguageAPI;
