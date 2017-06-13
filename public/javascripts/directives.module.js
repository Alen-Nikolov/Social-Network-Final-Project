var myModule = angular.module('directivesModule', []);

myModule.directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src !== attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});

myModule.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myModule.directive('outsideClick', ['$document', '$parse', function ($document, $parse) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attributes) {
            var scopeExpression = $attributes.outsideClick,
                onDocumentClick = function (event) {
                    var isChild = $element.find(event.target).length > 0;

                    if (!isChild) {
                        $scope.$apply(scopeExpression);
                    }
                };

            $document.on('click', onDocumentClick);

            $element.on('$destroy', function () {
                $document.off('click', onDocumentClick);
            });
        }
    }
}]);
