import React from "react";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/apiFetch/users";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

const columns = [
  {
    name: "User name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row) => row.role,
    sortable: false,
  },
  {
    name: "Edit",
    selector: (row) => <MdModeEditOutline />,
    sortable: false,
  },
  {
    name: "Delete",
    selector: (row) => <MdDelete />,
    sortable: false,
  },
];

const UserTable = ({ token, title }) => {
  const dispatch = useDispatch();
  console.log(token);
  const { loading, users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers(token));
  }, [token, dispatch]);
  return (
    <DataTable
      title={title}
      columns={columns}
      data={users}
      pagination
      progressPending={loading}
    />
  );
};

export default UserTable;