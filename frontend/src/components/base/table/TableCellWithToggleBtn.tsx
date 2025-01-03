import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
  

export default function TableCellWithToggleBtn({ isOpen, onToggle }: { isOpen:boolean; onToggle: () => void }) {
    return (
        <IconButton
          style={{ width: "10%", marginRight: "4px" }}
          onClick={onToggle}
        >
          {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
    )
}