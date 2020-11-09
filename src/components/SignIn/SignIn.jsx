import React, { useState } from 'react';

import { useAuthState } from '../../context/authContext/authContext';

const SignIn = () => {
  const { login } = useAuthState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    login(email, password);
    setEmail('');
    setPassword('');
  };

  const changeHandler = (event) => {
    console.log(event.target.value);
    const { name, value } = event.currentTarget;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={changeHandler}
          value={email}
          autoComplete="email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={changeHandler}
          value={password}
          autoComplete="current-password"
          required
        />
      </div>
      <button type="submit">SignIn</button>
    </form>
  );
};

export default SignIn;
