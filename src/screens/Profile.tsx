import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { Center, ScrollView, VStack, Text, Heading } from 'native-base'

import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { ProfileSkeleton } from '@components/ProfileSkeleton'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export const PHOTO_SIZE = 33

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil'/>

      <ScrollView>
        <Center mt={6} px={8}>
          {isLoading ? (
            <ProfileSkeleton />
          ): (
          <>
            <UserPhoto 
              source={{ uri: 'https://github.com/diaspd.png'}}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />

            <TouchableOpacity>
              <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                Alterar foto
              </Text>
            </TouchableOpacity>

            <Input placeholder='Nome' bg="gray.600" />

            <Input 
              bg="gray.600" 
              placeholder="E-mail"
              isDisabled
            />

            <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12}>
              Alterar senha
            </Heading>

            <Input 
              bg="gray.600"
              placeholder='Senha antiga'
              secureTextEntry
            />

            <Input 
              bg="gray.600"
              placeholder='Nova senha'
              secureTextEntry
            />

            <Input 
              bg="gray.600"
              placeholder='Confirme a nova senha'
              secureTextEntry
            />  

            <Button title='Atualizar' mt={4}/>
          </>
          )}
        </Center>
      </ScrollView>
    </VStack>
  )
}