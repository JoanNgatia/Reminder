// angular.module('RemindCtrl', []).controller('RemindController', function($scope) {

//     $scope.tagline = 'Nothing beats a good reminder app!';

// });

var myApp =  angular.module('myApp',[]); 

myApp.controller('myAppController',['$scope', '$http', function ($scope, $http, myAppService) { 

    $scope.task = [];

    $scope.init = function() { 

        $http.get('http://localhost:3000/task/read').then(function(result) { $scope.task = result.data; });
    } 

    $scope.init(); 

}]);