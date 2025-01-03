interface IProps {
  value: number;
  isEdit: boolean;
  onValueChange: (value: string) => void;
}

export default function CommissionInput({ isEdit, value, onValueChange }: IProps) {
  return isEdit ? (
    <div className="flex items-center justify-between max-w-16 h-10 border-[1px] border-gray-300 rounded-md">
      <input
        value={value}
        type="text"
        className="pl-2 max-w-10 outline-none bg-white"
        onChange={(e) => onValueChange(e.target.value)}
      />
      <div className="h-full flex items-center bg-[#F5F5F5]">%</div>
    </div>
  ) : (
    <div>{value}%</div>
  );
}
