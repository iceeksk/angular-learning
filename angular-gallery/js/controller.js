var galleryApp = angular.module('galleryApp', ['packery-angular']);

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

	$scope.showGallery = false;

	$scope.$on('someEvent', function() {
		$scope.showGallery = true;
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
		$scope.indexOfImg = index;
		$scope.showPopup = true;
		console.log('popup');
		console.log(index);
	};

	$scope.closePopup = function () {
		$scope.showPopup = false;
	};

	$scope.sendComment = function () {

		var date = new Date();

		if( $scope.nickName && $scope.newComment ){
			$scope.images[$scope.indexOfImg].comments.push(
				{
					"name": "By " + $scope.nickName,
					"time": date,
					"comemnt": $scope.newComment
				}
			);
			$scope.nickName = "";
			$scope.newComment = "";
		}
	};


	sessionStorage.clear();

	$scope.likeIsTapet = [];
	$scope.dislikeIsTapet = [];

	$scope.addLike = function () {

		createSessionStorageItemsForLikesAndDislikes();

		var canTapLike = sessionStorage.getItem('canTapLike'+$scope.indexOfImg),
			canTapDislike = sessionStorage.getItem('canTapDislike'+$scope.indexOfImg);

		if (canTapLike == 'can') {
			$scope.images[$scope.indexOfImg].like++;
			sessionStorage.setItem('canTapLike'+$scope.indexOfImg, 'no');
			if (canTapDislike == 'no') {
				$scope.images[$scope.indexOfImg].dislike--;
				sessionStorage.setItem('canTapDislike'+$scope.indexOfImg, 'can');
			}
		} else if (canTapLike == 'no') {
			$scope.images[$scope.indexOfImg].like--;
			sessionStorage.setItem('canTapLike'+$scope.indexOfImg, 'can');
		}

		$scope.likeIsTapet[$scope.indexOfImg] = sessionStorage.getItem('canTapLike' + $scope.indexOfImg);
		$scope.dislikeIsTapet[$scope.indexOfImg] = sessionStorage.getItem('canTapDislike' + $scope.indexOfImg);

	};

	$scope.addDislike = function () {

		createSessionStorageItemsForLikesAndDislikes();

		var canTapLike = sessionStorage.getItem('canTapLike' + $scope.indexOfImg),
			canTapDislike = sessionStorage.getItem('canTapDislike' + $scope.indexOfImg);

		if (canTapDislike == 'can') {
			$scope.images[$scope.indexOfImg].dislike++;
			sessionStorage.setItem('canTapDislike' + $scope.indexOfImg, 'no');
			if (canTapLike == 'no') {
				$scope.images[$scope.indexOfImg].like--;
				sessionStorage.setItem('canTapLike' + $scope.indexOfImg, 'can');
			}
		} else if (canTapDislike == 'no') {
			$scope.images[$scope.indexOfImg].dislike--;
			sessionStorage.setItem('canTapDislike' + $scope.indexOfImg, 'can');
		}

		$scope.likeIsTapet[$scope.indexOfImg] = sessionStorage.getItem('canTapLike' + $scope.indexOfImg);
		$scope.dislikeIsTapet[$scope.indexOfImg] = sessionStorage.getItem('canTapDislike' + $scope.indexOfImg);

	};

	function createSessionStorageItemsForLikesAndDislikes() {

		var canTapLike = sessionStorage.getItem('canTapLike' + $scope.indexOfImg),
			canTapDislike = sessionStorage.getItem('canTapDislike' + $scope.indexOfImg);

		if (canTapLike == null) {
			sessionStorage.setItem('canTapLike' + $scope.indexOfImg, 'can');
		}
		if (canTapDislike == null) {
			sessionStorage.setItem('canTapDislike' + $scope.indexOfImg, 'can');
		}
	}

}]);