<template>
    <div class="pinlun" 
        @touchstart.stop='Touchstart' 
        @touchmove.stop='Touchmove' 
        @touchend.stop='Touchend'
        ref='pinlun'>
        <h3>
            <span></span>
            <span>{{list.length}}条评论</span>
            <i class="iconfont icon-Rectangle" @click="hiden"></i>
        </h3>
        <div class="list" ref='list' @scroll='onscroll'>
            <ul ref='ul'>
                <li v-for='(item,index) in list' :key='index'>
                    <dl>
                        <dt>
                            <img :src="item.img">
                        </dt>
                        <dd>
                            <p>{{item.tit}}</p>
                            <p>{{item.content}}</p>
                            <span>{{item.time}}</span>
                        </dd>
                    </dl>
                    <p @click="active(index)" :class="item.isColor ? 'actived' : ''">
                        <i class="iconfont icon-bqxin"></i>
                        <span>{{item.num}}</span>
                    </p>
                </li>
            </ul>
        </div>
        <span v-for="el in ku" :key="el.id" class="fly" :style="{top:el.top + 'px'}">
            {{el.values}}
        </span>
        <div class="add">
            <input type="text" placeholder="有爱评论，说点好听的~" v-model.trim="values" @keyup.enter="setdata">
            <i class="iconfont icon-aite"></i>
            <i class="iconfont icon-smile"></i>
            <i class="iconfont icon-daohang" @click='fabu'></i>
        </div>
    </div>
</template>
<script>
    import {debounce} from '@/utils/utils';
    export default {
        data() {
            return {
                list: [],
                values: null,
                ku: [ ] //存取数据
            }
        },
        methods: {
            hiden() {
                this.$parent.isShow = false;
            },
            active(ind) {
                this.list.forEach((item,index)=>{
                    if (index == ind) {
                        item.isColor = !item.isColor;
                        if (item.isColor) {
                            ++item.num;
                        } else {
                            --item.num;
                        }
                    }
                })
            },
            setdata() {
                if(this.values) {
                    let num = Math.random()*300;
                    let top = Math.floor(num);
                    let obj = {values:this.values,top:top}
                    this.ku.push(obj);
                    this.values = "";
                }
            },
            fabu() {
                let date=new Date(); 
                let m=date.getMinutes(); //获取分钟
                let time = '';
                // if (m == 0){
                //     time = '刚刚'
                // } else {
                //     time = m + '分钟前'
                // }
                let str = `{
                            "img": "http://img1.imgtn.bdimg.com/it/u=609750810,830808481&fm=26&gp=0.jpg",
                            "tit": "@阿云",
                            "content": "${this.values}",
                            "time": "刚刚",
                            "num": 0,
                            "isColor": false
                        }`
                this.list.unshift(JSON.parse(str))
                this.values = ''
            },
            Touchstart(e) {
                // 记录手指滑动的位置
                this.start = e.touches[0];
            },
            Touchmove(e) {
                // 让页面跟随手指滑动
                let touch = e.touches[0];
                let offset = touch.pageY - this.start.pageY;
                if (offset < 0){
                    offset = 0;
                }
                this.offset = offset;
                this.$refs.pinlun.style.transform = `translate3d(0,${offset}px,0)`;
                this.$refs.pinlun.style.transition = `width`;
            },
            Touchend() {
                // 清除行内样式
                this.$refs.pinlun.style.transform = ``;
                this.$refs.pinlun.style.transition = ``;
                // 判断滑动距离是否到关闭的临界值
                if (this.offset >= window.innerHeight * 0.35){
                    this.$parent.isShow = false;
                }
            },
            onscroll() {
                let scrollTop = this.$refs.list.scrollTop;
                let height = this.$refs.ul.getBoundingClientRect().height;
                if ((scrollTop > ((height-window.innerHeight) - 20))){
                    // 执行加载下一页的逻辑
                    //  fetch('https://www.easy-mock.com/mock/5b62e707518de97c5d45fd7a/example/douyin')
                    // .then(res=>res.json())
                    // .then(res=>{
                        this.list = this.list.concat(this.list);
                    // })
                }
            }
        },
        mounted() {
            // 请求列表的数据
            fetch('https://www.easy-mock.com/mock/5b62e707518de97c5d45fd7a/example/douyin')
            .then(res=>res.json())
            .then(res=>{
                this.list = res;
            })

            // 去抖动
            let func = debounce(this.onscroll, 100);
            this.$refs.list.addEventListener('scroll', func);
        }
    }
</script>
<style lang="scss" scoped>
    .pinlun{
        width: 100%;
        height: 70%;
        position: fixed;
        left:0;
        bottom: 0;
        z-index: 999;
        color: #fff;
        border-top-left-radius: .1rem;
        border-top-right-radius: .1rem;
        background: #202323;
        padding-bottom: .4rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        // ios上滑动卡顿
        -webkit-overflow-scrolling: touch;
        // transform: translate3d(0, 100%, 0);
        // transition: all .3s linear;
    }
    h3{
        height: .4rem;
        display: flex;
        justify-content: space-between;
        padding: 0 .1rem;
        align-items: center;
        flex-shrink: 0;
    }
    .list{
        width:100%;
        flex:1;
        overflow-y: auto;
    }
    ul{
        padding: .1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 100%;
        flex:1;
        // overflow-y: auto;
        li{
            border-bottom: 1px solid #ccc;
            position: relative;
            &:last-child{
                border-bottom: 0;
            }
            >p{
                position: absolute;
                top: 20%;
                right: .1rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                line-height: 1.5;
                color: #505052;
            }
        }
        dl{
            display: flex;
            margin: .1rem 0;
            box-sizing: border-box;
            dt{
                width: .4rem;
                height: .4rem;
                padding: .04rem;
                box-sizing: border-box;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            dd{
                padding-left: .1rem;
                padding-right: .1rem;
                box-sizing: border-box;
                line-height: 1.5;
                
                p{
                    &:first-child{
                        font-size: .18rem;
                        color: #A5A4A4;
                    }
                }
                span{
                    color: #666463;
                }
            }
        }
        
    }
    .actived{
        color: #FF2C55!important;
    }
    .add{
        background: #000;
        height: .45rem;
        position: fixed;
        left:0;
        bottom: 0;
        width: 100%;
        color: #8C8B8B;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .1rem;
        box-sizing: border-box;
        i.iconfont{
            font-size: .2rem;
            font-weight: 800;
        }
        input{
            outline: none;
            background: #000;
            border:none;
            width:70%;
            color: #8C8B8B;
        }
    }
    .fly {
        position: absolute;
        top:0;
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
