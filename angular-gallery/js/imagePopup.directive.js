galleryApp.directive("imagePopup", function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			scope: '='
		},
		templateUrl: "templates/image-popup.html"
	}
});
