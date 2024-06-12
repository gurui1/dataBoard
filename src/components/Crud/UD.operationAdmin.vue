<template>
  <div>
    <el-button
      icon="el-icon-remove-outline"
      size="mini"
      type="primary"
      @click="shutdownModel(data)"
    />
    <el-popover
      v-model="visible"
      v-permission="permission.reset"
      placement="top"
      trigger="manual"
      width="180"
      @hide="onPopoverHide"
      @show="onPopoverShow"
    >
      <p>{{ resetMsg }}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="doCancel">取消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="resPassWord(data)"
        >确定</el-button>
      </div>
      <el-button
        slot="reference"
        :disabled="disabledDle"
        icon="el-icon-refresh-left"
        size="mini"
        type="danger"
        @click="toReset"
      />
    </el-popover>
    <el-button
      :disabled="disabledEdit"
      :loading="crud.status.cu === 2"
      icon="el-icon-edit"
      size="mini"
      type="primary"
      @click="crud.toEdit(data)"
    />
    <el-popover
      v-model="pop"
      v-permission="permission.del"
      placement="top"
      trigger="manual"
      width="180"
      @hide="onPopoverHide"
      @show="onPopoverShow"
    >
      <p>{{ msg }}</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="doCancel">取消</el-button>
        <el-button
          :loading="crud.dataStatus[crud.getDataId(data)].delete === 2"
          size="mini"
          type="primary"
          @click="crud.doDelete(data)"
        >确定
        </el-button>
      </div>
      <el-button
        slot="reference"
        :disabled="disabledDle"
        icon="el-icon-delete"
        size="mini"
        type="danger"
        @click="toDelete"
      />
    </el-popover>
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="beforeCancelCU"
      :visible.sync="shutdownModelVisible"
      title="关停流程编码"
      width="670px"
    >
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        size="small"
        label-width="90px"
      >
        <el-form-item label="流程编码：" prop="shutdownModel">
          <el-input
            v-model="form.shutdownModel"
            type="textarea"
            style="width: 500px"
            :autosize="{ minRows: 2, maxRows: 8 }"
            placeholder="关停流程编码，多个用英文逗号隔开"
          />
          <div style="color: #fa5a38; font-size: 12px">
            *多个流程编码用英文逗号隔开
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="text"
          @click="shutdownModelVisible = false"
        >取消</el-button>
        <el-button
          :loading="crud.status.cu === 2"
          type="primary"
          @click="shutdownModelSubmitCU"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CRUD, { crud } from '@crud/crud'
import { reset } from '@/api/system/user'
import { queryConfigModel, configModel } from '@/api/system/user'

export default {
  mixins: [crud()],
  props: {
    data: {
      type: Object,
      required: true
    },
    permission: {
      type: Object,
      required: true
    },
    disabledEdit: {
      type: Boolean,
      default: false
    },
    disabledDle: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '确定删除本条数据吗？'
    },
    resetMsg: {
      type: String,
      default: '确定要重置密码？'
    }
  },
  data() {
    return {
      pop: false,
      visible: false,
      shutdownModelVisible: false,
      form: {
        shutdownModel: ''
      }
    }
  },
  methods: {

    shutdownModel() {
      this.form.shutdownModel = ''
      this.shutdownModelVisible = true
      queryConfigModel(this.data.id).then(res => {
        this.form.shutdownModel = res.data.modelCode
      })
    },
    shutdownModelSubmitCU() {
      const shutdownModelsArray = this.form.shutdownModel.split(',') // 将字符串拆分成数组
      const uniqueShutdownModels = [...new Set(shutdownModelsArray)] // 使用Set对象去重
      const uniqueShutdownModelString = uniqueShutdownModels.join(',') // 将数组转换回字符串并用逗号分隔

      // 将去重后的字符串赋值回this.form.shutdownModel
      this.form.shutdownModel = uniqueShutdownModelString
      configModel(this.form.shutdownModel, this.data.id).then(res => {
        if (res.code === '0000') {
          this.$notify({
            title: '成功',
            message: res.data,
            type: 'success'
          })
          this.form.shutdownModel = ''
          this.shutdownModelVisible = false
        }
      })
    },
    beforeCancelCU(done) {
      this.shutdownModelVisible = false
    },
    doCancel() {
      this.pop = false
      this.visible = false
      this.crud.cancelDelete(this.data)
    },
    toReset() {
      this.visible = true
    },
    toDelete() {
      this.pop = true
    },
    [CRUD.HOOK.afterDelete](crud, data) {
      if (data === this.data) {
        this.pop = false
      }
    },
    onPopoverShow() {
      setTimeout(() => {
        document.addEventListener('click', this.handleDocumentClick)
      }, 0)
    },
    onPopoverHide() {
      document.removeEventListener('click', this.handleDocumentClick)
    },
    handleDocumentClick(event) {
      this.pop = false
    },
    resPassWord(data) {
      reset(data).then(res => {
        this.$confirm('重置成功,当前密码为: ' + res.data + '', '提示', {
          confirmButtonText: '复制密码',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          const el = document.createElement('textarea')
          el.value = res.data
          document.body.appendChild(el)
          el.select()
          document.execCommand('copy')
          document.body.removeChild(el)
          this.$message({
            type: 'success',
            message: '复制成功!'
          })
        })
        // this.$notify({
        //   title: '重置成功,当前密码为:' + res.data,
        //   type: 'success',
        //   duration: 5000
        // })
        this.visible = false
      })
    }
  }
}
</script>
<style scoped>
::v-deep .el-textarea.is-disabled .el-textarea__inner {
  color: #828282;
  background-color: #ffffff;
}
</style>
