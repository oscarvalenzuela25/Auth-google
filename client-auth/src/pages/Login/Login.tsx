import useGoogleAuth from '../../hooks/useGoogleAuth';

const Login = () => {
  const { login } = useGoogleAuth({ redirectAfterLogin: '/' });
  return <button onClick={() => login()}>Ingresar</button>;
};

export default Login;
