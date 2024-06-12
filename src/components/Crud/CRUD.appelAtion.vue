<template>
  <div class="crud-opts">
    <span class="crud-opts-left">
      <!--左侧插槽-->
      <slot name="left" />
      <el-tooltip
        class="item"
        effect="dark"
        content="请先筛选目标数据后再导出"
        placement="bottom"
      >
        <el-button
          v-if="phoneNumberType === 5"
          :loading="crud.downloadLoading"
          class="filter-item"
          size="mini"
          type="warning"
          icon="el-icon-download"
          @click="doExport('/api/xinan/telephone/other/result/export', 1)"
        >
          数据导出（结果反馈使用）
          <i class="el-icon-warning" />
        </el-button>
        <el-button
          v-if="phoneNumberType === 6"
          v-permission="permission.other"
          :loading="crud.downloadLoading"
          class="filter-item"
          size="mini"
          type="warning"
          icon="el-icon-download"
          @click="
            doExport('/api/xinan/hotel/telephone/result/export2', '酒店固话')
          "
        >
          数据导出（结果反馈使用）
          <i class="el-icon-warning" />
        </el-button>
        <el-button
          v-if="phoneNumberType !== 5"
          :loading="crud.downloadLoading"
          class="filter-item"
          size="mini"
          type="warning"
          icon="el-icon-download"
          @click="doExport('/api/xinan/phone/other/result/export', 1)"
        >
          数据导出（结果反馈使用）
          <i class="el-icon-warning" />
        </el-button>
      </el-tooltip>
      <el-button
        v-if="crud.optShow.download"
        :loading="crud.downloadLoading"
        :disabled="!crud.data.length"
        class="filter-item"
        size="mini"
        type="warning"
        icon="el-icon-download"
        @click="doExport('/api/xinan/number/report/result/detailed/export2', 2)"
      >
        导出
      </el-button>
      <el-button
        class="filter-item"
        size="mini"
        type="warning"
        icon="el-icon-warning-outline"
        @click="toHelp"
      >帮助</el-button>
      <!--右侧-->
      <slot name="right" />
    </span>
    <el-button-group class="crud-opts-right">
      <el-button
        size="mini"
        plain
        type="info"
        icon="el-icon-search"
        @click="toggleSearch()"
      />
      <el-button
        v-if="crud.title !== '省分模型' && crud.title !== '省分策略'"
        size="mini"
        icon="el-icon-refresh"
        @click="toRefresh()"
      />
      <el-popover placement="bottom-end" width="150" trigger="click">
        <el-button slot="reference" size="mini" icon="el-icon-s-grid">
          <i class="fa fa-caret-down" aria-hidden="true" />
        </el-button>
        <el-checkbox
          v-model="allColumnsSelected"
          :indeterminate="allColumnsSelectedIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox
          v-for="item in tableColumns"
          :key="item.property"
          v-model="item.visible"
          @change="handleCheckedTableColumnsChange(item)"
        >
          {{ item.label }}
        </el-checkbox>
      </el-popover>
    </el-button-group>
    <el-dialog
      :visible.sync="centerDialogVisible"
      style="margin-top: 1vh !important"
      width="40%"
      center
    >
      <span slot="title"><svg-icon icon-class="partol" />帮&nbsp;&nbsp;助</span>
      <div class="menus_desc_css">{{ menusDesc }}</div>
      <div
        style="width: 550px; text-align: center"
        @click="centerDialogVisible = false"
      />
      <!-- <svg-icon icon-class="over" class="over" /> -->
    </el-dialog>
  </div>
</template>

<script>
import CRUD, { crud } from '@crud/crud'
import { menusDescApi } from '@/api/data'
import { mapGetters } from 'vuex'
import {
  download
} from '@/api/data'
import {
  downloadFile
} from '@/utils/index'

function sortWithRef(src, ref) {
  const result = Object.assign([], ref)
  let cursor = -1
  src.forEach(e => {
    const idx = result.indexOf(e)
    if (idx === -1) {
      cursor += 1
      result.splice(cursor, 0, e)
    } else {
      cursor = idx
    }
  })
  return result
}

