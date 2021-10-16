import { createContext } from "react";
import { FormState, FormAction } from "./formReducer";
import { UserState, UserAction } from "./userReducer";
import { Dispatch } from "react"

interface Store {
    userState: UserState,
    userDispatch: Dispatch<UserAction>,
    formState: FormState,
    formDispatch: Dispatch<FormAction>,
    showModal: any,
}

export const UserContext = createContext({} as Store);
