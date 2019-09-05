<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="环境" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.environment }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属业务领域" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.businessDomain }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="系统名称" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.systemName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="系统简称" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.system }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="负责人" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.peopleInCharge }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="资源状态" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.ressourceStatus }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="运行状态" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.runStatus }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Actions" align="center" width="400" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" @click="handlePeopleInCharge(scope.row)">
            负责人维护
          </el-button>
          <el-button type="success" @click="handleParamsMaintain(scope.row)">
            系统参数维护
          </el-button>
          <el-button @click="showSystemDetail(scope.row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 下面这个是负责人维护的弹框 -->
    <el-dialog title="负责人维护" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="所属业务领域">
          <el-select v-model="temp.businessDomain" placeholder="所属业务领域">
            <el-option label="信贷工厂 - 金服" value="xd-jf" />
            <el-option label="信贷工厂 - APM" value="xd-apm" />
            <el-option label="信贷工厂 - ZMA" value="xd-zma" />
            <el-option label="风控平台" value="rcp" />
            <el-option label="云仓" value="yc" />
            <el-option label="清结算" value="qjs" />
          </el-select>
        </el-form-item>
        <el-form-item label="系统名称" prop="systemName">
          <el-input v-model="temp.systemName" />
        </el-form-item>
        <el-form-item label="系统简称" prop="system">
          <el-input v-model="temp.system" />
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="temp.peopleInCharge" placeholder="负责人">
            <el-option label="冀虹宇" value="冀虹宇" />
            <el-option label="蒯宙" value="蒯宙" />
            <el-option label="赵文豪" value="赵文豪" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="submitPeopleInCharge">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import { fetchList, submitPeopleInChargeAPI } from '@/api/machine'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  name: 'MachineList',
  directives: { elDragDialog },
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        id: undefined,
        environment: '',
        businessDomain: '',
        systemName: '',
        system: '',
        peopleInCharge: '',
        ressourceStatus: '',
        runStatus: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // 负责人维护的弹窗
    handlePeopleInCharge(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    // 负责人维护页面，点击提交后执行的方法
    submitPeopleInCharge() {
      this.listQuery = {
        businessDomain: this.temp.businessDomain,
        systemName: this.temp.systemName,
        system: this.temp.system,
        peopleInCharge: this.temp.peopleInCharge
      }
      submitPeopleInChargeAPI(this.listQuery).then(response => {
        if (response.code === 20000) {
          this.$message('这是一条消息提示2')
        }
        // 再次调用getList刷新列表页数据
        this.getList()
      })
    }
  }
}
</script>
