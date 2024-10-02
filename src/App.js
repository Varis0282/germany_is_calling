import React from 'react'
import { Loader } from './common/components';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import routes from './Routes/routes';

const App = () => {


  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Loader />}
      <RouterProvider router={routes} />
    </div>
  )
}

export default App