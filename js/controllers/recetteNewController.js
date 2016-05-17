/**
 * Created by ab on 27/04/2016.
 */
app.controller('recettesNewController', function ($scope, $http, $cookies, NgCookingFactories) {

    $scope.i;
    $scope.newRec = {};
    $scope.newRec.ings = [];
    $scope.ingsNumber = 0;
    $scope.newRec.picture;
    $scope.newRec.calories = 0;
    $scope.itemsIng = [];
    $scope.isValid;
    //getting the categories list 
    NgCookingFactories.getCategories().then(function (data) {
        $scope.categories = data;
    }).catch(function () {
        $scope.error = 'unable to get the recette list';
    });

    $scope.addToIng = function () {
        if ($scope.newRec.ing !== undefined) {
            if ($scope.newRec.ings.length > 0) {
                $scope.newRec.ings[$scope.newRec.ings.length] = $scope.newRec.ing;
            } else {
                $scope.newRec.ings[0] = $scope.newRec.ing;
            }
        }
        $scope.ingsNumber = $scope.newRec.ings.length;
        $scope.updateCaloriesValue();
    };
    $scope.updateCaloriesValue = function () {
        $scope.newRec.calories = 0;
        for (i = 0; i < $scope.newRec.ings.length; i++) {
            $scope.newRec.calories += $scope.newRec.ings[i].calories;
        }
    }
    $scope.removeFromIng = function (ing) {
        var index = $scope.newRec.ings.indexOf(ing);
        if (index > -1) {
            $scope.newRec.ings.splice(index, 1);
        }
        $scope.ingsNumber = $scope.newRec.ings.length;
        $scope.updateCaloriesValue();
    };
    $scope.addNewRec = function () {
        if ($scope.ingsNumber >= 3) {
            $scope.isValid = true;
            $scope.isInvalid = false;
        } else {
            alert("Il faut choisir au moins trois ingrédients pour votre recette");
            $scope.isValid = false;
            $scope.isInvalid = true;
        }
    }

    $scope.fillIng = function () {
        if ($scope.ingredients !== undefined) {
            var k = 0;
            $scope.itemsIng = [];
            for (j = 0; j < $scope.ingredients.length; j++) {
                if ($scope.newRec.category !== undefined) {
                    if ($scope.newRec.category.id === $scope.ingredients[j].category) {
                        $scope.itemsIng[k] = $scope.ingredients[j];
                        k++;
                    }
                } else {
                    $scope.itemsIng[k] = $scope.ingredients[j];
                    k++;
                }
            }
        }
    };

    NgCookingFactories.getIngredients().then(function (data) {
        $scope.ingredients = data;

    }).catch(function () {
        $scope.error = 'unable to get the recette list';
    });
    $scope.fillCategoryTab = function () {
        for (i = 0; i < $scope.ingredients.length; i++) {
            //$scope.itemsCategory[i]
        }
    };
    //method to upload file which contains the picture path  
    $scope.uploadFile = function (event) {
        var files = event.target.files;
        if (files[0] !== undefined) {
            $scope.newRec.picture = event.target.files[0].name;
        }
    };
});