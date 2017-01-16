// Code goes here

//var app = angular.module('routerApp', ['angularUtils.directives.dirPagination']);

app.controller('AccController',function($scope,$rootScope,httpService) {

		$scope.currentPage = 1;
		$scope.pageSize = 10;
        httpService.get('../product/list1').then(function (data) {
            $rootScope.accredits = data;
        });
  
$scope.pageChangeHandler = function(num) {
};
})
/**
 * 新闻分页
 */
app.controller('BtController',function($scope,$rootScope,httpService) {

	$scope.currentPage = 1;
	$scope.pageSize = 10;
    httpService.get('../news/list1').then(function (data) {
        $rootScope.jc_news = data;
    });

$scope.pageChangeHandler = function(num) {
};
})
/**
 * 子系列分页
 */
app.controller('Helphome1',function($scope,$rootScope,httpService) {
	
	$scope.currentPage = 1;
	$scope.pageSize = 10;
    httpService.get('../subfam/list').then(function (data) {
        $rootScope.jc_fuck = data;
    });

$scope.pageChangeHandler = function(num) {
};
})
/**
 * 专利分页
 */
app.controller('patentphoto',function($scope,$rootScope,httpService) {
	
	$scope.currentPage = 1;
	$scope.pageSize = 10;
    httpService.get('../PatentPhone/list1').then(function (data) {
        $rootScope.jc_patent = data;
    });

$scope.pageChangeHandler = function(num) {
};
})
/**
 * 帮助中心分页
 */
app.controller('Helphome',function($scope,$rootScope,httpService) {

	$scope.currentPage = 1;
	$scope.pageSize = 10;
    httpService.get('../helphome/list1').then(function (data) {
        $rootScope.jc_help = data;
    });

$scope.pageChangeHandler = function(num) {
};
})
/**
 * 轮播图分页
 */
app.controller('Topimg',function($scope,$rootScope,httpService) {

	$scope.currentPage = 1;
	$scope.pageSize = 10;
    httpService.get('../topimg/list1').then(function (data) {
        $rootScope.jc_topimg = data;
    });

$scope.pageChangeHandler = function(num) {
};
})
/**
 * 父分类分页
 */
app.controller('Series',function($scope,$rootScope,httpService) {

	$scope.currentPage = 1;
	$scope.pageSize = 10;
	httpService.get('../series/list').then(function(data) {
		$rootScope.region = data;
	});

$scope.pageChangeHandler = function(num) {
};
})
app.controller('LogController',function($scope,$rootScope,httpService) {

	$scope.currentPage = 1;
	$scope.pageSize = 10;
    httpService.get('../loadhome/list1').then(function (data) {
        $rootScope.logs = data;
    });

$scope.pageChangeHandler = function(num) {
};
})
app.controller('OtherController',function($scope,$location) {
	var sds=window.localStorage.getItem('username');
	if(sds==null){
		$location.path('/login');
	}
	$scope.pageChangeHandler = function(num) {
	};
});
