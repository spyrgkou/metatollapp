import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data, keyLabel }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} keyLabel={keyLabel} />
    </table>
  );
};

export default Table;
