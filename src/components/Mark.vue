<template>
    <div class="mark">
        <div>
            <p>分享成功！</p>
            <span @click="mark">确定</span>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            mark() {
                this.$parent.isMark = false;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .mark{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,.6);
        position: fixed;
        left:0;
        top:0;
        z-index: 9999;
        >div{
            width: 60%;
            background: #fff;
            border-radius: .08rem;
            display: flex;
            flex-direction: column;
            p{
                width: 100%;
                padding: .3rem 0;
                border-bottom: 1px solid #ccc;
                text-align: center;
                font-size: .16rem;
            }
            span{
                padding: .1rem 0;
                color: skyblue;
                text-align: center;
                font-size: .18rem;
            }
        }
    }
</style>
