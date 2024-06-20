import { createContext, type ReactNode } from "react";

import type { UserDTO } from "src/dto/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider value={{
      user: {
        id: '1',
        name: 'Pedro',
        email: 'pedro@email.com',
        avatar: 'diaspd.png'
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}
