

//Vue开发使用的模板-2016-11-25-1410
//测试数据
var teams = [{ "id": 1, "name": "N1" }];
//Vue实例
//Model
var model = {
    //查询条件
    searchObj: {},
    //所属团队
    teams: [],
    //部门
    departments: [],
    //销售级别
    ranks: [],
    //员工列表
    employees: [],
    //弹窗vm实例
    openFormVm: {}
};
// 创建一个 Vue 实例 (ViewModel),它连接 View 与 Model
var vm = new Vue({
    el: "#content",
    data: model,
    beforeCreate: function () {
        model.teams = teams;
    },
    created: function () {

    },
    methods: {
        example: function () {

        },
        search: function (event) {
            if (typeof event !== "undefined") { //点击查询按钮的话，是查询第一页数据
                model.searchObj.pageIndex = 0;
            }
        },
        bindFormValidate: function ($form) {
            //$form--做为jquery对象传入
        }
    }
});
