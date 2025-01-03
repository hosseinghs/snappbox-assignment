import { useEffect, useState, useCallback, useRef } from "react";
import {
  Table,
  Checkbox,
  Collapse,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import TableCellWithToggleBtn from "./TableCellWithToggleBtn";

import type { IColumn } from "./type";

interface IProps<T> {
  row: T;
  cols?: IColumn<T>[]; 
  isSelected: boolean;
  hasCheckbox?: boolean;
  selectedRows: T[];
  onRowSelect: (row: T, isSelected: boolean) => void;
  handleSubCategoryData: (data: T) => void;
}

export default function TableNestedRow<T extends { children?: T[] }>({
  row,
  cols,
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
      <TableRow>
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
            <TableCell align="center" key={col.key}>
              {col.collapseParent && (
                <TableCellWithToggleBtn isOpen={open} onToggle={handleToggle} />
              )}
              {col.render
                ? col.render(row)
                : col.formatter
                ? col.formatter(row)
                : row[col.key]}
            </TableCell>
          ))}
      </TableRow>

      {/* Render nested rows in a scrollable container */}
      {row.children && (
        <TableRow>
          <TableCell colSpan={cols?.length || 3} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <div
                style={{
                  maxHeight: "300px", // Adjust this height based on your needs
                  overflowY: "auto", // Enable vertical scrolling
                }}
                ref={tableBodyRef}
              >
                <Table size="small" aria-label="nested table">
                  <TableBody>
                    {visibleChildren.map((child: T, index: number) => (
                      <TableNestedRow
                        key={index}
                        row={child}
                        cols={cols}
                        isSelected={selectedRows.includes(child)}
                        hasCheckbox={hasCheckbox}
                        onRowSelect={onRowSelect}
                        selectedRows={selectedRows}
                        handleSubCategoryData={handleSubCategoryData}
                      />
                    ))}
                    {loadingMore && (
                      <TableRow>
                        <TableCell colSpan={cols?.length || 3} align="center">
                          Loading more...
                        </TableCell>
                      </TableRow>
                    )}
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
