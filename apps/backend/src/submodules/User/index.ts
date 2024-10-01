import { findOrCreateUser } from './controllers';
import router from './routes';

const User = {
  router,
  findOrCreateUser,
};
export default User;
