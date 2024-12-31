import { useState } from "react";
import {
  Table,
  Button,
  Checkbox,
  Collapse,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import CommissionInput from "@/components/commission/CommissionInput";
import { KeyboardArrowDown, KeyboardArrowUp, Edit, Check } from "@mui/icons-material";
import type { IColumn } from "./type";

interface IProps<T> {
  row: T;
  cols?: IColumn<T>[];
  isSelected: boolean;
  hasCheckbox?: boolean;
  selectedRows: T[];  // Pass selected rows to handle recursive selection
  onRowSelect: (row: T, isSelected: boolean) => void;  // Updated to include selection state
}

export default function TableNestedRow<T>({
  row,
  cols,
  isSelected,
  hasCheckbox,
  selectedRows,
  onRowSelect,
}: IProps<T>) {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <TableRow>
        {hasCheckbox && (
          <TableCell>
            <Checkbox
              checked={isSelected}
              onChange={() => onRowSelect(row, !isSelected)}  // Pass the selection state
            />
          </TableCell>
        )}
        {cols?.length && cols.map((col) => (
          <TableCell key={col.key}>
            {col.collapseParent && row[col.key]?.children && (
              <IconButton style={{ width: '10%', marginRight: '4px' }} onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            )}
            {editMode && ['commission_normal', 'commission_promotion'].includes(col.key) ? (
              <CommissionInput />
            ) : col.formatter ? (
              col.formatter(row)
            ) : (
              row[col.key]
            )}
          </TableCell>
        ))}
        <TableCell>
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? <Check /> : <Edit />}
          </Button>
        </TableCell>
      </TableRow>
      {row.children && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small" aria-label="nested table">
                <TableBody>
                  {row.children.map((child: T, index: number) => (
                    <TableNestedRow
                      key={index}
                      hasCheckbox={hasCheckbox}
                      row={child}
                      cols={cols}
                      onRowSelect={onRowSelect}
                      isSelected={selectedRows.includes(child)}  // Recursively pass selection state
                      selectedRows={selectedRows}  // Pass selected rows to children
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
