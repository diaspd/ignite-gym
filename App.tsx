import { View, StatusBar } from 'react-native';

import { Box, NativeBaseProvider } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from '@components/components';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider>
      <StatusBar 
        barStyle="light-content"
        backgroundColor='transparent'
        translucent
      />
      
      {fontsLoaded ? <View /> : <Loading />}

    </NativeBaseProvider>
  );
}
