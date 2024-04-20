import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

type ButtonProps = IButtonProps & {
  title: string;
}

export function Button({title, ...rest}: ButtonProps) {
  return (
    <NativeBaseButton 
      w="full"
      h={14}
      bg="green.700"
      rounded="sm"
      _pressed={{ bg: 'green.500' }}
      {...rest}
    >
      <Text color="white" fontFamily="heading" fontSize="sm">
        {title}
      </Text>
    </NativeBaseButton>
  )
}