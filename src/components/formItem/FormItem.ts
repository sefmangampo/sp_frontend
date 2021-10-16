import { TextField } from "@mui/material";

import styles from "./FormItem.module.css";

export default function FormItem({
  id,
  label,
  name,
  type,
  value,
  setter,
  errors,
  multi = false,
}) {
  const handleChange = (e) => {
    if (multi) {
      setter(e.target);
    } else {
      setter(e.target.value);
    }
  };

  return (
    <div className={styles.formItem}>
      <TextField
        id={id}
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />

      {errors.map((error, key) => {
        return error.item === name ? (
          <div className={styles.errorMessage} key={`signin-${key}`}>
            {error.message}
          </div>
        ) : (
          ""
        );
      })}
    </div>
  );
}
