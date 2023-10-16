import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import { useState } from "react";
import { skuList, skuParamCategories, skuParams } from "./data";

// 创建一个函数，将每个 SKU 参数值的 ID 映射到一个二进制位
function getParamBit(id: number): number {
  return 1 << (id - 1);
}

function App() {
  // 记录不同分类的参数选中状态
  const [categorySelectedMap, setCategorySelectedMap] = useState<{
    [key: number]: number;
  }>({});
  console.log("categorySelectedMap", categorySelectedMap);
  const [skuStocks] = useState(() => {
    // 创建一个映射，记录每种 SKU 组合的库存数量和 SKU 的 ID
    const skuStocks: { [params: number]: { stock: number; id: number } } = {};
    // 更新所有 SKU 组合的库存数量
    for (const sku of skuList) {
      let params = 0;
      for (const param of sku.params) {
        params |= getParamBit(param);
      }
      skuStocks[params] = { stock: sku.stock, id: sku.id };
    }
    return skuStocks;
  });

  const hasStock = (categoryId: number, paramId: number) => {
    const pids = skuParamCategories.reduce(
      (acc, curr) => {
        const { id: cid } = curr;
        if (!(cid in categorySelectedMap)) {
          // 分类没有被选中，无需检查相关参数
          return acc;
        } else {
          // 需要检查 paramId 和 pid 是否在同一分类，以 paramId 优先
          if (categoryId === cid) {
            return acc;
          }
          const pid = categorySelectedMap[cid];
          return [...acc, pid];
        }
      },
      [paramId]
    );

    const mask = pids.reduce((acc, curr) => acc | getParamBit(curr), 0);

    console.log("start to check param", paramId, pids);
    let hasStock = false;
    for (const params in skuStocks) {
      const isMatch = (mask & parseInt(params)) === mask;
      if (isMatch) {
        console.log(
          "SKU",
          skuStocks[params].id,
          "has",
          skuStocks[params].stock,
          "in stock."
        );
        hasStock = skuStocks[params].stock > 0;
        if (hasStock) {
          return hasStock
        }
      }
    }
    return hasStock;
  };

  const onChange = (e: RadioChangeEvent) => {
    const checked = e.target.value;
    console.log("radio checked:", checked);
    const [categoryId, paramId] = checked.split("-");
    setCategorySelectedMap((prev) => ({
      ...prev,
      [parseInt(categoryId)]: parseInt(paramId),
    }));
  };

  return (
    <div className="App">
      {skuParamCategories.map((category) => (
        <div key={category.id}>
          <span>{category.name}</span>
          <Radio.Group
            value={`${category.id}-${categorySelectedMap[category.id]}`}
            onChange={onChange}
          >
            {skuParams
              .filter((param) => param.categoryId === category.id)
              .map((param) => (
                <Radio.Button
                  key={param.id}
                  value={`${category.id}-${param.id}`}
                  disabled={!hasStock(category.id, param.id)}
                >
                  <span
                    onClick={(e) => {
                      if (categorySelectedMap[category.id] === param.id) {
                        e.preventDefault();
                        delete categorySelectedMap[category.id];
                        setCategorySelectedMap({ ...categorySelectedMap });
                      }
                    }}
                  >
                    {param.name}
                  </span>
                </Radio.Button>
              ))}
          </Radio.Group>
        </div>
      ))}
    </div>
  );
}

export default App;
