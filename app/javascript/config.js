import I18n from 'i18n-js/index.js.erb'

const config = {
  apiUrl: '/api/v1',
  userUrlAfterSignin: '/user/tickets',
  urlAfterSignout: '/signin',
  isDebug: true
};

const urls = {
  user: {
    path: '/user',
    name: 'User Panel',
  },
  home: {
    path: '/',
    name: I18n.t('nav_menu.home'),
    // component: HomePage
  },
  signin: {
    path: '/signin',
    name: I18n.t('nav_menu.sign_in'),
    // component: SigninPage
  },
  signout: {
    path: '/signout',
    name: I18n.t('nav_menu.sign_out'),
    // component: SignOut
  },
  signup: {
    path: '/signup',
    name: I18n.t('nav_menu.sign_up'),
    isActive: true,
    // component: SignupPage
  },
  pricing: {
    path: '/pricing',
    name: I18n.t('nav_menu.pricing'),
    // component: PricingPage
  },
  features: {
    path: '/#features',
    name: I18n.t('nav_menu.features'),
    // component: Features
  },
  downloads: {
    path: '/#downloads',
    name: I18n.t('nav_menu.apps'),
    // component: AppDownloads
  },
  forgot: {
    path: '/forgot',
    name: I18n.t('nav_menu.password_forgot'),
    // component: PasswordForgotPage
  },
  reset: {
    path: '/password_resets/:token',
    name: I18n.t('nav_menu.password_reset'),
    // component: PasswordResetPage
  },
  reset_ok: {
    path: '/reset_ok',
    name: I18n.t('nav_menu.password_reset_ok'),
    // component: PasswordResetPageOk
  },
  help: {
    path: '/help',
    name: I18n.t('nav_menu.help'),
    // component: HelpPage
  },
  contact_us: {
    path: '/contact_us',
    name: I18n.t('nav_menu.contact_us'),
    // component: ContactusPage
  },
  tickets: {
    path: '/user/tickets',
    name: I18n.t('nav_menu.tickets'),
    // component: TicketsPage
  },
  tickets_view: {
    path: '/user/tickets/:id',
    name: 'View Ticket',
    // component: TicketViewPage
  },
  tickets_edit: {
    path: '/user/tickets/:id/edit',
    name: 'Edit Ticket',
    // component: TicketEditPage
  },
  tickets_new: {
    path: '/user/tickets/new',
    name: 'New Ticket',
    // component: TicketNewPage
  },
  user_dashboard: {
    path: '/user/dashboard',
    name: 'Dashboard',
  },
  user_plans: {
    path: '/user/dashboard/plans',
    name: 'Plans',
  },
  user_subscriptions: {
    path: '/user/dashboard/subscriptions',
    name: 'Subscriptions',
  },
  user_billing: {
    path: '/user/dashboard/billing',
    name: 'Billing',
  },
  user_payment: {
    path: '/user/payments',
    name: 'Payments',
  },
  user_downloads: {
    path: '/user/downloads',
    name: 'Downloads',
  },
  user_invite_friend: {
    path: '/user/invite_friend',
    name: 'Refer Friends',
  },
  user_account: {
    path: '/user/account',
    name: 'Account',
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
    path: '/coming_soon',
    name: 'Coming Soon',
    // component: ComingSoonPage
  },
  http204: {
    path: '/204',
    name: 'Coming Soon',
    // component: ComingSoonPage
  }
};
export { urls, config }