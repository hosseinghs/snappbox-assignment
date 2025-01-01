import { TableBody as MuiTableBody } from "@mui/material";
  
import TableNestedRow from "./TableNestedRow";
import TableEmptyState from "./TableEmptyState";
import type { ITableProps } from "./type";

type ITableBodyProps<T> = ITableProps<T> & {
    selectedRows: T[];
    handleRowSelect: (row: T, isSelected: boolean) => void;
}

export default function TableBody<T>({ 
    rows,
    columns,
    hasCheckbox,
    selectedRows,
    handleRowSelect,
}: ITableBodyProps<T>) {
    return(
        <MuiTableBody>
          {rows?.length > 0 ? (
            rows.map((row, i: number) => (
              <TableNestedRow<T>
                key={i}
                row={row}
                cols={columns}
                isSelected={selectedRows.includes(row)}
                hasCheckbox={hasCheckbox}
                onRowSelect={handleRowSelect}
                selectedRows={selectedRows}
              />
            ))
          ) : <TableEmptyState />}
        </MuiTableBody>
    )
}