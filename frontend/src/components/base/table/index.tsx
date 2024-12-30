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

interface IProps {
  rows: any;
  loading?: boolean
}

export default function BaseTable ({ loading, rows }: IProps) {
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
            <TableCell>Name</TableCell>
            <TableCell>Commission Number</TableCell>
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
