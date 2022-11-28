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
        editMerchandise(id, name, type, price, amount) {
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
        reload() {
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
            },
            editForm: {
            }
        }
    }
}