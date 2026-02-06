import { Router, Routes } from './core/';
import { SignInPage } from './pages/sign-in-page';
import { SignUpPage } from './pages/sign-up-page';

export default () => {
  console.log('boot');

  const router = new Router();

  router.use(Routes.SignInPage, SignInPage, {});
  router.use(Routes.SignUpPage, SignUpPage, {});

  router.start();
};
