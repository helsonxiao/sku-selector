// SKU 参数
type SKUParamCategory = {
  id: number;
  name: string;
};
export const skuParamCategories: SKUParamCategory[] = [
  { id: 1, name: "更多系列" },
  { id: 2, name: "外观" },
  { id: 3, name: "版本" },
];

// SKU 参数值
type SKUParam = {
  categoryId: number;
  id: number;
  name: string;
};
export const skuParams: SKUParam[] = [
  { categoryId: 1, id: 1, name: "iPhone 15" },
  { categoryId: 1, id: 2, name: "iPhone 15 Plus" },
  { categoryId: 2, id: 3, name: "黑色" },
  { categoryId: 2, id: 4, name: "白色" },
  { categoryId: 3, id: 5, name: "256G" },
  { categoryId: 3, id: 6, name: "512G" },
];

// 库存列表
export const skuList = [
  { id: 1, params: [1, 3, 5], stock: 100 },
  { id: 2, params: [1, 3, 6], stock: 0 },
  { id: 3, params: [2, 4, 5], stock: 0 },
  { id: 4, params: [2, 4, 6], stock: 200 },
  { id: 5, params: [1, 4, 5], stock: 200 },
  { id: 6, params: [1, 4, 6], stock: 200 },
  { id: 7, params: [2, 3, 5], stock: 200 },
];
