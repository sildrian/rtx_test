<template>
  <div class="ShowAbout">
    <h1>{{ msgabout }}</h1>
    <!-- 8. Display the data with a structured table in following columns, element-ui is ready for use -->
    <!-- property.name | property.location.country | property.reviews.summary.score -->
    <!-- 9. Do a simple pagination of 5 per page-->
    <!-- 10. Hide the entry without country and/or score-->

    <!-- table data -->
    <div style="width: 80%;margin-top:1.5rem">
      <el-table :data="displayData" style="width: inherit;margin-left:auto;" :header-cell-style="{textAlign: 'center'}">
        <el-table-column align="left" prop="property.name" label="Name" width="180" />
        <el-table-column align="center" prop="property.location.country" label="Country" width="180" />
        <el-table-column align="center" prop="property.reviews.summary.score" label="Score" />
        <el-table-column
          fixed="right"
          label="Operations"
          width="120">
          <template #default="scope">
            <el-button @click="handleUpdate(scope.$index,scope.row)" type="text" size="small">Update</el-button>
            <el-button @click="handleDelete(scope.$index,scope.row)" type="text" size="small" style="color:red;">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-size="perpage"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="totaldata"
        style="width: fit-content;margin-left:auto;margin-top:.5rem">
      </el-pagination>
    </div>
    
    <!-- modal update data -->
    <el-dialog v-model="dialogVisible" title="Update Data">
      <el-form :model="form">
        <el-form-item label="Name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Country" :label-width="formLabelWidth">
          <el-input v-model="form.country" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Score" :label-width="formLabelWidth">
          <el-input v-model="form.score" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="executeUpdate">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessageBox } from 'element-plus'
export default {
  name: 'ShowAbout',
  props: {
    msgabout: String,
  },
  data() {
    return {
      hotels: [],
      perpage: 5,
      page: 1,
      dialogVisible: false,
      totaldata: 0,
      selectedData:[],
      form: {
        "name":'',
        "country":'',
        "score":'',
        "index":0
      },
      formLabelWidth: '140px'

    };
  },
  computed: {
    displayData() {
      let datafilter = this.hotels.filter(data => data.property.location.country != '' && data.property.reviews != undefined && data.property.reviews.summary.score != '')
      return datafilter
    }
  },
  mounted() {
    this.callApi(this.page)
  },
  methods: {
    callApi(page){
      axios.get(`/api/get?page=${page}`)
        .then((res) => {
          this.hotels = res?.data?.data?.outlets?.availability?.results;
          this.perpage = res?.data?.limitperpage
          this.totaldata = res?.data?.lengthdata          
        });
    },
    handleCurrentChange(data){
      this.callApi(data)
    },
    handleUpdate(index,data){
      this.dialogVisible = true 
      this.form.index = index
      this.form.name = data.property.name
      this.form.country = data.property.location.country
      this.form.score = data.property.reviews.summary.score
    },
    handleDelete(index,data){
      let postdata = {
        "index": index
      }
      ElMessageBox.confirm(`Are you sure to delete "${data.property.name}" data?`)
        .then(() => {
          axios({ url: `/api/delete`, data: postdata, method: "POST" })
          .then((res) => {
            this.callApi(1)
          }).catch((err)=>{
            alert('something went wrong')
          })
          done()
        })
        .catch(() => {
          // catch error
      })
    },
    executeUpdate(){
      this.dialogVisible = false
      axios({ url: `/api/update`, data: this.form, method: "POST" })
        .then((res) => {
          this.callApi(1)
        }).catch((err)=>{
          alert('something went wrong')
      })
    }
  }
};
</script>