import { TextField } from "@mui/material";

interface IProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function CommissionInput ({ value, onValueChange }: IProps) {
  return (
    <div style={ { display: 'flex', alignItems: 'center', borderRadius: '6px', border: '1px solid #D3D8DD', maxWidth: '80px' } }>
        <TextField value={value} onChange={(e) => onValueChange(e.target.value)} size="small" />
        <div style={ { backgroundColor: '#F5F5F5', padding: '0 4px' } }>%</div>
    </div>
  );
};
