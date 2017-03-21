var phoneCatApp = angular.module('phoneCatApp', ['ngRoute']);

phoneCatApp.config(['$routeProvider', '$locationProvider', function ($routeProvide, $locationProvider) {


    $routeProvide
        .when('/', {
            templateUrl: 'template/home.html',
            controller: 'phonesCtrl'
        })
        .when('/about', {
            templateUrl: 'template/about.html',
            controller: 'aboutPhonesCtrl'
        })
        .when('/contact', {
            templateUrl: 'template/contact.html',
            controller: 'contactPhonesCtrl'
        })
        .when('/phones/:phoneId', {
            templateUrl: 'template/phonePage.html',
            controller: 'phonePageCtrl'
        })
        .otherwise({
                redirectTo: '/'
            }
        )

}]);

phoneCatApp.filter('setTrueOrFolse', function () {
    return function (item) {
        return item ? '\u2713' : '\u2718';
    }
});

phoneCatApp.controller('aboutPhonesCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

}]);
phoneCatApp.controller('contactPhonesCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

}]);
phoneCatApp.controller('phonePageCtrl', ['$scope', '$http', '$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
    $scope.phoneId = $routeParams.phoneId;
    $http.get('phones/' + $routeParams.phoneId + '.json').success(function (data) {
        $scope.phone = data;
        $scope.mainImg = data.images[0];
    });

    $scope.showImg = function (item) {
        $scope.mainImg = item;
    }
}]);

phoneCatApp.controller('phonesCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $http.get('phones/phones.json').success(function (data) {
        $scope.phones = data;
    });


    /*    $scope.nameItem = undefined;
     $scope.reverse = false;

     $scope.filterByName = function (name) {
     if(name ===  $scope.nameItem){
     $scope.reverse = !$scope.reverse;
     } else {
     $scope.nameItem =  name;
     $scope.reverse = false;
     }
     };

     $scope.orderTop = function (name) {
     return $scope.nameItem === name &&  $scope.reverse === false;
     };

     $scope.orderDoun = function (name) {
     return $scope.nameItem === name &&  $scope.reverse === true;
     };*/
}]);

