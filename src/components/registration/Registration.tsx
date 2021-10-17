import { useState, useContext, FormEvent } from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

import styles from "./Registration.module.css";
import FormItem, { formItemError } from "../formItem/FormItem";
import { UserContext, UserActionTypes, FormActionTypes } from "../../data";

import { createUser } from "../../data/apiEndpoints";

export default function Registration() {
    const userContext = useContext(UserContext);
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confrimPW, setConfirmPW] = useState("");
    const [errors, setErrors] = useState<formItemError[]>();

    const validate = (): formItemError[] => {
        const _errors = [];

        if (!email)
            _errors.push({ item: "email", message: "Please enter your email" });

        if (!password)
            _errors.push({ item: "password", message: "Please enter your password" });

        if (!confrimPW)
            _errors.push({
                item: "confirm",
                message: "Please enter password confirmation",
            });

        const emailPattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );

        const pwPatternDigit = new RegExp(/.*[0-9].*/);

        if (!pwPatternDigit.test(password)) {
            _errors.push({
                item: "password",
                message: "Password must contain at least 1 digit",
            });
        }

        const pwPatternLowerCase = new RegExp(/.*[a-z].*/);

        if (!pwPatternLowerCase.test(password)) {
            _errors.push({
                item: "password",
                message: "Password must contain at least 1 small letter",
            });
        }

        const pwPatternUpperCase = new RegExp(/.*[A-Z]/);

        if (!pwPatternUpperCase.test(password)) {
            _errors.push({
                item: "password",
                message: "Password must contain at least 1 capital letter",
            });
        }

        const pwPatternSpecial = new RegExp(/.*?[#?!@$%^&*-]/);

        if (!pwPatternSpecial.test(password)) {
            _errors.push({
                item: "password",
                message: "Password must contain at least 1 special character",
            });
        }

        if (password.length < 8) {
            _errors.push({
                item: "password",
                message: "Password must be at least 8 characters long",
            });
        }

        if (!emailPattern.test(email))
            _errors.push({ item: "email", message: "Invalid Email" });

        if (password !== confrimPW)
            _errors.push({
                item: "confirm",
                message: "Password and Confirm password do not match",
            });

        return _errors;
    };

    const submitForm = async (e: FormEvent) => {
        e.preventDefault();
        const errs = validate();

        if (errs.length === 0) {
            //   const response = await testRequest();
            const response = await createUser(email, password);
            console.log("register", response);

            if (!response) {
                userContext.showModal("Error", "There was no response")
                return;
            }

            if (response.status === 200) {
                const user_id = response.data.id;
                console.log("user_id: ", user_id);

                userContext.showModal("Success", "You have succesfully registered");
                userContext.userDispatch({ type: UserActionTypes.SET_ID, payload: user_id });
                userContext.formDispatch({ type: FormActionTypes.RESET_FORM })
                history.push("/create");
            } else if (response.status === 422) {

                const response_error = [];
                for (const key in response.data) {
                    const err_array = response.data[key];

                    for (let x = 0; x < err_array.length; x++) {
                        response_error.push({
                            item: key,
                            message: err_array[x],
                        });
                    }
                }
                console.log("allerors", response_error);
                setErrors(response_error);
            } else {
                userContext.showModal("Error", "I can't reach the server");
            }
        } else {
            setErrors(errs);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.welcome}>Registration</div>
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

                <FormItem
                    id="confirm"
                    label="Confirm Password"
                    name="confirm"
                    type="password"
                    value={confrimPW}
                    setter={setConfirmPW}
                    errors={errors}
                />

                <Button className={styles.button} variant="contained" type="submit">
                    Register
                </Button>
            </form>
        </div>
    );
}
