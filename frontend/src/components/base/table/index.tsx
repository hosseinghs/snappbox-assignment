import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Paper, Table, TableContainer } from "@mui/material";

import TableBody from "./TableBody";
import TableHeader from './TableHeader';
import TableLoading from "./TableLoading";
import type { ITableProps } from "./type";

export default function BaseTable<T extends { children?: T[] }>({
  rows,
  loading,
  columns,
  actions,
  hasCheckbox,
  onSelectionChange,
  addOrRemoveSubCategory,
}: ITableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [areAllRowsSelected, setAreAllRowsSelected] = useState(false);
  const selectedRowsRef = useRef<Map<T, boolean>>(new Map());

  const flattenedRows = useMemo(() => {
    const flattenRows = (rows: T[]) => {
      return rows.reduce((acc: T[], row) => {
        if (row.children) acc.push(...flattenRows(row.children));
        return acc;
      }, []);
    };
    return flattenRows(rows);
  }, [rows]);

  const allTopLevelRowsSelected = useMemo(() => {
    return rows.every((row) =>
      selectedRowsRef.current.has(row) ||
      (row.children && row.children.every((child) => selectedRowsRef.current.has(child)))
    );
  }, [rows]);

  useEffect(() => {
    setAreAllRowsSelected(allTopLevelRowsSelected);
  }, [allTopLevelRowsSelected]);

  useEffect(() => {
    if (onSelectionChange) onSelectionChange(selectedRows);
  }, [selectedRows, onSelectionChange]);

  const handleRowSelect = useCallback((row: T, isSelected: boolean) => {
    if (isSelected) selectedRowsRef.current.set(row, true);
    else selectedRowsRef.current.delete(row);

    const updatedSelectedRows = Array.from(selectedRowsRef.current.keys());
    setSelectedRows(updatedSelectedRows);

    if (row.children) row.children.forEach((child) => handleRowSelect(child, isSelected));
  }, []);

  const handleSelectAll = useCallback(() => {
    if (areAllRowsSelected) {
      selectedRowsRef.current.clear();
      setSelectedRows([]);
    } else {
      flattenedRows.forEach((row) => selectedRowsRef.current.set(row, true));
      setSelectedRows(flattenedRows);
    }
  }, [flattenedRows, areAllRowsSelected]);

  if (loading) return <TableLoading />;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHeader<T> 
          columns={columns}
          hasCheckbox={hasCheckbox}
          handleSelectAll={handleSelectAll}
          actionCellTitle={actions?.length ? 'actions' : '' }
          areAllRowsSelected={areAllRowsSelected}
        />
        <TableBody<T>
           rows={rows}
           columns={columns}
           actions={actions}
           hasCheckbox={hasCheckbox}
           selectedRows={selectedRows}
           handleRowSelect={handleRowSelect}
           addOrRemoveSubCategory={addOrRemoveSubCategory} 
        />
      </Table>
    </TableContainer>
  );
}
