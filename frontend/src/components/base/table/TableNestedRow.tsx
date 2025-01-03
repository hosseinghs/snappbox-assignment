import { useState } from "react";
import {
  Table,
  Checkbox,
  Collapse,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import TableCellWithToggleBtn from "./TableCellWithToggleBtn";

import type { IColumn } from "./type";

interface IProps<T> {
  row: T;
  cols?: IColumn<T>[];
  isSelected: boolean;
  hasCheckbox?: boolean;
  selectedRows: T[];
  onRowSelect: (row: T, isSelected: boolean) => void;
  handleSubCategoryData: (data: T) => void;
}

export default function TableNestedRow<T extends { children?: T[] }>({
  row,
  cols,
  isSelected,
  hasCheckbox,
  selectedRows,
  onRowSelect,
  handleSubCategoryData,
}: IProps<T>) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open)
    handleSubCategoryData(row)
  }

  return (
    <>
      <TableRow>
        {hasCheckbox && (
          <TableCell align="center">
            <Checkbox
              checked={isSelected}
              onChange={() => onRowSelect(row, !isSelected)}
            />
          </TableCell>
        )}
      {cols?.length &&
        cols.map((col) => (
          <TableCell align="center" key={col.key}>
            {col.collapseParent && <TableCellWithToggleBtn isOpen={open} onToggle={handleToggle} />}
            {col.render
              ? col.render(row)
              : col.formatter
              ? col.formatter(row)
              : row[col.key]}
          </TableCell>
      ))}
      </TableRow>

      {/* Render nested rows in a separate TableRow */}
      {row.children && (
        <TableRow>
          <TableCell colSpan={cols?.length || 3} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small" aria-label="nested table">
                <TableBody>
                  {row.children.map((child: T, index: number) => (
                    <TableNestedRow
                      key={index}
                      row={child}
                      cols={cols}
                      isSelected={selectedRows.includes(child)}
                      hasCheckbox={hasCheckbox}
                      onRowSelect={onRowSelect}
                      selectedRows={selectedRows}
                      handleSubCategoryData={handleSubCategoryData}
                    />
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
