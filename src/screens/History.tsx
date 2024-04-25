import { useState } from 'react'

import { Heading, VStack, SectionList, Text, Center, Icon } from 'native-base'

import { MaterialCommunityIcons } from '@expo/vector-icons'

import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryCard } from '@components/HistoryCard'
import { EmptyList } from '@components/EmptyList'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ["Puxada frontal", "Remada unilateral"]
    },
    {
      title: '27.08.22',
      data: ["Puxada frontal"]
    }
  ])
  
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      
      <SectionList 
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
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