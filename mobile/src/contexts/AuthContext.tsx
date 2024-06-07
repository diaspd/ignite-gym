import { createContext } from "react";

import type { UserDTO } from "src/dto/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);
