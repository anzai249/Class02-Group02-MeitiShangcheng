<style>
.staticView {
    top: 60px;
    position: fixed;
    overflow-y: auto;
    height: 93%;
    width: 99.5%;
    margin: 0 auto;
}

.grid-content {
    border-radius: 10px;
    min-height: 500px;
    background-color: white;
}

.el-row {
    margin-bottom: 8px;
}
</style>

<template>
    <div class="staticView">
        <el-main>
            <el-row :gutter="8">
                <el-col :span="12">
                    <div class="grid-content">
                        <div style="height: 500px;width: 98%;border-radius: 10px;margin:0 auto;" ref="Chart1">
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <div style="height: 500px;width: 98%;border-radius: 10px;margin:0 auto;" ref="Chart2"></div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="8">
                <el-col :span="12">
                    <div class="grid-content">
                        <div style="height: 500px;width: 98%;border-radius: 10px;margin:0 auto;" ref="Chart3"></div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <div style="height: 500px;width: 98%;border-radius: 10px;margin:0 auto;" ref="Chart4"></div>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>

export default {
    methods: {
        drawChart1() {
            let chart1 = this.$echarts.init(this.$refs.Chart1);
            let aTypes = new Array();
            let aSales = new Array();
            var i = 0;
            chart1.showLoading();
            var option1 = {
                title: {
                    text: 'Remaining Merchandise'
                },
                tooltip: {},
                legend: {
                    data: ['Amount']
                },
                yAxis: {
                    type: 'category',
                    data: []
                },
                xAxis: {},
                series: [{
                    name: 'Amount',
                    type: 'bar',
                    data: []
                }]
            };
            chart1.setOption(option1, false)
            this.$request({
                url: "/countAmount",
                method: "post"
            }).then(res => {
                var info = res.data;
                if (info != 'undefined') {
                    for (i = 0; i < info.length; i++) {
                        aTypes.push(
                            info[i].MerchandiseType
                        )
                        aSales.push(
                            info[i].Amount
                        )
                    }
                    chart1.setOption({
                        title: {
                            text: 'Remaining Merchandise'
                        },
                        tooltip: {},
                        legend: {
                            data: ['Amount']
                        },
                        yAxis: {
                            type: 'category',
                            data: aTypes
                        },
                        xAxis: {},
                        series: [{
                            name: 'Amount',
                            type: 'bar',
                            data: aSales
                        }]
                    }, true);

                }
            }).catch(err => {
                return
            })
            chart1.hideLoading();
            window.addEventListener('resize', function () {
                chart1.resize();
            })
        },
        drawChart2() {
            let chart2 = this.$echarts.init(this.$refs.Chart2);
            chart2.showLoading();
            var option2 = {
                title: {
                    text: 'Sales by Brands'
                },
                series: [
                    {
                        name: 'Brands',
                        type: 'pie',
                        radius: '55%',
                        data: [],
                        // roseType: 'angle',
                        itemStyle: {
                            normal: {
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            }
                        }
                    }
                ]
            };
            chart2.setOption(option2, false)
            this.$request({
                url: "/brandSales",
                method: "post"
            }).then(res => {
                var info = res.data;
                if (info != 'undefined') {
                    chart2.setOption({
                        title: {
                            text: 'Sales by Brands'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                name: 'Brand',
                                type: 'pie',
                                radius: '60%',
                                data: info,
                                itemStyle: {
                                    normal: {
                                        shadowBlur: 200,
                                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                                    }
                                }
                            }
                        ]
                    });
                }
            }).catch(err => {
                return
            })
            chart2.hideLoading();
            window.addEventListener('resize', function () {
                chart2.resize();
            })
        },
        drawChart3() {
            let chart3 = this.$echarts.init(this.$refs.Chart3);
            chart3.showLoading();
            var option3 = {
                title: {
                    text: 'Employees by Gender'
                },
                legend: {
                    top: 'bottom'
                },
                series: [
                    {
                        name: 'Brand',
                        type: 'pie',
                        radius: '60%',
                        data: [],
                        itemStyle: {
                            normal: {
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            }
                        }
                    }
                ]
            };
            chart3.setOption(option3, false)
            this.$request({
                url: "/employeeGender",
                method: "post"
            }).then(res => {
                var info = res.data;
                if (info != 'undefined') {
                    chart3.setOption({
                        series: [
                            {
                                data: info
                            }
                        ]
                    });
                }
            }).catch(err => {
                return
            })
            chart3.hideLoading();
            window.addEventListener('resize', function () {
                chart3.resize();
            })
        },
        drawChart4() {
            let chart4 = this.$echarts.init(this.$refs.Chart4);
            let aTypes = new Array();
            let aValues = new Array();
            var i = 0;
            chart4.showLoading();
            var option4 = {
                title: {
                    text: 'Remaining Merchandise'
                },
                tooltip: {},
                legend: {
                    data: ['Amount']
                },
                yAxis: {
                    type: 'category',
                    data: []
                },
                xAxis: {},
                series: [{
                    name: 'Amount',
                    type: 'bar',
                    data: []
                }]
            };
            chart4.setOption(option4, false)
            this.$request({
                url: "/workShiftChart",
                method: "post"
            }).then(res => {
                var info = res.data;
                if (info != 'undefined') {
                    for (i = 0; i < info.length; i++) {
                        aTypes.push(
                            info[i].name
                        )
                        aValues.push(
                            info[i].value
                        )
                    }
                    chart4.setOption({
                        title: {
                            text: 'Remaining Merchandise'
                        },
                        tooltip: {},
                        legend: {
                            data: ['Amount']
                        },
                        xAxis: {
                            type: 'category',
                            data: aTypes
                        },
                        yAxis: {},
                        series: [{
                            name: 'WorkShift',
                            type: 'bar',
                            data: aValues,
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        var colorList = ['#ff9137', '#89d3f6', '#0acd81'];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }

                        }]
                    }, true);

                }
            }).catch(err => {
                return
            })
            chart4.hideLoading();
            window.addEventListener('resize', function () {
                chart4.resize();
            })
        }
    },
    data() {
        //var a = this.loadData()
        //this.loadData()
        //console.log(a)
        return {
            //aSales: a,
            dialogVisible: false,
            id: null,
            name: null,
            type: null,
            price: null,
            sales: null,
            amount: null,
        }
    },
    mounted() {
        this.drawChart1()
        this.drawChart2()
        this.drawChart3()
        this.drawChart4()
    }
}
</script>