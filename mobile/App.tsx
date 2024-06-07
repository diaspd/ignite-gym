import { StatusBar } from 'react-native';

import { NativeBaseProvider } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from '@routes/index';

import { THEME } from './src/theme'
import { Loading } from '@components/Loading';

import { AuthContext } from '@contexts/AuthContext'

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor='transparent'
        translucent
      />
      
      <AuthContext.Provider value={{
        user: {
          id: '1',
          name: 'Pedro Dias',
          email: 'pedro@email.com',
          avatar: 'diaspd.png'
        }
      }}>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>

    </NativeBaseProvider>
  );
}
