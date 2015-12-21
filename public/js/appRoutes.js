 angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        // tasks page that will use the RemindController
        .when('/tasks', {
            templateUrl: 'views/tasks.html',
            controller: 'RemindController'
        });

    $locationProvider.html5Mode(true);

}]);
