interface IProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function CommissionInput ({ value, onValueChange }: IProps) {
  return (
    <div className="flex items-center justify-between max-w-16 h-10 border-[1px] border-gray-300 rounded-md">
        <input className="pl-2 max-w-10 outline-none bg-white" value={value} onChange={(e) => onValueChange(e.target.value)} type="text" />
        <div className="h-full flex items-center bg-[#F5F5F5]">%</div>
    </div>
  );
};
