import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { NotesPage } from './pages/Notes.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/notes',
    element: <NotesPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
