var app = angular.module("routerApp", [ "ui.router", "ngFileUpload",
		"angularUtils.directives.dirPagination" ]);
app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('', 'login').otherwise('/login');
	$stateProvider.state("login", {
		url : '/login',
		templateUrl : 'login.html',
		controller : 'loginCtrl'
	}).state("main", {
		url : '/main',
		abstract : true,
		templateUrl : 'pages/main.html',
	}).state("main.accredit_msg", {
		url : '',
		views : {
			"" : {
				templateUrl : 'pages/accredit_msg.html'
			}
		}
	}).state("main.add_accredit", {
		url : '/add_accredit',
		templateUrl : 'pages/add_accredit.html'
	}).state("main.add_type", {
		url : '/add_type',
		templateUrl : 'pages/add_type.html'
	}).state("main.add_helphome", {
		url : '/add_helphome',
		templateUrl : 'pages/add_helphome.html'
	}).state("main.list_accredit", {
		url : '/list_accredit',
		templateUrl : 'pages/list_accredit.html'
	}).state("main.list_type", {
		url : '/list_type',
		templateUrl : 'pages/list_type.html'
	}).state("main.list_series", {
		url : '/list_series',
		templateUrl : 'pages/list_series.html'
	}).state("main.staff_list", {
		url : '/staff_list',
		templateUrl : 'pages/staff_list.html'
	}).state("main.check_bluetooth", {
		url : '/check_bluetooth',
		templateUrl : 'pages/check_bluetooth.html'
	}).state("main.check_news", {
		url : '/check_news',
		templateUrl : 'pages/check_news.html'
	}).state("main.check_topimg", {
		url : '/check_topimg',
		templateUrl : 'pages/check_topimg.html'
	}).state("main.add_bluetooth", {
		url : '/add_bluetooth',
		templateUrl : 'pages/add_bluetooth.html'
	}).state("main.add_loadhome", {
		url : '/add_loadhome',
		templateUrl : 'pages/add_loadhome.html'
	}).state("main.change_bluetooth", {
		url : '/change_bluetooth',
		templateUrl : 'pages/change_bluetooth.html'
	}).state("main.operation_log", {
		url : '/operation_log',
		templateUrl : 'pages/operation_log.html'
	}).state("main.upload_firmware", {
		url : '/upload_firmware',
		templateUrl : 'pages/upload_firmware.html'
	}).state("main.update_news", {
		url : '/update_news',
		templateUrl : 'pages/update_news.html'
	}).state("main.upload_topimg", {
		url : '/upload_topimg',
		templateUrl : 'pages/upload_topimg.html'
	}).state("main.update_loadhome", {
		url : '/update_loadhome',
		templateUrl : 'pages/update_loadhome.html'
	}).state("main.change_pwd", {
		url : '/change_pwd',
		templateUrl : 'change_pwd.html'
	}).state("main.change_news", {
		url : '/change_news',
		templateUrl : 'pages/change_news.html'
	}).state("main.check_patent", {
		url : '/check_patent',
		templateUrl : 'pages/check_patent.html'
	}).state("main.check_kes", {
		url : '/check_kes',
		templateUrl : 'pages/kes.html'
	})

});
app.run(function($rootScope, httpService) {
	//获取所属单位或者部门
	$rootScope.opene = [
           {name : "公开", id : 1},
           {name : "不公开",id: 2},
       ];
	$rootScope.opend = [
           {name : "不置顶", id :1},
           {name : "置顶", id :2},
       ];
	//获取所有蓝牙区域
	httpService.get('../series/list').then(function(data) {
		$rootScope.region = data;
	});
	//获取所有蓝牙
	httpService.get('../news/list1').then(function(data) {
		$rootScope.jc_news = data;
	});

	//查看授权信息
	//        httpService.get('juris/size?page=1').then(function (data) {
	//            $rootScope.accredits = data;
	//        });
	//分页数

	httpService.get('../product/list1').then(function(data) {
		$rootScope.accredits = data;
	});


})
/*操作记录分页*/

