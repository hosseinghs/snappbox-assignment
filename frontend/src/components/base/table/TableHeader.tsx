import {
    Checkbox,
    TableRow,
    TableCell,
    TableHead,
  } from "@mui/material";
export default function TableHeader({
    columns,
    hasCheckbox,
    handleSelectAll,
    areAllRowsSelected,
}) {
    return (
        <TableHead>
          <TableRow>
            {hasCheckbox && (
              <TableCell>
                <Checkbox
                  checked={areAllRowsSelected}
                  onChange={handleSelectAll}
                />
              </TableCell>
            )}
            {columns.map((col) => (
              <TableCell key={col.key}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
    )
}