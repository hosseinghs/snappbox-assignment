'use client'
import { useState, useEffect } from 'react';

import BaseTable from '@/components/base/table'
import { getAllCommissionsAPI } from '@/services/comissions';
import type { IColumn } from '@/components/base/table/type';
import type { ICommission } from '@/services/comissions/type';

type NestedCommission = ICommission & {
  children: ICommission[]
}

export default function CommissionPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [comissions, setCommissions] = useState<NestedCommission[]>([])
  const [selectedRows, setSelectedRows] = useState<ICommission[]>([]);

  function buildNestedArray(data: ICommission[]): NestedCommission[] {
    const root: NestedCommission[] = []; 
    const idMap: Record<number, NestedCommission> = {}; 

    data.forEach(item => {
        idMap[item.id] = { ...item, children: [] }; 
    });

    data.forEach(item => {
        if (item.id === item.parent_id) root.push(idMap[item.id]);
        else idMap[item.parent_id]?.children.push(idMap[item.id]);
    });

    return root;
}

  const handleSelectionChange = (newSelection: ICommission[]) => {
    setSelectedRows(newSelection);
    console.log(selectedRows);
  };

  const handleGetCommissionsList = async () => {
    try {
      setLoading(true)
      const { data } = await getAllCommissionsAPI()
      const nestedArray = buildNestedArray(data)
      setCommissions(nestedArray)
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
                rows={comissions} 
                loading={loading}
                columns={columns}
                onSelectionChange={handleSelectionChange}
              />
        </div>
    </div>
  );
}