/*登录*/
app.controller('loginCtrl', function($scope, $location, $http) {
	$scope.username = window.localStorage.getItem('username');
	$scope.password = window.localStorage.getItem('password');
	$scope.uid = window.localStorage.getItem('uid');
	$scope.submit = function() {
		var username = $scope.username;
		var password = $scope.password;
		var message = '';
		$http({
			method : 'POST',
			url : '../user/login',
			params : {
				uname : username,
				upwd : password
			},
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(data) {
			if (data != null) {
				window.localStorage.setItem('username', data.uname);
				window.localStorage.setItem('password', data.upwd);
				window.localStorage.setItem('uid', data.uid);
				$scope.username = data.uname;
				$scope.password = data.upwd;
				$scope.uid = data.uid;
				$location.path('/main');

			} else {
				$location.path('/');
				$scope.message = '用户名或密码错误';
			}
		})
	}

});
//登录成功显示用户名
app.controller("successCtrl", function($scope, $location,$rootScope) {
	$rootScope.username = window.localStorage.getItem('username');

	//退出登录
	$scope.exit = function() {
		window.localStorage.removeItem('username');
		$scope.userName = null;
		$location.path('/');
	}
});
/*根据 查*/
app.controller('TestCtrl', function($rootScope, httpService,$scope) {
	$rootScope.change = function(x) {
		httpService.get('../subfam/get?serid=' + x).then(function(data) {
			$rootScope.sub = data;
		});
	}
});
/*修改产品信息*/
app.controller('updataAccCtrl', function($scope, $http, $location, $rootScope,
		httpService) {
	$rootScope.accs = {}
	$scope.updateAccInfo = function() {
		
		$rootScope.accs.pname = this.ad.pname;
		$rootScope.accs.pstatic = this.ad.pstatic;
		httpService.get('../subfam/get?serid=' + this.ad.pstatic).then(function(data) {
			$rootScope.sub = data;
		});
		httpService.get('../details/get?pid=' + this.ad.id).then(function(data) {
			$rootScope.deiles = data;
	
		});
		$rootScope.accs.pmid = this.ad.pmid;
		$rootScope.accs.id = this.ad.id;
		$rootScope.accs.pexplain = this.ad.pexplain;
		$rootScope.accs.purpose = this.ad.purpose;
		$rootScope.accs.pnorms = this.ad.pnorms;
		$rootScope.accs.pimg = this.ad.pimg;
		$rootScope.accs.phimg= this.ad.phoneimg;
		$rootScope.accs.details=this.accs.details;
		$rootScope.accs.hots = this.ad.hots;
		$rootScope.accs.startTime=this.ad.ptime;   
		$rootScope.accs.pintroduce=this.ad.pintroduce;
		window.localStorage.setItem('bgdeta', this.ad.details);
		window.localStorage.setItem('canshu', this.ad.pnorms);
		window.localStorage.setItem('guige', this.ad.purpose);
		
		 
		$location.path('/main/list_accredit');
	
	};

$scope.deleteAccInfo = function() {
	if (confirm("确认删除吗")) {
		var id = this.ad.id;
		$http({
			method : 'get',
			url : '../product/delete',
			params : {
				id : id,
			}, // pass in data as strings
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(data) {
			if (data != null) {
				$location.path('/main');
				$rootScope.accredits = data;
			}
		});
	}
	};
	$scope.updatejuris = function() {
		var pname=$rootScope.accs.pname;
		var pstatic=$rootScope.accs.pstatic;
		var pmid=$rootScope.accs.pmid ;
		var id=$rootScope.accs.id;
		var pexplain=$rootScope.accs.pexplain ;
		var purpose=$rootScope.accs.purpose;
		var pnorms=$rootScope.accs.pnorms;
		var pimg=$rootScope.accs.pimg;
		var phoneimg=$rootScope.accs.phimg;
		var details=UE.getEditor('container1').getContent();   
		var pintroduce=this.ad.pintroduce;
		var hots = $("#hots").val();
		alert(pimg+pstatic);
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
				printroduce:printroduce,
				hots : hots
			}, // pass in data as strings
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(data) {
			if (data != null) {
				$('#myModal').modal('hide');
				$location.path('/main');
				$rootScope.accredits = data;
			}
		});

	}
	//选中解除函数
	$scope.upjiechu = function() {
		var state = '待授权';
		var name = window.localStorage.getItem('username');
		for (var i = 0; i < $rootScope.model.checkedList.length; i++) {
			var dpname = $rootScope.model.checkedList1[i];
			var ename = $rootScope.model.checkedList[i];
			var bname = $rootScope.model.checkedList2[i];
			$http({
				method : 'POST',
				url : 'juris/update',
				params : {
					b_key : bname,
					eid : ename,
					jid : dpname,
					jstatic : state,
					uname : name
				}
			}).success(function(data) {
				httpService.get(' operate/list').then(function(data) {
					$rootScope.logs = data
				});

				$rootScope.accredits = data;

			});
		}
		$rootScope.model.checkedList = [];
		$rootScope.model.checkedList2 = [];
		$rootScope.model.checkedList1 = [];
	}
	//解除函数
	$scope.updaAccInfo = function($index, ji) {

		$index = (ji - 1) * 10 + $index

		$scope.accs.eid = this.ad.eid;
		$scope.accs.b_key = this.ad.b_key;
		$scope.accs.ename = this.ad.emp.ename;

		$scope.accs.jstatic = this.ad.jstatic;
		$scope.accs.jtime = this.ad.jtime;
		$scope.accs.jid = this.ad.jid;
		var dpname = $scope.accs.jid;
		var ename = $scope.accs.eid;
		var bname = $scope.accs.b_key;
		var state = '待授权';
		var endTime = $('#endTime').val();
		var name = window.localStorage.getItem('username');

		console
				.log(dpname + '<br/>' + ename + '<br/>' + bname + '<br/>'
						+ state + '<br/>' + $index + '<br/>' + endTime
						+ '<br/>' + name);
		$http({
			method : 'POST',
			url : 'juris/update',
			params : {
				b_key : bname,
				eid : ename,
				jid : dpname,
				jstatic : state,
				sta : endTime,
				uname : name
			}, // pass in data as strings
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(data) {
			httpService.get('operate/list').then(function(data) {
				$rootScope.logs = data
			});

			$rootScope.accredits = data;

		});

	}

	$scope.access = function(jid) {
		var name = $scope.username;

		$http({
			method : 'POST',
			url : 'juris/upte',
			params : {
				jid : jid,
				uname : name
			}, // pass in data as strings
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			}
		}).success(function(data) {
			httpService.get('operate/list').then(function(data) {
				$rootScope.logs = data
			});
			$location.path('/main/list_accredit');
			$rootScope.accredits = data;
		});
	};
})

