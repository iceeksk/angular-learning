galleryApp.directive("galleryItem", function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			customImage: '='
		},
		templateUrl: "templates/gallery-item.html",
		compile: function(){

			return {
				pre: function(){

				},
				post: function(scope){
					scope.$emit('addAllItemsInGalleryItem');
				}
			}
		},
	}
});
