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
  
// export class ComponentFactory {
 
//   constructor(
//     private angularModuleName, 
//     private componentClasses: Array<Object>) {

//   }
  
//   public addComponent(component) {
//     this.componentClasses.push(component);
//   }
  
//   public addComponents(components) {
//     this.componentClasses = components;
//   }
  
//   public registerDirectives() {
//     while (this.componentClasses.length > 0) {
//       let component = this.componentClasses.pop();
//       this.registerDirective(component);
//     }
//   }
  
//   private registerDirective(component) {
//     angular.module(this.angularModuleName)
//       .directive(
//         this.makeSelector(component), 
//         this.makeDirective(component));
//   }
  
//   private makeDirective(component) {
//     return () => {
//       return angular.extend({
//         restrict: 'E',
//         scope: {},
//         controllerAs: 'ctrl',
//         bindToController: true,
//         template: component.template,
//         controller: component
//       }, component.options);
//     };
//   }

//   private makeSelector(component) {
//     return component.selector.replace(/-([a-z])/g, 
//     function (g) { 
//       return g[1].toUpperCase(); 
//     });
//   }
// }

// export function convertHyphenToCamelCase(componentClass) {
//   return componentClass.selector.replace(/-([a-z])/g, 
//     function (g) { 
//       return g[1].toUpperCase(); 
//     });
// }

// export function makeComponent(componentClass) {
//   return function() {
//     return angular.extend({
//       restrict: 'E',
//       scope: {},
//       controllerAs: 'ctrl',
//       bindToController: true,
//       template: componentClass.template,
//       controller: componentClass
//     }, componentClass.options);
//   };
// }
