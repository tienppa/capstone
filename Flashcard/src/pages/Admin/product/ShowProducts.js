import React from 'react';
import Header from '../../Admin/product/AddProduct';
import useDataTable from '../../../components/admins/component/DataTable';
import * as constants from './Constants';

function ShowProducts() {
  const {
    DataTable,
    hasSelected,
    currentPage,
    pageSize,
    resetPagination,
  } = useDataTable({
    columns: constants.columns,
    dataSource: constants.data,
    updateEntityPath: 'update-product',
  });



  return (
    <>
      <DataTable />
    </>
  );
}

export default ShowProducts;
