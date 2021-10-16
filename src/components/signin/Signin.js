import { useState, useContext } from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { UserContext } from "../../data";
import styles from "./SignIn.module.css";
import FormItem from "../formItem/FormItem";
import { signIn } from "../../data/apiEndpoints";

export default function Signin() {
  //redirection
  const history = useHistory();

  //global state
  const userContext = useContext(UserContext);

  //local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  //validation
  const validate = () => {
    const _errors = [];

    if (!email)
      _errors.push({ item: "email", message: "Please enter your email" });

    if (!password)
      _errors.push({ item: "password", message: "Please enter your password" });

    //reg ex for valid email
    var emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (!emailPattern.test(email))
      _errors.push({ item: "email", message: "Invalid Email" });
    return _errors;
  };

  //submit
  const submitForm = async (e) => {
    e.preventDefault();

    const errs = validate();

    if (errs.length === 0) {
      //axios here

      //  const response = await testRequest();
      const response = await signIn(email, password);

      if (response.status === 200) {
        const token = response.data.data;

        const decoded = jwt_decode(token.auth_token);

        userContext.showModal(
          "Success",
          `Here's your ID from the token: ${decoded.user_id}`
        );
        userContext.userDispatch({ type: "SET_ID", payload: decoded.user_id });
        userContext.userDispatch({ type: "SET_NAME", payload: token.email });
        history.push("/");
      } else if (response.status === 401) {
        userContext.showModal("Invalid Creds", response.data);
      } else {
        userContext.showModal("Error", "Something went wrong");
      }
    } else {
      setErrors(errs);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>Sign In</div>
      <form className={styles.form} onSubmit={submitForm}>
        <FormItem
          id="email"
          label="email"
          name="email"
          type="text"
          value={email}
          setter={setEmail}
          errors={errors}
        />

        <FormItem
          id="password"
          label="password"
          name="password"
          type="password"
          value={password}
          setter={setPassword}
          errors={errors}
        />

        <Button
          className={styles.button}
          variant="contained"
          type="submit"
          value="Submit"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
