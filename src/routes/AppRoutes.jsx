import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

const AppRoutes = () => {
  const routeElements = useRoutes(routes);
  return routeElements;
};

export default AppRoutes;