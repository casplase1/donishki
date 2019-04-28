import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const asyncCall = async () => {
  const cookie = new Cookies();
  const token = cookie.get('token');

  return fetch('/api/check-auth', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `bearer ${token}`,
    },
  }).then(async (response) => {
    // const responseData = await response.json();

    if (response.status !== 200) {
      throw new Error('Unauthorized');
    }

    return true;
  }).catch((e) => {
    console.log(e);
    return false;
  });
};

export default class extends React.Component {
  state = {
    isLoading: true,
    isAuthenticated: false,
  };

  componentDidMount() {
    asyncCall().then((isAuthenticated) => {
      this.setState({
        isLoading: false,
        isAuthenticated,
      });
    });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { isLoading, isAuthenticated } = this.state;

    if (isLoading) {
      return <div />;
    }

    return (
      <Route
        {...rest}
        render={props => (
          <div>
            {!isAuthenticated && <Redirect to={{ pathname: '/login' }} />}
            <Component {...props} />
          </div>
        )}
      />
    );
  }
}
