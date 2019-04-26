import React, { Component } from 'react';
import styled from 'styled-components';
import DefaultCard from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Auth from './Auth';

const Card = styled(DefaultCard)`
  width: 200px;
  margin: 0 auto;
  padding: 40px;
  margin-top: 40px;
`;

const ButtonWrapper = styled.div`
  padding-top: 30px;
`;

const FieldWrapper = styled.div`
  padding-top: 20px;
`;

export default class extends Component {
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        password: '',
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(event) {
    const field = event.target.name;
    const { user } = this.state;
    user[field] = event.target.value;

    this.setState({
      user,
    });
  }

  processForm(event) {
    event.preventDefault();
    const { user } = this.state;
    const email = encodeURIComponent(user.email);
    const password = encodeURIComponent(user.password);
    const formData = `email=${email}&password=${password}`;

    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: formData,
    }).then((response) => {
      if (response.status === 200) {
        this.setState({
          errors: {},
        });
        // save the token
        Auth.authenticateUser(response.token);
        // change the current URL to /
        // this.props.history.push('/');
      } else {
        // change the component state
        const errors = response.errors ? response.errors : {};
        errors.summary = response.message;
        this.setState({
          errors,
        });
      }
    });
  }

  render() {
    const { user, errors } = this.state;
    return (
      <Card>
        <form action="/" onSubmit={this.processForm}>
          <FieldWrapper>
            <TextField
              fullWidth
              placeholder="Email"
              name="email"
              errorText={errors.email}
              onChange={this.changeUser}
              value={user.email}
            />
          </FieldWrapper>
          <FieldWrapper>
            <TextField
              fullWidth
              placeholder="Password"
              type="password"
              name="password"
              onChange={this.changeUser}
              errorText={errors.password}
              value={user.password}
            />
          </FieldWrapper>
          <ButtonWrapper>
            <Button raised color="primary" fullWidth type="submit">Login</Button>
          </ButtonWrapper>
        </form>
      </Card>
    );
  }
}
