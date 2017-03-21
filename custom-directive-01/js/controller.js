var app = angular.module("myApp", []);



app.controller('MainController', ['$scope', function($scope) {

    $scope.first = 'World';
    $scope.result = 0;
    $scope.reset = function(){
        $scope.result = 0;
    };
    $scope.plus = function(){
        $scope.result += 1;
    };
    $scope.minus = function(){
        $scope.result > 0 ? $scope.result -= 1 : $scope.result;
    };

}]);