import React, { Fragment, useState } from "react";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Password = ({
  value,
  onChange,
  autoComplete = "off",
  label = "Password",
  name,
  onBlur,
  fullWidth = false,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <InputLabel htmlFor={`outlined-adornment-password-${name}`}>
        {label}
      </InputLabel>
      <OutlinedInput
        fullWidth={fullWidth}
        id={`outlined-adornment-password-${name}`}
        type={showPassword ? "text" : "password"}
        autoComplete={autoComplete}
        value={value}
        name={name}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setShowPassword((state) => !state);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
};

export default Password;
