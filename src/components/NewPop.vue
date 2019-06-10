<template>
    <div class="box">
        <div class="box-title">
            <div class="title">新人现金奖励</div>
        </div>
        <div class="box-body">
            <div class="mission">
                <div class="mission-title">
                    注册得奖金
                    <div class="mission-desc">
                        注册得奖金注册得奖金注册得奖金注册得奖金注册得奖金注册得奖金
                    </div>
                </div>
            </div>
        </div>
        <div class="box-footer">
            <van-button @click="trigger" style="width:100%" type="danger" size="small" plain>领取</van-button>
        </div>
    </div>
</template>
<script>
import {Button} from "vant"
export default {
    components:{[Button.name]:Button},
    methods:{
        trigger(){
            this.$emit("trigger", "")
        }
    }
}
</script>
<style lang="less" scoped>
.box{
   .box-title {
       .title { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
           color:#FFFFFF; 
           font-size: 18px;
           line-height:18px;
           text-align: center;
           font-weight: 700;
           margin-bottom: 16px;
       }
   }
   .box-body {
       width:100%;
       margin-top:3px;
       background-color:#fcf7f3;
       display: flex;
       flex-direction: column;
       .mission {
           display: flex;
           justify-content: space-between;
           align-items:center;
           padding: 5px;
           margin: 5px 0;
           .mission-title{
               flex:1;
               .mission-desc {
                   font-size: 12px;
                   color:darkgrey;
               }
           }
           .mission-btn {
               width:30%;
           }
       }
   }
   .box-footer{
       margin-top: 5px;
       background-color: #fcf7f3;
       text-align: center;
   }
}
</style>
