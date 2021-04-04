import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { registerAction } from "../../Redux/Actions/userActions";
import { TextField, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "./register.css";

const Register = () => {
  const [formValue, setFormValue] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerAction(
        formValue.username,
        formValue.email,
        formValue.password,
        formValue.confirm_password,
        formValue.birthdate,
        formValue.phonenumber,
        formValue.profile_photo
      )
    );
    history.push("/login");
    console.log(formValue);
  };

  const handleChange = (e) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      Hello from register
      <form onSubmit={(e) => handleSubmit(e)} className="formContianer">
        <h1>Welcome to Tweeter, Register your account first:</h1>
        <TextField
          label="Username"
          variant="outlined"
          type="text"
          name="username"
          className="input"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          className="input"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="text"
          name="password"
          className="input"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="text"
          name="confirm_password"
          className="input"
          onChange={(e) => handleChange(e)}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TextField
            id="date"
            label="Birthday"
            type="date"
            defaultValue="2017-05-24"
            name="birthdate"
            className="input"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </MuiPickersUtilsProvider>
        <TextField
          label="Phone"
          variant="outlined"
          type="text"
          name="phonenumber"
          className="input"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          label="Profile Picture"
          variant="outlined"
          type="text"
          name="profile_photo"
          className="input"
          onChange={(e) => handleChange(e)}
        />
        <Button
          className="buttonSubmit"
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Register;
