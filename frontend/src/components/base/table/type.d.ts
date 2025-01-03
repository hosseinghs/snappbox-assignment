export interface IColumn<T> {
    key: string; 
    label: string;
    collapseParent?: boolean;
    render?: (row: T) => React.ReactNode;
    formatter?: (val: T) => string 
}

export interface ITableProps<T> {
    rows: T[];
    columns: IColumn[];
    loading?: boolean;
    actions?: ITableAction<T>[];
    hasCheckbox?: boolean;
    onSelectionChange?: (selectedRows: T[]) => void;
    addOrRemoveSubCategory: (row: T) => void;
}

export interface ITableAction<T> {
    key: string;
    label: string;
    render: (row: T) => React.ReactNode;
}