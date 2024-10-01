import { Router } from 'express';
import Auth from '../submodules/Auth';

const router = Router();

router.use('/auth', Auth.router); // Todo: Change it to routes/index.ts

export default router;
