/**
 * Created by JFCS on 4/6/16.
 */
var myApp = angular.module('myApp',['ngRoute',  "ngAnimate",'ui.bootstrap','smart-table']);


myApp.config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider) {


    $routeProvider
        .when('/', {
            templateUrl: 'assets/views/templates/home.html',
            controller: 'HomeController'
        })
        .when('/addcustomer', {
            templateUrl: 'assets/views/templates/addcustomer.html',
            controller: 'CustomerController'
        })
        .when('/addrepair', {
            templateUrl: 'assets/views/templates/addrepair.html',
            controller: 'RepairController'
        })
        .when('/addvehicle', {
            templateUrl: 'assets/views/templates/addvehicle.html',
            controller: 'VehicleController'
        })
        .when('/addparts', {
            templateUrl: 'assets/views/templates/addParts.html',
            controller: 'PartsController'
        })
        .when('/register', {
            templateUrl: 'assets/views/templates/register.html',
            controller: 'LoginController'
        })
        .when('/login', {
            templateUrl: 'assets/views/templates/login.html',
            controller: 'LoginController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);