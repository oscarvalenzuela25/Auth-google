require('dotenv').config();
const express = require('express');
const { OAuth2Client, UserRefreshClient } = require('google-auth-library');
const cors = require('cors');
const moment = require('moment');

const app = express();

app.use(cors());
app.use(express.json());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const oAuth2Client = new OAuth2Client(clientId, clientSecret, 'postmessage');

// No tendra middleware de autenticacion
app.post('/auth/google', async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  // tokens
  // {
  //   access_token: string;
  //   refresh_token: string;
  //   scope: string;
  //   token_type: string;
  //   id_token: string;
  //   expiry_date: number;
  // }
  const accessTokenInfo = await oAuth2Client.getTokenInfo(tokens.access_token); // validate access token
  // accessTokenInfo
  // {
  //   accessTokenInfo: {
  //     expiry_date: number;
  //     scopes: string [];
  //     azp: string;
  //     aud: string;
  //     sub: string;
  //     exp: string;
  //     email: string;
  //     email_verified: string;
  //     access_type: string;
  //   },
  // };
  const verifyToken = await oAuth2Client.verifyIdToken({
    idToken: tokens.id_token,
    audience: clientId,
  });
  const userData = verifyToken.getPayload();
  // {
  //   iss: string;
  //   azp: string;
  //   aud: string;
  //   sub: string;
  //   email: string;
  //   email_verified: boolean;
  //   at_hash: string;
  //   name: string;
  //   picture: string;
  //   given_name: string;
  //   family_name: string;
  //   iat: number;
  //   exp: number;
  // };
  res.json({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expiry_date: tokens.expiry_date,
    email: userData.email,
    name: userData.name,
    picture: userData.picture,
  });
});

// Solo tendra middleware para verificar el access_token, no si esta expirado
app.post('/auth/google/refresh-token', async (req, res) => {
  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refresh_token
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  // {
  //   access_token: string;
  //   scope: string;
  //   token_type: string;
  //   id_token: string;
  //   expiry_date: number,
  //   refresh_token: string;
  // };

  res.json({
    access_token: credentials?.access_token,
    refresh_token: credentials?.refresh_token,
    expiry_date: credentials?.expiry_date,
  });
});

// Falta crear un endpoint con un get con un middleware que verifique el access_token y si esta expirado
app.get('/test', async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token is required' });
  }
  const accessTokenInfo = await oAuth2Client.getTokenInfo(
    req.headers.authorization.split(' ')[1]
  ); // validate access token

  const currentDate = moment();
  const isValidToken = currentDate.isBefore(accessTokenInfo.expiry_date);

  if (!isValidToken) {
    return res.status(401).json({ message: 'Token is expired' });
  }

  return res.json({ message: 'Hello World' });
});

app.listen(3000, () => console.log(`server is running`));
