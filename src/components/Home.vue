<script setup>
	import { useRouter,useRoute } from 'vue-router'
	import { useMessage } from '../stores/counter'
	const message = useMessage()
//	console.log(message.io)
	const router = useRouter(),
	route = useRoute()
	const changeRouter = (userName,onLineUserName)=>{
		socket.disconnect()
		router.push({name:'talk',params:{name:userName,toname:onLineUserName}})
	}

	const userName = route.params.name
	

       const socket = message.io('ws://127.0.0.1:3000')
       //const socket = message.io('ws://103.82.55.76:3000')
	
         socket.on('connect', () => {
	 console.log('成功连接到服务器')
         socket.emit('login', { name: userName })
         console.log(userName + '已登录')

         })	
	 
    //监听用户列表信息
        socket.on('updateUserList',(newUserList)=>{
                message.upDateOnLineUserList(newUserList)
        })

        //监听离线消息
        socket.on('offLineMessage',(data)=>{
                message.addOffMessage(data)
                console.log(message.datas)
        })

         socket.on('disconnect', () => {
                console.log('与服务器断开连接')
        })
         socket.on('error', (error) => {
                console.log(error)
         })
         //监听消息
         socket.on('message', (data) => {
                //对方在线
                 if(data.status === 0){
                        message.addMessage(data)
                        console.log(message.datas)
                        
                }
                else{
                        alert('服务器异常！')
                        console.log(data)
                }
        })
	 


</script>
<template>
	
	<ul><li class='list'  v-show='userName !== onLineUserName'  v-for='onLineUserName in message.userList' @click="changeRouter(userName,onLineUserName)" key='onLineUserName'>{{ onLineUserName  }}</li></ul>
	<p style='line-height: 100vh;height:100vh;text-align: center;' v-show='message.userList.size <= 1'>居然一个人也没有～</p>
        
</template>
<style scoped>
	.list{
		height: 10vh;
		width: 100vw;
		line-height: 10vh;
		padding-left: 10vw;
		border-bottom: 1px solid
	}
</style>
