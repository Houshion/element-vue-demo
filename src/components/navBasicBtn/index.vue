<!-- navBasicBtn -->
<template>
    <div id="navBasicBtn">
        <el-button type="mini" @click="refresh" icon="el-icon-refresh">刷新</el-button>
        <el-button type="mini" @click="goback" icon="el-icon-arrow-left">返回</el-button>
    </div>
</template>
<script>
export default {
    name: 'navBasicBtn',
    data() {
        return {};
    },
    components: {},
    computed: {},
    created() {
        const _this = this
    },
    methods: {
        refresh() {
            // this.$router.go(0)
            // return console.log(this.$route)
            this.$root.Bus.$emit("test", this.$route.path + new Date())
        },
        goback() {
            this.$router.go(-1)
        },
    }
};
</script>
<style scoped lang='less'>
</style>