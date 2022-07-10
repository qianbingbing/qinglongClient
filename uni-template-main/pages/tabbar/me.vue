<template>
	<view>

		<view class="bg-white padding">
			<view class="text-xl text-center" @tap="getqrCode()" >{{text}}</view>
		</view>


	</view>
</template>
<script>
	export default {
		data() {
			return {
				text:'获取群组二维码'
			};
		},
		methods: {
			getuserinfo() {
				let that = this;
				this.$apis.getUserInfo().then(res => {
					that.text = res.username
				});
			},
			getqrCode() {
				let that = this;
				let options = {'header': {'access-key': '3827c5462d4a4382a8b50a7ef948a551'}}
				this.$apis.getqrCode(options).then(res => {
					console.log(res)
				});
			},
			
		}
	}
</script>

<style lang="less" scoped>

</style>