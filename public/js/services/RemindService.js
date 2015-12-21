angular.module('RemindService', [])
.factory('Task', ['$http', function($http) {

    return {
        // call to get all tasks
        get : function() {
            return $http.get('/api/tasks');
        },

        // call to POST and create a new task
        create : function(RemindData) {
            return $http.post('/api/tasks', RemindData);
        },

        // call to DELETE a task
        delete : function(id) {
            return $http.delete('/api/tasks/' + id);
        }
    }       

}]);