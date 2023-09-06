<script setup>

	//Eruda浏览器开发者工具
	import eruda from 'eruda'
	eruda.init()

	//初始化pinia状态
	import { useMessage } from './stores/counter'
	const message = useMessage()
	localStorage.getItem('message')?message.addOffMessage(JSON.parse(localStorage.getItem('message'))):localStorage.setItem('message',JSON.stringify({}))

	

	
	
</script>

<template>
	

	<router-view></router-view>
	
</template>

<style>
        *{
                font-size: 12px;
                margin: 0;
                padding: 0;
                box-sizing: border-box;

        }
</style>
