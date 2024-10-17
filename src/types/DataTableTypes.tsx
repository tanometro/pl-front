export interface DataTableProps<T> {
    columns: string[];
    data: T[];
    renderRow: (item: T, index: number) => React.ReactNode;
    renderDetails?: (item: T) => JSX.Element;
    onClickFunction?: (item: T) => Promise<void>;
  }