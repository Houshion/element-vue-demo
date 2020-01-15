<!-- searchBtns -->
<template>
    <div id="searchBtns">
        <el-button icon="el-icon-search" type="primary" @click="$emit('search')">搜索</el-button>
        <el-button icon="el-icon-refresh-left" @click="$emit('reset')">重置</el-button>
    </div>
</template>
<script>
export default {
    name: 'searchBtns',
    data() {
        return {};
    },
    components: {},
    computed: {},
    created() {
        const _this = this
    },
    methods: {
    }
};
</script>
<style scoped lang='less'>
</style>