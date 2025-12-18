<template>
  <div class="count-box">
    <button @click="handleNum(-1)" class="minus">-</button>
    <input :value="value" @change="changeNum" class="inp" type="text" />
    <button @click="handleNum(1)" class="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      typeof: Number,
      default: 1,
    },
  },
  methods: {
    handleNum(key) {
      const cnt = this.value + key;
      if (cnt < 1) {
        return;
      }
      this.$emit('input', cnt);
    },
    changeNum(e) {
      //   console.log(e.target.value)
      const cnt = +e.target.value;
      if (isNaN(cnt) || cnt < 1) {
        // 回退为原来的值
        e.target.value = this.value;
        return;
      }
      //   提交修改请求
      this.$emit('input', cnt);
    },
  },
};
</script>

<style lang="less" scoped>
.count-box {
  height: 30px;
  width: 100px;
  display: flex;
  border: none;
  .inp {
    margin: 0 5px;
    width: 40px;
    text-align: center;
    border: none;
    background-color: #efefef;
  }
  .add,
  .minus {
    width: 30px;
    background-color: #efefef;
    border: none;
  }
}
</style>