/*修改新闻*/
app.controller('updataBtCtrl', function($scope, $http, $location, $rootScope,
		httpService) {
	$rootScope.btlist = {}
	$scope.updateBtInfo = function($index, ji) {
		$index = (ji - 1) * 10 + $index
		$rootScope.btlist.nid = this.bt.nid;
		$rootScope.btlist.title = this.bt.title;
		$rootScope.btlist.ntype = this.bt.ntype;
		$rootScope.btlist.statc = this.bt.statc;
		$rootScope.btlist.source = this.bt.source;
		$rootScope.btlist.mid = this.bt.mid;
		$rootScope.btlist.newimg = this.bt.newimg;
		$rootScope.btlist.newimger = this.bt.newimger;
		window.localStorage.setItem('bgnid', this.bt.nid);
		window.localStorage.setItem('bgntext', this.bt.ntext);
		$location.path('/main/update_news');
		console.log($scope.btlist.pname)
	};
	$scope.uptext = function($index, ji) {
		if (confirm("确认删除吗")) {
			var id = this.bt.nid;
			$http({
				method : 'GET',
				url : '../news/delete?nid='+ id,
			}).success(function(data) {
				if (data != null) {
					$location.path('/main/check_bluetooth');
					$rootScope.jc_news = data;
				}
			});
		}
	};
	$scope.updateblue = function() {
		var dpname = $scope.btlist.bid;
		var ename = $scope.btlist.bname;
		var pname = $("#pname").val();
		var bname = $scope.btlist.rname;
		var state = $scope.btlist.remark;

		$http({
			method : 'POST',
			url : '../news/update',
			params : {
				nid : dpname,
				title : ename,
				ntype : bname,
				statc : pname,
				source : state
			}

		}).success(function(data) {
			if (data != null) {
				$('#myModal').modal('hide');
				$location.path('/main/check_bluetooth');
				$rootScope.jc_news = data;
			}
		}).error(function(data,header,config,status){
			alert("出错，请检查输入");
		});
	}
})
/*修改子系列*/
app.controller('updataBtCtrl3', function($scope, $http, $location, $rootScope,
		httpService) {
	$scope.btlist= {}
	$scope.updatedfd = function($index, ji) {
		$index = (ji - 1) * 10 + $index
		$scope.btlist.bid = this.bt.subid;
		$scope.btlist.bname = this.bt.subfamily;
		$scope.btlist.rname = this.bt.serid;
		$('#myModal').modal('show');
	};
	$scope.delBtInfo1 = function($index, ji) {
		if (confirm("确认删除吗")) {
			var id = this.bt.subid;
			$http({
				method : 'GET',
				url : '../subfam/delete?subid='+ id,
			}).success(function(data) {
				if (data != null) {
					$location.path('/main/list_type');
					$rootScope.jc_fuck = data;
				}
			});
		}
	};
	$scope.updatesubfa = function() {
		var dpname = $scope.btlist.bid;
		var ename = $scope.btlist.bname;
		var bname = $scope.btlist.rname;
		$http({
			method : 'POST',
			url : '../subfam/update',
			params : {
				subid : dpname,
				subfamily : ename,
				serid :bname,
			}

		}).success(function(data) {
			if (data != null) {
				$('#myModal').modal('hide');
				$location.path('/main/list_type');
				$rootScope.jc_fuck = data;
			}
		}).error(function(data,header,config,status){
			alert("出错，请检查输入");
		});
	}
})
/*修改父系列*/
app.controller('updataBtCtrl4', function($scope, $http, $location, $rootScope,
		httpService) {
	$scope.btlist= {}
	$scope.updatedfd = function($index, ji) {
		$index = (ji - 1) * 10 + $index
		$scope.btlist.bid = this.bt.sid;
		$scope.btlist.bname = this.bt.series;
		$('#myModal').modal('show');
	};
	$scope.delBtInfo1 = function($index, ji) {
		if (confirm("确认删除吗")) {
			var id = this.bt.sid;
			$http({
				method : 'GET',
				url : '../series/delete?sid='+ id,
			}).success(function(data) {
				if (data != null) {
					$location.path('/main/list_series');
					$rootScope.region = data;
				}
			}).error(function(data,header,config,status){
				alert("出错，请检查输入");
			});
		}
	};
	$scope.updatesubfa = function() {
		var dpname = $scope.btlist.bid;
		var ename = $scope.btlist.bname;
		$http({
			method : 'POST',
			url : '../series/update',
			params : {
				sid : dpname,
				series : ename,
			}

		}).success(function(data) {
			if (data != null) {
				$('#myModal').modal('hide');
				$location.path('/main/list_series');
				$rootScope.region = data;
			}
		});
	}
})
/*修改帮助中心*/
app.controller('updataBtCtrl1', function($scope, $http, $location, $rootScope,
		httpService) {
	$scope.btlist = {}
	$scope.updateBtInfo1 = function($index, ji) {
		$index = (ji - 1) * 10 + $index
		$scope.btlist.bid = this.bt.id;
		$scope.btlist.bname = this.bt.problem;
		$scope.btlist.rname = this.bt.answer;
		$scope.btlist.pname = this.bt.protype;
		$('#myModal').modal('show');
	};
	$scope.delBtInfo1 = function($index, ji) {
		if (confirm("确认删除吗")) {
			var id = this.bt.id;
			$http({
				method : 'GET',
				url : '../helphome/delete?id=' + id,
			}).success(function(data) {
				if (data != null) {
					$location.path('/main/check_news');
					$rootScope.jc_help = data;
				}
			});
		}
	};
	$scope.updatehelp = function() {
		var dpname = $scope.btlist.bid;
		var ename = $scope.btlist.bname;
		var pname = $scope.btlist.pname;
		var bname = $scope.btlist.rname;
		var state = $scope.btlist.remark;

		$http({
			method : 'POST',
			url : '../helphome/update',
			params : {
				id : dpname,
				problem : ename,
				answer : bname,
				protype : pname
			}

		}).success(function(data) {
			if (data != null) {
				$('#myModal').modal('hide');
				$location.path('/main/check_news');
				$rootScope.jc_help = data;
			}
		});
	}
})
/*修改下载中心*/
app.controller('updataBtCtrl2', function($scope, $http, $location, $rootScope,
		httpService) {
	$rootScope.btlist1 = {}
	$scope.updateBtInfo2 = function($index, ji) {
		$index = (ji - 1) * 10 + $index
		$rootScope.btlist1.id = this.log.id;
		$rootScope.btlist1.img = this.log.appimg;
		$rootScope.btlist1.bid = this.log.appname;
		$rootScope.btlist1.bname = this.log.appsize;
		$rootScope.btlist1.rname = this.log.appupdate;
		$rootScope.btlist1.pname = this.log.apptype;
		$rootScope.btlist1.jie = this.log.appexplain;
		$rootScope.btlist1.jie1 = this.log.appuri;
		window.localStorage.setItem('bgntext', this.log.appexplain);
		$location.path('/main/update_loadhome');
		console.log($rootScope.btlist1.bid);
	};

	$scope.delBtInfo2 = function($index, ji) {
		if (confirm("确认删除吗")) {
			var id = this.log.id;
			$http({
				method : 'GET',
				url : '../loadhome/delete?id=' + id,
			}).success(function(data) {
				if (data != null) {
					$location.path('/main/operation_log');
					$rootScope.logs = data;
				}
			}).error(function(data,header,config,status){
				alert("出错，请检查输入");
			});
		}
	};
	$scope.updatess= function() {
	var ser=$("#ser").val();
	$.ajax({
		url:"../series/add",
		type:"post",
		data:{series:ser},
		success:function(data){
			$('#myModal').modal('hide');		
			location.href="../bg/index.html#/main/add_type";
			httpService.get('../series/list').then(function(data) {
				$rootScope.region = data;
			});
		}
	}			
	)
	};
	$scope.updateload = function() {
		var id = $rootScope.btlist1.id;
		var name = $rootScope.btlist1.bid;
		var size = $rootScope.btlist1.bname;
		var update = $rootScope.btlist1.rname;
		var type = $rootScope.btlist1.pname;
		var plain = $rootScope.btlist1.jie;
		var uri = $rootScope.btlist1.jie1;
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
				appuri : uri
			}

		}).success(function(data) {
			if (data != null) {
				$('#myModal').modal('hide');
				$location.path('/main/operation_log');
				$rootScope.logs = data;
			}
		});
	}
})

