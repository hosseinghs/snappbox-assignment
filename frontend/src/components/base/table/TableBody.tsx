import { TableBody as MuiTableBody } from "@mui/material";
  
import TableNestedRow from "./TableNestedRow";
import TableEmptyState from "./TableEmptyState";
import type { ITableProps } from "./type";

type ITableBodyProps<T> = ITableProps<T> & {
    selectedRows: T[];
    handleRowSelect: (row: T, isSelected: boolean) => void;
    addOrRemoveSubCategory: (row: T) => void;
}

export default function TableBody<T extends { children?: T[] }>({ 
    rows,
    columns,
    actions,
    hasCheckbox,
    selectedRows,
    handleRowSelect,
    addOrRemoveSubCategory
}: ITableBodyProps<T>) {
    return(
        <MuiTableBody>
          {rows?.length > 0 ? (
            rows.map((row, i: number) => (
              <TableNestedRow<T>
                key={i}
                row={row}
                cols={columns}
                actions={actions}
                isSelected={selectedRows.includes(row)}
                hasCheckbox={hasCheckbox}
                onRowSelect={handleRowSelect}
                selectedRows={selectedRows}
                handleSubCategoryData={row => addOrRemoveSubCategory(row)}
              />
            ))
          ) : <TableEmptyState />}
        </MuiTableBody>
    )
}