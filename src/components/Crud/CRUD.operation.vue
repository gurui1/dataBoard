<template>
  <div class="crud-opts">
    <span class="crud-opts-left">
      <!--左侧插槽-->
      <el-button
        v-if="crud.optShow.query"
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="crud.toQuery"
      >搜索</el-button>
      <el-button
        v-if="crud.optShow.reset"
        class="filter-item"
        icon="el-icon-refresh-left"
        size="mini"
        type="warning"
        @click="clickHandler"
      >重置</el-button>
      <slot name="left" />
      <el-button
        v-if="crud.optShow.add"
        v-permission="permission.add"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="crud.toAdd"
      >
        新增
      </el-button>
      <el-button
        v-if="crud.optShow.edit"
        v-permission="permission.edit"
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-edit"
        :disabled="crud.selections.length !== 1"
        @click="crud.toEdit(crud.selections[0])"
      >
        修改
      </el-button>
      <el-button
        v-if="crud.optShow.del"
        slot="reference"
        v-permission="permission.del"
        class="filter-item"
        type="danger"
        icon="el-icon-delete"
        size="mini"
        :loading="crud.delAllLoading"
        :disabled="crud.selections.length === 0"
        @click="toDelete(crud.selections)"
      >
        删除
      </el-button>
      <el-button
        v-if="crud.optShow.download"
        v-permission="permission.download"
        :loading="crud.downloadLoading"
        :disabled="!crud.data.length"
        class="filter-item"
        size="mini"
        type="warning"
        icon="el-icon-download"
        @click="crud.doExport"
      >导出</el-button>
      <!-- v-if="checkPer(['admin', 'ment:help'])" -->
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
import { mapGetters } from 'vuex'
import { menusDescApi } from '@/api/data'

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
    permission: {
      type: Object,
      default: () => {
        return {}
      }
    },
    hiddenColumns: {
      type: Array,
      default: () => {
        return []
      }
    },
    ignoreColumns: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 需要保留字段值，不进行重置的KEY Array
    retainKeys: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      tableColumns: [],
      allColumnsSelected: true,
      allColumnsSelectedIndeterminate: false,
      tableUnwatcher: null,
      // 忽略下次表格列变动
      ignoreNextTableColumnsChange: false,
      // 帮助弹窗
      menusDesc: '',
      centerDialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['user', 'menuProperties'])
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
    // 重置
    clickHandler() {
      this.$emit('time', [])
      console.log(this.crud.url.indexOf('http://10.236.36.168'))
      if (this.user.provinceId !== '000') {
        if (
          this.crud.url.indexOf('http://10.236.11.22') === -1 ||
          this.crud.url.indexOf('http://10.161.48.85') === 0 ||
          this.crud.url.indexOf('http://10.177.36.41') === 0 ||
          this.crud.url.indexOf('http://10.236.36.168') === 0
        ) {
          this.crud.resetQuery(true, this.retainKeys ? this.retainKeys : '')
        }
      } else {
        this.crud.resetQuery()
      }
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
      const columnFilter = e =>
        e &&
        e.type === 'default' &&
        e.property &&
        this.ignoreColumns.indexOf(e.property) === -1
      const refCols = table.columns.filter(columnFilter)
      if (this.ignoreNextTableColumnsChange) {
        this.ignoreNextTableColumnsChange = false
        return
      }
      this.ignoreNextTableColumnsChange = false
      const columns = []
      const fullTableColumns = table.$children
        .map(e => e.columnConfig)
        .filter(columnFilter)
      cols = sortWithRef(fullTableColumns, refCols)
      let show = null
      cols.forEach(config => {
        if (config.property === 'actionFrom') {
          show = config
        }
        const column = {
          property: config.property,
          label: config.label,
          visible:
            config.property === 'actionFrom'
              ? false
              : refCols.indexOf(config) !== -1
        }
        columns.push(column)
      })
      this.tableColumns = columns
      if (show !== null) {
        this.handleCheckedTableColumnsChange(show)
      }
    },
    toDelete(datas) {
      this.$confirm(`确认删除选中的${datas.length}条数据?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.crud.delAllLoading = true
          this.crud.doDelete(datas)
        })
        .catch(() => {})
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
      this.allColumnsSelectedIndeterminate =
        selectedCount !== totalCount && selectedCount !== 0
      this.updateColumnVisible(item)
    },
    updateColumnVisible(item) {
      const table = this.crud.props.table
      const vm = table.$children.find(e => e.prop === item.property)
      const columnConfig = vm.columnConfig
      if (item.visible) {
        // 找出合适的插入点
        const columnIndex = this.tableColumns.indexOf(item)
        vm.owner.store.commit(
          'insertColumn',
          columnConfig,
          columnIndex + 1,
          null
        )
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

<style>
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
