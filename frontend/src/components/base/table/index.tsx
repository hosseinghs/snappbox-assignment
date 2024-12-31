'use client'

import {
  Box,
  Paper,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import NestedRow from "./NestedRow";
import type { ITableProps } from "./type";

export default function BaseTable<T>({ loading, rows, columns, hasCheckbox }: ITableProps<T>) {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {/* checkbox */}
            {hasCheckbox && <TableCell>
                <Checkbox />
            </TableCell>}
            {/* columns */}
            {columns.map((col) => (
              <TableCell key={col.key}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length > 0 ? (
            rows.map((row, i: number) => (
              <NestedRow<T> hasCheckbox={hasCheckbox} cols={columns} key={i} row={row} />
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
};
