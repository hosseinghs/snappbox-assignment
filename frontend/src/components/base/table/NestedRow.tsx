import { useState } from "react";
import {
  Table,
  Collapse,
  TableRow,
  TableCell,
  TextField,
  TableBody,
  IconButton,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const NestedRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [commissionNumber, setCommissionNumber] = useState(row.commissionNumber);

  const handleEdit = (e) => {
    setCommissionNumber(e.target.value);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>
          <TextField
            value={commissionNumber}
            onChange={handleEdit}
            variant="standard"
          />
        </TableCell>
      </TableRow>
      {row.children && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small" aria-label="nested table">
                <TableBody>
                  {row.children.map((child, index) => (
                    <NestedRow key={index} row={child} />
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default NestedRow;
