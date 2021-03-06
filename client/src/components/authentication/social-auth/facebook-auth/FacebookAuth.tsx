import React, { useContext } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { IsUserLoggedInContext } from '../../../../contexts/IsUserLoggedIn';
import authenticate from '../../../../api/auth';
import { useHistory } from 'react-router-dom';
import useStyles from './useStyles';

type FbResponse = {
  status?: string;
  accessToken: string;
  data_access_expiration_time: number;
  email: string;
  expiresIn: number;
  graphDomain: string;
  id: string;
  name: string;
  picture: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
  signedRequest: string;
  userID: string;
};

const FacebookAuth = () => {
  const history = useHistory();
  const classes = useStyles();
  const { setIsUserLoggedIn } = useContext(IsUserLoggedInContext);

  const responseFacebook = async (res: FbResponse) => {
    //when the user closes the popup window
    if (res.status === 'unknown') return;

    const user = {
      name: res.name,
      email: res.email,
      userProviderId: res.userID,
      authProvider: 'facebook',
    };

    try {
      const fetchedUser = await authenticate('soical', user);
      localStorage.setItem('car_catalog_login', JSON.stringify(fetchedUser));
      setIsUserLoggedIn(true);
      history.push('/catalog');
    } catch (err) {
      //the pop up handles the errors
    }
  };

  return (
    <div>
      <FacebookLogin
        appId='306159394138292'
        fields='name,email,picture'
        callback={responseFacebook}
        disableMobileRedirect={true}
        isMobile={false}
        autoLoad={false}
        render={renderProps => (
          <button className={classes.fbBtn} onClick={renderProps.onClick}>
            <div className={classes.fbBtnIcon}></div>
          </button>
        )}
      />
    </div>
  );
};
export default FacebookAuth;
