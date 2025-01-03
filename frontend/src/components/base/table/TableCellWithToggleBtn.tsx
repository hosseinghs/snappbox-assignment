import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
  

export default function TableCellWithToggleBtn({ isOpen, onToggle }: { isOpen:boolean; onToggle: () => void }) {
    return (
        <IconButton
          className='w-[10%] mr-1'
          onClick={onToggle}
        >
          {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
    )
}