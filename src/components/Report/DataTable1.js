import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'type', headerName: 'Type', width: 70 },
  { field: 'userName', headerName: 'Username', width: 130 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 200,
  },
  {
    field: 'password',
    headerName: 'Password',
    type: 'password',
    width: 100,
  },
  {
    field: 'contactNo',
    headerName: 'ContactNo',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  {type:'abc', id: 1,userName:'abc01',email:'abc@getMinimalContentHeight.com', lastName: 'Snow', firstName: 'Jon', contactNo: 123456 },
 
 
];

export default function DataTable() {
  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}