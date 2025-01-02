'use client'
import { useState, useEffect } from 'react';

import BaseTable from '@/components/base/table'
import { getAllCommissionsAPI } from '@/services/comissions';
import type { IColumn } from '@/components/base/table/type';
import type { ICommission } from '@/services/comissions/type';

type NestedCommission = ICommission & {
  children: ICommission[];
  hasChildren: boolean;
}

export default function CommissionPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedRows, setSelectedRows] = useState<ICommission[]>([]);
  const [flatCommissions, setFlatCommissions] = useState<ICommission[]>([])
  const [nestedCommissions, setNestedCommissions] = useState<NestedCommission[]>([])

  function buildNestedArray(data: ICommission[]): NestedCommission[] {
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
      if (item.id === item.parent_id) {
        root.push(idMap[item.id]); // Add top-level items to root
      } else if (idMap[item.parent_id]) {
        idMap[item.parent_id].hasChildren = true; // Set the parent item’s `hasChildren` to true
      }
    });
    
    return root;
  }

  const toggleSubCategoryItemsIntoCategoryItem = (row: ICommission): void => {
    const updatedCommissions = [...nestedCommissions];

    const targetCategory = updatedCommissions.find(item => item.id === row.id);
    if (!targetCategory) return
      // If the target category already has children, reset its children to empty
      if (targetCategory.children.length) targetCategory.children = []; // Clear out the children
      else {
        // Otherwise, add subcategories to the target category
        flatCommissions.forEach(item => {
          if (item.parent_id === row.id) targetCategory.children.push(item); // Add subcategory to the target category's children
        });
      }

    setNestedCommissions(updatedCommissions);
    console.log(updatedCommissions);
  }

  const handleSelectionChange = (newSelection: ICommission[]) => {
    console.log(newSelection);
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
      formatter: (row) => `${row.commission_normal}%`,
    },
    {
      key: 'commission_promotion',
      label: 'promition commission',
      formatter: (row) => `${row.commission_promotion}%`
    },
    {
      key: '',
      label: 'edit'
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
