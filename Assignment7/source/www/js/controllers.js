angular.module('app.controllers', [])
  
.controller('signInCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

 $scope.squery = function () {
       var url= " http://api.fullcontact.com/v2/company/lookup.json?apiKey=c9119ae197c5e22a&domain="+($scope.qinp);
      $http.get(url)
        .success(function (response) {
          console.log(response);
          $scope.Name=response.organization[0].name;
          $scope.logourl=response.logo;
          $scope.website=response.website;
          $scope.category=response.category[0].name;
          $scope.services=response.organization[0].keywords;

        })
      $.post(
        'https://apiv2.indico.io/sentiment',
        JSON.stringify({
          'api_key': "c34d287ee73b9f132d842f8b307300ee",
          'data': " $scope.logourl",
        })
      ).then(function(res) { console.log(res) });
      $scope.sentiment=res.surprise;


    }

    
}])
   
.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('page2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])