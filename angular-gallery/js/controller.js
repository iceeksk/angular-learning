var galleryApp = angular.module('galleryApp', []);

galleryApp.directive('customOnChange', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var onChangeHandler = scope.$eval(attrs.customOnChange);
			element.bind('change', onChangeHandler);
		}
	};
});

galleryApp.controller('galleryCtrl', ['$scope', '$http', function ($scope, $http) {

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

		if (random < 0.5) {
			size = 'normal';
		} else if (random > 0.75) {
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

	$scope.openPopup = function (index) {
		console.log(index);
		$scope.indexOfImg = index;
		$scope.showPopup = true;


	};

	$scope.closePopup = function () {
		$scope.showPopup = false;
	};

	$scope.sendComment = function () {
		$scope.images[$scope.indexOfImg].comments.push(
			{
				"name": $scope.nickName,
				"time": "12.12.12",
				"comemnt": $scope.newComment
			}
		);
		$scope.nickName = "";
		$scope.newComment = "";
	};

	$scope.addLike = function () {
		var canTapLike = $scope.images[$scope.indexOfImg].canTapLike;
		if (canTapLike) {
			$scope.images[$scope.indexOfImg].like++;
			$scope.images[$scope.indexOfImg].canTapLike = false;
			if (!$scope.images[$scope.indexOfImg].canTapDislike) {
				$scope.images[$scope.indexOfImg].dislike--;
				$scope.images[$scope.indexOfImg].canTapDislike = true;
			}
		} else if (!canTapLike) {
			$scope.images[$scope.indexOfImg].like--;
			$scope.images[$scope.indexOfImg].canTapLike = true;
		}

	};
	$scope.addDislike = function () {
		var canTapDislike = $scope.images[$scope.indexOfImg].canTapDislike;
		if (canTapDislike) {
			$scope.images[$scope.indexOfImg].dislike++;
			$scope.images[$scope.indexOfImg].canTapDislike = false;
			if (!$scope.images[$scope.indexOfImg].canTapLike) {
				$scope.images[$scope.indexOfImg].like--;
				$scope.images[$scope.indexOfImg].canTapLike = true;
			}
		} else if (!canTapDislike) {
			$scope.images[$scope.indexOfImg].dislike--;
			$scope.images[$scope.indexOfImg].canTapDislike = true;
		}
	}




}]);