import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView, VStack } from 'native-base';
import DashboardItem from '../../components/DashboardItem';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <VStack space='3' style={styles.stack}>
          <DashboardItem
            title='WORK'
            description='Total number of workers'
            count={36}
            bg='#01BACA'
            avatar='https://cdn.discordapp.com/attachments/1093560069800603702/1115738336221478912/Barber-avatar-icon-barbershop-and-hairdresser-Vector-Image.png'
          />
          <DashboardItem
            title='WORKER'
            description='Total number of workers'
            count={47}
            isRtl
            bg='#FF9C2B'
            avatar='https://cdn.discordapp.com/attachments/1093560069800603702/1115738670830465104/img_avatar-png-499498-.png'
          />
          <DashboardItem
            title='TOTAL RATING'
            description='Total count of work comments'
            count={156}
            bg='#F178B6'
            avatar='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeQ7GkzeGFki2qqrbQkw2sC8h1ugnNZAsHTg&usqp=CAU'
          />
          <DashboardItem
            title='WORK RATING'
            description='Total count of work comments'
            count={21}
            isRtl
            bg='#37BC9B'
            avatar='https://cdn-icons-png.flaticon.com/512/246/246562.png'
          />

          <DashboardItem
            title='WORKER RATING'
            description='Total count of worker comments'
            count={52}
            bg='#7D0D0D'
            avatar='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWfVQcWSpq7D_Yokqc0IeQBGb98j_U4nIWdg&usqp=CAU'
          />
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
