/**
 * Created by JFCS on 4/6/16.
 */

myApp.controller('HomeController',['$scope','$http', '$filter',"$uibModal",'CustomerService','HomeService','PartsService','VehicleService',
    function($scope,$http,$filter,$uibModal,CustomerService,HomeService,PartsService,VehicleService){

        var customerService = CustomerService;
        var homeService = HomeService;
        var partsService = PartsService;
        var vehicleService = VehicleService;

        // todo move these arrays to a factory.
        $scope.repairTypeArray = ['Starting and Charging','Engine Diagnostics','Engine Electrical','Engine Mechanical', 'Steering and Suspension','Heating and Cooling', 'Brakes', 'Maintenance'];
        $scope.vendorArray = ['Napa','AutoZone','CarQuest',"O'Reilly's",'Advance','Factory','Dealership','Amazon','Ebay','Red Rooster'];
        $scope.test = customerService.test;
        $scope.title = "";
        $scope.count = 0;
        $scope.repairs = [];
        $scope.rowCollection = [];
        $scope.itemsByPage=15;
        // builds parts list for edit form.
        $scope.part = {};
        $scope.parts = [];
        $scope.repair = {};

    $scope.deleteRepair = function(repairId){
      console.log('clicked',repairId);
        partsService.deletePart(repairId);
        customerService.deleteRepair(repairId);
    };


    $scope.getRepairs = function(){
        homeService.getRepairs();
        $scope.repairs =  homeService.repairs;
        $scope.count = $scope.repairs.length;
    };

    $scope.getParts = function(repairId){
        console.log(repairId);
        partsService.getParts(repairId);
        $scope.parts = partsService.parts;

    };

    $scope.postParts = function(repair){
      console.log('clicked', repair);
        var part = {};
        part.name = repair.part_name;
        part.description = repair.partDescription;
        part.vendor = repair.vendor;
        part.cost = repair.cost;
        part.repair_id = repair.id;
        partsService.postParts(part);
        $scope.repair.part_name = "";
        $scope.repair.partDescription = "";
        $scope.repair.vendor = "";
        $scope.repair.cost = "";
    };




        $scope.cancel = function () {
            $uibmodal.dismiss();
        };
//        $scope.answer = function(response, repair) {
//            $uibModal.hide(response);
//            homeService.updateRepair(repair);
//            homeService.updateCustomer(repair);
//            partsService.updatePart(repair.parts);
//            vehicleService.updateVehicle(repair);
//
//        };

        $scope.edit = function(size, repair) {
            console.log("open me a modal", repair);
            $scope.repair = repair;

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './assets/views/templates/editRepair.html',
                controller: 'HomeController',
                size: size,
                keyboard: true,
                backdrop: 'static'
                //resolve: {
                //    repair : function() { return $scope.repair; }
                //}
            });
        };


        $scope.getRepairs();


}]);

