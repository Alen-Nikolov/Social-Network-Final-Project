var directivesModule = angular.module('directivesModule', []);

directivesModule.directive('errSrc', function () {
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

directivesModule.directive('fileModel', ['$parse', function ($parse) {
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

directivesModule.directive('outsideClick', ['$document', '$parse', function ($document, $parse) {
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
directivesModule.directive('slideToggle', function () {
    return {
        restrict: 'A',
        controller: function ($scope) {
        },
        link: function (scope, element, attr) {
            element.bind('click', function () {
                var defaultSlideDuration = 400;
                var $slideBox = angular.element(attr.slideToggle);
                var slideDuration = parseInt(attr.slideToggleDuration, 10) || defaultSlideDuration;
                $slideBox.stop().slideToggle(slideDuration);
            });
        }
    };
});
directivesModule.directive('uploadfile', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {

            element.bind('click', function (e) {
                angular.element('.input-files').trigger('click');
            });
        }
    };
});
directivesModule.directive('customOnChange', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeHandler);
        }
    };
});