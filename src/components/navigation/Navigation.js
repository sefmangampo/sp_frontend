import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { UserContext } from "../../data";
import styles from "./Navigation.module.css";
import Modal from "../modal/Modal";

// modal controller props will fetch the local setters so parent can call them/ or give it to context provider
//to make them globally accessible
export default function Navigation({ modalController }) {
  const userContext = useContext(UserContext);
  const history = useHistory();
  const user_id = userContext.userState.user_id;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  useEffect(() => {
    setIsLoggedIn(user_id !== 0);
    modalController(setShowModal, setModalTitle, setModalBody); //give the setters to the parent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  const closeNav = () => {
    setOpen(false);
  };

  const onChangeHandler = (e) => {
    setOpen(e.target.checked);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //sign out action will just reset the global id to 0
  const handleSignOut = () => {
    userContext.userDispatch({ type: "SIGN_OUT" });
    history.push("/");
    closeNav();
  };

  /* eslint-disable jsx-a11y/anchor-is-valid */

  return (
    <div className={styles.container}>
      {showModal && (
        <Modal title={modalTitle} body={modalBody} closeMe={closeModal} />
      )}
      <nav className={styles.nav}>
        <input
          id="nav-toggle"
          className={styles.navToggle}
          type="checkbox"
          checked={open}
          onChange={onChangeHandler}
        />
        <ul className={styles.links}>
          <li>
            <Link onClick={closeNav} to="/">
              Home
            </Link>
          </li>

          {!isLoggedIn && (
            <li>
              <Link onClick={closeNav} to="/register">
                Register
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link onClick={closeNav} to="/create">
                Create Profile
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link onClick={closeNav} to="/signin">
                Sign In
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li onClick={handleSignOut}>
              <a href="#">Sign Out</a>
            </li>
          )}
        </ul>
        <label htmlFor="nav-toggle" className={styles.burgerLines}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </label>
      </nav>
    </div>
  );
}
