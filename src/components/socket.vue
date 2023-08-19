<script setup>
        import eruda from 'eruda'
        eruda.init()
        import { useMessage } from '../stores/counter'
        const messages = useMessage()

        import { io } from 'socket.io-client'
        //获取本地ID
        let userName = localStorage.getItem('id')
        //初始化设置本地ID

         function setId(){
                if (!userName){
                        userName = prompt('首次登录请输入昵称:')
                        if(!userName){
                         setId()
                         }else{
                 localStorage.setItem('id',userName)
                         }
                 }
         }
         setId()

         const socket = io('http://103.82.55.76:3000');
         socket.on('connect', () => {
         console.log('成功连接到服务器')
         socket.emit('login', { name: userName })
         console.log(userName + '已登录')

         })

         //监听消息
         socket.on('message', (data) => {
         //对方在线
         if(data.status === 0){
                 messages.addMessage(data)
                 console.log(messages.datas)
                 document.querySelector('.message').value = ''
         }
         //不在线
         else if(data.status === 1){
                alert('对方暂时不在线')
         }
         else{
                alert('服务器异常！')
         }
         })

         socket.on('disconnect', () => {
         console.log('与服务器断开连接')
        })
         socket.on('error', (error) => {
         console.log(error)
         })


         const send = (()=> {

         let message = document.querySelector('.message').value
         let toUser = document.querySelector('.to').value
         socket.emit('message', { name: userName, message: message, to: toUser })
         })


        //监听消息数据的变化以置底聊天
        import { watch,ref } from 'vue'
        let scroll = ref(null)
        watch(messages.datas,()=>{
                setTimeout(()=>{
                        scroll.value.scrollTop = scroll.value.scrollHeight
                },0)

        })


</script>

<template>
        <textarea class="message" name="" id="" cols="30" rows="10" placeholder="请输入信息"></textarea>
        <hr>


        <div class='sendArea'>
        接收人ID<input class="to" type="text">
        <button @click='send()'  class="send">发送消息</button>
        </div>


        <ul class="messageArea" ref='scroll'>
                <li v-for='data in messages.datas'>
                        <div>
                                <h3 class='userName'>{{ data.name }} <span class='sendTime'>--{{ data.time }}</span></h3>
                                <span>{{ data.message }}</span>
                                <hr>
                        </div>
                </li>
        </ul>
</template>
<style scoped>
        .message{
                margin: 0 auto;
                position: fixed;
                bottom: 10vh;
                width: 100%;
                height: 15vh;
        }
        .userName{
                font-size: 15px;
                margin-bottom: 2vh;
        }
        .messageArea{
                position: fixed;
                bottom: 25vh;
                height: 75vh;
                width: 100vw;
                overflow: auto;


        }
        .sendTime{
                color: #666;
                line-height: 12px;
        }
        .sendArea{
                height: 5vh;
                width: 100%;
                text-align: center;
                position: fixed;
                bottom: 2vh;
        }
</style>
