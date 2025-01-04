import {
    Checkbox,
    TableRow,
    TableCell,
    TableHead,
  } from "@mui/material";
import type { IColumn } from "./type";
interface IProps<T> {
  columns: IColumn<T>[];
  hasCheckbox?: boolean;
  actionCellTitle?: string;
  handleSelectAll: () => void;
  areAllRowsSelected: boolean;
}

export default function TableHeader<T>({
    columns,
    hasCheckbox,
    handleSelectAll,
    actionCellTitle,
    areAllRowsSelected,
}: IProps<T>) {
    return (
        <TableHead>
          <TableRow>
            {hasCheckbox && (
              <TableCell align="center">
                <Checkbox
                  checked={areAllRowsSelected}
                  onChange={handleSelectAll}
                />
              </TableCell>
            )}
            {columns.map((col) => (
              <TableCell align="center" key={col.key}>
                {col.label}
              </TableCell>
            ))}
            {actionCellTitle && <TableCell align="center">{actionCellTitle}</TableCell>}
          </TableRow>
        </TableHead>
    )
}