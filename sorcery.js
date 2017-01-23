$(function () {
    function Stormtrooper() {
        this.pv = 100;
        this.damage = 10;
    }

    function Player() {
        this.life = 3;
        this.pv = 100;
        this.damage = 50;

        this.getLife = function () {
            return player.life;
        };
        this.setLife = function(v) {
            player.life = v;
        };
        this.getPV = function() {
            return player.pv;
        };
        this.setPV = function(v) {
            player.pv = v;
        };
    }

    function Inventory() {
        this.potion = {
            "nb": 0,
            "value": 50
        };

        this.getPotion = function getPotion() {
            return this.potion;
        };
        this.setNbPotion = function setNbPotion(v) {
            this.potion.nb = v;
        };
    }

    var player = new Player();
    var inventory = new Inventory();

    var buttons = $(".section button");
    var lifeDiv = $(".life");
    var pvDiv = $(".pv");
    var potionDiv = $(".potion");

    buttons.click(function () {
        $(this).parents("div:first").hide();
        goToSection($(this).attr("go"));
    });

    /*potionDiv.click(function () {
        var potion = player.getPotion();
        if (potion > 0) {
            player.setPV(player.getPV() + potion.value);
            player.setPotion(potion - 1);
        } else {
            alert('Vous n\'avez plus de potion !');
        }
    });*/

    var refresh = function() {
        lifeDiv.find("span.value").html(player.getLife());
        pvDiv.find("span.value").html(player.getPV());
        potionDiv.find("span.value").html(inventory.getPotion().nb);
    };

    var functions = {
        init: function initGame() {
            $(".section").hide();
            goToSection('intro');
        },
        reset: function resetGame() {
            player.setLife(0);
            player.setPV(0);
            inventory.setNbPotion(0);
            refresh();
        },
        start: function startGame() {
            player.setLife(3);
            player.setPV(100);
            refresh();
        },
        hit: function loseOneLife() {
            var nb_lifes = player.getLife();
            if (nb_lifes - 1 == 0) {
                endGame();
            }
            player.setLife(nb_lifes - 1);
            refresh();
        }
    };

    functions['init']();

    function goToSection(key) {
        var section = $("#" + key);
        section.show();
        executeAction(section);
    }

    function executeAction(section) {
        var action = section.find("action").attr('name');
        if (action != undefined) {
            functions[action]();
        }
    }

    function endGame() {
        $('.section').hide();
        goToSection('death');
    }

});