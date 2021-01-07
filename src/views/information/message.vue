<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="资讯管理" name="manege">
				<message-manage></message-manage>
			</el-tab-pane>
			<el-tab-pane label="资讯类型" name="type">
				<message-type></message-type>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import messageManage from '@/components/information/message-manage'
	import messageType from '@/components/information/message-type'

	export default {
		components: {
			messageManage,
			messageType
		},
		data() {
			return {
				activeName: 'manege'
			}
		}
	}
</script>

<style>
</style>
