/**
 * Created by JFCS on 4/6/16.
 */

myApp.controller('HomeController',['$scope','$http', '$filter',"$uibModal",'CustomerService','HomeService','PartsService','VehicleService',
    function($scope,$http,$filter,$uibModal,CustomerService,HomeService,PartsService,VehicleService){

        var customerService = CustomerService;
        var homeService = HomeService;
        var partsService = PartsService;
        var vehicleService = VehicleService;

        // should move this to  factory and inject it. running out of time to do things the best way.
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



//Edit function - opens md dialog with the selected repair and all info related to it.
        $scope.edit = function(ev, repair) {
            console.log('hit edit');
            console.log(repair);
            repair.date_of_repair = new Date(repair.date_of_repair);
            $scope.repair = repair;
            $scope.repair.parts = $scope.parts;
            console.log($scope.repair);
            $uibModal.show({
                    templateUrl:'/assets/views/templates/editRepair.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    size: 'lg',
                    clickOutsideToClose:true,
                    //fullscreen: useFullScreen,
                })
                .then(function(answer) {
                   $scope.getRepairs();
                }, function() {
                $scope.getRepairs();
            });
            //$scope.$watch(function() {
            //    return $mdMedia('xs') || $mdMedia('sm');
            //}, function(wantsFullScreen) {
            //    $scope.customFullscreen = (wantsFullScreen === true);
            //});
        };

        $scope.hide = function() {
            $uibModal.hide();
        };
        $scope.cancel = function() {
            $uibModal.cancel();
        };
        $scope.answer = function(response, repair) {
            $uibModal.hide(response);
            homeService.updateRepair(repair);
            homeService.updateCustomer(repair);
            partsService.updatePart(repair.parts);
            vehicleService.updateVehicle(repair);

        };





        $scope.getRepairs();


}]);

