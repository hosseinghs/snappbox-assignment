import { TableCell } from "@mui/material";
import { ITableAction } from "./type";

interface IProps<T> {
  row: T;
  actions: ITableAction<T>[];
}

export default function TableActionsCell<T> ({ row, actions }: IProps<T>) {
    return (
        <TableCell className="flex items-center justify-center">
          {actions.map((action) => (
            <span key={action.key} title={action.label}>
              {action.render(row)}
            </span>
          ))}
      </TableCell>
    )
} 