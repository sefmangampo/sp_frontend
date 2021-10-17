import React from "react";

import styles from "./Modal.module.css";
import { Button } from "@mui/material";

interface ModalParams {
  title: string;
  body: string;
  closeMe?: any;
}

export default function Modal({ title = "Title", body = "Body", closeMe }: ModalParams) {
  const closeHandler = (): void => {
    closeMe();
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <Button
            onClick={closeHandler}
            className={styles.closeButton}
            variant="contained"
          >
            X
          </Button>
        </div>

        <div className={styles.title}>
          <h3>{title}</h3>
        </div>
        <div className={styles.body}>
          <p className={styles.paragraph}>{body}</p>
        </div>
        <div className={styles.footer}>
          <Button
            onClick={closeHandler}
            className={styles.closeButton}
            variant="contained"
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
