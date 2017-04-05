galleryApp.directive("galleryItem", function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			customImage: '='
		},
		templateUrl: "templates/gallery-item.html"
	}
});
