import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import WorkerList from '../../components/WorkerList';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

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
  }, []);

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
