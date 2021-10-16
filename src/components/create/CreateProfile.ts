import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "@mui/material";

import styles from "./CreateProfile.module.css";

import FormItem from "../formItem/FormItem";
import { UserContext } from "../../data";
import { getUser, createProfile } from "../../data/apiEndpoints";

export default function CreateProfile() {
  //for redirection upon successful request
  const history = useHistory();

  //contains global UserState, global FormState, and modal stuff
  const userContext = useContext(UserContext);
  const [_errors, setErrors] = useState([]);

  const userDetails = async () => {
    const response = await getUser(userContext.userState.user_id);

    console.log("response", response);

    if (response && response.data.profile) {
      for (const key in response.data.profile) {
        const item = response.data.profile[key];

        if (key === "created_at" || key === "updated_at" || key === "id")
          continue;

        userContext.formDispatch({
          type: "HANDLE_FORM_ITEM",
          field: key,
          payload: item,
        });
      }
    }
  };

  //pass the user id from global user state to form state
  useEffect(() => {
    userContext.formDispatch({
      type: "SET_USER_ID",
      payload: userContext.userState.user_id,
    });

    userContext.formDispatch({ type: "SET_STEP", payload: 0 });

    userDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    first_name,
    last_name,
    phone,
    address_1,
    address_2,
    city,
    country,
    zip_code,
    step,
    errors,
  } = userContext.formState; // deconstruct global form state for the form items

  //proceed to part 2 of form
  const nextStep = () => {
    userContext.formDispatch({ type: "SET_STEP", payload: step + 1 });
  };

  //go back to first form
  const prevStep = () => {
    userContext.formDispatch({ type: "SET_STEP", payload: step - 1 });
  };

  //multi handler for form items, so i won't need to create every one of them
  const handleChange = (input) => {
    const { name, value } = input;
    userContext.formDispatch({
      type: "HANDLE_FORM_ITEM",
      field: name,
      payload: value,
    });
  };

  // validate name
  const validate = () => {
    const _errors = [];

    if (!first_name)
      _errors.push({ item: "first_name", message: "First name is required" });

    if (!last_name)
      _errors.push({ item: "last_name", message: "Last name is required" });

    return _errors;
  };

  // returns a button either next or prev
  const NavButton = (isforward = true) => {
    const caption = isforward ? "Next" : "Prev";
    const proceed = () => {
      if (isforward) {
        const errs = validate();

        if (errs.length > 0) {
          userContext.formDispatch({ type: "SET_ERRORS", payload: errs });
        } else {
          nextStep();
        }
      } else {
        userContext.formDispatch({ type: "SET_ERRORS", payload: [] });
        prevStep();
      }
    };
    return (
      <Button className={styles.button} onClick={proceed} variant="contained">
        {caption}
      </Button>
    );
  };

  // upon clicking submit button..
  const submitData = async () => {
    //remove the unecessary properties from the state
    const { errors, step, ...payload } = userContext.formState;

    const response = await createProfile(payload);

    if (response.status === 200) {
      userContext.showModal(
        "Success",
        "You have succesfully created your profile"
      );
      history.push("/");
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
      setErrors(response_error);
    } else {
      userContext.showModal("Error", "An error has occured");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>Create Profile</div>

      <div className={styles.form}>
        {step === 0 && (
          <div className={styles.formPage}>
            <div>
              <div className={styles.formItem}>
                <FormItem
                  id="first_name"
                  label="First Name"
                  name="first_name"
                  type="text"
                  value={first_name}
                  setter={handleChange}
                  errors={_errors}
                  multi={true}
                />

                <FormItem
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  type="text"
                  value={last_name}
                  setter={handleChange}
                  errors={_errors}
                  multi={true}
                />

                <FormItem
                  id="phone"
                  label="Phone"
                  name="phone"
                  type="text"
                  value={phone}
                  setter={handleChange}
                  errors={_errors}
                  multi={true}
                />
              </div>
            </div>
            <div className={styles.buttonContainer}>{NavButton(true)}</div>
          </div>
        )}

        {step === 1 && (
          <div className={styles.formPage}>
            <div>
              <FormItem
                id="address_1"
                label="Address 1"
                name="address_1"
                value={address_1}
                setter={handleChange}
                errors={_errors}
                multi={true}
              />
              <FormItem
                id="address_2"
                label="Address 2"
                name="address_2"
                value={address_2}
                setter={handleChange}
                errors={errors}
                multi={true}
              />
              <FormItem
                id="city"
                label="City"
                name="city"
                value={city}
                setter={handleChange}
                errors={_errors}
                multi={true}
              />
              <FormItem
                id="country"
                label="Country"
                name="country"
                value={country}
                setter={handleChange}
                errors={_errors}
                multi={true}
              />

              <FormItem
                id="zip_code"
                label="Zip Code"
                name="zip_code"
                value={zip_code}
                setter={handleChange}
                errors={_errors}
                multi={true}
              />
            </div>
            <div className={styles.buttonContainer}>
              {NavButton(false)}
              <Button
                className={styles.button}
                onClick={submitData}
                variant="contained"
              >
                Create
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
