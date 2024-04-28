import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import * as y from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import LogoSvg from '@assets/images/logo.svg'
import BackgroundImg from '@assets/background.png'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Controller, useForm } from 'react-hook-form'

type FormDataProps = {
  email: string;
  password: string;
}

const signUpSchema = y.object({
  email: y.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: y.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
})

export function SignIn() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });
  
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleGoToNewAccount() {
    navigation.navigate('signUp')
  }

  function handleSignIn({ email, password }: FormDataProps) {
    console.log({ email, password })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false}>
    <VStack flex={1} px={10} pb={16}>
      <Image 
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode='contain'
        position="absolute"
      />

      <Center my={24}>
        <LogoSvg />

        <Text color="gray.100" fontSize="sm">
          Treine sua mente e o seu corpo
        </Text>
      </Center>

      <Center>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
          Acesse sua conta
        </Heading>

        <Controller 
          control={control}
          name='email'
          render={({ field: { onChange, value }}) => (
          <Input 
            placeholder='E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={onChange}
            value={value}
            errorMessage={errors.email?.message}
          />
          )}
        />

        <Controller 
          control={control}
          name='password'
          render={({ field: { onChange, value }}) => (
          <Input 
            placeholder='Senha'
            secureTextEntry
            onChangeText={onChange}
            value={value}
            errorMessage={errors.password?.message}
          />
          )}
        />

        <Button 
          title='Acessar'
          onPress={handleSubmit(handleSignIn)}  
        />
      </Center>

      <Center mt={24}>
        <Text color="gray.100" fontFamily="body" fontSize="sm" mb={3}>
          Ainda não tem acesso?
        </Text>

        <Button
          title='Criar conta' 
          variant="outline"
          onPress={handleGoToNewAccount}
        />
      </Center>
    </VStack>
    </ScrollView>
  )
}