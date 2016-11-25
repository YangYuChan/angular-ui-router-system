app.controller('menuController', function($scope) {
	$scope.sections = [{
		"name": "设备管理权限",
		"children": [{
			"location": ".accredit_msg",
			"name": "授权信息"
		}, {
			"location": ".add_accredit",
			"name": "添加授权信息"
		}, {
			"location": ".list_accredit",
			"name": "待授权列表"
		}]
	}, {
		"name": "蓝牙锁信息管理",
		"children": [{
			"location": ".check_bluetooth",
			"name": "查看蓝牙锁"
		}, {
			"location": ".add_bluetooth",
			"name": "添加蓝牙锁"
		}]
	}, {
		"name": "操作记录",
		"children": [{
			"location": ".operation_log",
			"name": "查看操作记录"
		}]
	}, {
		"name": "上传固件",
		"children": [{
			"location": ".upload_firmware",
			"name": "上传固件"
		}]
	} ];

	$scope.setMaster = function(section) {
		$scope.selected = section;           //selected是变量名，不能冲突
	}
	$scope.isSelected = function(section) {
		return $scope.selected === section;
	}
	
	$scope.setBg = function(child) {  
		 $scope.actived=child;    //actived是变量名，不能冲突
	}

	$scope.isBg = function(child) {
		return $scope.actived === child;	
	}
})