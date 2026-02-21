import { UsersController } from './controllers';
import { Router, Routes, Store } from './core/';
import { createRequireAuthGuard } from './core/auth-guard.ts';
import { ChangeAvatarPage } from './pages/change-avatar-page';
import { ChangePasswordPage } from './pages/change-password-page';
import { EditProfilePage } from './pages/edit-profile-page';
import { MainPage } from './pages/main-page';
import { SignInPage } from './pages/sign-in-page';
import { SignUpPage } from './pages/sign-up-page';

export default async () => {
  console.log('boot');

  const store = new Store();
  const usersController = new UsersController();

  await usersController.loadUserData();

  const router = new Router();
  const requireAuth = createRequireAuthGuard(store);

  const { pathname } = window.location as Location & { pathname: Routes };
  if (
    store.getState().userProfile &&
    (pathname === Routes.SignInPage || pathname === Routes.SignUpPage)
  ) {
    window.history.replaceState({}, '', Routes.MainPage);
  }

  router.use(Routes.SignInPage, SignInPage, {});
  router.use(Routes.SignUpPage, SignUpPage, {});
  router.use(Routes.MainPage, MainPage, {}, requireAuth);
  router.use(Routes.EditProfilePage, EditProfilePage, {}, requireAuth);
  router.use(Routes.ChangePasswordPage, ChangePasswordPage, {}, requireAuth);
  router.use(Routes.ChangeAvatarPage, ChangeAvatarPage, {}, requireAuth);

  router.start();
};
