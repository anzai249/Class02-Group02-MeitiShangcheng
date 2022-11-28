export default {
    methods: {
        loadData() {
            this.loading = true;
            let tableDataInfo = new Array();
            // let total = 0;
            var i = 0;
            this.$request({
                url: "/loadManagerData",
                method: "post"
            }).then(res => {
                var info = res.data;
                if (info != 'undefined') {
                    for (i = 0; i < info.length; i++) {
                        tableDataInfo.push(
                            {
                                id: info[i].ID,
                                name: info[i].Name,
                                email: info[i].Email,
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
            this.email = row.email;
        },
        editClick(row) {
            // Edit Window
            this.editFormVisible = true;
            this.id = row.id;
            this.name = row.name;
            this.email = row.email;
        },
        removeManager(id) {
            if (confirm("Remove this manager?")) {
                this.$request({
                    url: "/removeManager",
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
        addNewManager(name, email) {
            if (!name || !email) {
                alert('Please fill all of the information')
                return;
            }
            this.addFormVisible = false
            this.$request({
                url: "/addManager",
                params: { name, email },
                method: "post"
            }).then(res => {
                var info = res.data;
                alert(info);
            })
        },
        editManager(id, name, email) {
            if (!name || !email) {
                // 判断是否输入完全
                alert('Please fill all of the information')
                return;
            }
            this.$request({
                url: "/editManager",
                params: { id, name, email },
                method: "post"
            }).then(res => {
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
            email: null,
            formLabelWidth: '120px',
            addForm: {
            },
            editForm: {
            }
        }
    }
}