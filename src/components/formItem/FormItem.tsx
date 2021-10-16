import { TextField } from "@mui/material";

import styles from "./FormItem.module.css";

interface formItemProps {
  id: string,
  label: string,
  name: string,
  type?: string,
  value: string,
  setter: EventTarget | any,
  errors?: any[] | [undefined],
  multi: boolean
}

export default function FormItem({
  id,
  label,
  name,
  type,
  value,
  setter,
  errors,
  multi = false,
}: formItemProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (multi) {
      setter(e.target);
    } else {
      setter(e.target.value);
    }
  };

  return (
    <div className={styles.formItem} >
      <TextField
        id={id}
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />

      {
        errors?.map((error, key) => {
          return error.item === name ? (
            <div className={styles.errorMessage} key={`signin-${key}`
            }>
              {error.message}
            </div>
          ) : (
            ""
          );
        })}
    </div>
  );
}
