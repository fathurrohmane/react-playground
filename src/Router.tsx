import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotesPage } from './pages/notes/Notes.page';
import HomePage from './pages/home/Home.page';

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
