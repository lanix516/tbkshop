<template>
  <div class="search">
    <div class="content">
      <div class="logo">
        <img :src="require('../../assets/images/dd64.png')">
      </div>
      <van-cell-group>
        <van-field
          v-model="goodMessage"
          type="textarea"
          placeholder="请将淘口令或链接粘贴到此处"
          rows="3"
          autosize
          border
        />
      </van-cell-group>
      <van-button @click="doSearch" class="search-btn" size="large" type="warning">查看优惠</van-button>
    </div>
    <div class="info-area">
      <van-row justify="center">
        <van-col span="6" style="text-align:center">
          <van-icon name="fire" size="32px"/>
        </van-col>
        <van-col span="6" style="text-align:center">
          <van-icon name="shop-collect" size="32px"/>
        </van-col>
        <van-col span="6" style="text-align:center">
          <van-icon name="goods-collect" size="32px"/>
        </van-col>
        <van-col span="6" style="text-align:center">
          <van-icon name="lock" size="32px"/>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Button, Field, Cell, CellGroup, Icon, Row, Col } from "vant";

export default {
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col
  },

  data() {
    return {
      goodMessage: ""
    };
  },

 mounted(){
	//this.$refs["searchArea"].focus();
	this.$nextTick().then(()=>{
		navigator.permissions.query({
			  name: 'clipboard-read'
			}).then(permissionStatus => {
			  // permissionStatus.state 的值是 'granted'、'denied'、'prompt':
			  console.log(permissionStatus.state);
			  // document.write('Pasted state: ', permissionStatus.state);

			  // 监听权限状态改变事件
			  permissionStatus.onchange = () => {
				console.log(permissionStatus.state);
				// document.write('Pasted state: ', permissionStatus.state);
			  };
			});
			navigator.clipboard.readText()
			  .then(text => {
				console.log('Pasted content: ', text);
				//show(text);
				this.goodMessage = text;
				if(this.goodMessage){
					navigator.clipboard.writeText('')
					  .then(() => {
						console.log('清空剪贴板失败');
					  })
					  .catch(err => {
						// This can happen if the user denies clipboard permissions:
						// 如果用户没有授权，则抛出异常
						console.error('无法复制此文本：', err);
					  });
					this.doSearch();
				}
				// document.write('Pasted content: ', text);
				//   document.getElementById('taobao').innerText('aaa');
			  })
			  .catch(err => {
				console.error('Failed to read clipboard contents: ', err);
				document.write('Failed to read: ', err);
			  });
	})
 },
  computed: {},

  methods: {
    doSearch() {
      if (this.goodMessage) {
        this.$router.push(`/goods?keyword=${this.goodMessage}`);
      } else {
        this.$toast("请将淘口令或链接粘贴到文本框中");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  .content {
    margin-top: 100px;
    padding: 10px;
    .logo {
      text-align: center;
      margin-bottom: 10px;
    }
    .search-btn {
      margin-top: 20px;
    }
    .center {
      text-align: center;
    }
  }
  .info-area {
    margin-top: 20px;
  }
}
</style>
