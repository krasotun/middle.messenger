import { Router } from './core/Router.ts';
import { SignInPage } from './pages/sign-in-page';
import { SignUpPage } from './pages/sign-up-page';

export default () => {
  console.log('boot');

  const router = new Router();

  router.use('/', SignInPage, {});
  router.use('/sign-up', SignUpPage, {});

  router.start();
};
