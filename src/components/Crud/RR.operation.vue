<!--搜索与重置-->
<template>
  <span>
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="crud.toQuery">搜索</el-button>
    <el-button
      v-if="crud.optShow.reset"
      class="filter-item"
      icon="el-icon-refresh-left"
      size="mini"
      type="warning"
      @click="clickHandler"
    >重置</el-button>
    <!-- <span>{{ menuDescription }} </span> -->
  </span>
</template>
<script>
import { crud } from '@crud/crud'
import { mapGetters } from 'vuex'

export default {
  name: 'RrOperation',
  mixins: [crud()],
  props: {
    // 需要保留字段值，不进行重置的KEY Array
    retainKeys: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'menuDescription'
    ])
  },
  created() { },
  methods: {
    clickHandler() {
      this.$emit('time', [])
      console.log(this.crud.url.indexOf('http://10.236.36.168'))
      if (this.user.provinceId !== '000') {
        if (this.crud.url.indexOf('http://10.236.11.22') === -1 ||
          this.crud.url.indexOf('http://10.161.48.85') === 0 ||
          this.crud.url.indexOf('http://10.177.36.41') === 0 ||
          this.crud.url.indexOf('http://10.236.36.168') === 0) {
          this.crud.resetQuery(true, this.retainKeys ? this.retainKeys : '')
        }
      } else {
        this.crud.resetQuery()
      }
    }
  }
}
</script>
