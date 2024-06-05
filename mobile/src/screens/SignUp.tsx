import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'

import LogoSvg from '@assets/images/logo.svg'
import BackgroundImg from '@assets/background.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = y.object({
  name: y.string().required('Informe o nome.'),
  email: y.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: y.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: y.string().required('Confirme a senha.').oneOf([y.ref('password')], 'A confirmação da senha não confere.')
})

export function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp({ name, email, password }: FormDataProps) {
    fetch('http://172.22.32.1:3333/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
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
          Crie sua conta
        </Heading>

        <Controller 
          control={control}
          name='name'
          render={({ field: { onChange, value }}) => (
           <Input 
             placeholder='Nome'
             onChangeText={onChange}
             value={value}
             errorMessage={errors.name?.message}
           />
          )}
        />

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

        <Controller 
          control={control}
          name='password_confirm'
          render={({ field: { onChange, value }}) => (
            <Input 
              placeholder='Confirmar a senha'
              secureTextEntry
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(handleSignUp)}
              returnKeyType='send'
              errorMessage={errors.password_confirm?.message}
            />
          )}
        />

        <Button 
          title='Criar e acessar'
          onPress={handleSubmit(handleSignUp)}  
        />
      </Center>

      <Button 
        title='Voltar para o login' 
        variant="outline"
        mt={16}
        onPress={handleGoBack}
      />
    </VStack>
    </ScrollView>
  )
}