galleryApp.directive("buttonAddImages", function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			scope: '='
		},
		templateUrl: "templates/button-add-images.html"
	}
});