/*上传操作*/
app.controller('MyCtrl', [
		'$scope',
		'Upload',
		'$timeout','$rootScope','$location','$http',
		function($scope, Upload, $timeout,$rootScope,$location,$http) {
			/*软件上传*/
			$scope.uploadFiles = function(file, errFiles) {
				$scope.f = file;
				$scope.errFile = errFiles && errFiles[0];
				if (file) {
					file.upload = Upload.upload({
						url : '../upload.do',
						data : {
							file : file
						}
					});
					file.upload.then(function(response) {
						var a = response.data.size;
						$("#lo3").val(Math.round(a * 100) / 100 + "MB");
						$("#appuri").val(response.data.load);
						$timeout(function() {
							file.result = response.data;
						});
					}, function(response) {
						alert(111);
						if (response.status > 0)
							$scope.errorMsg = response.status + ': '
									+ response.data;
					}, function(evt) {
						file.progress = Math.min(100, parseInt(100.0
								* evt.loaded / evt.total));
					});
				}
			}
			/*下载图片上传*/
			$scope.uploadImg = function(file, errFiles) {
				$scope.f1 = file;
				$scope.errFile = errFiles && errFiles[0];
				if (file) {
					file.upload = Upload.upload({
						url : '../upload.img',
						data : {
							file : file,
							num:4
						}
					});
					file.upload.then(function(response) {
						$("#appimg").val(response.data.imgname);
						$timeout(function() {
							file.result = response.data;
						});
					}, function(response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ': '
									+ response.data;
					}, function(evt) {
						file.progress = Math.min(100, parseInt(100.0
								* evt.loaded / evt.total));
					});
				}
			}
			/*侧或是*/
			$scope.uploadcsd = function(file, c) {
				$scope.f1 = file;
				var files=document.getElementById("ads").files;
				var sdf=files.length;
				for(var i=0;i<files.length;i++){
					file=files[i];
					if (file) {
						file.upload = Upload.upload({
							url : '../upload.img',
							data : {
								file : file,
								num:2
							}
						});
						file.upload.then(function(response) {
							var spd=response.data.imgname;
							/*$.ajax({
								url: "../details/add",
								type:"post",
								data:{pid:c,bigimg:spd},
								success: function(data) {
									
									$rootScope.deiles = data;						
								}
							})*/
							$http({
								method : 'post',
								url : '../details/add',
								params : {
									pid:c,bigimg:spd
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
						}, function(response) {
							$rootScope.deiles = response.data;
							alert("res"+$rootScope.deiles.length);
							$timeout(function() {
								$rootScope.deiles= response.data;
								alert("1"+$rootScope.deiles.length);
							});
									
						}, function(evt) {
							file.progress = Math.min(100, parseInt(100.0
									* evt.loaded / evt.total));
						});
					}
				}
				$location.path('/main/list_accredit');
		
			}
			/*专利*/
			$scope.uploadpatimg=function(file) {
				$scope.pf = file;
				if (file) {
					file.upload = Upload.upload({
						url : '../upload.img',
						data : {
							file : file,
							num:3
						}
					});
					file.upload.then(function(response) {
						$scope.btlist.rname=response.data.imgname;
						$timeout(function() {
							file.result = response.data;
						});
					}, function(response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ': '
									+ response.data;
					}, function(evt) {
						file.progress = Math.min(100, parseInt(100.0
								* evt.loaded / evt.total));
					});
				}
			}
			/*pc端*/
			$scope.uploadpcimg=function(file,num) {
				$scope.pf1 = file;
				if (file) {
					file.upload = Upload.upload({
						url : '../upload.img',
						data : {
							file : file,
							num:num
						}
					});
					file.upload.then(function(response) {
						$("#pcimg").val(response.data.imgname);
						$timeout(function() {
							file.result = response.data;
						});
					}, function(response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ': '
									+ response.data;
					}, function(evt) {
						file.progress = Math.min(100, parseInt(100.0
								* evt.loaded / evt.total));
					});
				}
			}
			/*phone端*/
			$scope.uploadphimg=function(file,num) {
				$scope.pf2 = file;
				if (file) {
					file.upload = Upload.upload({
						url : '../upload.img',
						data : {
							file : file,
							num:num
						}
					});
					file.upload.then(function(response) {
						$("#phimg").val(response.data.imgname);
						$timeout(function() {
							file.result = response.data;
						});
					}, function(response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ': '
									+ response.data;
					}, function(evt) {
						file.progress = Math.min(100, parseInt(100.0
								* evt.loaded / evt.total));
					});
				}
			}
			/*大图上传*/
			$scope.uploadImg1 = function(file, errFiles) {
				$scope.f3 = file;
				$scope.errFile = errFiles && errFiles[0];
				if (file) {
					file.upload = Upload.upload({
						url : '../upload.img',
						data : {
							file : file
						}
					});
					file.upload.then(function(response) {
						$("#kan1").attr('src',response.data.imgname); 
						$("#bigimg").val(response.data.imgname);
						$timeout(function() {
							file.result = response.data;
						});
					}, function(response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ': '
									+ response.data;
					}, function(evt) {
						file.progress = Math.min(100, parseInt(100.0
								* evt.loaded / evt.total));
					});
				}
			}
			/*中图*/
			$scope.uploadImg2 = function(file, errFiles) {
				$scope.f4 = file;
				$scope.errFile = errFiles && errFiles[0];
				if (file) {
					file.upload = Upload.upload({
						url : '../upload.img',
						data : {
							file : file
						}
					});
					file.upload.then(function(response) {
						$("#kan2").attr('src',response.data.imgname); 
						$("#half").val(response.data.imgname);
						$timeout(function() {
							file.result = response.data;
						});
					}, function(response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ': '
									+ response.data;
					}, function(evt) {
						file.progress = Math.min(100, parseInt(100.0
								* evt.loaded / evt.total));
					});
				}
			}
			/*小图*/
			$scope.uploadImg3 = function(file, errFiles) {
				$scope.f5 = file;
				$scope.errFile = errFiles && errFiles[0];
				if (file) {
					file.upload = Upload.upload({
						url : '../upload.img',
						data : {
							file : file
						}
					});
					file.upload.then(function(response) {
						$("#kan3").attr('src',response.data.imgname); 
						$("#small").val(response.data.imgname);
						$timeout(function() {
							file.result = response.data;
						});
					}, function(response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ': '
									+ response.data;
					}, function(evt) {
						file.progress = Math.min(100, parseInt(100.0
								* evt.loaded / evt.total));
					});
				}
			}
			/*专利图上传*/	
			$scope.uploadimg = function(file, errFiles) {
				$scope.f6 = file;
				$scope.errFile = errFiles && errFiles[0];
				if (file) {
					file.upload = Upload.upload({
						url : '../upload.img',
						data : {
							file : file,
							num:3
						}
					});
					file.upload.then(function(response) {
						$("#patent").val(response.data.imgname);
						$timeout(function() {
							file.result = response.data;
						});
					}, function(response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ': '
									+ response.data;
					}, function(evt) {
						file.progress = Math.min(100, parseInt(100.0
								* evt.loaded / evt.total));
					});
				}
			}
			/*轮换图上传*/	
			$scope.uploadimgr = function(file, errFiles) {
				$scope.f7 = file;
				$scope.errFile = errFiles && errFiles[0];
				if (file) {
					file.upload = Upload.upload({
						url : '../upload.img',
						data : {
							file : file,
							num:11
						}
					});
					file.upload.then(function(response) {
						$("#topimg").val(response.data.imgname);
						$timeout(function() {
							file.result = response.data;
						});
					}, function(response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ': '
									+ response.data;
					}, function(evt) {
						file.progress = Math.min(100, parseInt(100.0
								* evt.loaded / evt.total));
					});
				}
			}
			/*产品详情图上传*/	
			$scope.uploadimg1 = function(file, c) {
				$scope.d = file;
				if (file) {
					file.upload = Upload.upload({
						url : '../upload.img',
						data : {
							file : file,
							num:2
						}
					});
					file.upload.then(function(response) {
					
						var spd=response.data.imgname;
						$.ajax({
							url: "../details/add",
							type:"post",
							data:{pid:c,bigimg:spd},
							success: function(data) {
							}
						})
						$timeout(function() {
							file.result = response.data;
						});
					}, function(response) {
						if (response.status > 0)
							$scope.errorMsg = response.status + ': '
									+ response.data;
					}, function(evt) {
						file.progress = Math.min(100, parseInt(100.0
								* evt.loaded / evt.total));
					});
				}
			}
		} ]);
//  授权信息全选
	app.controller(
				'checkAllCtrl',
				function($scope, $rootScope) {
					$rootScope.model = {
						checkedList : [],
						checkedList1 : [],
						checkedList2 : []
					}
					$scope.isSelectAll = function() {
						$rootScope.model.checkedList = [];
						$rootScope.model.checkedList2 = [];
						$rootScope.model.checkedList1 = [];
						if ($scope.master) {
							$scope.master = true;
							for (var i = 0; i < $scope.accredits.length; i++) {
								$rootScope.model.checkedList
										.push($scope.accredits[i].jid);
								$rootScope.model.checkedList1
										.push($scope.accredits[i].eid);
								$rootScope.model.checkedList2
										.push($scope.accredits[i].b_key);
							}
							alert($rootScope.model.checkedList1.length);
						} else {
							$scope.master = false;
							$rootScope.model.checkedList1 = [];
							$rootScope.model.checkedList = [];
							$rootScope.model.checkedList2 = [];
						}
						angular.forEach($scope.accredits, function(item) {
							item.selected = $scope.master;

						});
					}

					$scope.isLabelChecked = function() {
						var eid = this.ad.eid;
						var jid = this.ad.jid;
						var b_key = this.ad.b_key;
						if (this.ad.selected) {
							$rootScope.model.checkedList.push(eid);
							$rootScope.model.checkedList1.push(jid);
							$rootScope.model.checkedList2.push(b_key);
							if ($rootScope.model.checkedList.length == $scope.accredits.length) {
								$scope.master = true;
							}
						} else {
							$rootScope.master = false;
							var index = $rootScope.model.checkedList
									.indexOf(eid);
							var index1 = $rootScope.model.checkedList
									.indexOf(jid);
							var index2 = $rootScope.model.checkedList
									.indexOf(b_key);
							$rootScope.model.checkedList.splice(index, 1);
							$rootScope.model.checkedList1.splice(index1, 1);
							$rootScope.model.checkedLis2t.splice(index2, 1);
						}
					}

				});