import { useEffect, useState } from 'react'
import { VStack, FlatList, HStack, Heading, Text, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native';

import { api } from '@services/api';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';
import { AppError } from '@utils/AppError';


export function Home() {
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState(["Puxada frontal", "Remada curvada", "Remada unilateral", "Supino"])
  const [isGroupSelected, setIsGroupSelected] = useState("costas")

  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails(){
    navigation.navigate('exercise')
  }

  async function fetchGroups(){
    try {
      const response = await api.get('/groups')
      setGroups(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  useEffect(() => {
    fetchGroups();
  }, [])

  return (
    <VStack flex={1}>
      <HomeHeader />
    
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group 
          name={item} 
          isActive={isGroupSelected.toUpperCase() === item.toUpperCase()} 
          onPress={() => setIsGroupSelected(item)}
        />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 6 }}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={6}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList 
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard 
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20}}
        />
      </VStack>
    </VStack>
  )
}