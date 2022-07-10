<template>
  <view>
        <view class="uni-padding-wrap uni-common-mt">
            <view class="text-box" scroll-y="true">
                <text>{{text}}</text>
            </view>
            <view class="uni-btn-v">
            </view>
        </view>
    </view>
</template>
<script>
	export default {
		data() {
			return {
				task_id:'',
				text:'',
				
			};
		},
		onLoad(options) {
			this.task_id = options.id
			console.log(this.task_id)
			this.getTaskLog(this.task_id)
		},
		methods: {
				getTaskLog(task_id) {
					this.$apis.getTaskLog(task_id).then(res => {
						this.text = res;
					});
				},
		}
	}
</script>

<style lang="less" scoped>

</style>