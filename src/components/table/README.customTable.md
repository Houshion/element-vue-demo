## table 使用方法
--[备注]
--[tableTitle,tableData](tableTitle,tableData与原有table一致)
--[title](title为表格标题)
--[col](col为当前表格列数)
--[list](类型为Boolean，默认为false，true则为多行列表结构)
--[vertical](类型为Boolean，默认为false，true则为垂直列表结构，与list互斥，既二者只能唯一true)
--[width](表格的宽度，单位为%，默认100%)
```html
<c-table
    title="表格标题" 
    :tableTitle="tableTitle"
    :tableData="tableData"
    :col="col"
    :list="true"
    :vertical="true"
    width='100'
>
    <!-- slot插槽与原table一致 -->
    <template slot="name" slot-scope="slot">{{slot.data.name}}</template>
</c-table>
```

```js
// data
tableTitle: [
    { 
        prop: "name", // 对应接口返回字段
        label: "行名", //title名称
        hide: false, //是否隐藏该行，类型为Boolean，默认为false
        custom: true // 是否使用插槽自定义单元格内容，类型为Boolean，当为true时，需用template插入，为false时直接输出字段内容
    },
],