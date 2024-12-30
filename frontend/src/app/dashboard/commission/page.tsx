'use client'
import { useState, useEffect } from 'react';

import BaseTable from '@/components/base/table'
import { getAllCommissionsAPI } from '@/services/comissions';
import type { ICommission } from '@/services/comissions/type';

type NestedCommission = ICommission & {
  children: ICommission[]
}

export default function CommissionPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const [comissions, setCommissions] = useState<NestedCommission[]>([])

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


  return (
    <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' } }>
        <BaseTable loading={loading} rows={comissions} />
    </div>
  );
}
