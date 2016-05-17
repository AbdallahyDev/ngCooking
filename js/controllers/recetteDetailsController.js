/**
 * Created by ab on 27/04/2016.
 */
app.controller('recettesDetailsController', ['$scope', '$http', '$cookies', 'NgCookingFactories', function ($scope, $http, $cookies, NgCookingFactories) {

    $scope.recDetail = {};
    $scope.sortedRecettes = [];
    $scope.recette = [];
    $scope.user = {};
    $scope.nbrComment = 5;
    $scope.comment = {};
    NgCookingFactories.getRecettes().then(function (data) {
        $scope.recettes = data;
        $scope.sortRecettes();
        $scope.getReceete();

    }).catch(function () {
        $scope.error = 'unable to get the recette list';
    });
    NgCookingFactories.getCommunaute().then(function (data) {
        $scope.communautes = data;

    }).catch(function () {
        $scope.error = 'unable to get the communaute list';
    });
    $scope.getReceete = function () {
        var id = $cookies.get('currentRecetteId');
        for (i = 0; i < $scope.sortedRecettes.length; i++) {
            if (($scope.sortedRecettes[i].id) === id) {
                $scope.recDetail = $scope.sortedRecettes[i];
            }
        }
    };
    $scope.sortRecettes = function () {
        var notesSum = 0;
        var i, j, k;
        var recette = {};
        for (i = 0; i < $scope.recettes.length; i++) {
            recette = {};
            notesSum = 0;
            var stars = [];
            recette.name = $scope.recettes[i].name;
            recette.picture = $scope.recettes[i].picture;
            recette.date = new Date().toUTCString();
            recette.calories = $scope.recettes[i].calories;
            recette.creatorId = $scope.recettes[i].creatorId;
            recette.id = $scope.recettes[i].id;
            recette.comments = $scope.recettes[i].comments;
            recette.ingredients = $scope.recettes[i].ingredients;
            recette.preparation = $scope.recettes[i].preparation;
            if (($scope.recettes[i].comments != null)) {
                for (j = 0; j < $scope.recettes[i].comments.length; j++) {
                    notesSum += $scope.recettes[i].comments[j].mark;
                }
                recette.notes = (notesSum / ( $scope.recettes[i].comments.length));
                recette.nbrHearts = Math.round(recette.notes);
                for (k = 0; k < recette.nbrHearts; k++) {
                    stars[k] = "star";
                }
            } else {
                recette.notes = 0;
                recette.nbrHearts = 0;
            }
            recette.stars = stars;
            $scope.sortedRecettes[i] = recette;
        }
    }
    $scope.getUserById = function (id) {
        if ($scope.communautes !== undefined) {
            for (i = 0; i < $scope.communautes.length; i++) {
                if (($scope.communautes[i].id) === id) {
                    $scope.user = $scope.communautes[i];
                }
            }
        }
        return $scope.user;
    }
    $scope.post = function () {
        alert("votre commentaire a été bien pris en compte!")
        window.location.reload();
    }
    $scope.getBestRecettes = function () {
        var tab = [];
        var k = 0;
        var cpt = 0;
        for (i = 0; i < $scope.sortedRecettes.length; i++) {
            for (j = 0; j < $scope.sortedRecettes[i].ingredients.length; j++) {
                if ($scope.recDetail.ingredients !== undefined) {
                    for (index = 0; index < $scope.recDetail.ingredients.length; index++) {
                        if ($scope.recDetail.ingredients[index] === $scope.sortedRecettes[i].ingredients[j]) {
                            cpt++;
                        }
                    }
                }
            }
            if (cpt > 2) {
                tab[k] = $scope.sortedRecettes[i];
                k++;
                cpt = 0;
            }
        }
        return tab;
    }
    $scope.getIsConnected = function () {
        return $cookies.get('isConnected');
    }
}]);