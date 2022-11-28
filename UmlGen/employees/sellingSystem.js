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