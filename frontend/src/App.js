import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';


const App = () => {
  const router = createBrowserRouter([
    { name: 'Home', path: '/', element: <Home /> },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
