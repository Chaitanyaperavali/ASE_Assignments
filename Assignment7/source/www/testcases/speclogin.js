describe('loginCtrl', function () {
  beforeEach(angular.mock.module('myapp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('data', function() {
    it('Tests the Full name feature of the application', function() {
      var $scope = {};
      var controller = $controller('loginCtrl', { $scope: $scope });
      expect($scope.data.Username.toEqual('chaitanya'));   // succeeds
      expect($scope.data.Username.toEqual('Admin'));    // fails
    });
  });
});