import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'

import LogoSvg from '@assets/images/logo.svg'
import BackgroundImg from '@assets/background.png'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { api } from '@services/api'

import { AppError } from '@utils/AppError'

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
  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      const response = await api.post('/users', { name, email, password});
      console.log(response)
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
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