<style>
.sellingMan {
    top: 100px;
    position: absolute;
    width: 99%;
}
</style>
<template>
    <div class="sellingMan">
        <el-button type="primary" style="float:left;" @click="reload()" icon="el-icon-refresh-right">Refresh</el-button>
        <el-table v-loading="loading" max-height="490" :data='tableData' border :key="num" style="width: 100%;">
            <el-table-column sortable fixed prop="id" label="ID" width="100">
            </el-table-column>
            <el-table-column :filters="[{ text: 'Desktop', value: 'Desktop' },
            { text: 'Laptop', value: 'Laptop' },
            { text: 'Headset', value: 'Headset' },
            { text: 'Tablet', value: 'Tablet' },
            { text: 'Keyboard', value: 'Keyboard' },
            { text: 'Mouse', value: 'Mouse' },
            { text: 'CPU', value: 'CPU' },
            { text: 'Harddisk', value: 'Harddisk' },
            { text: 'GraphicsCard', value: 'GraphicsCard' }
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
                    <el-button @click="sellClick(scope.row)" type="text" size="small">Sell</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--Selling-->
        <el-dialog title="Selling" :visible.sync="sellingFormVisible">
            <el-form :model="sellingForm">
                <span>You are selling ID: {{ id }}</span><br />
                <span>Merchandise Name: {{ name }} {{ type }}</span><br />
                <span>Unit Price: {{ price }}</span><br />
                <el-form-item label="Amount will sell" :label-width="formLabelWidth">
                    <el-input v-model="sellingForm.amount" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="sellingFormVisible = false" plain>Cancel</el-button>
                <el-button type="primary" @click="sellMerchandise(id, sellingForm.amount)" plain>
                    Submit</el-button>
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
        sellClick(row) {
            this.sellingFormVisible = true;
            this.id = row.id;
            this.name = row.name;
            this.type = row.type;
            this.price = row.price;
        },
        sellMerchandise(id, amount) {
            if (!id || !amount) {
                // 判断是否输入完全
                alert('Please fill all of the information')
                return;
            }
            this.$request({
                url: "/sellMerchandise",
                params: { id, amount },
                method: "post"
            }).then(res => {
                //alert(res.data);
                var info = res.data;
                alert(info);
            })
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        reload() {
            this.tableData = this.loadData();
            this.num++;
            return this.tableData;
        }
    },

    data() {
        var a = this.loadData()
        console.log(a)
        var num = 0
        return {
            tableData: a,
            sellingFormVisible: false,
            id: null,
            name: null,
            type: null,
            price: null,
            sales: null,
            amount: null,
            formLabelWidth: '120px',
            sellingForm: {
            }
        }
    }
}
</script>