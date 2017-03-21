var myApp = angular.module('myApp', []);

myApp.controller('myTasks', ['$scope', '$http', function ($scope, $http) {
    $scope.h1 = "My Tasks";
    $scope.h3 = "Total of tasks: ";

    $http.get('data/model.json').success(function (data) {
        $scope.tasks = data;
        $scope.totalOfTasks = function () {
            return $scope.tasks.length;
        };
    });



    $scope.addTask = function () {
        if($scope.newTask) {
            $scope.tasks.push({'name': $scope.newTask, 'status': false});
            $scope.newTask = '';
        }
    };

    $scope.clear = function () {
        $scope.tasks = $scope.tasks.filter(function (item) {
            return item.status === false;
        })
    };

    /*$scope.clear = function () {
        for(var i = 0; i < $scope.tasks.length; i++){
            if($scope.tasks[i].status === true){
                $scope.tasks.splice(i,1);
                i--;
            }
        }
     };*/
}]);