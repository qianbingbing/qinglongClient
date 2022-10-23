<template>
	<view>
		<view class="item" v-for="(item, index) in itemList" :key="item._id">
			<view class="top">
				<view class="name">
				{{ item.remarks }}
				</view>
				<view class="tag">
					<text class="text" v-if ="item.status===0">启用</text>
					<text class="red" v-if ="item.status===1">禁用</text>
					<text class="text"> 剩余{{item.timestamp | remainingTime}}天</text>
				</view>
			</view>
			<view class="bottom">
				更新时间: {{item.timestamp | gmtToStr}}
			</view>
			<view class="bottom">
				{{item.value}}
				<u-icon class='u-m-l-5' name="edit-pen" color="#4197ff" size="50" @tap="navitoWebView(item._id)"></u-icon>
				<u-icon class='u-m-l-5' name="checkmark-circle" color="#4197ff" size="50" v-if ="item.status===1" @tap="enable(item._id)"></u-icon>
				<u-icon class='u-m-l-5' name="close-circle" color="#4197ff" size="50" v-if ="item.status===0" @tap="disable(item._id)"></u-icon>
			</view>
		</view>
		<view class="addSite" @tap="addCookie()">
			<view class="add">
				<u-icon name="reload" color="#ffffff" class="icon" :size="20"></u-icon>增加CK
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'/static/images/login/logo.jpg',
				show:true,
				itemList:[{ message: 'Foo' },],
			}
		},
		onLoad() {
			this.getCookieInfo()
		},
		onPullDownRefresh(){
			this.getCookieInfo();
			uni.stopPullDownRefresh()
		},
		onShow(){
			console.log("page onshow")
			var updatedCookie = getApp().globalData.updatedCookie
			if (updatedCookie){
				var updateJson = null
				console.log("updatedCookie" + updatedCookie)
				for(var i in this.itemList){
					let itemId = this.itemList[i]._id
					if(itemId==updatedCookie.index){
						var updateObj = JSON.parse(JSON.stringify(this.itemList[i]))
						updateObj.value=updatedCookie.value
						delete updateObj.created
						delete updateObj.timestamp
						delete updateObj.position
						delete updateObj.status
						console.log("updateObj==============>"+ JSON.stringify(updateObj))
						this.updateCookie(updateObj)
					}
				}
			}
		
		},
		methods: {
			getCookieInfo() {
				this.$apis.getCookieInfo().then(res => {
					this.itemList = res
					console.log(res)
				});
			},
			navitoWebView (itemId) {
				// 跳转到内部窗口并且传递链接
				uni.navigateTo({
					url: `/pages/webview/index?itemId=${itemId}`
			})
			},
			updateCookie(data){
				var updateJson =JSON.stringify(data)
				this.$apis.updateCookieInfo(updateJson).then(res => {
					uni.showToast({
						title:'cookie更新成功,请下拉刷新!',
						duration:2000
					})
					getApp().globalData.updatedCookie = ''
				});
			},
			addCookie(data){
				uni.showToast({
					icon:'error',
					title:'暂未实现',
					duration:2000
				})
			},
			disable(itemId){
				var itemIdList = [itemId]
				this.$apis.disableEnv(itemIdList).then(res => {
					uni.showToast({
						title:'已禁用',
						duration:2000
					})
					location.reload()
				});
			},
			enable(itemId){
				var itemIdList = [itemId]
				this.$apis.enableEnv(itemIdList).then(res => {
					uni.showToast({
						title:'已启用',
						duration:2000
					})
					location.reload()
				});
				
			},
		},
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
.addSite {
	display: flex;
	justify-content: space-around;
	width: 600rpx;
	line-height: 100rpx;
	position: fixed;
	bottom: 10rpx;
	left: 80rpx;
	background-color: red;
	border-radius: 60rpx;
	margin-top:-40px;//这一句和上面一句配合令层永远处在屏幕最下方
	font-size: 30rpx;
.add{
		display: flex;
		align-items: center;
		color: #ffffff;
		.icon{
			margin-right: 10rpx;
		}
	}
}
.item {
	padding: 40rpx 20rpx;
	.top {
		display: flex;
		font-weight: bold;
		font-size: 34rpx;
		.phone {
			margin-left: 60rpx;
		}
		.tag {
			display: flex;
			font-weight: normal;
			align-items: center;
			text {
				display: block;
				width: 100rpx;
				height: 34rpx;
				line-height: 34rpx;
				color: #ffffff;
				font-size: 20rpx;
				border-radius: 6rpx;
				text-align: center;
				margin-left: 30rpx;
				background-color:rgb(49, 145, 253);
			}
			.red{
				background-color:red
			}
		}
	}
	.bottom {
		display: flex;
		word-break:break-all;
		margin-top: 20rpx;
		font-size: 28rpx;
		justify-content: space-between;
		color: #999999;
	}
}

</style>
