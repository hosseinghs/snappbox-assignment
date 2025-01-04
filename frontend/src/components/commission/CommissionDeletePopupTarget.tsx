import { Delete } from "@mui/icons-material"
import { CircularProgress, IconButton } from "@mui/material";

interface IProps {
    loading?: boolean;
    openPopup: () => void | Promise<void>
}

export default function CommissionDeletePopupTarget({ loading, openPopup }: IProps) {
    return (
        <IconButton onClick={openPopup}>
            { loading ? <CircularProgress /> : <Delete /> }
        </IconButton>
    )
}