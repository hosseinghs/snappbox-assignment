import type { ICommission, NestedCommission } from "@/services/comissions/type";

export default function buildNestedArray(data: ICommission[]): NestedCommission[] {
  const root: NestedCommission[] = [];
  const idMap: Record<number, NestedCommission> = {};

  // Create a map of all items
  data.forEach((item) => {
    idMap[item.id] = { ...item, children: [], hasChildren: false };
  });

  // Populate children and root
  data.forEach((item) => {
    if (item.id === item.parent_id) {
      // If an item is its own parent, it's a root item
      root.push(idMap[item.id]);
    } else {
      // Otherwise, it's a child of another item
      const parent = idMap[item.parent_id];
      if (parent) {
        parent.children.push(idMap[item.id]);
        parent.hasChildren = true;
      }
    }
  });

  return root;
}
