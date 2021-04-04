import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./login.css";
import { loginAction } from "../../Redux/Actions/userActions";
import { TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router";

const Login = () => {
  const [formInfo, setFormInfo] = useState({});
  const dispatch = useDispatch();
  const history=useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(formInfo.email, formInfo.password));
    history.push('/feed')
  };

  const handleChange = (e) => {
    setFormInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form__elements">
        <TextField
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          className='input'
          onChange={(e) => handleChange(e)}
          />
        <TextField
          label="Password"
          variant="outlined"
          type="text"
          name="password"
          className='input'
          onChange={(e) => handleChange(e)}
          />
        <Button className='buttonSubmit' variant="contained" color="primary" type="submit">
          Login
        </Button>
          </div>
      </form>
  );
};

export default Login;
