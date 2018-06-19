<template>
  <div class="top-nav-pannel font-container" id="font-container" v-show="font_panel">
    <div class="child-mod">
      <span>字号</span>
      <button id="large-font" class="spe-button" @click="add">
        大
      </button>
      <button id="small-font" class="spe-button" @click="sub" style="margin-left: .533rem;">
        小
      </button>
    </div>
    <div class="child-mod" id="bk-container">
      <span>背景</span>
      <div class="bk-container" :class="{'bk-container-current': i==now_color}" v-for="(n,i) in 6">
        <div class="color_btn" @click="changeColor(i)"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import localEvent from '../../../store/local'

  export default {
    data() {
      return {
        now_color: 0
      }
    },
    computed: {
      ...mapState([
        'font_panel', 'bg_color'
      ])
    },
    methods: {
      //点击修改bg_color，父组件可根据bg_color的值更改自定义属性bg_color，达到修改背景色的目的
      changeColor(index) {
        this.now_color = index
        this.$store.state.bg_color = index + 1
        localEvent.StorageSetter('bg_color', index + 1)
      },
      //加减字体需要直接操作dom元素的字体大小，在子组件不好操作，所以在父组件监听fz_size的值再更改
      add() {
        this.$store.dispatch('fzSizeAdd')
      },
      sub() {
        this.$store.dispatch('fzSizeSub')
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .top-nav-pannel {
    position: fixed;
    bottom:3.74rem;
    height: 7rem;
    background: none;
    width: 100%;
    color: #fff;
    font-size: .747rem;
    z-index: 10004;
    button {
      background: none;
      border: 1px #8c8c8c solid;
      padding: .267rem 2.133rem;
      color: #fff;
      display: inline-block;
      border-radius: .853rem;
      font-size: .6rem;
      &:focus {
        outline:none;
      }
    }
    .child-mod {
      padding: .267rem 1.067rem;
      margin-top: .8rem;
      & > span:first-child {
        margin-right: 1.067rem;
      }
    }
    .bk-container {
      position: relative;
      height: 1.6rem;
      width: 1.6rem;
      background: #fff;
      border-radius: .8rem;
      display: inline-block;
      vertical-align: -.747rem;
      margin-left: .533rem;
      box-sizing: border-box;
      .color_btn {
        height: 1.6rem;
        width: 1.6rem;
        border-radius:50%;
      }
    }
    .bk-container-current {
      height: 1.7rem;
      width: 1.7rem;
      border-radius: 50%;
      border: 1px #ff7800 solid;
    }
    .bac(@color) {
      background-color: @color;
    }
    .bk-container:nth-child(2) .color_btn {
      .bac(#e9dfc7);
    }
    .bk-container:nth-child(3) .color_btn {
      .bac(#e7eee5);
    }
    .bk-container:nth-child(4) .color_btn {
      .bac(#a4a4a4);
    }
    .bk-container:nth-child(5) .color_btn {
      .bac(#cdefcd);
    }
    .bk-container:nth-child(6) .color_btn {
      .bac(#283548);
    }
    .bk-container:nth-child(7) .color_btn {
      .bac(#0f1410);
    }
  }
</style>
