/**
 * Created by ab on 27/04/2016.
 */
var serviceModule = angular.module('servicesModules', []);
serviceModule.service('NgCookingServices', ['$http', function ($http) {
    var state = "isNotConnected";
    this.getState = function () {
        return state;
    };
    this.setState = function (_state) {
        state = _state;
    };
    this.sortRecettes = function (recettes) {
        var notesSum = 0;
        var i, j, k;
        var recette = {};
        var sortedRecettes = [];
        for (i = 0; i < recettes.length; i++) {
            recette = {};
            notesSum = 0;
            var stars = [];
            recette.name = recettes[i].name;
            recette.picture = recettes[i].picture;
            recette.date = new Date().toUTCString();
            recette.calories = recettes[i].calories;
            recette.creatorId = recettes[i].creatorId;
            recette.id = recettes[i].id;
            if ((recettes[i].comments != null)) {
                for (j = 0; j < recettes[i].comments.length; j++) {
                    notesSum += recettes[i].comments[j].mark;
                }
                recette.notes = notesSum / ( recettes[i].comments.length);
                recette.nbrHearts = Math.round(recette.notes);
                for (k = 0; k < recette.nbrHearts; k++) {
                    stars[k] = "star";
                }
            } else {
                recette.notes = 0;
                recette.nbrHearts = 0;
            }
            recette.stars = stars;
            sortedRecettes[i] = recette;
        }
        return sortedRecettes;
    }
    this.getUserRecette = function (recettes, id) {
        var k = 0;
        var tab = [];
        for (var i = 0; i < recettes.length; i++) {
            if ((recettes[i].creatorId) == id) {
                tab[k] = recettes[i];
                k++;
            }
        }
        return tab;
    };

}]);

serviceModule.factory('NgCookingFactories', function ($http) {
    var getRecettesArray = function () {
        return $http.get('json/recettes.json').then(function (response) {
            return response.data;
        });
    };
    var getIngredients = function () {
        return $http.get('json/recettes.json').then(function (response) {
            return response.data;
        });
    };
    var getCommunaute = function () {
        return $http.get('json/communaute.json').then(function (response) {
            return response.data;
        });
    };
    var getIngredients = function () {
        return $http.get('json/ingredients.json').then(function (response) {
            return response.data;
        });
    };
    var getCategories = function () {
        return $http.get('json/categories.json').then(function (response) {
            return response.data;
        });
    };
    var getRecettesById = function (id) {
        tab = [];
        res = {};
        return $http.get('json/recettes.json').then(function (response) {
            tab = response.data;
        });
        for (i = 0; i < tab.length; i++) {
            if (tab[i].id === id) {
                res = tab[i];
            }
        }
        return res;
    };
    return {
        getRecettes: getRecettesArray,
        getCommunaute: getCommunaute,
        getIngredients: getIngredients,
        getCategories: getCategories,
        getRecettesById: function (id) {
            tab = [];
            res = {};
            $http.get('json/recettes.json').then(function (response) {
                tab = response.data;
            });
            for (i = 0; i < tab.length; i++) {
                if (tab[i].id === id) {
                    res = tab[i];
                }
            }
            return res;
        }
    };
});