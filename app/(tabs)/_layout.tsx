import FontAwesome from '@expo/vector-icons/Feather';
import { Link, Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import AddButton from '../../components/Button';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name='works'
        options={{
          title: 'Works',
          tabBarIcon: ({ color }) => <TabBarIcon name='list' color={color} />,
          headerRight: () => (
            <Link href='/add/work' asChild>
              <AddButton title='Add' />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='workers'
        options={{
          title: 'Workers',
          tabBarIcon: ({ color }) => <TabBarIcon name='users' color={color} />,
          headerRight: () => (
            <Link href='/add/worker' asChild>
              <AddButton title='Add' />
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
