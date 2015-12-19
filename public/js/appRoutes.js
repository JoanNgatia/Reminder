 angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // tasks page that will use the RemindController
        .when('/tasks', {
            templateUrl: 'views/tasks.html',
            controller: 'RemindController'
        });

    $locationProvider.html5Mode(true);

}]);
