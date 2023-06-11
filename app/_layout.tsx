import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, useColorScheme } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { SSRProvider } from '@react-aria/ssr';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SSRProvider>
      <NativeBaseProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen
              name='add/work'
              options={{ presentation: 'card', headerTitle: 'Add Work' }}
            />
            <Stack.Screen
              name='rate/work/[id]'
              options={{ presentation: 'modal', headerTitle: 'Rate & Comment - Work' }}
            />
            <Stack.Screen
              name='add/worker'
              options={{ presentation: 'card', headerTitle: 'Add Worker' }}
            />
            <Stack.Screen
              name='rate/worker/[id]'
              options={{ presentation: 'modal', headerTitle: 'Rate & Comment - Worker' }}
            />
          </Stack>
        </ThemeProvider>
      </NativeBaseProvider>
    </SSRProvider>
  );
}
