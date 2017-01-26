$(function () {
    function Enemy() {
        this.pv = 250;
        this.damage = 10;
        this.getPV = function () {
            return this.pv;
        };
        this.setPV = function (v) {
            this.pv = v;
        };
        this.getDamage = function() {
            return this.damage;
        };
    }

    function HommeDesSables(elemClasse) {
        this.pv = 500;
        this.class = elemClasse;
        this.damage = 40;
        this.getPV = function () {
            return this.pv;
        };
        this.setPV = function (v) {
            this.pv = v;
        };
        this.getDamage = function() {
            return this.damage;
        };
        this.getClass = function () {
          return this.class;
        };
    }

    function Stormtrooper(imgclasse, scoreclasse) {
        this.pv = 100;
        this.imgclass = imgclasse;
        this.scoreclass = scoreclasse;
        this.damage = 5;

        this.getPV = function () {
            return this.pv;
        };
        this.setPV = function (v) {
            this.pv = v;
        };
        this.getDamage = function() {
            return this.damage;
        };
        this.getClass = function () {
            return this.imgclass;
        };
        this.getScoreClass = function () {
            return this.scoreclass;
        };
        this.isDead = function () {
            return this.pv == 0;
        }
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
        this.getDamage = function() {
            return player.damage;
        };

        this.resetPv = function () {
            this.pv = 100;
        }
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
        this.increaseNbPotion = function increaseNbPotion() {
            this.potion.nb++;
        };
        this.decreaseNbPotion = function decreaseNbPotion() {
            this.potion.nb--;
        };
    }

    var player = new Player();
    var inventory = new Inventory();
    var evazan = new Enemy();
    var hommeDesSables = [new HommeDesSables('life-sm-1'), new HommeDesSables('life-sm-2'), new HommeDesSables('life-sm-3')];
    var stormTroopers = [new Stormtrooper('img-st-1','st-1'), new Stormtrooper('img-st-2','st-2'),new Stormtrooper('img-st-3','st-3'),new Stormtrooper('img-st-4','st-4'),new Stormtrooper('img-st-5','st-5')]

    var buttons = $(".section button");
    var lifeDiv = $(".life");
    var pvDiv = $(".pv");
    var potionDiv = $(".potion");

    buttons.click(function () {
        $(this).parents("div:first").hide();
        goToSection($(this).attr("go"));
    });

    potionDiv.click(function () {
        var potion = inventory.getPotion();
        if (potion.nb > 0) {
            player.setPV(player.getPV() + potion.value);
            inventory.decreaseNbPotion();
            alert('Vous avez utilisé une potion !');
        } else {
            alert('Vous n\'avez plus de potion !');
        }
        refresh();
    });

    var refresh = function() {
        lifeDiv.find("span.value").html(player.getLife());
        pvDiv.find("span.value").html(player.getPV());
        $(".enemy-life").html(evazan.getPV() + " PDV");

        for(var i = 0; i < hommeDesSables.length; i++ ) {
          var classe = "." + hommeDesSables[i].getClass();
          $(classe).html(hommeDesSables[i].getPV() + " PDV");
        }

        for(var x = 0; x < stormTroopers.length; x++ ) {
            var classes = "." + stormTroopers[x].getScoreClass();
            $(classes).html(stormTroopers[x].getPV() + " PDV");
        }

        var cptDead = 0;
        for(var y = 0; y < stormTroopers.length; y++ ) {
            if (stormTroopers[y].isDead())
                cptDead ++;
        }

        if(cptDead == 5){
            $(".section").hide();
            goToSection('findLeia');
        }

        if (inventory.getPotion().nb > 0) {
            potionDiv.find("span.value").html(inventory.getPotion().nb);
            potionDiv.show();
        } else {
            potionDiv.hide();
        }
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
        },
        potionWin: function potionWin() {
            inventory.increaseNbPotion();
            refresh();
        },
        fight : function () {
            //perte des pdv du evazan
            if(evazan.getPV() - player.getDamage() <= 0) {
                endFightBar();
            } else {
                evazan.setPV(evazan.getPV() - player.getDamage());
                refresh();
            }

            //perte des pdv du joueurs
            if(player.getPV() - evazan.getDamage() <= 0) {
                if(player.getLife() - 1 == 0) {
                    endGame();
                } else {
                    player.resetPv();
                    player.setLife(player.getLife() - 1);
                    refresh();
                }
            } else {
                player.setPV(player.getPV() - evazan.getDamage());
                refresh();
            }
        },
        hitSandMan: function () {
          //number between 0 and 2
          var rand = Math.floor(Math.random()*(2-0+1));

          var target = hommeDesSables[rand];
          //degats sur les enemis
          if(target.getPV() - target.getDamage() <= 0) {

          } else {
              target.setPV(target.getPV() - target.getDamage());
              refresh();
          }

          //perte des pdv du joueurs
          if(player.getPV() - target.getDamage() <= 0) {
              if(player.getLife() - 1 == 0) {
                  endGame();
              } else {
                  player.resetPv();
                  player.setLife(player.getLife() - 1);
                  refresh();
                  $('.section').hide();
                  goToSection('takeALook');
              }
          } else {
              player.setPV(player.getPV() - target.getDamage());
              refresh();
          }
        },

        combat : function () {
            //number between 0 and 4
            var rand = Math.floor(Math.random()*(4-0+1));

            while (stormTroopers[rand].getPV() == 0 ){
                rand = Math.floor(Math.random()*(4-0+1));
            }

            var target = stormTroopers[rand];

            for(var i = 0; i < stormTroopers.length; i ++) {
                if(player.getPV() - stormTroopers[i].getDamage() <= 0) {
                    if(player.getLife()  == 0) {
                        endGame();
                    } else {
                        player.resetPv();
                        player.setLife(player.getLife() - 1);
                        refresh();
                    }
                } else {
                    player.setPV(player.getPV() - stormTroopers[i].getDamage());
                    refresh();
                }
            }

            //degats sur les enemis
            if(target.getPV() - target.getDamage() <= 0) {
                target.setPV(0);
            } else {
                target.setPV(target.getPV() - player.getDamage());
                refresh();
            }

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

    function endFightBar(){
        $('.section').hide();
        goToSection('makeATour');
    }

    function endFightSandMans () {

    }

    function endFightStormtrooper () {

    }

});
