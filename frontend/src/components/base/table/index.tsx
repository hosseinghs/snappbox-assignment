'use client'
import { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
} from "@mui/material";

import TableHeader from './TableHeader';
import TableLoading from "./TableLoading";
import TableNestedRow from "./TableNestedRow";
import type { ITableProps } from "./type";

export default function BaseTable<T>({
  loading,
  rows,
  columns,
  hasCheckbox,
}: ITableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [areAllRowsSelected, setAreAllRowsSelected] = useState(false);

  // Recursively select/deselect rows and their children
  const handleRowSelect = (row: T, isSelected: boolean) => {
    const updateSelection = (row: T) => {
      setSelectedRows((prevSelectedRows) => {
        const isRowSelected = prevSelectedRows.includes(row);

        if (isRowSelected && !isSelected) return prevSelectedRows.filter((r) => r !== row);  // Deselect row
        else if (!isRowSelected && isSelected) return [...prevSelectedRows, row];  // Select row
        return prevSelectedRows;
      });
      
      // If the row has children, recursively select/deselect them as well
      if (row.children) row.children.forEach(updateSelection);
    };

    updateSelection(row);  // Update selection for the parent and its children
  };

  // Handle "Select All" checkbox
  useEffect(() => {
    // Check if all the top-level rows (not including children) are selected
    const allTopLevelRowsSelected = rows.every((row) =>
      selectedRows.some((selectedRow) => selectedRow === row || (row.children && row.children.every((child) => selectedRows.includes(child))))
    );
  
    setAreAllRowsSelected(allTopLevelRowsSelected);
  }, [selectedRows, rows.length, rows]);
  

  const handleSelectAll = () => {
    if (areAllRowsSelected) setSelectedRows([]);
    else {
      const allRows = [];
      const selectAllRows = (rows: T[]) => {
        rows.forEach((row) => {
          allRows.push(row);
          if (row.children) selectAllRows(row.children);
        });
      };
      selectAllRows(rows);
      setSelectedRows(allRows);
    }
  };

  if (loading) return (<TableLoading />);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHeader columns={columns} hasCheckbox={hasCheckbox} handleSelectAll={handleSelectAll} areAllRowsSelected={areAllRowsSelected} />
        <TableBody>
          {rows?.length > 0 ? (
            rows.map((row, i: number) => (
              <TableNestedRow<T>
                key={i}
                hasCheckbox={hasCheckbox}
                cols={columns}
                row={row}
                onRowSelect={handleRowSelect}
                isSelected={selectedRows.includes(row)}
                selectedRows={selectedRows}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + (hasCheckbox ? 1 : 0)} align="center">
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
