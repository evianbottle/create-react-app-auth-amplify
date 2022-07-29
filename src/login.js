import { Button, InputLabel, Input } from '@material-ui/core';
import React from 'react';

const Login = (props) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const submitSignIn = () => {
    alert("Signed in!")
  }
  return (
    <div>
      Login
      <form className="form">
        <InputLabel>Email Address</InputLabel>
        <Input value={email} type='email' onChange={(e,v) => setEmail(v)} />
        <InputLabel>Password</InputLabel>
        <Input value={password} type='password' onChange={(e,v) => setPassword(v)} />
        <Button onClick={() => submitSignIn()}>Submit</Button>
      </form>
    </div>
  )
}

export default Login