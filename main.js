"use strict"
var widgetsApp = angular.module('widgetsDirectory', []);

widgetsApp.controller('MainCtrl',['$scope','$http',
    function ($scope, $http) {
        $scope.organizadores = 'https://spreadsheets.google.com/feeds/list/13DPK0RYJTqj_vSJj9y_UKEemX04Z59vB-QEddIAc5CE/1/public/values?alt=json-in-script&callback=JSON_CALLBACK';

        $http({method: 'JSONP', url: $scope.organizadores}).
            success(function(data, status) {
                $scope.status = status;



                $scope.widgets = data.feed.entry;
                console.log($scope.widgets);
            }).
            error(function(data, status) {
                $scope.events = data || 'Request failed';
                $scope.status = status;
            });

        $scope.preview = function(i){
            $scope.w = $scope.widgets[i];
            console.log($scope.w);
            $("#modalTechs").modal()
        };
        $scope.filterFunction = function(element) {
            if($scope.query && typeof $scope.query.toLowerCase === "function"){
                var name = element.gsx$nombre.$t.toLowerCase(),
                    desc = element.gsx$descripcion.$t.toLowerCase(),
                    w = $scope.query.toLowerCase();

                return (name.indexOf(w) !== -1 || desc.indexOf(w) !== -1) ? true : false;
            }else{
                if(!$scope.query){
                    return true;
                }else{
                    return false;
                }


            }

        };
    }
]);

widgetsApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
