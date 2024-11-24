import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, selectOrders } from '../../services/slices/userSlice';
import { getCookie } from '../../utils/cookie';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrders);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(getOrders());
  }, [dispath]);

  return <ProfileOrdersUI orders={orders} />;
};
