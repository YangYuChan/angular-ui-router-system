	//添加授权信息
    app.controller('accFormController',function($scope, $http){
        $scope.formData = {};
        $scope.addAccForm = function() {	
        	var dpname = $scope.formData.department.pname;
        	var ename = $scope.formData.staff.ename;
        	var bname = $scope.formData.bt.bname;
        	var state = $scope.formData.state;
        	var startTime = $('#startTime').val();
        	var endTime = $('#endTime').val();
        	console.log(dpname+'<br/>'+ename+'<br/>'+bname+'<br/>'+state+'<br/>'+startTime+'<br/>'+endTime+'<br/>');

        };
       
    });
    //添加蓝牙锁
    app.controller('btFormController',function($scope, $http){
        $scope.btFormData = {};
        $scope.addBtForm = function() {
        	var bid = $scope.btFormData.bid;
        	var bname = $scope.btFormData.bname;
        	var rid = $scope.btFormData.rid;
        	var pname = $scope.btFormData.department.pname;
        	var remark = $scope.btFormData.remark;
        	var macadree = $scope.btFormData.macadree;
        	var equid = $scope.btFormData.equid;
  
        	console.log(bid+"</br>"+bname+'<br>'+rid+'<br>'+pname+'啊啊啊啊啊啊'+remark+'<br>'+macadree+'<br>'+equid+'<br>');

        };
    });
	app.directive('bsPopup', function($parse) {
				return {
					require: 'ngModel',
					restrict: 'A',
					link: function(scope, elem, attrs, ctrl) {
						scope.$watch(function() {
							return $parse(ctrl.$modelValue)(scope);
						}, function(newValue) {
							if(newValue == 0) {
								$(elem).modal('hide');
								return;
							}
							if(newValue == 1) {
								$(elem).modal('show');
								return;
							}
						});
					}
				}
			});