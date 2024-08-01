import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import privateLoginAuth from './hoc/privateLoginAuth';
import privateGoogleAuth from './hoc/privateGoogleAuth';
import Login from './pages/Login';
import Home from './pages/Home';
import Lobby from './pages/Lobby/Lobby';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  const clientId = import.meta.env.VITE_CLIENT_ID || '';

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={privateLoginAuth(Login)} />
            <Route path="/lobby" component={privateGoogleAuth(Lobby)} />
            <Route path="/" component={privateGoogleAuth(Home)} />
          </Switch>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
