'use client'
import { lazy, useState, useEffect, useCallback } from 'react';

import BaseTable from '@/components/base/table'
import buildNestedArray from '@/utils/buildNestedArrays';
import { getAllCommissionsAPI } from '@/services/comissions';
import type { IColumn, ITableAction } from '@/components/base/table/type';
import type { ICommission, NestedCommission } from '@/services/comissions/type';

import CommissionInput from '@/components/commission/CommissionInput';
import CommissionEditAction from '@/components/commission/CommissionEditAction';
import CommissionDeletePopUp from '@/components/commission/CommissionDeletePopup';
const CommissionCreateDialog = lazy(() => import('@/components/commission/CommissionCreateDialog'))

interface IUpdateCommission {
  id: number;
  key: keyof Pick<ICommission, 'commission_normal' | 'commission_promotion'>;
  value: string;
  parentId: number;
}

export default function CommissionPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<ICommission[]>([]);
  const [flatCommissions, setFlatCommissions] = useState<ICommission[]>([])
  const [nestedCommissions, setNestedCommissions] = useState<NestedCommission[]>([])

  const handleEdit = (rowId: number) => setEditRowId(rowId);
  const handleSave = () => setEditRowId(null);

  const toggleSubCategoryItemsIntoCategoryItem = (row: ICommission): void => {
    const updatedCommissions = [...nestedCommissions];
  
    // Recursive function to find and toggle the target category
    const findAndToggleCategory = (categories: NestedCommission[]): boolean => {
      for (const category of categories) {
        if (category.id === row.id) {
          if (category.children.length) {
            category.children = []; // Clear children
          } else {
            // Fetch children dynamically
            const subCategories = flatCommissions.filter(
              (item) => item.parent_id === row.id
            );
            category.children = subCategories.map((subCategory) => ({
              ...subCategory,
              children: [],
              hasChildren: flatCommissions.some(
                (item) => item.parent_id === subCategory.id
              ),
            }));
          }
          return true; // Found and updated
        }
  
        // Search recursively in child categories
        if (category.children.length) {
          const found = findAndToggleCategory(category.children);
          if (found) return true;
        }
      }
      return false; // Not found in this branch
    };
  
    // Start the recursive search
    findAndToggleCategory(updatedCommissions);
    setNestedCommissions(updatedCommissions);
  };

  const handleSelectionChange = useCallback((newSelection: ICommission[]) => {
    setSelectedRows(newSelection);
  }, []);

  const handleGetCommissionsList = async () => {
    try {
      setLoading(true)
      const { data } = await getAllCommissionsAPI()
      setFlatCommissions(data);
      const nestedArray = buildNestedArray(data)
      setNestedCommissions(nestedArray)
    } finally {
      setLoading(false)
    }
  }

  const setNewCommissionValue = ({ value, parentId, id, key }: IUpdateCommission) => {
    const updatedCommissions = [...nestedCommissions];
    const category = updatedCommissions.find(item => item.id === parentId);

    if (category && category.id === id) category[key] = +value
    else if (category?.children) {
      const subCategory = category.children.find(item => item.id === id);
      if (subCategory) subCategory[key] = +value
    } 
    setNestedCommissions(updatedCommissions);
  }


  useEffect(() => {
    handleGetCommissionsList()
  }, [])

  const columns: IColumn<ICommission>[] = [
    {
      key: 'name',
      label: 'category',
      collapseParent: true,
    },
    {
      key: 'commission_normal',
      label: 'commission',
      render: (row) => (
        <CommissionInput
          value={row.commission_normal}
          isEdit={editRowId === row.id}
          onValueChange={(value) => setNewCommissionValue({ value, parentId: row.parent_id,  id: row.id, key: 'commission_normal' })}
        />
      ),
    },
    {
      key: 'commission_promotion',
      label: 'promition commission',
      render: (row) => (
        <CommissionInput
          value={row.commission_promotion}
          isEdit={editRowId === row.id}
          onValueChange={(value) => setNewCommissionValue({ value, parentId: row.parent_id, id: row.id, key: 'commission_promotion'})}
        />
      ),
    },
  ]

  const tableActions: ITableAction<ICommission>[] = [
    {
      key: 'edit',
      label: 'edit',
      render: (row: ICommission) => (
        <CommissionEditAction
          row={row}
          isEdit={editRowId === row.id}
          onEdit={() => handleEdit(row.id)}
          onSave={handleSave}
        />
      ),
    },
    {
      key: 'delete',
      label: 'delete',
      render: (row: ICommission) => <CommissionDeletePopUp id={row.id} removeCommissionFromList={() => {}} />
    }
  ]

  return (
    <div>
        <div className='w-3/4 mx-auto'>
              <CommissionCreateDialog />
              <BaseTable<NestedCommission>
                hasCheckbox
                rows={nestedCommissions} 
                loading={loading}
                columns={columns}
                actions={tableActions}
                onSelectionChange={handleSelectionChange}
                addOrRemoveSubCategory={(d) => toggleSubCategoryItemsIntoCategoryItem(d)}
              />
          </div>
    </div>
  );
}
