import { TextField } from "@mui/material";

export default function CommissionInput () {
  return (
    <div style={ { display: 'flex', alignItems: 'center', borderRadius: '6px', border: '1px solid #D3D8DD', maxWidth: '80px' } }>
        <TextField size="small" />
        <div style={ { backgroundColor: '#F5F5F5', padding: '0 4px' } }>%</div>
    </div>
  );
};
