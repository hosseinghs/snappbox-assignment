export interface ICommission {
    id?: UUID;
    name: string;
    parent_id: number;
    commission_normal: number;
    commission_promotion: number;
    commission_normal_new: number;
    commission_promotion_new: number;
}

export type NestedCommission = ICommission & {
    children: NestedCommission[];
    hasChildren: boolean;
  }