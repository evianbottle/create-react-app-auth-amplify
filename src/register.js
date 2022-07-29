import { Button, InputLabel, Input, Card, Grid } from '@material-ui/core';
import React from 'react';

const Register = (props) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const submitRegistration = () => {
    alert("Registered successfully")
  }

  return (
    <div className='login-title'>
      Registration form
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Card>
            <form>
              <InputLabel>Email Address</InputLabel>
              <Input value={email} type='email' onChange={(e,v) => setEmail(v)} />
              <InputLabel>Password</InputLabel>
              <Input value={password} type='password' onChange={(e,v) => setPassword(v)} />
              <div>
                <Button onClick={() => submitRegistration()}>Submit</Button>
              </div>
            </form>
          </Card>
        </Grid>
      </Grid>
      
    </div>
  )
}

export default Register