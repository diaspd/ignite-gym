import { HStack, Heading, Icon, Text, VStack } from "native-base";
import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto 
        source={{ uri: 'https://github.com/diaspd.png' }}
        size={16}
        alt="Imagem do usuário"
        mr={4}
      />
      
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá
        </Text>
      
        <Heading color="gray.100" fontSize="md">
          Pedro
        </Heading>
      </VStack>

      <TouchableOpacity>
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