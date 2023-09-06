<script setup>
	//应用路由
	import { useRouter } from 'vue-router'
	const router = useRouter()

	//应用pinia
        import { useMessage } from '../stores/counter'
        const messages = useMessage()
	
	
	let inputText = ref('')

	//导入socket.io实例
       //const socket = messages.io('ws://103.82.55.76:3000')
	const socket = messages.io('http://127.0.0.1:3000')
	
	//获取聊天配置
	const props = defineProps(['name','toname']),
	userName = props.name,
	toUserName = props.toname
	
	if(!userName||!toUserName) alert('URL信息配置错误！')

	
	socket.on('connect', () => {
               console.log('成功连接到服务器')
         socket.emit('login', { name: userName })
         console.log(userName + '已登录')

         })
	
         //监听消息
         socket.on('message', (data) => {
         	//消息状态正常
		 if(data.status === 0){
                 	messages.addMessage(data)
			//更新本地缓存
			localStorage.setItem('message',JSON.stringify(messages.datas))
                 	console.log(messages.datas)
                 	inputText.value=''
         	}
         	else{
                	alert('服务器异常！')
			console.log(data)
         	}
        })
	
	//监听离线消息
        socket.on('offLineMessage',(data)=>{
               messages.addOffMessage(data)
	       //更新本地缓存
	       localStorage.setItem('message',JSON.stringify(messages.datas))
	       console.log('打印离线消息缓存',messages.datas)
        })

         socket.on('disconnect', () => {
                console.log('与服务器断开连接')
        })
         socket.on('error', (error) => {
                console.log(error)
         })
	

         const send = (()=> {  
	 	
		socket.emit('message', { name: userName, message: inputText.value, to: toUserName})
         })


        //监听消息数据的变化以置底聊天
        import { watch,ref } from 'vue'
        let scroll = ref(null)
	setTimeout(()=>{
	scroll.value.scrollTop = scroll.value.scrollHeight
	},0)
        watch(messages.datas,()=>{
                setTimeout(()=>{
                        scroll.value.scrollTop = scroll.value.scrollHeight
                },0)

        })


</script>

<template>
	<header class='messageHead'>
	<button class='goBack'  @click='router.go(-1)'>返回</button>	

	与{{ toUserName  }}的聊天
	</header> 

        <ul class="messageArea" ref='scroll'>
		<p style='text-align:center;'  v-show='!messages.datas[toUserName]'>和TA打个招呼呗～</p>
                <li class='messageItemArea'  v-for='data in messages.datas[toUserName]'>
			<h3 :class="data.name === 'my'?'my':false"  class='userName'>{{ data.name }} <span class='sendTime'>--{{ data.time }}</span></h3>
                        <div :class="data.name === 'my'?'my':false">
                                
                                <p class='messageItem'>{{ data.message }}</p>
                                
                        </div>
                </li>
        </ul>
	
	<div class='bottomArea'>

	<textarea v-model='inputText' style="resize: none" autofocus class="input" name="" id="" maxlength='100'  cols="30" rows="10" placeholder="请输入信息"></textarea>
	<span class='textLength'>{{inputText.length}}/100</span>
    <div class='sendArea'>
                
        <button @click='send()'  class="send">发送</button>                 
    </div>

	</div>
</template>
<style scoped>
	.messageHead{
		position: fixed;
		top: 0;
		height: 10vh;
		width: 100vw;
		line-height: 10vh;
		text-align: center;
		background-color: #f5f5f5;
		font-size: 5vw;
	}
	.goBack{
		float: left;
		height: 5vh;
		width: 10vw;
		margin-left: 5vw;
		margin-top: 2.5vh;
		border: none;
		border-radius: 5px;
		font-size: 3.5vw;

	}

	.messageArea{
		padding-left: 3vw;
		padding-right: 3vw;
		
		position: fixed;                    
		top: 10vh;                       
		height: 80vh;
                width: 100vw;                                       
		overflow: auto;
		background-color: #f5f5f5;
	}
	.my{
		text-align: right;
	}
	.messageItemArea{
		margin-bottom: 5vh;
		list-style: none
	
	}
	.messageItem{
		display: inline-block;
		background-color: #fff;
		border-radius: 10px;
		padding: 2vw;
		font-size: 3.5vw;
		
	}
        .userName{
                font-size: 3.5vw;
                margin-bottom: 2vh;
        }

        .sendTime{
                color: #666;
                line-height: 12px;
        }

	.bottomArea{
		position: fixed;
		height: 10vh;
		width: 100vw;
		bottom: 0;
	}
	
	.input{
		float: left;
		margin-left: 5vw;
		margin-top: 1.5vh;
		width: 75vw;
		height: 7vh;
		background-color: #f5f5f5;
		border: none;
		padding: 2vw;
		border-radius: 5px;
		font-size: 3.5vw;
	}

	.input:focus{
		outline: none;
	}

	.send{
		float: right;
		width: 15vw;
		height: 5vh;
		margin-right: 2.5vw;
		margin-top: 2.5vh;
		border: none;
		border-radius: 5px;
		font-size: 3.5vw;
	}

        .textLength{
                position: absolute;
                right: 21vw;
                bottom: 1.5vh;
		color: #666;
		font-size: 3vw;
        }
</style>
