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

    $scope.showPopup = false;

    $scope.uploadImg = function (event) {
        var file = event.target.files,
            myImg,
            inputImg = event.currentTarget,
            random = Math.random(),
            size,
            reader = new FileReader();

        if(random < 0.5){
            size = 'normal';
        } else if(random > 0.75){
            size = 'portret';
        } else {
            size = 'landscape';
        }

        reader.readAsDataURL(inputImg.files[0]);

        reader.onload = function (el) {
            myImg = el.target.result;
            $scope.images.push(
                {
                    "name": file[0].name,
                    "url": myImg,
                    "like": 0,
                    "dislike": 0,
                    "size": size,
                    "comments": []
                });
            $scope.$apply();
        };
    };

    $scope.openPopup = function(index){
        console.log(index);
        $scope.showPopup = true;
        $scope.popapImg = $scope.images[index];

    };

    $scope.closePopup = function(name){
        $scope.showPopup = false;
    }

}]);