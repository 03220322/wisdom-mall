// 此处编写的是vue组件的配置项，通过一定语法，可以混入到组件内部使用
// eg：data，methods，computed 生命周期函数等
// 注意：如果mixins和组件内部出现了同名的函数和方法，组件内的优先级更高
// 如果这里也写了生命周期函数，那么这里的和组件内部的会用数组统一管理

// 多个组件都有可能要有token的判断逻辑，就可以放到mixins中统一管理

// 2.放在utils里的js文件，其实是相当于在utils里执行代码
// 3.放在minixs，代码相当于是在组件内部执行的
// 4.在组件内部执行就有一个好处，可以使用created各种生命周期钩子和计算属性什么的
// 5.如果是在utils里执行created会报错的
// 6.放到路由守卫，去拦截，你拦截的是整个页面
// 放拦截器里面每次请求都要判断，可能会影响性能
export default {
  methods: {
    loginConfirm() {
      // 如果有token，则进入后续处理
      // 如果没有token，则跳转登录界面
      // 注意跳转登录回来后，我们希望回到上一级而不是再次登录，所以用replace
      // replace的好处是不会新增历史

      // 先获取token，如果没有token就弹框跳转
      if (!this.$store.getters.token) {
        this.$dialog
          .confirm({
            title: '温馨提示',
            message: '此时需要先登录才能继续操作哦',
            confirmButtonText: '去登录',
            cancelButtonText: '再逛逛',
          })
          .then(() => {
            // 处理点击确认的情况
            this.$router.replace({
              path: '/login',
              query: {
                // fullpath的好处是可以查询到携带的参数
                backUrl: this.$route.fullPath,
              },
            });
          })
          .catch(() => {
            // 处理点击取消的情况
          });
        return true;
      }
      return false;
    },
  },
};
