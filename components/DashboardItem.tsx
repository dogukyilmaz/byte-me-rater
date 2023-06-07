import { Image, Pressable, Text, View } from 'native-base';
import { View as ThemedView } from '../components/Themed';
import { StyleSheet } from 'react-native';

type DashboardItemProps = {
  title: string;
  description: string;
  count: number;
  avatar?: string;
  bg?: string;
  isRtl?: boolean;
};

const DashboardItem = ({
  title,
  description,
  count,
  avatar = 'https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg',
  bg = '#0891b2',
  isRtl,
}: DashboardItemProps) => {
  return (
    <ThemedView style={[styles.container, { backgroundColor: bg }]}>
      <View style={[styles.topContainer, { flexDirection: isRtl ? 'row-reverse' : 'row' }]}>
        <View style={styles.metaContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <Pressable style={[styles.button, { marginLeft: isRtl ? 'auto' : 0 }]}>
            <Text style={styles.buttonText}>{count}</Text>
          </Pressable>
        </View>
        <Image source={{ uri: avatar }} style={styles.avatar} alt='img' />
      </View>
    </ThemedView>
  );
};

export default DashboardItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'center',
    width: 375,
    maxWidth: '100%',
  },
  count: {
    color: '#fff',
    fontSize: 14,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  metaContainer: {
    justifyContent: 'space-between',
  },
  topContainer: {
    justifyContent: 'space-between',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  description: {
    color: 'white',
    marginTop: 5,
    fontSize: 17,
  },
  button: {
    backgroundColor: 'black',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
  },
});
