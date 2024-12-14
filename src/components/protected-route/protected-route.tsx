import {
  selectIsAuthChecked,
  selectisAuthenticated
} from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isAuthenticated = useSelector(selectisAuthenticated);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!isAuthenticated && !onlyUnAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isAuthenticated && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
