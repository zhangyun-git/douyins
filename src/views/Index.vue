<template>
    <div class="wrap">
        <section>
            <router-view></router-view>
        </section>
         <span v-for="(el,index) in ku" :key="index" class="fly">
            {{el}}
        </span>
        <footer>
            <router-link tag='span' to='/index/pagehome'>首页</router-link>
            <router-link tag='span' to='/index/follow'>关注</router-link>
            <router-link tag='span' to='/index/shot'>+</router-link>
            <router-link tag='span' to='/index/message'>消息</router-link>
            <router-link tag='span' to='/index/my'>我的</router-link>
        </footer>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ku: ['绩效早']
            }
        },
        mounted() {
            
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        section{
            width: 100%;
            flex:1;
        }
        footer{
            width: 100%;
            height: .45rem;
            border-top: .01rem solid #eee;
            display: flex;
            align-items: center;
            text-align: center;
            justify-content: space-around;
            background: #7C746D;
            span{
                color: #fff;
                font-size: .16rem;
                z-index: 99;
                line-height: .4rem;
                &:nth-child(3){
                    background: #fff;
                    color: #7C746D;
                    padding: 0 .14rem;
                    box-sizing: border-box;
                    border-radius: .04rem;
                    font-size: .2rem;
                    line-height: .26rem;
                }
            }
        }
        .router-link-active{
            border-bottom: 2px solid #fff;
        }
    }
    .fly {
        padding: .04rem .2rem;
        box-sizing: border-box;
        border-radius: .1rem;
        background: #eee;
        position: absolute;
        top: 70%;
        transform: translateX(375px);
        animation: go 3s ease-in infinite;

    }
    @keyframes go {
		0% {
			transform: translateX(375px);
		}
		100% {
			transform: translateX(0);
		}
	}
</style>
