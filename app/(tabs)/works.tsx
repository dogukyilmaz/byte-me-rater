import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import WorkList from '../../components/WorkList';
import { WORKS } from '../../constants/works';

export default function WorksScreen() {
  const [search, setSearch] = useState('');

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <WorkList data={WORKS} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
