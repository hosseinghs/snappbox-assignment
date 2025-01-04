import { useEffect, useState, useCallback, useRef } from "react";
import {
  Table,
  Checkbox,
  Collapse,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import TableLoading from "./TableLoading";
import TableActionsCell from "./TableActionsCell";
import TableCellWithToggleBtn from "./TableCellWithToggleBtn";

import type { IColumn, ITableAction } from "./type";

interface IProps<T> {
  row: T;
  cols?: IColumn<T>[]; 
  actions?: ITableAction<T>[];
  isSelected: boolean;
  hasCheckbox?: boolean;
  selectedRows: T[];
  onRowSelect: (row: T, isSelected: boolean) => void;
  handleSubCategoryData: (data: T) => void;
}

export default function TableNestedRow<T extends { children?: T[], hasChildren: boolean }>({
  row,
  cols,
  actions,
  isSelected,
  hasCheckbox,
  selectedRows,
  onRowSelect,
  handleSubCategoryData,
}: IProps<T>) {
  const [open, setOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleChildren, setVisibleChildren] = useState<T[]>([]); 
  
  const tableBodyRef = useRef<HTMLTableSectionElement | null>(null);
  
  const handleToggle = () => {
    setOpen(!open);
    if (!open && row.children) setVisibleChildren(row.children.slice(0, 10));
    else if (open) setVisibleChildren([]);

    handleSubCategoryData(row);
  };

  const loadMoreItems = useCallback(() => {
    if (loadingMore) return; 

    if (tableBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableBodyRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setLoadingMore(true); 

        setTimeout(() => {
          const nextItems = row.children?.slice(visibleChildren.length, visibleChildren.length + 10) || [];
          setVisibleChildren((prev) => [...prev, ...nextItems]);
          setLoadingMore(false);
        }, 300);
      }
    }
  }, [loadingMore, row.children, visibleChildren.length]);

  useEffect(() => {
    if (row.children && open) setVisibleChildren(row.children.slice(0, 10));
  }, [row, open]);

  useEffect(() => {
    const handleScroll = () => loadMoreItems();

    if (tableBodyRef.current) tableBodyRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (tableBodyRef.current) tableBodyRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [loadMoreItems]);

  return (
    <>
    <TableRow className="hover:bg-gray-200">
      {hasCheckbox && (
        <TableCell align="center">
          <Checkbox
            checked={isSelected}
            onChange={() => onRowSelect(row, !isSelected)}
          />
        </TableCell>
      )}
      {cols?.length &&
        cols.map((col) => (
          <TableCell className={col.collapseParent && open ? 'text-blue-500' : ''} colSpan={1} align="center" key={col.key}>
            {col.collapseParent && row?.hasChildren && (
              <TableCellWithToggleBtn isOpen={open} onToggle={handleToggle} />
            )}
            {col.render
              ? col.render(row)
              : col.formatter
              ? col.formatter(row)
              : row[col.key]}
          </TableCell>
        ))}
  
      {/* Render action buttons */}
      {actions && actions.length > 0 && <TableActionsCell row={row} actions={actions} />}
    </TableRow>
  
    {/* Render nested rows in a scrollable container */}
    {row.children && row.children.length > 0 && (
      <TableRow className="bg-gray-100">
        <TableCell id="nested__table" colSpan={12} className="p-0">
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div ref={tableBodyRef} className="overflow-y-auto max-h-[300px]">
              <Table size="small" aria-label="nested table">
                <TableBody>
                  {visibleChildren.map((child: T, index: number) => (
                    <TableNestedRow
                      key={index}
                      row={child}
                      cols={cols}
                      actions={actions}
                      isSelected={selectedRows.includes(child)}
                      hasCheckbox={hasCheckbox}
                      onRowSelect={onRowSelect}
                      selectedRows={selectedRows}
                      handleSubCategoryData={handleSubCategoryData}
                    />
                  ))}
                  {loadingMore && <TableLoading />}
                </TableBody>
              </Table>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    )}
  </>
  
  );
}
