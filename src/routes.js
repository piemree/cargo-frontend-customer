import Dashboard from './views/pages/dashboard/Dashboard'


const privateRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
]


export { privateRoutes }
