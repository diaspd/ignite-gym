import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

import { Center, ScrollView, VStack, Text, Heading, useToast, Skeleton } from 'native-base'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export const PHOTO_SIZE = 33

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/diaspd.png')

  const toast = useToast();

  async function handleUserPhotoSelected(){
    setIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      });
  
      if (photoSelected.canceled) {
        return;
      }
  
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

        if(photoInfo.exists && (photoInfo.size  / 1024 / 1024 ) > 5){
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500',
            mt: 4
          })
        }

        setUserPhoto(photoSelected.assets[0].uri);
      
        return toast.show({
          title: 'Imagem atualizada com sucesso.',
          placement: 'top',
          bgColor: 'green.500',
          mt: 4
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil'/>

      <ScrollView contentContainerStyle={{ paddingBottom: 56}}>
        <Center mt={6} px={8}>
          {isLoading ? (
            <>
              <Skeleton 
                w={PHOTO_SIZE} 
                h={PHOTO_SIZE} 
                rounded="full" 
                startColor="gray.500"
                endColor="gray.400"
              />
        
              <Skeleton 
                w={20}
                h={4}
                mt={4} 
                mb={8}
                startColor="gray.500"
                endColor="gray.400"
                rounded="md"
              />
       
              {Array.from({ length: 2 }).map((_, i) => {
                return (
                  <Skeleton 
                    key={i}
                    w={342}
                    my={2}
                    h={14}
                    startColor="gray.500"
                    endColor="gray.400"
                    rounded="sm"
                  />
                )
              })}
       
              <Skeleton 
                w={24}
                h={6}
                mt={16} 
                startColor="gray.500"
                endColor="gray.400"
                rounded="md"
                ml={-56}
                mr={6} 
              />
             
              {Array.from({ length: 4 }).map((_, i) => {
                return (
                  <Skeleton 
                    key={i}
                    w={342}
                    h={14}
                    startColor="gray.500"
                    endColor="gray.400"
                    rounded="sm"
                    marginTop={i.valueOf() === 3 ? 10 : 3}
                  />
                )
              })}
           </>
          ) : (
          <>
            <UserPhoto 
              source={{ uri: userPhoto}}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />

            <TouchableOpacity onPress={handleUserPhotoSelected}>
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

            <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={10} fontFamily="heading">
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