import { useState } from "react";
import { Edit, Check } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import { updateComissionByIdAPI } from "@/services/comissions";
import type { ICommission } from "@/services/comissions/type";

export default function CommissionEditAction({
  row,
  isEdit,
  onEdit,
  onSave,
}: {
  row: ICommission;
  isEdit: boolean;
  onEdit: () => void;
  onSave: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const updateCommission = async () => {
    try {
      setLoading(true);
      await updateComissionByIdAPI(row);
      onSave(); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton className="ml-1 px-3" onClick={isEdit ? updateCommission : onEdit}>
      {loading ? (
        <CircularProgress />
      ) : isEdit ? (
        <Check />
      ) : (
        <Edit />
      )}
    </IconButton>
  );
}
