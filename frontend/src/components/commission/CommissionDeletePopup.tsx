import { useState } from "react"

import CustomPopup from "@/components/base/CustomPopup"
import CommissionDeletePopupTarget from './CommissionDeletePopupTarget'
import CommissionDeletePopupContent from "./CommissionDeletePopupContent";

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
            open={showPopup}
            onClose={closePopup}
            bodyContent={<CommissionDeletePopupContent onCancel={closePopup} onConfirm={deleteCommission} />}
            targetElement={<CommissionDeletePopupTarget openPopup={openPopup} loading={loading} />}
        />
    ) 
}