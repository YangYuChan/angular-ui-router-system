app.controller('menuController', function($scope) {
	$scope.sections = [{
		"name": "产品信息管理",
		"children": [{
			"location": ".accredit_msg",
			"name": "产品信息"
		}, {
			"location": ".add_accredit",
			"name": "添加产品信息"
		}, {
			"location": ".list_series",
			"name": "父分类管理"
		},{
			"location": ".list_type",
			"name": "子分类管理"
		},{
			"location": ".add_type",
			"name": "添加分类"
		}]
	}, {
		"name": "新闻编辑管理",
		"children": [{
			"location": ".check_bluetooth",
			"name": "查看新闻"
		}, {
			"location": ".add_bluetooth",
			"name": "添加新闻"
		}]
	}, {
		"name": "帮助中心管理",
		"children": [{
			"location": ".check_news",
			"name": "查看帮助问题"
		}, {
			"location": ".add_helphome",
			"name": "添加帮助问题"
		}]
	},{
		"name": "下载中心管理",
		"children": [{
			"location": ".operation_log",
			"name": "查看下载中心"
		}, {
			"location": ".add_loadhome",
			"name": "添加下载中心"
		}]
	}, {
		"name": "上传其他图片",
		"children": [{
			"location": ".check_patent",
			"name": "查看专利"
		},{
			"location": ".check_topimg",
			"name": "查看轮播图"
		}, {
			"location": ".upload_firmware",
			"name": "上传专利图片"
		}, {
			"location": ".upload_topimg",
			"name": "上传轮播图片"
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