## table 使用方法
```html
<o-table
    :loading="loading"
    :tableData="tableData"
    :tableTitle="tableTitle"
    :tableSlot="tableSlot"
    :pageMsg="pageMsg"
    :batchList="batchList"
    select
    search
    tips
    multy
    @btnFunc="btnFunc"
    @selecChange="selecChange"
    @pageChange="pageChange"
    @sizeChange="sizeChange"
    @inputChange="inputChange"
    @inputChange="switchChange"
    @batchSubmit="batchSubmit"
>
    <!-- 当前列为custom自定义时需写，slot对应tableTitle字段名，用法如下 -->
    <template slot="name" slot-scope="slot">{{slot.data.name}}</template>
</table>
```

```js
// data
tableTitle: [
    { 
        prop: "name", // 对应接口返回字段
        label: "会员名称", //title名称
        width: "auto", // 单元格宽度，单位px，可设为自动auto
        custom: true // 是否使用插槽自定义单元格内容，类型为Boolean，当为true时，需用template插入，为false时直接输出字段内容
    },
],
tableSlot: [
    {
        title: "操作", //当前列title
        slotType: "btnMore", // 当前列插槽类型
        buttontype: "info", // text为文字按钮，默认不传为正常按钮
        width: '350', // 单元格宽度，单位px，可设为自动auto
        slot: [
            { label: "btn", type: "btn" },
        ],
        more: [
            { title: 'more', type: "more" },
        ],
        align: 'left' // 内容位置
    },
    {
        title: "操作", //当前列title
        slotType: "btn", // 当前列插槽类型
        buttontype: "info", // text为文字按钮，默认不传为正常按钮
        width: '350', // 单元格宽度，单位px，可设为自动auto
        slot: [
            { label: "btn", type: "btn" },
        ],
    },
    {
        title: "状态",
        slotType: "switch",
        width: '80',
        active: '激活', // 开启状态内容，默认指为开启
        inactive: '停用', // 关闭状态内容，默认指为关闭
    },
    {   // 计步器
        title: "操作", //当前列title
        slotType: "inputNum", // 当前列插槽类型
        label: '描述文字' // 默认‘描述文字’
    },
],
// methods
btnType(index, type) {
    // index   下标
    // type    按钮类型，该值从tableSlot中定义
},
switchChange(row, index) {
    // row     当前行数据
    // index   下标
},
inputChange(val) {
    // val     改变后的数值
},
sizeChange(val) {
    // val     改变后的页数
},
pageChange(val) {
    // val     改变后的页码
},
batchSubmit(key,val){
    // key     key值
    // val     选中的值
}
```
### 特殊操作，注意事项
--[switch](使用switch时，需在单条记录中添加switch字段，值为boolean类型)
--[number](使用number时，需在单条记录中添加number字段，值为int类型)
--[btn,btnMore](使用按钮操作时，可根据相应需要将按钮隐藏，使用方法如下)

```js //btn,btnMore特殊操作使用方法
    /* item 为当前行，取出接口获得的数据后，根据相应状态做出相应处理 */
    //为该行记录添加hideBtn字段，类型为Array，存放内容为定义的btn的slot.type
    item.hideBtn = ['type'] // 释义：当前行隐藏按钮type
    //为该行记录添加hideSlot字段，类型为Boolean
    item.hideSlot = true // 释义：当前行隐藏所有按钮