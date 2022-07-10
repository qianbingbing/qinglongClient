<template>
    <view>
        <web-view :src="url"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                url: 'https://m.jd.com/',
				cookie:'',
				timer:null
            }
        },
        onLoad(e) {
             // 获取传递过来的链接
			console.log("@@@@@@@@@"+this.url)
			console.log("######"+e.itemId)
			plus.navigator.removeAllCookie()
			this.timer = setInterval(() =>{
				var cookie = plus.navigator.getCookie(this.url)
				console.log(cookie)
				var pattern = /pt_key(.*?); pt_pin(.*?);/
				console.log(pattern.test(cookie))
				if(pattern.test(cookie)){
					var result = pattern.exec(cookie)[0]
					console.log("result:" + result)
					this.cookie = result
					clearInterval(this.timer)
					var cookieObject = {index:e.itemId,value:this.cookie}
					console.log(cookieObject)
					getApp().globalData.updatedCookie = cookieObject
					uni.switchTab({
					    url: 'pages/tabbar/home'
					});
				}
			},5000)
        },
		onBackPress(){
			clearInterval(this.timer)
		}
    }
</script>