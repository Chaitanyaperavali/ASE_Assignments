describe('signInCtrl', function () {
  beforeEach(angular.mock.module('ASELab7'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('LoginData', function() {
    it('Tests the Full name feature of the application', function() {
      var $scope = {};
      var controller = $controller('signInCtrl', { $scope: $scope });
      expect($scope.LoginData.Username.toEqual('kalyan') && $scope.LoginData.Password.toEqual('kalyan'));   // succeeds
      expect($scope.LoginData.Username.toEqual('Admin') && $scope.LoginData.Username.toEqual('Admin') );    // fails
    });
  });
});