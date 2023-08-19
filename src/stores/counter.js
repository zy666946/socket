import { defineStore } from "pinia";

export const useMessage = defineStore('message', {
        state: () => ({
                datas: []

        }),
        actions: {
                addMessage(newMessage){
                        this.datas.push(newMessage)
                }
        }

})
