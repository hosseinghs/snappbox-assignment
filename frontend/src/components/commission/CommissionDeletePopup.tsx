import { useState } from "react"

import CustomPopup from "@/components/base/CustomPopup"
import { Delete } from "@mui/icons-material"
import { CircularProgress, IconButton } from "@mui/material";

import { deleteCommissionByIdAPI } from "@/services/comissions";

export default function CommissionDeletePopUp ({ id, removeCommissionFromList }: { id: number; removeCommissionFromList: (id: number) => void }) {
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const openPopup = () => setShowPopup(true)
    const closePopup = () => setShowPopup(false)

    const deleteCommission = async () => {
        try {
            setLoading(true)
            // await deleteCommissionByIdAPI(id)
            removeCommissionFromList(id)
        } finally {
            setLoading(false)
            closePopup()
        }
    }

    return (
        <CustomPopup 
            message="Are you sure you want to delete this commission?"
            open={showPopup}
            onClose={closePopup}
            onConfirm={deleteCommission}
        >
            <IconButton onClick={openPopup}>
                { loading ? <CircularProgress /> : <Delete /> }
            </IconButton>
        </CustomPopup>
    ) 
}