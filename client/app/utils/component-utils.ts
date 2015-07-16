/// <reference path="../../../typings/tsd.d.ts" />
import 'angular';

export function makeDirective(component) {
  return () => {
    return angular.extend({
      restrict: 'E',
      scope: {},
      controllerAs: 'ctrl',
      bindToController: true,
      template: component.template,
      controller: component
    }, component.options);
  };
}

export function makeSelector(component) {
  return component.selector.replace(/-([a-z])/g, 
  function (g) { 
    return g[1].toUpperCase(); 
  });
}