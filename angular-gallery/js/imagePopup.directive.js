angular.module('galleryApp').directive("imagePopup", function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			customImage: '=',
			customPopup: '='
		},
		templateUrl: "templates/image-popup.html",
		link: function (scope) {

			scope.closePopup = function () {
				scope.showPopup = false;
			};

		}
	}
});
