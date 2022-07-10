<template>
	<view class="u-page">
		<u-modal v-model="show" title="日志详情">
			<view class="slot-content">
				<rich-text :nodes="content"></rich-text>
			</view>
			<button open-type="getUserInfo" class="u-reset-button" slot="confirm-button" @getuserinfo="getuserinfo">确定</button>
		</u-modal>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" v-for="(item, index) in itemList.slice(0,10)" :key='item._id'>
			<view class="u-m-r-10">
				<u-icon :name="item.status===0 ? 'pause-circle':'play-circle'" color="#19be6b" size="80" @tap="runTask(item._id,index)"></u-icon>
			</view>
			<view class="u-flex-10">
				<view class="u-font-15 u-p-b-10">
				{{ item.name }}
				</view>
				<view class="u-font-10 u-p-b-10">
				{{item.command}}
				</view>
				<view class="u-font-12 u-p-b-10">
				最后运行时间:{{item.last_execution_time | dateFormat}}
				</view>
				<u-tag text="空閑中" size="mini" icon="" plain></u-tag>
			</view>
			
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28" @tap="goLogPage(item._id)"></u-icon>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'/static/images/login/logo.jpg',
				show:false,
				itemList:[],
				taskId:[],
				content:'模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作',
			}
		},
		onLoad() {
			this.getTaskList()
		},
		onPullDownRefresh(){
			this.getTaskList();
			uni.stopPullDownRefresh()
		},
		methods: {
			getTaskList() {
				let that = this;
				this.$apis.getTaskList().then(res => {
					that.itemList = res
					console.log(res)
				});
			},
			goLogPage(task_id) {
				// 跳转日志详情页
				uni.navigateTo({
					url: '/pages/tabbar/loginfo?id='+task_id,
				});
				// this.getTaskLog(task_id)
				// console.log(this.show)
				// console.log('show log model....')
				// this.show = true
				// console.log(this.show)
			},
			runTask(task_id,index) {
				let data = [task_id]
				console.log(data)
				this.$apis.runTask(data).then(res => {
					// console.log("index:" + index)
					// this.$set(this.itemList[index],status,0)
					// console.log(this.itemList)
					this.itemList[index].status = 0
				});
			},
			getTaskLog(task_id) {
				this.$apis.getTaskLog(task_id).then(res => {
					this.content = res;
				});
			},
		}
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
	position: absolute;
	bottom: 30rpx;
	left: 80rpx;
	background-color: red;
	border-radius: 60rpx;
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
.u-page {
	padding: 0;
}
</style>