export default {
  mixins: [crud()],
  props: {
    phoneNumberType: {
      type: Number,
      default: () => { return '' }
    },
    permission: {
      type: Object,
      default: () => { return {} }
    },
    hiddenColumns: {
      type: Array,
      default: () => { return [] }
    },
    ignoreColumns: {
      type: Array,
      default: () => { return [] }
    }
  },
  data() {
    return {
      tableColumns: [],
      fileTitle: '',
      allColumnsSelected: true,
      allColumnsSelectedIndeterminate: false,
      tableUnwatcher: null,
      // 帮助弹窗
      menusDesc: '',
      centerDialogVisible: false,
      // 忽略下次表格列变动
      ignoreNextTableColumnsChange: false
    }
  },
  watch: {
    'crud.props.table'() {
      this.updateTableColumns()
      this.tableColumns.forEach(column => {
        if (this.hiddenColumns.indexOf(column.property) !== -1) {
          column.visible = false
          this.updateColumnVisible(column)
        }
      })
    },
    'crud.props.table.store.states.columns'() {
      this.updateTableColumns()
    }
  },
  created() {
    this.crud.updateProp('searchToggle', true)
  },
  computed: {
    ...mapGetters([
      'menuProperties'
    ])
  },
  methods: {
    // 帮助
    toHelp() {
      const params = {
        title: this.menuProperties.meta.title
      }
      menusDescApi(params).then(res => {
        this.centerDialogVisible = true
        this.menusDesc = res.data ? res.data : '暂无说明'
      })
    },
    doExport(url, type) {
      if (this.phoneNumberType === 5) {
        this.title = type === 1 ? '码号处置-固话结果数据' : '码号处置-固话导出数据'
      } else {
        this.title = type === 1 ? '码号处置-手机号结果数据' : '码号处置-手机号导出数据'
      }
      if (type === '酒店固话') {
        this.title = '码号处置-酒店固话结果数据'
      }
      console.log(this.title)
      if (this.crud.page.total > '500000') {
        Notification.error({
          title: '本次下载的条数超过50万上限，请设置查询条件后重试！',
          duration: 5000
        })
        return false
      }
      this.crud.downloadLoading = true
      download(process.env.VUE_APP_UASE_API + url, this.crud.getQueryParams()).then(result => {
        if (result !== undefined) {
          downloadFile(result, this.title, type === 1 || type === '酒店固话' ? 'xls' : 'xlsx')
        } else {
          // 导出公安关停号码数据的限制提示
          if (this.crud.title === '公安关停号码') {
            Notification.error({
              title: '导出失败，有可能是本次下载的条数超过上限，请设置查询条件后重试！',
              duration: 5000
            })
          } else {
            Notification.error({
              title: '文件下载失败',
              duration: 5000
            })
          }
          this.crud.downloadLoading = false
        }
        this.crud.downloadLoading = false
      }).catch(() => {
        this.crud.downloadLoading = false
      })
    },
    toRefresh() {
      this.crud.refresh()
    },
    updateTableColumns() {
      const table = this.crud.getTable()
      if (!table) {
        this.tableColumns = []
        return
      }
      let cols = null
      const columnFilter = e => e && e.type === 'default' && e.property && this.ignoreColumns.indexOf(e.property) === -1
      const refCols = table.columns.filter(columnFilter)
      if (this.ignoreNextTableColumnsChange) {
        this.ignoreNextTableColumnsChange = false
        return
      }
      this.ignoreNextTableColumnsChange = false
      const columns = []
      const fullTableColumns = table.$children.map(e => e.columnConfig).filter(columnFilter)
      cols = sortWithRef(fullTableColumns, refCols)
      cols.forEach(config => {
        const column = {
          property: config.property,
          label: config.label,
          visible: refCols.indexOf(config) !== -1
        }
        columns.push(column)
      })
      this.tableColumns = columns
    },
    toDelete(datas) {
      this.$confirm(`确认删除选中的${datas.length}条数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.crud.delAllLoading = true
        this.crud.doDelete(datas)
      }).catch(() => {
      })
    },
    handleCheckAllChange(val) {
      if (val === false) {
        this.allColumnsSelected = true
        return
      }
      this.tableColumns.forEach(column => {
        if (!column.visible) {
          column.visible = true
          this.updateColumnVisible(column)
        }
      })
      this.allColumnsSelected = val
      this.allColumnsSelectedIndeterminate = false
    },
    handleCheckedTableColumnsChange(item) {
      let totalCount = 0
      let selectedCount = 0
      this.tableColumns.forEach(column => {
        ++totalCount
        selectedCount += column.visible ? 1 : 0
      })
      if (selectedCount === 0) {
        this.crud.notify('请至少选择一列', CRUD.NOTIFICATION_TYPE.WARNING)
        this.$nextTick(function() {
          item.visible = true
        })
        return
      }
      this.allColumnsSelected = selectedCount === totalCount
      this.allColumnsSelectedIndeterminate = selectedCount !== totalCount && selectedCount !== 0
      this.updateColumnVisible(item)
    },
    updateColumnVisible(item) {
      const table = this.crud.props.table
      const vm = table.$children.find(e => e.prop === item.property)
      const columnConfig = vm.columnConfig
      if (item.visible) {
        // 找出合适的插入点
        const columnIndex = this.tableColumns.indexOf(item)
        vm.owner.store.commit('insertColumn', columnConfig, columnIndex + 1, null)
      } else {
        vm.owner.store.commit('removeColumn', columnConfig, null)
      }
      this.ignoreNextTableColumnsChange = true
    },
    toggleSearch() {
      this.crud.props.searchToggle = !this.crud.props.searchToggle
    }
  }
}
</script>

<style scoped>
.crud-opts {
  padding: 4px 0;
  display: -webkit-flex;
  display: flex;
  align-items: center;
}
.crud-opts .crud-opts-right {
  margin-left: auto;
}
.crud-opts .crud-opts-right span {
  float: left;
}
.el-icon-warning {
  position: absolute;
  margin-left: 5px;
  margin-top: -12px;
  font-size: 16px;
  color: rgb(247, 60, 60);
}
</style>
<style lang="scss" scoped>
::v-deep .el-dialog__header {
  padding: 15px;
  color: white;
  font-size: 20px;
  background: #1890ff;
}
::v-deep .el-dialog__headerbtn {
  top: 15px;
}
.menus_desc_css {
  white-space: pre-line;
  font-family: "思源黑体", Arial, sans-serif;
  font-size: 16px;
  letter-spacing: 0.5px;
  line-height: 34px;
}
.over {
  position: absolute;
  font-size: 30px;
  margin-top: 40px;
}
</style>
