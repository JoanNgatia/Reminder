var myApp =  angular.module('RemindCtrl',[]); 

myApp.controller('myAppController',['$scope', '$http', function ($scope, $http) { 

    $scope.task = {};

    $scope.init = function() { 

        $http.get('http://localhost:8080/api/task').then(function(result) { $scope.task = result.data; });
    } 

    $scope.init(); 

    $scope.update = function(task) {
        $http.post('/api/task',task).success(function(result){
            console.log (result)
        })
    }

}]);