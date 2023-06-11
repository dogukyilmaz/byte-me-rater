import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import WorkList from '../../components/WorkList';
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

export default function WorksScreen() {
  const [works, setWorks] = useState([]);
  const [averagePuan, setAveragePuan] = useState(0);

  useEffect(() => {
    // Fetch works from Firestore
    const fetchWorks = async () => {
      try {
        const worksCollectionRef = firebase.firestore().collection('works');
        const snapshot = await worksCollectionRef.get();

        const worksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setWorks(worksData);
      } catch (error) {
        console.error('Error fetching works from Firestore:', error);
      }
    };

    fetchWorks();
  }, []);

  const calculateAveragePuan = async () => {
    try {
      const worksCollectionRef = firebase.firestore().collection('works');
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
  
      setWorks(updatedWorks);
    } catch (error) {
      console.error('Error calculating average puan:', error);
    }
  };
  
  
  

  calculateAveragePuan();

  return (
    <View style={styles.container}>
      <WorkList data={works} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
