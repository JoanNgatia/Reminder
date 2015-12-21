var myApp = angular.module('RemindCtrl', []);

myApp.controller('myAppController', ['$scope', '$http', function($scope, $http) {

    refresh();

    function refresh() {
        $http.get('/api/tasks').success(function(res) {
            $scope.tasks = res;
            $scope.task = $scope.tasks[0];
        });
    };

    $scope.init = function() {

        $http.get('/api/tasks').then(function(result) {
            $scope.tasks = result.data;
        });
    }

    $scope.init();

    $scope.create = function(task) {
        $http.post('/api/tasks', task).success(function(result) {

        })
    }

    $scope.update = function(task) {
        $http.post('/api/tasks', task).success(function(result) {
            console.log(result);

        });
    }

    $scope.delete = function(task) {
        $http.delete('/api/tasks', task).success(function(result) {

        })
    }

    $scope.select = function(task) {
        $scope.task = task;
    }

}]);
