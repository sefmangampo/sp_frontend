import { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";

import styles from "./Welcome.module.css";
import { UserContext } from "../../data";

/*
  Index Page:
    Displays the current user Id
    and a test button for the sample modal

*/

export default function Welcome() {
  //usercontext contains a userid state, it's reducer and a modal command
  const userContext = useContext(UserContext);
  const { user_id, name } = userContext.userState;
  const [displayName, setDisplayName] = useState("");

  //display user
  useEffect(() => {
    console.log(userContext.userState);
    if (user_id === 0) {
      setDisplayName("Anonymous");
    } else {
      setDisplayName(`User: ${name}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  const clickHandler = () => {
    userContext.showModal("Welcome", "I am the modal which will be used later");
  };

  return (
    <div className={styles.container}>
      <h1>Hello {displayName}</h1>
      <Button onClick={clickHandler} variant="contained">
        Show Modal
      </Button>
    </div>
  );
}
