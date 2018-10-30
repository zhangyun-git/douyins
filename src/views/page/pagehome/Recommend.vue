<template>
    <div class="recommend" @click="onClick">
        <!-- 双击时显示的爱心 -->
        <div :class="heartShow ? 'heart heart-active' : 'heart'" ref='heart' v-for="(item,index) in arr" :key="index">
            {{item}}
        </div>
        <!-- 右侧列表 -->
        <ul>
            <li>
                <img src="../../../static/img/tou.jpeg">
                <p class="add">+</p>
            </li>
            <li @click='active'>
                <i :class="color ? 'iconfont icon-bqxin actived' : 'iconfont icon-bqxin'"></i>
                <span :class="color ? 'actived' : ''">3.7w</span>
            </li>
            <li @click="isHide">
                <i class="iconfont icon-liaotianjilu"></i>
                <span>851</span>
            </li>
            <li @click='mark'>
                <i class="iconfont icon-wechat_icon"></i>
                <span>1.1w</span>
            </li>
        </ul>
        <section>
            <p>@一潭经典语录</p>
            <p>在合适的时间遇到合适的人是一种幸福，在合适的时间遇到合适</p>
        </section>
        <!-- 评论 -->
        <Comments v-show='isShow'></Comments>
        <!-- 转发 -->
        <Mark v-show='isMark'></Mark>
    </div>
</template>
<script>
    import Comments from '@/components/Comment';
    import Mark from '@/components/Mark'
    export default {
        data() {
            return {
                color: false,
                isShow: false,
                isMark: false,
                arr: []
            }
        },
        methods: {
            mark() {
                this.isMark = true;
            },
            active() {
                this.color = !this.color
            },
            isHide() {
                this.isShow = true;
            },
            onClick(e) {
                if (e.target.nodeName == 'DIV') {
                    this.isShow = false;
                }
                var newData = +new Date
                if(newData-this.firstClick<400){
                    this.heartShow = true
                    this.color = true;
                    this.arr.push('❤')
                    let num = this.arr.length - 1
                    this.$nextTick(()=>{
                        this.$refs.heart[num].style.left = e.clientX - this.$refs.heart[num].getBoundingClientRect().width / 2 + 'px'
                        this.$refs.heart[num].style.top = e.clientY - 45 - this.$refs.heart[num].getBoundingClientRect().height / 2 + 'px'
                    })
                } else {
                    this.firstClick = newData
                }
            }
        },
        components: {
            Comments,
            Mark
        }
    }
</script>
<style lang="scss" scoped>
    .recommend{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: url('../../../static/img/BG.png');
        background-size: cover;
        ul{
            width: .7rem;
            position: fixed;
            right: 0;
            top:30%;
            display: flex;
            flex-direction: column;
            text-align: center;
            li{
                width: .7rem;
                height: .7rem;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center; 
                margin-top: .1rem;
                color: #FF2C55!important;
                position: relative;
                &:last-child{
                    padding: .1rem 0;
                    box-sizing: border-box;
                   i.iconfont{
                       font-size: .2rem;
                       padding: .1rem;
                       border-radius: 50%;
                       background: #00C80D;  
                   }
                }
                .actived{
                    color: #FF2C55!important;
                }
                img{
                    width: 80%;
                    height: 80%;
                    border-radius: 50%;
                }
                i.iconfont{
                   font-size: .4rem;
                   color: #EBE9E7;
                }
                span{
                    color: #EBE9E7;
                    line-height: 1.5;
                }
            }
        }
    }
    section{
        color: #fff;
        position: fixed;
        left:.1rem;
        top: 76%;
        width: 70%;
        line-height: 1.5;
        p{
            &:first-child{
                font-size: .18rem;
            }
        }
    }
    .add{
        color: #fff;
        background: #FF2C55;
        border-radius: 50%;
        width: .2rem;
        height: .2rem;
        position: absolute;
        bottom: 0;
    }
    .isXin{
        font-size: .6rem;
        color: #FF2C55;
        margin: 250px auto;
    }
    .heart{
      position:absolute;
      color:#FF2C55;
      top:0;
      left:0;
      z-index:9999999;
      font-size:48px;
      opacity:0;
    }
    .heart-active{
      animation:heart 2s forwards;
      display:block;
    }
    @keyframes heart {
      0% {
          transform:scale(0.5) rotate(0);
          opacity:0;
      }
      20% {
          transform:scale(1.5) rotate(20deg);
          opacity:1;
      }
      80% {
          transform:scale(2) rotate(0deg);
          opacity:1;
      }
      100% {
          transform:scale(1.5) rotate(0);
          opacity:0;
      }
    } 
</style>
