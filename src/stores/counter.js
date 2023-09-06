import { defineStore } from "pinia";
import { io } from 'socket.io-client'

export const useMessage = defineStore('message', {
        state: () => ({
                datas: {
		},
		io: io,
		onLineUserList: [],
		

        }),
        actions: {
                addMessage(newMessage){
			if(newMessage.name === 'my'){
				
                        	this.datas[newMessage.to]?this.datas[newMessage.to].push(newMessage):this.datas[newMessage.to] = [newMessage]
			
			}else{
				this.datas[newMessage.name]?this.datas[newMessage.name].push(newMessage):this.datas[newMessage.name] = [newMessage]
			}
                },
		addOffMessage(offMessage){
			//this.datas.push(...offMessage)
			
			console.log(Object.keys(offMessage),offMessage)
			Object.keys(offMessage).forEach((item)=>{
				this.datas[item]?this.datas[item].push(...offMessage[item]):this.datas[item] = [...offMessage[item]]
			})
			
		},
		upDateOnLineUserList(newUserList){
			console.log(newUserList)
			this.onLineUserList = newUserList
		}
        },
	getters: {
		
		userList: (state)=>{
			let setList = new Set()
			Object.keys(state.datas).forEach((item)=>{
				setList.add(item)
			})
			state.onLineUserList.forEach((item)=>{
				setList.add(item)
			})
			return setList
		}
		
	}

})
