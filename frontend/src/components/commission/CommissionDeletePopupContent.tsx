import { Button } from "@mui/material"
import { Warning } from '@mui/icons-material';

interface IProps {
    onCancel: () => void;
    onConfirm: () => void;
}

export default function CommissionDeletePopupContent({ onCancel, onConfirm }: IProps) {
    return (
        <>
            <div>
                <Warning />
                are u sure u want to procceed?
            </div>
            <div className="flex items-center gap-2 mt-1">
                <Button variant="outlined" onClick={onCancel}>no</Button>
                <Button variant="contained" onClick={onConfirm}>yes</Button>
            </div>
        </>
    )
}