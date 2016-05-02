angular.module('todo', [])

.controller('ToDoCtrl', ['$scope', function($scope, $http) {
    $scope.tasklist = [];
    $scope.priority = 'normal';
    
    $scope.addTask = function() {
        if(event.keyCode == 13 && $scope.taskName) {
            $scope.tasklist.push({"name": $scope.taskName, "completed": false, "priority": $scope.priority});   
            $scope.taskName = "";
            $scope.priority = 'normal';
        }
    }

    $scope.deleteTask = function(index) {
        $scope.tasklist.splice(index, 1);
    }
}])