/**
 * 跳转页面
 */
function pagination1(page){
	$("#pagination1").olxPagination("turnPage", [{
		page: page,
		t: Math.random()
	}, function(){
		console.log(arguments);
	}]);
}

$().ready(function(){
	$("#certificateType").on("change",function(arg1){
		$("#certificate").css("display", 0 == arg1.currentTarget.value ? "" : "none");
		/* 证件号码焦点定位 */
		$("#certificateCode").focus();
	});
	
	$("#certificate").on("change",function(arg1){
		/* 证件号码焦点定位 */
		$("#certificateCode").focus();
	});

	$("#delConfirmModal").on("show.bs.modal", function(e) {
		var vals = $("#table1").olxGrid("getCheckedRowsValue", 1);
		if(!vals.length) {
			$("#delAlertModal").modal();
			return e.preventDefault();
		}
	})

	/* 绑定删除按钮，弹出提示对话框或确认对话框 */
	$("#btn_del").click(function(){
		$("#delConfirmModal").modal();
	});

	/* 绑定删除确认对话框的提交按钮 */
	$("#delConfirmModal_btn_submit").click(function(){
		var vals = $("#table1").olxGrid("getCheckedRowsValue",1);
		/* 隐藏删除确认对话框 */
		$("#delConfirmModal").modal("hide");

		$.ajax({
			url: $().olxUtilRandomUrl("del.do"),
			type: "POST",
			dataType: "json",
			data: { data: vals }
		}).done(function(responseText) {
			console.log(responseText)
		}).complete(function(){
			/* 跳转到第1页 */
			pagination1(1);
		});
	});

	/*																					*/
	$("#editModal").on("show.bs.modal", function(e) {
		var vals = $("#table1").olxGrid("getCheckedRowsValue", 1);
		if(1 != vals.length) {
			$("#editAlertModal").modal();
			return e.preventDefault();
		}
	})

	/* 编辑按钮 */	
	$("#btn_edit").click(function(){
		$("#editModal").modal();
	});
	/*																					*/

	/* 展示 */
	setTimeout(function(){
		// $("#info_alert").collapse("toggle");
	}, 1000);
	

	// console.log($('#table1').olxGrid('getCheckedRowsValue',1));
	// console.log($('#table1').olxGrid('getColumnCount'));

	/**/
	// var table1 = $("#table1");
	// var rowsNum = table1.getRowsNum();
	// console.log("行数:"+ rowsNum)
	// var columnCount = table1.getColumnCount();
	// console.log("列数:"+ columnCount)
	// var i=0
	// console.log($('#table1').grid("getRowsNum",function(aaa){

	// 	i = aaa;
	// }));

	// console.log($('#table1').grid("selectAll"));
	// console.log(i)
});