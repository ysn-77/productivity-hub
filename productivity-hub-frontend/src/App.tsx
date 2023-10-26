import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import LoginForm from './components/login/LoginForm';
import SignUpForm from './components/signUp/SignUpForm';
import Dashboard from './components/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />,
  },
  {
    path: '/signup',
    element: <SignUpForm />,
  },
  {
    path: '/notes',
    element: <Dashboard tab='Notes'/>,
  },
  {
    path: '/tasks',
    element: <Dashboard tab='Tasks' />,
  },
  {
    path: '*',
    element: <LoginForm />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
