<template>
	
	<div class="red">
		{{text}}
	</div>
</template>

<script>
	export default {
		data() {
			return {
				text: '这是一个测试语句'
			}
		},
		mounted() {
			const txt = '替换测试语句';
			
			this.text = txt
		}
	}

</script>
<style lang="less">
	.red{
		color: red;
	}
</style>