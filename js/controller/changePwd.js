app.controller('updateCtrl',function($scope,$location,$rootScope,$http){
			$scope.pwddata = {};
			$scope.submitPwd=function(){
				var dpname = $scope.pwddata.oldpassword;
				var pwd=window.localStorage.getItem("password");
				var uid=window.localStorage.getItem("uid");
	        	console.log(pwd+'<br/>'+uid+'<br/>');
	        	var dpname1 = $scope.pwddata.passwordagain;
				if(dpname==pwd){
					$http({
		                method  : 'POST',
		                url     : 'user/update',
		                params : {upwd:dpname1,uid:uid },  // pass in data as strings
		                headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
		            })
		                .success(function(data) {
		                	    $location.path('/login');
		        				alert("修改密码成功");
		                });
				}else{
					alert("原密码不正确");
				}
			}
		})
 app.directive("repeat", [function () {
        return {
            restrict: 'A',
            require: "ngModel",
            link: function (scope, element, attrs, ctrl) {
                if (ctrl) {
                    var otherInput = element.inheritedData("$formController")[attrs.repeat];

                    var repeatValidator = function (value) {
                        var validity = value === otherInput.$viewValue;
                        ctrl.$setValidity("repeat", validity);
                        return validity ? value : undefined;
                    };

                    ctrl.$parsers.push(repeatValidator);
                    ctrl.$formatters.push(repeatValidator);

                    otherInput.$parsers.push(function (value) {
                        ctrl.$setValidity("repeat", value === ctrl.$viewValue);
                        return value;
                    });
                }
            }
        };
    }]);