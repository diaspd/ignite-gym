import { TouchableOpacity } from "react-native";
import { HStack, Heading, Icon, Text, VStack } from "native-base";

import { MaterialIcons } from '@expo/vector-icons'

import { useAuth } from "@hooks/useAuth";

import defaultUserAvatarImg from '@assets/userPhotoDefault.png'

import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
  const { user, signOut } = useAuth()

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto 
        source={user.avatar ? { uri: user.avatar } : defaultUserAvatarImg}
        size={16}
        alt="Imagem do usuário"
        mr={4}
      />
      
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
      
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon 
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  )
}