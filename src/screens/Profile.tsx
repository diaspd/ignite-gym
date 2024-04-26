import { Center, ScrollView, VStack, Skeleton } from 'native-base'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { useState } from 'react'
import { ProfileSkeleton } from '@components/ProfileSkeleton'

export const PHOTO_SIZE = 33

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil'/>
      <ScrollView>
        <Center mt={6} px={10}>
          {isLoading ? (
            <ProfileSkeleton />
          ): (
            <UserPhoto 
              source={{ uri: 'https://github.com/diaspd.png'}}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}
        </Center>

      </ScrollView>
    </VStack>
  )
}