angular.module('galleryApp').directive("buttonAddImages", function () {
	return {
		restrict: "E",
		replace: true,
		scope: {},
		templateUrl: "templates/button-add-images.html",
		link: function (scope) {
			scope.tt = "ajsdf";
			scope.uploadImg = function (event) {
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
				/*random < 0.5 ? size = 'normal' : random > 0.75 ? size = 'portret' : size = 'landscape' ;*/

				reader.readAsDataURL(inputImg.files[0]);

				reader.onload = function (el) {
					myImg = el.target.result;

					scope.$emit( 'addImageToImages',
						{
							"name": file[0].name,
							"url": myImg,
							"like": 0,
							"dislike": 0,
							"size": size,
							"comments": []
						});

					scope.$apply();
				};
			};
		}
	}
});
