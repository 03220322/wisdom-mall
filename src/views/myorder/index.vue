<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active" sticky>
      <van-tab name="all" title="全部"></van-tab>
      <van-tab name="payment" title="待支付"></van-tab>
      <van-tab name="delivery" title="待发货"></van-tab>
      <van-tab name="received" title="待收货"></van-tab>
      <van-tab name="comment" title="待评价"></van-tab>
    </van-tabs>

    <OrderListItem v-for="item in list" :key="item.order_id" :item="item"></OrderListItem>
  </div>
</template>

<script>
import { getMyOrderList } from '@/api/order';
import OrderListItem from '@/components/OrderListItem.vue';
export default {
  name: 'OrderPage',

  components: {
    OrderListItem,
  },
  data() {
    return {
      active: this.$route.query.dataType || 'all',
      page: 1,
      list: [],
    };
  },
  created() {
    // 未登录则跳转到登录页并带上返回地址
    const token = this.$store && this.$store.getters && this.$store.getters.token;
    if (!token) {
      this.$router.replace({ path: '/login', query: { redirect: this.$route.fullPath } });
    }
  },
  methods: {
    async getOrderList() {
      const res = await getMyOrderList(this.active, this.page);
      // 后端在不同情况下可能返回不同结构，request 已经返回 response.data
      // 保护性解析：优先使用 res.data.list.data，其次尝试 res.list.data 或直接数组
      let rawList = [];
      if (res && res.data && res.data.list) {
        rawList = res.data.list.data || [];
      } else if (res && res.list) {
        rawList = res.list.data || [];
      } else if (Array.isArray(res)) {
        rawList = res;
      } else if (res && res.data && Array.isArray(res.data)) {
        rawList = res.data;
      } else {
        // 无数据或未登录等情况，清空列表并返回
        this.list = [];
        return;
      }

      // 计算每个订单的总数量
      rawList.forEach(item => {
        item.total_num = 0;
        if (Array.isArray(item.goods)) {
          item.goods.forEach(goods => {
            item.total_num += goods.total_num || 0;
          });
        }
      });
      this.list = rawList;
    },
  },
  watch: {
    active: {
      immediate: true,
      handler() {
        this.getOrderList();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
</style>
