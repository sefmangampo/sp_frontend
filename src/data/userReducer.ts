interface InitialUserState {
  user_id: string | number,
  name: string
}

interface UserState {
  user_id: number | string;
  name: string
}

enum UserActionTypes {
  SET_ID = "SET_ID",
  SET_NAME = "SET_NAME",
  SIGN_OUT = "SIGN_OUT"
}

interface UserAction {
  type: UserActionTypes,
  payload?: number | string
}

const initialUserState: InitialUserState = { user_id: 0, name: "" };

const userReducers = (state: UserState, action: UserAction) => {

  const { type, payload } = action;

  switch (type) {
    case "SET_ID":
      return { ...state, user_id: payload };
    case "SET_NAME":
      return { ...state, name: payload };
    case "SIGN_OUT":
      return { user_id: 0 };
    default:
      return state;
  }
};

export { initialUserState, userReducers };
