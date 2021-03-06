import React, { useContext } from 'react';
import { IsUserLoggedInContext } from '../../../../contexts/IsUserLoggedIn';
import authenticate from '../../../../api/auth';
import useStyles from './useStyles';
import GoogleLogin from 'react-google-login';

const GoogleAuth = () => {
  const classes = useStyles();
  const { setIsUserLoggedIn } = useContext(IsUserLoggedInContext);

  const responseGoogle = async (res: any) => {
    if (res.error === 'popup_closed_by_user' || !res.profileObj) return;

    const user = {
      name: res.profileObj.name,
      email: res.profileObj.email,
      userProviderId: res.profileObj.googleId,
      authProvider: 'google',
    };

    try {
      const fetchedUser = await authenticate('soical', user);
      localStorage.setItem('car_catalog_login', JSON.stringify(fetchedUser));
      setIsUserLoggedIn(true);
    } catch (err) {
      //the pop up handles the errors
    }
  };

  return (
    <div>
      <GoogleLogin
        clientId='1059315451607-0t2ot4ddi9cfs4i4hm2l8rcdfseai4o7.apps.googleusercontent.com'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        render={renderProps => (
          <button
            className={classes.googleBtn}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <div className={classes.googleBtnIcon}></div>
          </button>
        )}
      />
    </div>
  );
};
export default GoogleAuth;
