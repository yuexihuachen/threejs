import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import constants from './utils/constants';
import Layout from './container/layout';
import {lazy} from 'react'

const { routes: routeConfig } = constants;

const routes = () => {
  return routeConfig.map(({ path, name }) => {
    return {
      path,
      Component: lazy(() => import(`./pages/${name}.tsx`))
    }
  })
}

const router = createBrowserRouter([{
  path: '/',
  Component: Layout,
  children: routes()
}]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
