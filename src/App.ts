import "./App.css";

import {
  Registration,
  Welcome,
  Navigation,
  Signin,
  CreateProfile,
} from "./components";

import {
  initialUserState,
  userReducers,
  initialFormState,
  formReducer,
  UserContext,
} from "./data";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useReducer, useState, useEffect } from "react";

function App() {
  // 2 reducers to be passed to the context provider
  const [user, userDispatch] = useReducer(userReducers, initialUserState);
  const [form, formDispatch] = useReducer(formReducer, initialFormState);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // dirty trick, I made the local usestate setters of modal be lifted to the context provider
  // i could have created another reducer but it's my first time to create my own modal
  const [modalControls, setModalControls] = useState({
    visibilitySetter: null,
    titleSetter: null,
    bodySetter: null,
  });

  // the setters, become swallowed by another setter - so APP has control on the setters of modal
  const modalSetters = (visible, title, body) => {
    setModalControls({
      visibilitySetter: visible,
      titleSetter: title,
      bodySetter: body,
    });
  };

  // now app creates it's local function based on modals local setter the pass it to the context provider
  const showModal = (title = "", body = "") => {
    const { visibilitySetter, titleSetter, bodySetter } = modalControls;

    visibilitySetter(true);
    titleSetter(title);
    bodySetter(body);
  };

  // i use the 0 as flag for sign out
  useEffect(() => {
    setIsLoggedIn(user.user_id > 0 ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
    <UserContext.Provider
        value= {{
    userState: user,
      userDispatch: userDispatch,
        formState: form,
          formDispatch: formDispatch,
            showModal: showModal,
        }
}
      >
  <Navigation modalController={ modalSetters } />
    < Switch >
    <Route path="/" exact >
      <Welcome />
      < /Route>
      < Route path = "/register" >
        { isLoggedIn?<Redirect to = "/" /> : <Registration />}
          < /Route>
          < Route path = "/create" >
            { isLoggedIn?<Redirect to = "/" /> : <CreateProfile />}
              < /Route>
              < Route path = "/signin" >
                { isLoggedIn?<Redirect to = "/" /> : <Signin />}
                  < /Route>
                  < /Switch>
                  < /UserContext.Provider>
                  < /BrowserRouter>
  );
}

export default App;
