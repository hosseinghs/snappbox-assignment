export interface IColumn {
    key: string; 
    label: string;
    collapseParent?: boolean; 
}

export interface ITableProps<T> {
    rows: T[];
    columns: IColumn[];
    loading?: boolean;
    hasCheckbox?: boolean;
}