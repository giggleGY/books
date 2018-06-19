<template>
  <div class="rate-score">
    <span class="star-item" :class="item" v-for="(item,index) in itemClasses"></span>{{score}}分
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    },
    props: ['score'],
    computed: {
      itemClasses() {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (var i = 0; i < integer; i++) {
          result.push('on')
        }
        if (hasDecimal) {
          result.push('half')
        }
        while (result.length < 5) {
          result.push('off')
        }
        return result
      }
    },
    methods: {},
  }
</script>

<style lang="less" type="text/less">
  .rate-score {
    /*position: relative;*/
    display: flex;
    align-items: center;
    margin: .5rem 0 0 0;
    font-size: .6rem;
    color: #5f5f5f;
    .star-item {
      display: inline-block;
      width: .8rem;
      height: .8rem;
      background-size: 100% 100%;
      &.on {
        background: url("./star_on.png") 0 -.05rem/cover no-repeat;
      }
      &.half {
        background: url("./star_half.png") 0 -.05rem/cover no-repeat;
      }
      &.off {
        background: url("./star_off.png") 0 -.05rem/cover no-repeat;
      }
      &:last-of-type {
        margin-right: .5rem;
      }
    }
  }
</style>
