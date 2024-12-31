import { useState } from "react";
import {
  Table,
  Checkbox,
  Collapse,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import type { IColumn } from "./type";
interface IProps<T> {
  row: T;
  cols?: IColumn<T>[];
  hasCheckbox?: boolean;
}

export default function NestedRow<T> ({ row, hasCheckbox, cols }: IProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        { hasCheckbox && <TableCell>
          <Checkbox />
        </TableCell> }
        { cols?.length && cols.map(col => (
          <TableCell key={col.key}>
            {
              col.collapseParent &&
                <IconButton style={{ width: '10%', marginRight: '4px' }} onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
            }
            { col.formatter ? col.formatter(row) : row[col.key] }
          </TableCell>
        )) }
        <TableCell>
        </TableCell>
      </TableRow>
      {row.children && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Table size="small" aria-label="nested table">
                  <TableBody>
                    {row.children.map((child: T, index: number) => (
                      <NestedRow hasCheckbox={hasCheckbox} key={index} row={child} cols={cols} />
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
