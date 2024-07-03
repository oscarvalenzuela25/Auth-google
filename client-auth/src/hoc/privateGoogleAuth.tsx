import { FC, useEffect, useState } from 'react';
import useGoogleAuth from '../hooks/useGoogleAuth';

const privateGoogleAuth = (Component: FC) => {
  const GoogleAuth = () => {
    const [ready, setReady] = useState(false);
    const { logout, verifyAccessToken } = useGoogleAuth();

    useEffect(() => {
      const validateData = async () => {
        const isValidToken = await verifyAccessToken();
        if (isValidToken) {
          setReady(true);
        } else {
          logout();
        }
      };

      validateData();
    }, []);

    return ready ? (
      <Component />
    ) : (
      <>
        <p>Cargando...</p>
      </>
    );
  };

  return GoogleAuth;
};

export default privateGoogleAuth;
