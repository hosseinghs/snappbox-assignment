'use client'
import { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableContainer,
} from "@mui/material";

import TableBody from "./TableBody";
import TableHeader from './TableHeader';
import TableLoading from "./TableLoading";
import type { ITableProps } from "./type";

export default function BaseTable<T extends { children?: T[] }>({
  rows,
  loading,
  columns,
  hasCheckbox,
  onSelectionChange
}: ITableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [areAllRowsSelected, setAreAllRowsSelected] = useState(false);

  const handleRowSelect = (row: T, isSelected: boolean) => {
    const updateSelection = (row: T) => {
      setSelectedRows((prevSelectedRows) => {
        const isRowSelected = prevSelectedRows.includes(row);

        const updatedSelection = isRowSelected && !isSelected
          ? prevSelectedRows.filter((r) => r !== row)
          : !isRowSelected && isSelected
          ? [...prevSelectedRows, row]
          : prevSelectedRows;

        return updatedSelection;
      });

      if (row.children) row.children.forEach(updateSelection);
    };

    updateSelection(row);
  };

  useEffect(() => {
    const allTopLevelRowsSelected = rows.every((row) =>
      selectedRows.some(
        (selectedRow) =>
          selectedRow === row ||
          (row.children &&
            row.children.every((child) => selectedRows.includes(child)))
      )
    );
    setAreAllRowsSelected(allTopLevelRowsSelected);
  }, [selectedRows, rows]);

  useEffect(() => {
    if (onSelectionChange) onSelectionChange(selectedRows);
  }, [selectedRows, onSelectionChange]);

  const handleSelectAll = () => {
    if (areAllRowsSelected) {
      setSelectedRows([]);
    } else {
      const allRows: T[] = [];
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
        <TableHeader<T> columns={columns} hasCheckbox={hasCheckbox} handleSelectAll={handleSelectAll} areAllRowsSelected={areAllRowsSelected} />
        <TableBody<T> rows={rows} columns={columns} selectedRows={selectedRows} handleRowSelect={handleRowSelect} hasCheckbox={hasCheckbox} />
      </Table>
    </TableContainer>
  );
}
