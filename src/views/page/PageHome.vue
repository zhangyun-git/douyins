<template>
    <div class="pagehome">
        <header>
            <i class="iconfont icon-sousuo"></i>
            <p>
                <router-link tag='span' to='/index/pagehome/recommend'>推荐</router-link>
                <router-link tag='span' to='/index/pagehome/city'>北京</router-link>
            </p>
            <i class="iconfont icon-icon-test"></i>
        </header>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>
<style lang="scss" scoped>
    .pagehome{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        header{
            width: 100%;
            height: .5rem;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 .14rem;
            box-sizing: border-box;
            font-size: .16rem;
            position: fixed;
            left:0;
            top:0;
            p{
                span{
                    padding: 0 .1rem;
                    box-sizing: border-box;
                }
            }
        }
        .router-link-active{
            font-size: .18rem;
        }
    }
</style>
