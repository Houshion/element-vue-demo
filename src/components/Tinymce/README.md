### tinyMce富文本使用说明

>>使用方法如下
```html
<o-editor 
    ref="editor" 
    v-model="editor.content" 
    :height="editor.height" 
    :data="editor.data" 
    :url="editor.url" />
```
```js
data(){
    return {
        editor:{
            content: '', // 富文本编辑器内容
            height: '300', //富文本框高度，单位px
            data: {type:1}, //接口所需提交的参数，默认提交上传file，如需增加参数，在此处标明
            url: '' //接口请求路径，前缀已自动获取
        }
    }
}