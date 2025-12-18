<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <div class="cart-box" v-if="isLogin && cartTotal != 0">
      <!-- 购物车开头 -->
      <div class="cart-title">
        <span class="all"
          >共<i>{{ cartTotal }}</i
          >件商品</span
        >
        <span class="edit">
          <van-icon @click="isEdit = !isEdit" name="edit" />
          编辑
        </span>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <van-checkbox
            @click="Toggle(item.goods_id)"
            icon-size="18"
            :value="item.isChecked"
          ></van-checkbox>
          <div class="show" @click="$router.push(`/prodetail/${item.goods_id}`)">
            <img :src="item.goods.goods_image" alt="" />
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
            <span class="bottom">
              <div class="price">
                ¥ <span>{{ item.goods.goods_price_min }}</span>
              </div>
              <!-- 两种写法 $event 和箭头函数 -->
              <!-- <CountBox @input="changeCount($event, item.goods_id, item.goods_sku_id )" :value="item.goods_num"></CountBox> -->
              <CountBox
                @input="value => changeCount(value, item.goods_id, item.goods_sku_id)"
                :value="item.goods_num"
              ></CountBox>
            </span>
          </div>
        </div>
      </div>

      <div class="footer-fixed">
        <div @click="toggleAll" class="all-check">
          <van-checkbox :value="isAllChecked" icon-size="18"></van-checkbox>
          全选
        </div>

        <div class="all-total">
          <div class="price">
            <span>合计：</span>
            <span
              >¥ <i class="totalPrice">{{ SelPrice }}</i></span
            >
          </div>
          <div v-if="!isEdit" class="goPay" :class="{ disabled: SelCount === 0 }" @click="goPay">
            结算({{ SelCount }})
          </div>
          <div v-else @click="delCart" class="delete" :class="{ disabled: SelCount === 0 }">
            删除
          </div>
        </div>
      </div>
    </div>
    <!-- 如果购物车为空或者用户没登录就显示这个 -->
    <div class="empty-cart" v-else>
      <img src="@/assets/empty.png" alt="" />
      <div class="tips">您的购物车是空的, 快去逛逛吧</div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue';
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'CartPage',
  data() {
    return {
      isEdit: false,
    };
  },
  components: {
    CountBox,
  },
  created() {
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartAction');
    }
  },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal', 'SelGoods', 'SelCount', 'SelPrice', 'isAllChecked']),
    isLogin() {
      return this.$store.getters.token;
    },
  },
  methods: {
    // 复选框状态
    Toggle(goodsId) {
      this.$store.commit('cart/toggleCheck', goodsId);
    },
    // 全选按钮
    toggleAll() {
      // 这里isAllChecked取反的原因是，点击后是切换状态，比如说原来是true，再次点击就是false
      // 所以这里直接把再次点击后的值付给每一个goods
      // 当然也可以把isAllChecked传过去后在js中取反
      this.$store.commit('cart/AllChecked', !this.isAllChecked);
    },

    // 数字框修改数量
    changeCount(value, goodsId, skuId) {
      this.$store.dispatch('cart/changeCountAction', {
        value,
        goodsId,
        skuId,
      });
    },
    // 编辑删除商品
    async delCart() {
      if (this.selGoods === 0) {
        return false;
      } else {
        // 加await的目的就是等数据全部渲染完毕后，
        // 再将isEdit修改为false，否则如果先改为false，
        // 之后数据才拿到然后就会覆盖你改的false，即变为true
        await this.$store.dispatch('cart/delCartAction');
        // this.isEdit = false // 删除商品后重置回到结算页面
      }
    },
    goPay() {
      // console.log(111)
      if (this.SelCount > 0) {
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            cartIds: this.SelGoods.map(item => item.id).join(','),
          },
        });
      }
    },
  },
  watch: {
    isEdit(value) {
      if (value) {
        this.$store.commit('cart/AllChecked', false);
      } else {
        this.$store.commit('cart/AllChecked', true);
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay,
    .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }
}

.empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>
