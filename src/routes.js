import Dashboard from './views/pages/dashboard/Dashboard'
import Profile from './views/pages/profile/Profile'


const privateRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profil', element: Profile },
]


export { privateRoutes }
