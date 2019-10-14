const config = {
  apiUrl: '/api/v1',
  userUrlAfterSignin: '/tickets',
  urlAfterSignout: '/signin',
  isDebug: true
};

const urls = {
  signin: {
    path: '/signin',
    name: 'Sign in',
    // component: SigninPage
  },
  signup: {
    path: '/signup',
    name: 'Sign up',
    // component: SignupPage
  },
  pricing: {
    path: '/pricing',
    name: 'Pricing',
    // component: PricingPage
  },
  forgot: {
    path: '/forgot',
    name: 'Password Forgot',
    // component: PasswordForgotPage
  },
  reset: {
    path: '/password_resets/:token',
    name: 'Password Reset',
    // component: PasswordResetPage
  },
  reset_ok: {
    path: '/reset_ok',
    name: 'Password Reset Success',
    // component: PasswordResetPageOk
  },
  help: {
    path: '/help',
    name: 'Help',
    // component: HelpPage
  },
  contact_us: {
    path: '/contact_us',
    name: 'Contact us',
    // component: ContactusPage
  },
  tickets: {
    path: '/tickets',
    name: 'Tickets',
    // component: TicketsPage
  },
  success: {
    path: '/200',
    name: 'Success',
    // component: SuccessPage
  },
  not_found: {
    path: '/404',
    name: 'Not Found',
    // component: NotFoundPage
  },
  coming_soon: {
    path: '/204',
    name: 'Coming Soon',
    // component: ComingSoonPage
  },
};
export { urls, config }