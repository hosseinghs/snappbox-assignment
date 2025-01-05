import buildNestedArray from '@/utils/buildNestedArrays';
import { ICommission, NestedCommission } from '@/services/comissions/type';

describe('buildNestedArray', () => {
  it('should build a nested array correctly', () => {
    const data: ICommission[] = [
      { id: 1, name: 'Root', parent_id: 1, commission_normal: 10, commission_promotion: 5, commission_normal_new: 15, commission_promotion_new: 7 },
      { id: 2, name: 'Child 1', parent_id: 1, commission_normal: 10, commission_promotion: 5, commission_normal_new: 15, commission_promotion_new: 7 },
      { id: 3, name: 'Child 2', parent_id: 1, commission_normal: 10, commission_promotion: 5, commission_normal_new: 15, commission_promotion_new: 7 },
      { id: 4, name: 'Grandchild 1', parent_id: 2, commission_normal: 10, commission_promotion: 5, commission_normal_new: 15, commission_promotion_new: 7 },
    ];

    const expected: NestedCommission[] = [
      {
        id: 1,
        name: 'Root',
        parent_id: 1,
        commission_normal: 10,
        commission_promotion: 5,
        commission_normal_new: 15,
        commission_promotion_new: 7,
        children: [
          {
            id: 2,
            name: 'Child 1',
            parent_id: 1,
            commission_normal: 10,
            commission_promotion: 5,
            commission_normal_new: 15,
            commission_promotion_new: 7,
            hasChildren: true,
            children: [
              {
                id: 4,
                name: 'Grandchild 1',
                parent_id: 2,
                commission_normal: 10,
                commission_promotion: 5,
                commission_normal_new: 15,
                commission_promotion_new: 7,
                hasChildren: false,
                children: [],
              },
            ],
          },
          {
            id: 3,
            name: 'Child 2',
            parent_id: 1,
            commission_normal: 10,
            commission_promotion: 5,
            commission_normal_new: 15,
            commission_promotion_new: 7,
            hasChildren: false,
            children: [],
          },
        ],
        hasChildren: true,
      },
    ];

    const result = buildNestedArray(data);

    expect(result).toEqual(expected);
  });

  it('should return an empty array for empty input', () => {
    const data: ICommission[] = [];
    const result = buildNestedArray(data);
    expect(result).toEqual([]);
  });

  it('should handle data with no nested structure', () => {
    const data: ICommission[] = [
      { id: 1, name: 'Item 1', parent_id: 1, commission_normal: 10, commission_promotion: 5, commission_normal_new: 15, commission_promotion_new: 7 },
      { id: 2, name: 'Item 2', parent_id: 2, commission_normal: 10, commission_promotion: 5, commission_normal_new: 15, commission_promotion_new: 7 },
    ];

    const expected: NestedCommission[] = [
      {
        id: 1,
        name: 'Item 1',
        parent_id: 1,
        commission_normal: 10,
        commission_promotion: 5,
        commission_normal_new: 15,
        commission_promotion_new: 7,
        hasChildren: false,
        children: [],
      },
      {
        id: 2,
        name: 'Item 2',
        parent_id: 2,
        commission_normal: 10,
        commission_promotion: 5,
        commission_normal_new: 15,
        commission_promotion_new: 7,
        hasChildren: false,
        children: [],
      },
    ];

    const result = buildNestedArray(data);
    expect(result).toEqual(expected);
  });
});
