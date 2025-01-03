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

import CustomPopup from "@/components/base/CustomPopup";
import CommissionInput from "@/components/commission/CommissionInput";
import { KeyboardArrowDown, KeyboardArrowUp, Edit, Check, Delete } from "@mui/icons-material";

import type { IColumn } from "./type";

interface IProps<T> {
  row: T;
  cols?: IColumn<T>[];
  isSelected: boolean;
  hasCheckbox?: boolean;
  selectedRows: T[];
  onRowSelect: (row: T, isSelected: boolean) => void;
  handleSubCategoryData?: (data: T) => void;
}

export default function TableNestedRow<T extends { children?: T[] }>({
  row,
  cols,
  isSelected,
  hasCheckbox,
  selectedRows,
  onRowSelect,
  onEditCommission,
  handleSubCategoryData,
}: IProps<T>) {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState<T>(row);
  const [editMode, setEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleValueChange = (key: keyof T, value: string) => {
    if (value) setRowData((prev) => ({
      ...prev,
      [key]: +value,
    }));
  };


  const handleEditRow = async (rowData) => {
    await onEditCommission(rowData)
    setEditMode(false);
  }

  const deleteRow = data => {
    console.log("data", data);
  }

  return (
    <>
      <TableRow>
        {hasCheckbox && (
          <TableCell align="center">
            <Checkbox
              checked={isSelected}
              onChange={() => onRowSelect(rowData, !isSelected)}
            />
          </TableCell>
        )}
        {cols?.length &&
          cols.map((col) => (
            <TableCell align="center" key={col.key}>
              {col.collapseParent && (
                <IconButton
                  style={{ width: "10%", marginRight: "4px" }}
                  onClick={() => {
                    handleSubCategoryData(rowData);
                    setOpen(!open);
                  }}
                >
                  {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              )}
              {editMode &&
              ["commission_normal", "commission_promotion"].includes(col.key) ? (
                <CommissionInput
                  value={rowData[col.key]}
                  onValueChange={(value) => handleValueChange(col.key, value)}
                />
              ) : col.formatter ? (
                col.formatter(rowData)
              ) : (
                rowData[col.key]
              )}

              {col.key === "table-action" && (
                <div className="flex justify-center items-center">
                  <IconButton
                    style={{ width: "10%", marginRight: "4px" }}
                    
                  >
                    {editMode ? <Check onClick={() => handleEditRow(rowData)} /> : <Edit onClick={() => setEditMode(!editMode)} />}
                  </IconButton>
                 
                 <CustomPopup
                    open={showPopup}
                    message="are u sure u want to procced?"
                    onClose={() => setShowPopup(false)}
                    onConfirm={() => deleteRow(rowData)}
                  >
                     <IconButton
                      style={{ width: "10%", marginRight: "4px" }}
                      onClick={() => setShowPopup(true)}
                      >
                        <Delete />
                      </IconButton>
                 </CustomPopup>
                
                </div>
              )}
            </TableCell>
          ))}
        
      </TableRow>

      {/* Render nested rows in a separate TableRow */}
      {rowData.children && (
        <TableRow>
          <TableCell colSpan={cols?.length || 3} style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small" aria-label="nested table">
                <TableBody>
                  {rowData.children.map((child: T, index: number) => (
                    <TableNestedRow
                      key={index}
                      hasCheckbox={hasCheckbox}
                      row={child}
                      cols={cols}
                      onRowSelect={onRowSelect}
                      isSelected={selectedRows.includes(child)}
                      selectedRows={selectedRows}
                      handleSubCategoryData={handleSubCategoryData}
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
