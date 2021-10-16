
export interface FormState {
  user_id: number | string;
  step: number;
  errors: string[];
  first_name: string,
  last_name: string,
  phone: string,
  address_1: string,
  address_2: string,
  city: string,
  country: string,
  zip_code: string,
  [key: string]: any;
}

interface InitialFormState {
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  address_1: string;
  address_2?: string;
  city: string;
  country: string;
  zip_code: string;
  step: number;
  errors?: any[] | undefined,
}

export enum FormActionTypes {
  SET_USER_ID = "SET_USER_ID",
  HANDLE_FORM_ITEM = "HANDLE_FORM_ITEM",
  SET_STEP = "SET_STEP",
  SET_ERRORS = "SET_ERRORS"
}

export interface FormAction {
  type: FormActionTypes,
  payload?: any,
  field?: any

}

const formReducer = (state: FormState, action: FormAction): FormState | any => {

  const { type, payload, field } = action;

  switch (type) {
    case "SET_USER_ID":
      return { ...state, user_id: payload };
    case "HANDLE_FORM_ITEM":
      return {
        ...state,
        [field]: payload,
      };
    case "SET_STEP":
      return { ...state, step: payload };
    case "SET_ERRORS":
      return { ...state, errors: payload };
    default:
      return state;
  }
};

const initialFormState: InitialFormState = {
  user_id: "",
  first_name: "",
  last_name: "",
  phone: "",
  address_1: "",
  address_2: "",
  city: "",
  country: "",
  zip_code: "",
  step: 0,
  errors: [{ intitial: "error" }],
};

export { initialFormState, formReducer };
