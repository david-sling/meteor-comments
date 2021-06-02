import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const LoginForm = () => {
  const [authForm, setAuthForm] = useState({ username: "", password: "" });

  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(authForm.username, authForm.password, (error) => {
      if (!error) return;
      if (error?.message === "User not found [403]")
        Accounts.createUser(authForm);
      else alert(error);
    });
  };

  const changeAuthForm =
    (field) =>
    ({ target: { value } }) => {
      setAuthForm({ ...authForm, [field]: value });
    };

  return (
    <form onSubmit={submit} className="login-form">
      {["username", "password"].map((field) => (
        <>
          <label htmlFor="username">{field}</label>
          <input
            type="text"
            placeholder={field}
            name={field}
            required
            onChange={changeAuthForm(field)}
          />
        </>
      ))}

      <button type="submit">LOG IN</button>
    </form>
  );
};
