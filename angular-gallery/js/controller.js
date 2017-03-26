var galleryApp = angular.module('galleryApp', []);

galleryApp.directive('customOnChange', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});

galleryApp.controller('galleryCtrl',['$scope', '$http', function ($scope, $http) {
    $http.get('data/model.json').success(function (data) {
        $scope.images = data;
    });


    $scope.uploadImg = function (event) {
        var file = event.target.files;
        $scope.images.push(
            {
            "name": file[0].name,
            "url": "media/img/"+ file[0].name,
            "like": 0,
            "dislike": 0,
            "comments": []
        });
        console.log($scope.images);
    }

}]);