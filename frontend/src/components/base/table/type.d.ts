export interface IColumn<T> {
    key: string; 
    label: string;
    collapseParent?: boolean;
    formatter?: (val: T) => string 
}

export interface ITableProps<T> {
    rows: T[];
    columns: IColumn[];
    loading?: boolean;
    hasCheckbox?: boolean;
    onSelectionChange?: (selectedRows: T[]) => void;
}