import { I18n } from 'helpers'

const config = {
  apiUrl: '/api/v1',
  userUrlAfterSignin: '/user/dashboard',
  urlAfterSignout: '/signin',
  isDebug: true
};

import icProfile from 'images/admin/profile.svg';
import notificationSrc from 'images/admin/notification.svg';

const urls = {
  home: {
    path: '/',
    name: I18n.t('nav_menu.home'),
    // component: HomePage
  },
  signin: {
    path: '/signin',
    name: I18n.t('nav_menu.sign_in'),
    className: 'ml-xl-5',
    // component: SigninPage
  },
  code2fa: {
    path: '/code2fa',
    name: 'Enter your code',
    // component: Code2faPage
  },
  signout: {
    path: '/signout',
    name: I18n.t('nav_menu.sign_out'),
    // component: SignOut
  },
  signup_with_reflink: {
    path: '/signup/ref=:rid',
    name: I18n.t('nav_menu.sign_up'),
    className: 'active',
    isActive: true,
    // component: SignupPage
  },
  signup: {
    path: '/signup',
    name: I18n.t('nav_menu.sign_up'),
    className: 'active',
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
    urls: {
      all: {
        path: '/user/tickets#all',
        name: 'All',
      },
      new: {
        path: '/user/tickets/new#',
        name: 'New ticket',
      },
    },
    // component: TicketsPage
  },
  user: {
    path: '/user',
    name: 'User Panel',
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
    name: 'New ticket',
    // component: TicketNewPage
  },
  notifications: {
    path: '/user/notifications',
    name: 'Notifications',
    imgSrc: notificationSrc,
  },
  user_dashboard: {
    path: '/user/dashboard',
    name: 'Dashboard',
    urls: {
      user_plans: {
        path: '/user/dashboard/#plans',
        name: 'Plans',
      },
      user_subscriptions: {
        path: '/user/dashboard/#subscriptions',
        name: 'Subscriptions',
      },
      user_billing: {
        path: '/user/dashboard/#billing',
        name: 'Billing',
      },
    }
  },
  user_payment: {
    path: '/user/payments',
    name: 'Payments',
    urls: {
      payment_methods: {
        path: '/user/payments/#payment_methods',
        name: 'Payment methods',
      },
      invoices: {
        path: '/user/payments/#invoices',
        name: 'Invoices',
      },
    }
  },
  user_downloads: {
    path: '/user/downloads',
    name: 'Downloads',
    urls: {
      openvpn_configs: {
        path: '/user/downloads#configs',
        name: 'OpenVPN configs',
      },
      apps: {
        path: '/user/downloads/#apps',
        name: 'Applications',
      },
    }
  },
  user_invite_friend: {
    path: '/user/refer_friend',
    name: 'Refer Friends',
  },
  user_account: {
    path: '/user/account',
    name: 'Account',
    imgSrc: icProfile,
    urls: {
      user_change_email: {
        path: '/user/account/#email',
        name: 'Change email',
      },
      user_change_password: {
        path: '/user/account/#password',
        name: 'Change password',
      },
      twofaAuth: {
        path: '/user/account/#twofaAuth',
        name: 'Two-factor authentication',
      },
      delete: {
        path: '/user/account/#delete',
        name: 'Delete Account',
      },
    }
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