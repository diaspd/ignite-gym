import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/Home';
import { Exercise } from '@screens/Exercise';
import { History } from '@screens/History';
import { Profile } from '@screens/Profile';

import HomeSvg from '@assets/images/home.svg';
import HistorySvg from '@assets/images/history.svg';
import ProfileSvg from '@assets/images/profile.svg';
import { useTheme } from 'native-base';
import { Platform } from 'react-native';

type AppRoutes = {
  home: undefined;
  exercise: { exerciseId: string};
  profile: undefined;
  history: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6]

  return (
    <Navigator screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.green[500],
      tabBarInactiveTintColor: colors.gray[200],
      tabBarStyle: {
        backgroundColor: colors.gray[600],
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 'auto' : 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[7]
      }
    }}
    >
      <Screen 
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg 
              fill={color} 
              width={iconSize} 
              height={iconSize}
            />
          )
        }}
      />

      <Screen 
        name='history'
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg 
              fill={color} 
              width={iconSize} 
              height={iconSize}
            />
          )
        }}
      />

      <Screen 
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg 
              fill={color} 
              width={iconSize} 
              height={iconSize}
            />
          )
        }}
      />

      <Screen 
        name='exercise'
        component={Exercise}
        options={{ tabBarButton: () => null}}
      />
    </Navigator>
  );
}