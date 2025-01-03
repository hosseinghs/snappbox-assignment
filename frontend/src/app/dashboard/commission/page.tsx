'use client'
import { useState, useEffect } from 'react';

import BaseTable from '@/components/base/table'
import { getAllCommissionsAPI } from '@/services/comissions';
import type { IColumn } from '@/components/base/table/type';
import type { ICommission } from '@/services/comissions/type';

import CommissionInput from '@/components/commission/CommissionInput';
import CommissionEditAction from '@/components/commission/CommissionEditAction';

type NestedCommission = ICommission & {
  children: ICommission[];
  hasChildren: boolean;
}

interface IUpdateCommission {
  id: number;
  key: Pick<ICommission, 'commission_normal' | 'commission_promotion'>;
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


  const buildNestedArray = (data: ICommission[]): NestedCommission[] => {
    const root: NestedCommission[] = [];
    const idMap: Record<number, NestedCommission> = {};
  
    data.forEach(item => {
      idMap[item.id] = {
        ...item,
        hasChildren: false,
        children: []
      };
    });
  
    data.forEach(item => {
      if (item.id === item.parent_id) root.push(idMap[item.id]); // Add top-level items to root
      else if (idMap[item.parent_id]) idMap[item.parent_id].hasChildren = true; // Set the parent item’s `hasChildren` to true
    });
    
    return root;
  }

  const toggleSubCategoryItemsIntoCategoryItem = (row: ICommission): void => {
    const updatedCommissions = [...nestedCommissions];

    // Recursive function to find the target category in the nested structure
    const findAndToggleCategory = (categories: NestedCommission[]): boolean => {
        for (const category of categories) {
            if (category.id === row.id) {
                // If the target category already has children, reset its children to empty
                if (category.children.length) category.children = []; // Clear out the children
                else {
                    // Otherwise, add subcategories to the target category
                    flatCommissions.forEach(item => {
                        if (item.parent_id === row.id) category.children.push({ ...item, children: [], hasChildren: false });
                    });
                }
                return true; // Found and updated the category
            }

            // If not found at this level, search deeper recursively
            if (category.children.length) {
                const found = findAndToggleCategory(category.children);
                if (found) return true;
            }
        }
        return false; // Not found in this branch
    };
    // Start searching and toggling from the top-level categories
    findAndToggleCategory(updatedCommissions);
    setNestedCommissions(updatedCommissions);
};

  const handleSelectionChange = (newSelection: ICommission[]) => {
    setSelectedRows(newSelection);
  };

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
    {
      key: 'table-action',
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
  ]

  return (
    <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' } }>
        <div style={ { width: '80%', margin: '0 auto' }}>
              <BaseTable<NestedCommission>
                hasCheckbox
                rows={nestedCommissions} 
                loading={loading}
                columns={columns}
                onSelectionChange={handleSelectionChange}
                addOrRemoveSubCategory={(d) => toggleSubCategoryItemsIntoCategoryItem(d)}
              />
          </div>
    </div>
  );
}
