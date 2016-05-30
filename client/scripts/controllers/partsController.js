/**
 * Created by JFCS on 4/11/16.
 */
myApp.controller('PartsController',['$scope','CustomerService','PartsService','HomeService',
    function($scope,CustomerService,PartsService,HomeService) {
    var homeService = HomeService;
    var customerService = CustomerService;
    var partsService = PartsService;
    $scope.vendorArray = ['Napa','AutoZone','CarQuest',"O'Reilly's",'Advance','Factory','Dealership','Amazon','Ebay','Red Rooster'];
    //$scope.parts = [];
    $scope.part = {};
    $scope.repairs = [];

    $scope.getRepairs = function(){
        homeService.getRepairs();
        $scope.repairs =  homeService.repairs;
        //$scope.count = $scope.repairs.length;
    };


    $scope.addPart = function(part,repair) {
        console.log('clicked',part,repair);
        part.repair_id = repair.id;
        partsService.postParts(part);
        $scope.part = {};
    };



    $scope.getRepairs();

}]);