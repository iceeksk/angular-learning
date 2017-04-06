galleryApp.directive("galeryPopup", function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			images: '=',
			indexImage: '=',
			showPopup: '='
		},
		templateUrl: "templates/galery-popup.html",
		link: function (scope) {

			scope.closePopup = function () {
				scope.showPopup = false;
			};

			scope.likeIsTapet = [];
			scope.dislikeIsTapet = [];

			scope.addLike = function () {
				createSessionStorageItemsForLikesAndDislikes();
				var canTapLike = sessionStorage.getItem('canTapLike' + scope.indexImage),
					canTapDislike = sessionStorage.getItem('canTapDislike' + scope.indexImage);
				if (canTapLike == 'can') {
					scope.images[scope.indexImage].like++;
					sessionStorage.setItem('canTapLike' + scope.indexImage, 'no');
					if (canTapDislike == 'no') {
						scope.images[scope.indexImage].dislike--;
						sessionStorage.setItem('canTapDislike' + scope.indexImage, 'can');
					}
				} else if (canTapLike == 'no') {
					scope.images[scope.indexImage].like--;
					sessionStorage.setItem('canTapLike' + scope.indexImage, 'can');
				}
				scope.likeIsTapet[scope.indexImage] = sessionStorage.getItem('canTapLike' + scope.indexImage);
				scope.dislikeIsTapet[scope.indexImage] = sessionStorage.getItem('canTapDislike' + scope.indexImage);
			};

			scope.addDislike = function () {
				createSessionStorageItemsForLikesAndDislikes();
				var canTapLike = sessionStorage.getItem('canTapLike' + scope.indexImage),
					canTapDislike = sessionStorage.getItem('canTapDislike' + scope.indexImage);
				if (canTapDislike == 'can') {
					scope.images[scope.indexImage].dislike++;
					sessionStorage.setItem('canTapDislike' + scope.indexImage, 'no');
					if (canTapLike == 'no') {
						scope.images[scope.indexImage].like--;
						sessionStorage.setItem('canTapLike' + scope.indexImage, 'can');
					}
				} else if (canTapDislike == 'no') {
					scope.images[scope.indexImage].dislike--;
					sessionStorage.setItem('canTapDislike' + scope.indexImage, 'can');
				}
				scope.likeIsTapet[scope.indexImage] = sessionStorage.getItem('canTapLike' + scope.indexImage);
				scope.dislikeIsTapet[scope.indexImage] = sessionStorage.getItem('canTapDislike' + scope.indexImage);
			};

			function createSessionStorageItemsForLikesAndDislikes() {
				var canTapLike = sessionStorage.getItem('canTapLike' + scope.indexImage),
					canTapDislike = sessionStorage.getItem('canTapDislike' + scope.indexImage);
				if (canTapLike == null) {
					sessionStorage.setItem('canTapLike' + scope.indexImage, 'can');
				}
				if (canTapDislike == null) {
					sessionStorage.setItem('canTapDislike' + scope.indexImage, 'can');
				}
			};

			scope.sendComment = function () {
				var date = new Date();
				if (scope.nickName && scope.newComment) {
					scope.images[scope.indexImage].comments.push(
						{
							"name": "By " + scope.nickName,
							"time": date,
							"comemnt": scope.newComment
						}
					);
					scope.nickName = "";
					scope.newComment = "";
				}
			};

		}
	}
});
