import { FC, useEffect, useState } from 'react';
import useGoogleAuth from '../hooks/useGoogleAuth';

const privateLoginAuth = (Component: FC) => {
  const LoginAuth = () => {
    const [ready, setReady] = useState(false);
    const { user, push } = useGoogleAuth();

    useEffect(() => {
      if (user) {
        push('/', { replace: true });
      } else {
        setReady(true);
      }
    }, []);

    return ready ? <Component /> : <p>Validando...</p>;
  };

  return LoginAuth;
};

export default privateLoginAuth;
