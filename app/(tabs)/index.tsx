import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView, VStack } from 'native-base';
import DashboardItem from '../../components/DashboardItem';
import { DASHBOARD_ITEMS } from '../../constants/dashboard';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <VStack space='3' style={styles.stack}>
          {DASHBOARD_ITEMS.map((item, idx) => (
            <DashboardItem
              key={idx}
              title={item.title}
              description={item.description}
              count={item.count}
              bg={item.bg}
              avatar={item.avatar}
              isRtl={idx % 2 === 1}
            />
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
  stack: {},
});
