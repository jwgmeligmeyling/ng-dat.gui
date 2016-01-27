var module = angular.module('dat.gui', []);

module.controller('DatGuiController', function DatGuiController() {

	/** Are we hiding the GUI's ? */
	this.hide = false;

	/**
	 * Whether the <code>GUI</code> is collapsed or not
	 * @type Boolean
	 */
	this.closed = false;

});

module.directive('datGui', function() {
	return {
		restrict: 'EA',
		transclude: true,
		controller: 'DatGuiController',
		controllerAs: 'datGuiCtrl',
		template: '<div class="main" style="-webkit-user-select: none; width: 245px; position: absolute; top: 0px; right: 20px;" ng-hide="datGuiCtrl.hide">' +
		'<ul ng-transclude ng-hide="datGuiCtrl.closed">' +
		'</ul>' +
		'<dat-gui-close-btn closed="datGuiCtrl.closed"/>' +
		'</div>'
	}
});

module.directive('datGuiFolder', function() {
	return {
		restrict: 'EA',
		require: 'datGui',
		scope: {
			title: "@"
		},
		transclude: true,
		template: '<li class="folder">' +
			'<div class="dg">' +
				'<ul ng-class="{ closed : closed }">' +
					'<li class="title" ng-bind="title" ng-click="closed = !closed"></li>' +
					'<ng-transclude></ng-transclude>' +
				'</ul>' +
			'</div>' +
		'</li>'
	}
})

module.constant('CLASS_CONTROLLER_ROW', 'cr');

module.directive('datGuiControl', function(CLASS_CONTROLLER_ROW) {
	return {
		restrict: 'EA',
		transclude: true,
		scope: {
			propertyName: '@',
			type: '@'
		},
		template: '<li class="'+CLASS_CONTROLLER_ROW+'" ng-class="type">' +
			'<div>' +
				'<span class="property-name" ng-bind="propertyName"></span>' +
				'<div class="c" ng-transclude></div>' +
			'</div>'+
		'</li>',
		link: function(scope, element) {
			var elem;
			if (!scope.type) {
				if ((elem = element.find('dat-gui-slider')).length) {
					scope.type = 'number has-slider';
				}
				else if ((elem = element.find('input')).length) {
					scope.type = ({
						number: 'number',
						checkbox: 'boolean'
					})[elem.attr('type')];
				}
			}
			scope.type = scope.type || 'string';
		}
	}
});

module.directive('datGuiCloseBtn', function() {
	return {
		restrict: 'EA',
		require: '^^datGui',
		scope: {
			closed: '='
		},
		template: '<div class="close-button" ng-click="closed = !closed" ' +
			'ng-bind="closed ? \'Open Controls\' : \'Close Controls\'"></div>',
		link: function(scope, elem) {
			var parentElem = elem.parent()[0];
			var width = parentElem.style.width || parentElem.getBoundingClientRect().width + "px";
			elem.find('div').css('width', width);
		}
	}
});

module.directive('datGuiSlider', function() {
	return {
		restrict: 'EA',
		transclude: true,
		scope: {
			min: '@',
			max: '@',
			ngModel: '='
		},
		require: '^ngModel',
		template:
			'<div class="slider">' +
				'<div class="slider-fg" style="width: 100%;"></div>' +
			'</div>' +
			'<div>' +
				'<input type="number" ng-model="ngModel" min="{{min}}" max="{{max}}"/>' +
			'</div>' +
		'',
		link: {
			post: function(scope, tElement, iAttrs, ngModel) {
				var slider = angular.element(tElement[0].getElementsByClassName('slider'));
				var sliderFg = angular.element(tElement[0].getElementsByClassName('slider-fg'));

				ngModel.$render = function() {
					var pct = (ngModel.$viewValue - scope.min) / scope.max * 100;
					sliderFg.css('width', pct+'%');
				};

				slider.on('mousedown', function onMouseDown() {
					var rect = slider[0].getBoundingClientRect();

					function onMouseDrag(event) {
						var pct = (event.clientX - rect.left) / rect.width * scope.max;
						pct = Math.min(scope.max, Math.max(scope.min, pct));
						pct = Math.round(pct);
						ngModel.$setViewValue(pct, event);
						ngModel.$render();
					}

					angular.element(window)
						.on('mousemove', onMouseDrag)
						.one('mouseup', function onMouseUp() {
							angular.element(window).off('mousemove', onMouseDrag);
						});
				})
			}
		}
	}
});