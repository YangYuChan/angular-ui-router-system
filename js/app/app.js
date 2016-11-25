var app = angular.module("routerApp",["ui.router"]);
app.config(function ($stateProvider,$urlRouterProvider) {	
    $urlRouterProvider.when('','login')
    	.otherwise('/login');
    $stateProvider
        .state("login", {
                    url: '/login',
                    templateUrl: 'login.html',
                    controller: 'loginCtrl'
                })
        .state("main", {
                    url: '/main',
                    abstract:true,
                    templateUrl: 'pages/main.html',
                })
        .state("main.accredit_msg",{
                    url:'',
                    views: {
                        "":{
                            templateUrl: 'pages/accredit_msg.html' 
                        }
                    }
               })
		.state("main.add_accredit",{ 
                    url:'/add_accredit',
                    templateUrl: 'pages/add_accredit.html'
                })
		.state("main.list_accredit",{ 
                    url:'/list_accredit',
                    templateUrl: 'pages/list_accredit.html'
                })
		.state("main.check_bluetooth",{ 
                    url:'/check_bluetooth',
                    templateUrl: 'pages/check_bluetooth.html'
                })
		.state("main.add_bluetooth",{
                    url:'/add_bluetooth',
                    templateUrl: 'pages/add_bluetooth.html'
                })
		.state("main.operation_log",{ 
                    url:'/operation_log',
                    templateUrl: 'pages/operation_log.html'
                })
		.state("main.upload_firmware",{
                    url:'/upload_firmware',
                    templateUrl: 'pages/upload_firmware.html'
                })
		.state("main.change_pwd",{
                    url:'/change_pwd',
                    templateUrl: 'change_pwd.html'
                })
		
});
 app.run(function ($rootScope, httpService) {
        //获取所属单位或者部门
        httpService.get('js/json/dept.json').then(function (data) {
            $rootScope.departments = data;
        });
        //查看蓝牙锁信息
        httpService.get('js/json/bluetooth.json').then(function (data) {
            $rootScope.bluetooth = data;
        });
        //查看授权信息
        httpService.get('js/json/juris.json').then(function (data) {
            $rootScope.accredits = data;
        });
        //查看操作记录
        httpService.get('js/json/oper.json').then(function (data) {
            $rootScope.logs = data
        });
        //获取部门员工信息
        httpService.get('js/json/emp.json').then(function (data) {
            $rootScope.staffs = data;
        });
        //获取所属区域
        httpService.get('js/json/area.json').then(function (data) {
            $rootScope.areas = data
        });
    })

	app.controller('loginCtrl',function($scope,$location,$rootScope){
			$scope.submit=function(){
				var username = $scope.username;
				var password = $scope.password;
				var message = '';
				if(username =='admin' && password == '123456'){
					$location.path('/main');
					$rootScope.username = username;
					$rootScope.password = password;
				}else{
					$location.path('/');
					$scope.message = '用户名或密码错误';
				}
			}
		});
		
	app.controller('accreditCtrl',function($scope,httpService){
			$scope.changeDepar = function(){
				httpService.get("js/json/emp.json").then(function (data) {
	            $scope.staffs = data;
	        });
	         httpService.get("js/json/bluetooth.json").then(function (data) {
			  $scope.bluetooth = data;
	        });
			}
		})
	app.controller('checkAllList',function($scope){

	$scope.m = [];
    $scope.checked = [];
    $scope.selectAll = function () {
        if($scope.select_all) {
            $scope.checked = [];
            angular.forEach($scope.accredits, function (i) {
                i.checked = true;
                $scope.checked.push(i.eid);
            })
        }else {
            angular.forEach($scope.accredits, function (i) {
                i.checked = false;
                $scope.checked = [];
            })
        }
    };
    
    $scope.selectOne = function () {

        angular.forEach($scope.accredits , function (i) {
            if(i.checked) {         	
                $scope.checked.push(i.eid);
            }
        })
        if ($scope.accredits.length === $scope.checked.length) {
            $scope.select_all = true;       
        } else {
            $scope.select_all = false;
        }

 

    }

})
	
	//修改授权信息
	app.controller('updataAccCtrl',function($scope){
		var idx = -1;
			$scope.accs = {}
			
			//获取信息
            $scope.updateAccInfo = function ($index) {
				$scope.accs.eid = $scope.accredits[$index].eid;
				$scope.accs.b_key = $scope.accredits[$index].b_key;
	        	$scope.accs.ename = $scope.accredits[$index].emp.ename;
	        	$scope.accs.jstatic = $scope.accredits[$index].jstatic;
	        	$scope.accs.jtime = $scope.accredits[$index].jtime;
	        	$scope.accs.jid = $scope.accredits[$index].jid;

            	$('#myModal').modal('show');
            	idx = $index;
            };
            
            //修改信息
            $scope.updataAccredit = function(){
            	 //将修改后的值赋给数组
               	$scope.accredits[idx].eid = $scope.accs.eid;
				$scope.accredits[idx].b_key = $scope.accs.b_key
	        	$scope.accredits[idx].emp.ename = $scope.accs.ename
	        	$scope.accredits[idx].jstatic = $scope.accs.jstatic
	        	$scope.accredits[idx].jtime = $scope.accs.jtime
	        	$scope.accredits[idx].jid = $scope.accs.jid
	     
                //关闭模块窗口
                $('#myModal').modal('hide');
            }
	})
	
	//修改蓝牙锁
	app.controller('updataBtCtrl',function($scope){
		var i = -1;
			$scope.btlist = {}
			//获取蓝牙锁信息
            $scope.updateBtInfo = function ($index) {
				$scope.btlist.bid= $scope.bluetooth[$index].bid;
	        	$scope.btlist.bname= $scope.bluetooth[$index].bname;
	        	$scope.btlist.rname= $scope.bluetooth[$index].region.rname;
	        	$scope.btlist.pname= $scope.bluetooth[$index].blue.pname;
	        	$scope.btlist.remark= $scope.bluetooth[$index].remark;
	        	$scope.btlist.macadree= $scope.bluetooth[$index].macadree;
	        	$scope.btlist.b_key= $scope.bluetooth[$index].b_key;
            	$('#myModal').modal('show');
            	i = $index;
            	console.log($scope.btlist.rname)
            };
            
            //修改蓝牙锁信息
            $scope.updateBtForm = function () {
     
				$scope.bluetooth[i].bid = $scope.btlist.bid;
	        	$scope.bluetooth[i].bname = $scope.btlist.bname;
	        	$scope.bluetooth[i].region.rname = $scope.btlist.rname;
	        	$scope.bluetooth[i].blue.pname = $scope.btlist.pname;
	        	$scope.bluetooth[i].remark = $scope.btlist.remark;
	        	$scope.bluetooth[i].macadree = $scope.btlist.macadree;
	        	$scope.bluetooth[i].b_key = $scope.btlist.b_key;
            	$('#myModal').modal('hide');
	        	console.log($scope.bluetooth[i].blue.pname )
            };
	})