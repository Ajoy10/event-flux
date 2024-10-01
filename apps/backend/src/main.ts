import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';

import morgan from 'morgan';

// import router from './routes';
import Auth from './submodules/Auth';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

// set up morgan middleware
app.use(morgan('tiny'));

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:4200'],
  })
);

// Auth setup

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
Auth.setup(process.env.GOOGLE_AUTH_CLIENT_ID, process.env.GOOGLE_AUTH_SECRET);

app.use('/auth', Auth.router); // Todo: Change it to routes/index.ts

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
