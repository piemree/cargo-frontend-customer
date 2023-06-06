import Dashboard from './views/pages/dashboard/Dashboard'
import Profile from './views/pages/profile/Profile'
import Support from './views/pages/support/Support'
import SupportDetail from './views/pages/supportDetail/SupportDetail'


const privateRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profil', element: Profile },
  { path: '/support', name: 'SupportDetail', element: Support },
  { path: '/support/:id', name: 'SupportDetail', element: SupportDetail },
]


export { privateRoutes }
