import useGoogleAuth from '../../hooks/useGoogleAuth';
import viteLogo from '/vite.svg';

const Home = () => {
  const { user, tokenData, logout, push } = useGoogleAuth();

  return (
    <>
      <div>
        {user ? (
          <img src={user.picture} className="logo" />
        ) : (
          <img src={viteLogo} className="logo" alt="Vite logo" />
        )}
      </div>
      <div className="card">
        <p>Token</p>
        {tokenData && <pre>{JSON.stringify(tokenData, null, 2)}</pre>}
        <p>--------------------------</p>
        <p>User</p>
        {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
      </div>
      <button onClick={() => push('/lobby')}>Ir al Lobby</button>
      {user ? (
        <button onClick={() => logout()}>Salir</button>
      ) : (
        <button onClick={() => push('/login')}>Ir al Login</button>
      )}
    </>
  );
};

export default Home;
