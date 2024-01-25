import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Post from './Pages/Post';
import EditPost from './Pages/EditPost';
import NewPost from './Pages/NewPost';


const App = () => {
  const router = createBrowserRouter([
    { name: 'Home', path: '/', element: <Home /> },
    { name: 'Post', path: '/posts/:id', element: <Post /> },
    { name: 'EditPost', path: '/posts/:id/edit', element: <EditPost /> },
    { name: 'NewPost', path: '/new-post', element: <NewPost /> },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
