import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import WorkerList from '../../components/WorkerList';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDyF_dX0eMwvw3MGmsnUsP1NHybRGzMAzE',
  authDomain: '388749525367-1frbbgeg507rmt9kcmujicr26qet5058.apps.googleusercontent.com',
  projectId: 'byteme-a2fdf',
  storageBucket: 'byteme-a2fdf.appspot.com',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function TabTwoScreen() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const workersCollectionRef = collection(db, 'workers');
        const workersSnapshot = await getDocs(workersCollectionRef);
        const workersData = workersSnapshot.docs ? workersSnapshot.docs.map((doc) => doc.data()) : [];
        setWorkers(workersData);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
    calculateAveragePuan();
  }, []);

  const calculateAveragePuan = async () => {
    try {
      const worksCollectionRef = firebase.firestore().collection('workers');
      const worksSnapshot = await worksCollectionRef.get();

      // Iterate over each work document
      for (const workDoc of worksSnapshot.docs) {
        const workData = workDoc.data();

        // Get the comments collection for the current work
        const commentsCollectionRef = workDoc.ref.collection('comments');
        const commentsSnapshot = await commentsCollectionRef.get();

        let totalPuan = 0;
        let commentCount = 0;

        // Iterate over each comment document
        commentsSnapshot.docs.forEach((commentDoc) => {
          const commentData = commentDoc.data();
          totalPuan += commentData.puan;
          commentCount++;
        });

        // Calculate average puan
        const averagePuanValue = commentCount > 0 ? totalPuan / commentCount : 0;

        // Update the work with the average puan
        workData.rating = averagePuanValue;

        // Update the work document in Firestore
        await workDoc.ref.update({ rating: averagePuanValue });
      }

      // Get the updated works data
      const updatedWorks = worksSnapshot.docs.map((workDoc) => workDoc.data());

      setWorkers(updatedWorks);
    } catch (error) {
      console.error('Error calculating average puan:', error);
    }
  };

  return (
    <View style={styles.container}>
      <WorkerList data={workers} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
