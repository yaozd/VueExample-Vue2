
//测试数据
var teams = [{ "id": 1, "name": "N1" }];
var employees = [{ id: 1, name: "name_1", mobile: "mobile_1", rankName: "rankName_1", departmentName: "departmentName_1" }, { id: 2, name: "name_2", mobile: "mobile_2", rankName: "rankName_2", departmentName: "departmentName_2" }];
//Vue实例
//Model
var model = {
    //radio值
    radioVal: {},
    //checkBox值
    checkBoxValSimple: {},
    checkBoxVal: {},
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
    openFormVm: {},
    checkboxs:["1","2"]
};
// 创建一个 Vue 实例 (ViewModel),它连接 View 与 Model
var vm = new Vue({
    el: "#content",
    data: model,
    beforeCreate: function () {
        model.searchObj.teamId = 1;
        model.teams = teams;
        model.radioVal = 22;
    },
    created: function () {
        model.employees = employees;
        model.checkBoxValSimple = true;
        model.checkBoxVal = "1,4";
    },
    computed: {
        checkValArr: function () {
            
            var checkValArrStr = this.checkBoxVal + "";
            return checkValArrStr.split(',');
        }
    },
    methods: {
        example: function () {

        },
        search: function (event) {
            if (typeof event !== "undefined") { //点击查询按钮的话，是查询第一页数据
                model.searchObj.pageIndex = 0;
            }
        },
        openEditForm: function (empId) {
            if (isNaN(empId)) { empId = 0; }
            var tempObj = $('#editTemplate').clone();
            tempObj.find('form').prop('id', 'insertFormId');
            var tempHtml = tempObj.html();
            layer.open({
                title: empId > 0 ? '修改员工信息' : '添加员工',
                content: tempHtml,
                btn: ['保存', '重置'],
                area: ['500px'],
                btn1: function () {
                    var $form = $("#insertFormId");
                    var bootstrapValidator = $form.data('bootstrapValidator').validate();
                    if (!bootstrapValidator.isValid()) {
                        return false;
                    } else {
                        vm.post($form);
                    }
                },
                btn2: function () {
                    var $form = $("#insertFormId");
                    var bootstrapValidator = $form.data('bootstrapValidator');
                    if (typeof bootstrapValidator !== "undefined") {
                        bootstrapValidator.resetForm();
                    }
                    $form[0].reset();
                    return false;
                }
            });
            //填充弹出框中的内容
            createOpenVm('#insertFormId',empId);
        },
        openDeleteForm: function (empId) {
            layer.confirm('确定要删除吗?', { icon: 3, title: '询问' }, function (index) {
                layer.load(3);
                $.post("/api/employee/delete", { empId: empId }, function (response) {
                    console.log(0);
                    if (response.success_is_ok) {
                        layer.msg(response.msg);
                        vm.search();
                    } else {
                        layer.alert(response.msg);
                    }
                });
                layer.closeAll();
            });
        },
        bindFormValidate: function ($form) {
            console.log("bindFormValidate");
            //$form--做为jquery对象传入
        },
        bindCheckBox: function (val) {
            console.log("重新计算");
            var currentVal = val + "";
            var isExsit = $.inArray(currentVal, this.checkboxs);
            console.log(isExsit);
            if (isExsit > -1) return true;
            return false;
        }
    }
});
function createOpenVm(formId,empId) {
    var openVmModel = {
        formId: formId,
        teamIdSelected: 0,
        teams:[],
        formData: {}
    };
    var openFormVm = new Vue({
        el: openVmModel.formId,
        data: openVmModel,
        created: function () {
            openVmModel.formData = { id: 1, name: "name_1", mobile: "mobile_1", rankName: "rankName_1", departmentName: "departmentName_1" };
        },
        computed:{

        },
        methods: {
            bindCheckBox: function () {
                return 1;
            }
        }
    });
}
//jQuery扩展
(function ($) {
    $.extend($.fn, {
        //INPUT对象序列化为一个参数用于后台接收
        paramObject: function () {
            var that = $(this);
            var name = that.attr('name');
            if (!name) {
                return '-NotFound-Input-Name-';
            }
            return name + "=" + that.val();
        },
    });

}(jQuery));
$(function () {
    var t1 = $('#productId').paramObject();
    console.log(t1);
});

