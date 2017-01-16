/*产品的操作*/
app.controller('accFormController', function($scope, $http, $location,
		$rootScope, httpService) {
	$scope.btFormData = {};
	$scope.updatejuris = function() {
		var pname=$rootScope.accs.pname;
		var pstatic=$rootScope.accs.pstatic;
		var pmid=$rootScope.accs.pmid ;
		var id=$rootScope.accs.id;
		var pexplain=$rootScope.accs.pexplain ;
		var purpose=UE.getEditor('container3').getContent();  
		var pnorms=UE.getEditor('container2').getContent();  
		var pimg=$("#pcimg").val();
		var phoneimg=$("#phimg").val()+"?imageMogr2/thumbnail/224x190!";
		var details=UE.getEditor('container1').getContent();   
		var pintroduce=$rootScope.accs.pintroduce;
		var hots = $("#hots").val();
		if(pname!=null){
		$http({
			method : 'POST',
			url : '../product/update',
			params : {
				pname : pname,
				id : id,
				pstatic : pstatic,
				pmid : pmid,
				pexplain:pexplain,
				purpose:purpose,
				pnorms:pnorms,
				pimg:pimg,
				phoneimg:phoneimg,
				details:details,
				pintroduce:pintroduce,
				hots : hots
			}, // pass in data as strings
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(data) {
			if (data != null) {
				$location.path('/main');
				$rootScope.accredits = data;
			}
		}).error(function(data,header,config,status){
			alert("出错，请检查输入");
		});
		}else{
			alert("产品名不能为空");
		}
	}

	
	/*产品删除*/
	$scope.deldeils = function(c,v) {
		if (confirm("确认删除吗")) {
			var id = c;
			$http({
				method : 'get',
				url : '../details/delete',
				params : {
					id : id,pid:v
				}, // pass in data as strings
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				}
			}).success(function(data) {
				if (data != null) {
					$location.path('/main/list_accredit');
					$rootScope.deiles = data;
				}
			});
		}
		};
	/*新闻修改*/
	$scope.updatenews = function() {
		var pcimg=$("#pcimg").val();
		var phimg=$("#phimg").val();
		var nid=$rootScope.btlist.nid;
		var btype =$rootScope.btlist.ntype;
		var statc = $rootScope.btlist.statc;
		var cantop = $rootScope.btlist.mid;
		var title = $rootScope.btlist.title;
		var source = $rootScope.btlist.source;
		var ntext=UE.getEditor('container1').getContent();
		if(phimg!=null){
		$http({
			method : 'POST',
			url : '../news/update',
			params : {
				ntype :btype,
				ntext: ntext,
				title : title,
				newimg : phimg,
				newimger : pcimg,
				source : source,
				mid : cantop,
				nid:nid,
				statc:statc
			},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(data) {
			$rootScope.jc_news = data;
			$location.path('/main/check_bluetooth');
		}).error(function(data,header,config,status){
			alert("出错，请检查输入");
		});
		}else{
			alert("新闻标题图片不能为空")
		}
	};
	/*新闻添加*/
	$scope.addnews = function() {
		var pcimg=$("#pcimg").val();
		var phimg=$("#phimg").val();
		var btype = $("#t1").val();
		var statc = $("#t2").val();
		var cantop = $("#t3").val();
		var title = $scope.btFormData.title;
		var source = $scope.btFormData.source;
		var ntime= document.getElementById("startTime1").value;
		var ntext=UE.getEditor('container1').getContent();
		if(phimg!=null){
		$http({
			method : 'POST',
			url : '../news/add',
			params : {
				ntype :btype,
				ntext: ntext,
				title : title,
				ntime1 : ntime,
				newimg : phimg,
				newimger : pcimg,
				source : source,
				mid : cantop,
				statc:statc,
			},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(data) {
			if(data!=null){
			$rootScope.jc_news = data;
			$location.path('/main/check_bluetooth');
			}else{
				alert("添加失败，请检查输入");
			}
		}).error(function(data,header,config,status){
			alert("出错，请检查输入");
		});
		}else{
			alert("新闻标题图片不能为空")
		}
	};
	/*下载中心修改*/
	$scope.updateload = function() {
		var id = $rootScope.btlist1.id;
		var name = $rootScope.btlist1.bid;
		var size = $("#lo3").val();
		var update = $rootScope.btlist1.rname;
		var type = $rootScope.btlist1.pname;
		var plain =UE.getEditor('container2').getContent();;
		var uri = $("#appuri").val();
		var img= $("#appimg").val();
		$http({
			method : 'POST',
			url : '../loadhome/update',
			params : {
				id : id,
				appname : name,
				appsize : size,
				apptype : type,
				appexplain : plain,
				appupdate : update,
				appimg:img,
				appuri : uri
			}

		}).success(function(data) {
			if (data != null) {
				$('#myModal').modal('hide');
				$location.path('/main/operation_log');
				$rootScope.logs = data;
			}else{
				alert("修改失败，请检查输入");
			}
		}).error(function(data,header,config,status){
			alert("出错，请检查输入");
		});
	};
	/*产品添加*/
	$scope.addAccForm = function() {
		var pcimg=$("#pcimg").val();
		var phimg=$("#phimg").val()+"?imageMogr2/thumbnail/224x190!";
		var pmid = $("#pmid").val();
		var pstatic = $scope.btFormData.pstatic;
		var pname = $scope.btFormData.pname;
		var shuoming = $scope.btFormData.shuoming;
		var guige =  UE.getEditor('container3').getContent();
		var canshu = UE.getEditor('container2').getContent();
		var yongtu = $scope.btFormData.yongtu;
		var hots = $("#hots").val();
		var ntime= document.getElementById("startTime1").value;
		var ntext=UE.getEditor('container1').getContent();
		if(pstatic!=null){
		$http({
			method : 'POST',
			url : '../product/add',
			params : {
				pmid : pmid,
				pstatic : pstatic,
				pname : pname,
				pintroduce : shuoming,
				pnorms : canshu,
				purpose : guige,
				pexplain : yongtu,
				hots : hots,
				details:ntext,
				ptime1:ntime,
				pimg:pcimg,
				phoneimg:phimg
			},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(data) {
			$rootScope.accredits = data;
			$location.path('/main');		
		}).error(function(data,header,config,status){
			alert("出错，请检查输入");
		});
		}else{
			$rootScope.error ="父分类不能为空";
		}
	};
});
/*专利中心*/
app.controller('updataJCpatent', function($scope, $http, $location, $rootScope,
		httpService,Upload,$timeout) {
	$scope.btlist = {}
	$scope.updateptinfo = function($index, ji) {
		$scope.btlist.bid = this.bt.id;
		$scope.btlist.bname = this.bt.patentname;
		$scope.btlist.rname = this.bt.patentimger;
		$('#myModal').modal('show');
	};
	$scope.delpatent = function($index, ji) {
		if (confirm("确认删除吗")) {
			var id = this.bt.id;
			$http({
				method : 'GET',
				url : '../PatentPhone/delete?id=' + id,
			}).success(function(data) {
				if (data != null) {
					$location.path('/main/check_patent');
					$rootScope.jc_patent = data;
				}
			});
		}
	};
	/*图片查看*/
	$scope.showph= function($index) {
		$('#myModal1').modal('show');
		$("#topds").attr('src',this.bt.patentimger); 
	};
	$scope.updatepatent = function() {
		var dpname = $scope.btlist.bid;
		var ename = $scope.btlist.bname;
		var bname = $scope.btlist.rname;

		$http({
			method : 'POST',
			url : '../PatentPhone/update',
			params : {
				id : dpname,
				patentname : ename,
				patentimger : bname,
			}

		}).success(function(data) {
			if (data != null) {
				$('#myModal').modal('hide');
				$location.path('/main/check_patent');
				$rootScope.jc_patent = data;
			}
		});
	}
})
/*轮播图*/
app.controller('updataJCtopimg', function($scope, $http, $location, $rootScope,
		httpService,Upload,$timeout) {
	$scope.btlist = {}
	$scope.updateptinfo = function($index, ji) {
		$scope.btlist.bid = this.bt.id;
		$scope.btlist.bname = this.bt.imgsrc;
		$scope.btlist.rname = this.bt.imgurl;
		$('#myModal').modal('show');
	};
	$scope.delpatent = function($index, ji) {
		if (confirm("确认删除吗")) {
			var id = this.bt.id;
			$http({
				method : 'GET',
				url : '../topimg/delete?id=' + id,
			}).success(function(data) {
				if (data != null) {
					$location.path('/main/check_topimg');
					$rootScope.jc_topimg = data;
				}
			});
		}
	};
	/*图片查看*/
	$scope.showph= function($index) {
		$('#myModal1').modal('show');
		$("#topds").attr('src',this.bt.patentimger); 
	};
	$scope.updatepatent = function() {
		var id = $scope.btlist.bid;
		var imgsrc = $('#topimg').val();
		var imgurl = $scope.btlist.rname;

		$http({
			method : 'POST',
			url : '../topimg/update',
			params : {
				id :id,
				imgsrc : imgsrc,
				imgurl: imgurl,
			}

		}).success(function(data) {
			if (data != null) {
				$('#myModal').modal('hide');
				$location.path('/main/check_topimg');
				$rootScope.jc_topimg = data;
			}
		});
	}
})
// 添加蓝牙锁
app.controller('btFormController', function($scope, $http, $location,
		$rootScope) {
	$scope.btFormData = {};
	$scope.addBtForm = function() {
		var bid = $scope.btFormData.bid;
		var bname = $scope.btFormData.bname;
		var rid = $scope.btFormData.rid;
		var pname = $scope.btFormData.department.pname;
		var remark = $scope.btFormData.remark;
		var macadree = $scope.btFormData.macadree;
		var equid = $scope.btFormData.equid;
		/*if(bid!=null&bname!=null&rid!=null&pname!=null&remark!=null&macadree!=null&equid!=null){
			alert('有列不能为空');
		}*/
		console
				.log(bid + "</br>" + bname + '<br>' + rid + '<br>' + pname
						+ '<br>' + remark + '<br>' + macadree + '<br>' + equid
						+ '<br>');
		$http({
			method : 'POST',
			url : 'bluetooth/add',
			params : {
				b_key : equid,
				bname : bname,
				rid : rid,
				did : pname,
				remark : remark,
				macadree : macadree
			},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(data) {
			if (data != null) {
				$location.path('/main/check_bluetooth');
				$rootScope.bluetooth = data;
			}
		});
	};
});
