<style>
.employeeMan {
    top: 100px;
    position: absolute;
    width: 99%;
}
</style>
<template>
    <div class="employeeMan">
        <el-button type="success" style="float:left;" @click="addElement()" icon="el-icon-plus">Add</el-button>
        <!-- <el-button type="primary" style="float:left;" onclick="javascript:location.reload()" -->
        <el-button type="primary" style="float:left;" @click="reload()"
            icon="el-icon-refresh-right">Refresh</el-button>
        <el-table v-loading="loading" max-height="490" :data='tableData' border :key="num"
            style="width: 100%;">
            <el-table-column sortable fixed prop="id" label="ID" width="100">
            </el-table-column>
            <el-table-column :filters="[{text: 'Desktop', value: 'Desktop'}, 
            {text: 'Laptop', value: 'Laptop'}, 
            {text: 'Headset', value: 'Headset'}, 
            {text: 'Tablet', value: 'Tablet'}, 
            {text: 'Keyboard', value: 'Keyboard'}, 
            {text: 'Mouse', value: 'Mouse'}, 
            {text: 'CPU', value: 'CPU'}, 
            {text: 'Harddisk', value: 'Harddisk'}, 
            {text: 'GraphicsCard', value: 'GraphicsCard'}
            ]" :filter-method="filterHandler" prop="type" label="Type" width="120">
            </el-table-column>
            <el-table-column fixed prop="name" label="Name" width="200">
            </el-table-column>
            <el-table-column sortable prop="amount" label="Amount" width="100">
            </el-table-column>
            <el-table-column sortable prop="price" label="Price(￥)" width="120">
            </el-table-column>
            <el-table-column sortable prop="sales" label="Sales Last Month" width="180">
            </el-table-column>
            <el-table-column fixed="right" label="Action" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">View</el-button>
                    <el-button @click="editClick(scope.row)" type="text" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--View Details Window-->
        <el-dialog title="Details" :visible.sync="dialogVisible" width="30%">
            <span>ID: {{id}}</span><br />
            <span>Merchandise Name: {{name}}</span><br />
            <span>Type: {{type}}</span><br />
            <span>Amount: {{amount}}</span><br />
            <span>Unit Price: {{price}}</span><br />
            <span>Last Month Sales: {{sales}}</span><br />
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false" plain>OK</el-button>
            </span>
        </el-dialog>
        <!--Add New Merchandise-->
        <el-dialog title="Add" :visible.sync="addFormVisible">
            <el-form :model="addForm">
                <el-form-item label="Merchandise Name" :label-width="formLabelWidth">
                    <el-input v-model="addForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Type" :label-width="formLabelWidth">
                    <el-input v-model="addForm.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Unit Price" :label-width="formLabelWidth">
                    <el-input v-model="addForm.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Amount" :label-width="formLabelWidth">
                    <el-input v-model="addForm.amount" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false" plain>Cancel</el-button>
                <el-button type="primary"
                    @click="addNewMerchandise(addForm.name,addForm.type,addForm.price,addForm.amount)" plain>
                    Submit</el-button>
            </div>
        </el-dialog>
        <!--Edit-->
        <el-dialog title="Edit" :visible.sync="editFormVisible">
            <el-form :model="editForm">
                <span>You are editing ID: {{id}}</span><br />
                <el-form-item label="Merchandise Name" :label-width="formLabelWidth">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Type" :label-width="formLabelWidth">
                    <el-input v-model="editForm.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Unit Price" :label-width="formLabelWidth">
                    <el-input v-model="editForm.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Amount" :label-width="formLabelWidth">
                    <el-input v-model="editForm.amount" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false" plain>Cancel</el-button>
                <el-button type="primary"
                    @click="editMerchandise(id,editForm.name,editForm.type,editForm.price,editForm.amount)" plain>
                    Submit</el-button>
                <el-button @click="removeMerchandise(id)" type="danger" plain>Remove Merchandise</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
export default {
    methods: {
        loadData() {
            this.loading = true;
            let tableDataInfo = new Array();
            // let total = 0;
            var i = 0;
            this.$request({
                url: "/loadDepotData",
                method: "post"
            }).then(res => {
                var info = res.data;
                if (info != 'undefined') {
                    for (i = 0; i < info.length; i++) {
                        tableDataInfo.push(
                            {
                                id: info[i].MerchandiseID,
                                name: info[i].MerchandiseName,
                                type: info[i].MerchandiseType,
                                amount: info[i].Amount,
                                price: info[i].Price,
                                sales: info[i].Sales
                            }
                        )
                    }
                    this.loading = false;
                    return tableDataInfo
                }
            }).catch(err => {
                this.loading = false;
                return
            })
            return tableDataInfo
        },
        handleClick(row) {
            this.dialogVisible = true;
            // console.log(row);
            this.id = row.id;
            this.name = row.name;
            this.type = row.type;
            this.price = row.price;
            this.amount = row.amount;
        },
        editClick(row) {
            // Edit Window
            this.editFormVisible = true;
            this.id = row.id;
            this.name = row.name;
            this.type = row.type;
            this.price = row.price;
            this.amount = row.amount;
        },
        removeMerchandise(id) {
            if (confirm("Remove this merchandise?")) {
                this.$request({
                    url: "/removeMerchandise",
                    params: { id },
                    method: "post"
                }).then(res => {
                    //alert(res.data);
                    var info = res.data;
                    alert(info);
                })
                this.editFormVisible = false;
            } else {
                return false;
            }
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        addElement() {
            this.addFormVisible = true
        },
        addNewMerchandise(name, type, price, amount) {
            if (!name || !type || !price || !amount) {
                // 判断是否输入完全
                alert('Please fill all of the information')
                return;
            }
            this.addFormVisible = false
            this.$request({
                url: "/addMerchandise",
                params: { name, type, price, amount },
                method: "post"
            }).then(res => {
                //alert(res.data);
                var info = res.data;
                alert(info);
            })
        },
        editMerchandise(id,name, type, price, amount) {
            if (!name || !type || !price || !amount) {
                // 判断是否输入完全
                alert('Please fill all of the information')
                return;
            }
            this.$request({
                url: "/editMerchandise",
                params: { id, name, type, price, amount },
                method: "post"
            }).then(res => {
                //alert(res.data);
                var info = res.data;
                alert(info);
            })
            this.editFormVisible = false
        },
        reload(){
            this.tableData = this.loadData();
            this.num++;
            return this.tableData;
        }
    },

    data() {
        var a = this.loadData()
        console.log(a)
        var num = 0;
        return {
            tableData: a,
            dialogVisible: false,
            addFormVisible: false,
            editFormVisible: false,
            id: null,
            name: null,
            type: null,
            price: null,
            sales: null,
            amount: null,
            formLabelWidth: '120px',
            addForm: {
                name: '',
                gender: '',
                position: '',
            },
            editForm: {
            }
        }
    }
}
</script>