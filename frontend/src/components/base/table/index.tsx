'use client'

import {
  Box,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import NestedRow from "./NestedRow";

interface IProps<T> {
  rows: T[];
  loading?: boolean
}

export default function BaseTable<T> ({ loading, rows }: IProps<T>) {
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
            <TableCell />
            <TableCell>category</TableCell>
            <TableCell>commission</TableCell>
            <TableCell>promotion commission</TableCell>
            <TableCell>edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length && rows.map((row, i: number) => (
            <NestedRow key={i} row={row} />
          ))}

          {
            !rows?.length && <div>no data</div>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};
