import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslationContext } from './Translation';

const ActivityItem = ({ activity }) => {
  let points;
  switch (activity.priority) {
    case 'High':
      points = 10;
      break;
    case 'Medium':
      points = 5;
      break;
    case 'Low':
      points = 2;
      break;
    default:
      points = 0;
  }

  return (
    <View style={styles.activityItem}>
      <Text style={styles.activityText}>{activity.name}</Text>
      <Text style={styles.pointsText}>Points: {points}</Text>
    </View>
  );
};

const OverallPage = () => {
  const route = useRoute();
  const [imageSource, setImageSource] = useState(require('./../assets/wood.jpg'));
  const [score, setScore] = useState(0);
  const [completedActivities, setCompletedActivities] = useState([]);
  const { completedHabitDetails } = route.params || {};
  const { translations } = useTranslationContext();

  useEffect(() => {
   if (completedHabitDetails && route.params.points > 0) {
     setCompletedActivities((prevActivities) => [
       ...prevActivities,
       completedHabitDetails,
     ]);

     setScore((prevScore) => prevScore + route.params.points);

     if (score + route.params.points >= 50) {
      setImageSource(require('./../assets/diamond.jpg'));
    }
     else if (score + route.params.points >= 40) {
      setImageSource(require('./../assets/gold.jpg'));
    }
     else if (score + route.params.points >= 30) {
      setImageSource(require('./../assets/silver.jpg'));
    } else if (score + route.params.points >= 20) {
      setImageSource(require('./../assets/bronze.jpg'));
    }
    else if (score + route.params.points >= 10) {
      setImageSource(require('./../assets/iron.jpg'));
    }
    else if (score + route.params.points >= 0) {
      setImageSource(require('./../assets/wood.jpg'));
    }
   }
 }, [completedHabitDetails, route.params]);


  console.log('endDcompletedHabitDetails:', completedHabitDetails);

  const activities = [
    { id: '1', name: 'High', priority: 'High' },
    { id: '2', name: 'Medium', priority: 'Medium' },
    { id: '3', name: 'Low', priority: 'Low' },
  ];


 const handleActivityCompletion = (activity) => {
  const completedActivity = {
    name: completedHabit,
    priority: completedPriority,
    startDate: startDate,
    endDate: endDate,
  };

  setCompletedActivities((prevActivities) => [...prevActivities, completedActivity]);
};

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.scoreContainer}>
      <Image source={imageSource} style={styles.image} />
        <Text style={styles.scoreText}>{translations['Score']} {score}</Text>
      </View>


      <View style={styles.historyContainer}>
        <Text style={styles.historyHeaderText}>{translations['CompletedActivities']}</Text>
        {completedActivities.length === 0 ? (
          <View>
            <Image source={require('./../assets/wind.jpg')} style={styles.noActivityImage}/>
            <Text style={styles.noActivityText}>{translations['NoActivityCompleted']}</Text>
          </View>
        ) : (
        <ScrollView>
        {completedActivities.map((activity) => (
          <View style={styles.completedActivity}>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.cellLabel}>{translations['Habit']}</Text>
                <Text style={styles.cellValue}>{activity.habit}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellLabel}>{translations['Priority']}</Text>
                <Text style={styles.cellValue}>{activity.priority}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellLabel}>{translations['StartDate']}</Text>
                <Text style={styles.cellValue}>{activity.startDate.toLocaleDateString()}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.cellLabel}>{translations['EndDate']}</Text>
                <Text style={styles.cellValue}>{activity.endDate.toLocaleDateString()}</Text>
              </View>
            </View>
          </View>
          ))}
        </ScrollView>
         )}
      </View>



      <View style={styles.activityContainer}>
        <Text style={styles.activityHeaderText}>{translations['PriorityScore']}</Text>
        <FlatList
          data={activities}
          renderItem={({ item }) => (
              <ActivityItem activity={item} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  historyContainer: {
    flex: 2,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  historyHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  activityContainer: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  activityHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  activityText: {
    fontSize: 18,
    color: '#333',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5c6ac4',
    paddingRight: 10
  },
  table: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cellLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 50,
    marginTop: 50,
    borderWidth: 4,
    borderColor: '#5c6ac4'
  },
  noActivityText:{
    fontSize: 24,
    alignSelf: 'center',
    paddingTop: 50
  },
  noActivityImage: {
    width: 180,
    height: 160,
    alignSelf: 'center',
  }

});

export default OverallPage;
