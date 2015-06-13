/* global __karma__ */
/**
 * test-runner.js: force karma to work how we want so we can run the tests as transpiled es6 ts modules.
 * A LOT of credit is due to the Angular 2 team who appear to be the only people to get this to work (but they dont talk about it).
 * 
 * The idea is to pause karma, 
 *  then load all of our test modules (which are not loaded through the script tag, since that breaks the module system),
 *  and  finally run karma for each one.
 * Karma would just blast through this file and exit with out running the loaded tests.
 */

__karma__.loaded = function() {}; //hack karma, and tell it to start when we are ready;; thanks angular 2


System.baseURL = '/base/client/dist/'; //where we keep our test files
System.paths = {
  '*': '/base/client/dist/*.js',
  'chai' : '/base/node_modules/chai/chai.js'
};



function onlySpecFiles(path) {
  return /-spec\.js$/.test(path);
}

function karmaFileToModule(fileName) {  
  return fileName.replace(System.baseURL,'')
                  .replace('.js','');               
}

 Promise.all(
  Object.keys(window.__karma__.files) // All files served by Karma.
  .filter(onlySpecFiles)
  .map(karmaFileToModule)
  .map(function(modName){
    return System.import(modName)
      .then(function(mod) {
         if (mod.hasOwnProperty('main')) {
            mod.main();
          } else {
            throw new Error('Module ' + modName + ' does not implement main() method.');
          }
      })
      .then(function() {
        __karma__.start();
      }, function(error) {
        console.error('failed to run test suite',error.stack || error);
        __karma__.start();
      })
      .then(null, function(error) {console.error('Failed to load:', error);});
  }));
      

      
      
