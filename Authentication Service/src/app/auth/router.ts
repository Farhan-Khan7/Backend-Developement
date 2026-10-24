import express from 'express';
import type { Router } from 'express';
import { AuthenticationController } from './controller';
import { restrictToAuthenticationUser } from '../middlewares/auth.middleware';

const authenticationController = new AuthenticationController()

export const authRouter: Router = express.Router()

authRouter.post('/sign-up' , authenticationController.handleSignup.bind(authenticationController))
authRouter.post('/log-in' , authenticationController.handleLogin.bind(authenticationController))

authRouter.get('/me' , restrictToAuthenticationUser() , authenticationController.handleMe.bind(authenticationController))

