import { useCallback, useState } from 'react'

import { Heading, VStack, SectionList, useToast } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'

import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO';

import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryCard } from '@components/HistoryCard'
import { EmptyList } from '@components/EmptyList'

export function History() {
  const [isLoading, setIsLoading] = useState(false)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);

      const response = await api.get('/history')
      setExercises(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar o histórico.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false);
    }
  }     
  
  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    },[exercises])
  )

  
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      
      <SectionList 
        sections={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <HistoryCard data={item} /> }
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3} fontFamily="heading">
            {section.title}
          </Heading>
        )}
        px={6}
        contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent: 'center'}}
        ListEmptyComponent={() => (
          <EmptyList 
            hasIcon
            iconName="weight-lifter"
            description={`Não há exercícios registrados ainda. ${'\n'} Vamos treinar hoje?`}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  )
}