var galleryApp = angular.module('galleryApp', ['packery-angular']);


galleryApp.controller('galleryCtrl', ['$scope', '$http', function ($scope, $http) {

	$http.get('data/model.json').success(function (data) {
		$scope.images = data;
	});

	$scope.showInput = false;

	$scope.$on('someEvent', function() {
		$scope.showInput = true;
		console.log('2');
	});

	$scope.options = {
		columnWidth: 1,
		dragSelector: '',
		isAppended: true,
		isDraggable: false,
		itemSelector: '.pa-item',
		rowHeight: 1,
		stamp: '.pa-stamp',
		horizontal: true,
		gutter: 1
	};

	$scope.showPopup = false;

	$scope.openPopup = function (index) {
		$scope.indexOfImg = index;
		$scope.showPopup = true;
	};

	sessionStorage.clear();

	$scope.uploadImg = function (event) {
		var file = event.target.files,
			myImg,
			inputImg = event.currentTarget,
			random = Math.random(),
			size,
			reader = new FileReader();

		random < 0.5 ? size = 'normal' : random > 0.75 ? size = 'portret' : size = 'landscape' ;

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
}]);