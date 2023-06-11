import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import WorkerList from '../../components/WorkerList';

import { WORKERS } from '../../constants/workers';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <WorkerList data={WORKERS} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
