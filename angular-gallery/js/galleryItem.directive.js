angular.module('galleryApp').directive("galleryItem", function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			customImage: '='
		},
		templateUrl: "templates/gallery-item.html",
		compile: function(element, attributes){

			return {
				pre: function(scope, element, attributes, controller, transcludeFn){

				},
				post: function(scope, element, attributes, controller, transcludeFn){
					scope.$emit('someEvent');
				}
			}
		}
	}
});
