import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../pages/Admin/dashboard/Dashboard';
import ShowCustomers from '../pages/Admin/customer/ShowCustomers';
import ShowProducts from '../pages/Admin/product/ShowProducts';
import AddProduct from '../pages/Admin/product/AddProduct';
import ShowStudent from 'pages/Admin/StudentManagement/ShowStudent';
import NotFound from 'components/NotFound';

const routes = [
  {
    path: '/admin',
    component: Dashboard,
    key: '/admin',
  },
  {
    path: '/admin/students',
    component: ShowStudent,
    key: '/students',
  },
  {
    path: '/add-product',
    component: AddProduct,
    key: '/add-product',
  },
  {
    path: '/add-a',
    component: AddProduct,
    key: '/add-product',
  },
];

function RoutingList() {
  return routes.map(item => {
    if (item.path.split('/').length === 2) {
      return (
        <Route
          exact
          path={item.path}
          component={item.component}
          key={item.key}
        />
      );
    }
    return <Route path={item.path} component={item.component} key={item.key} />;
  });
}

export default RoutingList;
