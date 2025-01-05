import type { ICommission, NestedCommission } from "@/services/comissions/type";

export default  function buildNestedArray(data: ICommission[]): NestedCommission[] {
  const root: NestedCommission[] = [];
  const idMap: Record<number, NestedCommission> = {};

  // Create a map of all items
  data.forEach((item) => {
    idMap[item.id] = { ...item, children: [], hasChildren: false };
  });

  // Set the children and hasChildren properties
  data.forEach((item) => {
    if (item.id === item.parent_id) {
      root.push(idMap[item.id]);
    } else {
      const parent = idMap[item.parent_id];
      if (parent) {
        parent.hasChildren = true; // Mark parent as having children
      }
    }
  });

  return root;
}