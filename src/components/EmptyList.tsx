import { Center, Icon, Text } from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons'

type Props = {
  description: string;
  hasIcon: boolean;
  iconName?: string
}

export function EmptyList({description, hasIcon, iconName}: Props) {
  return (
    <Center>
      {hasIcon && (
        <Icon 
          as={MaterialCommunityIcons}
          name={iconName}
          color="gray.200"
          size={16}
          mb={2}
        />
      )}

      <Text color="gray.100" textAlign="center" fontSize="md">
        {description}
      </Text>
    </Center>  
  )
}