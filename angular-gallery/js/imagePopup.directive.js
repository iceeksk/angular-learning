angular.module('galleryApp').directive("imagePopup", function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			scope: '=',
			customPopup: '='
		},
		templateUrl: "templates/image-popup.html"
	}
});
