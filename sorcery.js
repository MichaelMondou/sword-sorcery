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
        this.getDamage = function () {
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
        this.getDamage = function () {
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
        this.damage = 9;

        this.getPV = function () {
            return this.pv;
        };
        this.setPV = function (v) {
            this.pv = v;
        };
        this.getDamage = function () {
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
        this.setLife = function (v) {
            player.life = v;
        };
        this.getPV = function () {
            return player.pv;
        };
        this.setPV = function (v) {
            player.pv = v;
        };
        this.getDamage = function () {
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

    var backgrounds = [
        "url('img/intro-wallpaper.jpg')",
        "url('img/tatooine.jpg')",
        "url('img/mos-eisley.png')",
        "url('img/bar.png')",
        "url('img/han-solo.png')",
        "url('img/etoile-noire.png')",
        "url('img/crevard.png')",
        "url('img/duel.png')",
        "url('img/alliance.png')",
        "url('img/explosion.png')",
        "url('img/final.png')"
    ];

    var player = new Player();
    var inventory = new Inventory();
    var evazan = new Enemy();
    var hommeDesSables = [new HommeDesSables('life-sm-1'), new HommeDesSables('life-sm-2'), new HommeDesSables('life-sm-3')];
    var stormTroopers = [new Stormtrooper('img-st-1', 'st-1'), new Stormtrooper('img-st-2', 'st-2'), new Stormtrooper('img-st-3', 'st-3'), new Stormtrooper('img-st-4', 'st-4'), new Stormtrooper('img-st-5', 'st-5')]

    var buttons = $(".section button");
    var statusDiv = $(".status");
    var lifeDiv = $(".life");
    var pvDiv = $(".pv");
    var potionDiv = $(".potion");

    var alreadyDone = false;

    var tatooineChecked = false;
    var eisleyChecked = false;
    var etoileNoireChecked = false;
    var backgroundsDiv = $('.backgrounds');

    buttons.click(function () {
        $(this).parents("div.section:first").css('display', 'none');
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

    var refresh = function () {
        var lifes = "";
        for (var nbLife = 0; nbLife < player.getLife(); nbLife++) {
            lifes = lifes + '<img src="img/luke.png" />';
        }
        lifeDiv.find('.value').html(lifes);

        pvDiv.find('.value').html(player.getPV());

        $(".enemy-life").html("pv : " + evazan.getPV());

        for (var i = 0; i < hommeDesSables.length; i++) {
            var classe = "." + hommeDesSables[i].getClass();
            $(classe).html("pv : " + hommeDesSables[i].getPV());
        }

        for (var x = 0; x < stormTroopers.length; x++) {
            var classes = "." + stormTroopers[x].getScoreClass();
            $(classes).html("pv : " + stormTroopers[x].getPV());
        }

        var cptDead = 0;
        for (var y = 0; y < stormTroopers.length; y++) {
            if (stormTroopers[y].isDead())
                cptDead++;
        }

        if (cptDead == 5) {
            $(".section").hide();
            goToSection('findLeia');
            alreadyDone = true;
            console.log('passe ici');
            functions.resetStormTroopers();
        }

        if (inventory.getPotion().nb > 0) {
            potionDiv.find('.value').html(inventory.getPotion().nb);
            potionDiv.css('display', 'inline-block');
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
            $('body').css("background-image", backgrounds[0]);
            nextBackground = 1;
            statusDiv.hide();
            refresh();
        },
        returnCheckpoint : function () {
            player.setLife(0);
            player.setPV(0);
            inventory.setNbPotion(0);
            $('body').css("background-image", backgrounds[0]);
        },
        start: function startGame() {
            player.setLife(3);
            player.setPV(100);
            statusDiv.show();
            refresh();
        },
        resetEvazan : function() {
          evazan.setPV(250);
          refresh();
        },
        resetSandMans : function () {
          for(var i = 0; i < hommeDesSables; i ++) {
              hommeDesSables[i].setPV(500);
          }
        },
        resetStormTroopers : function() {
            for (var i = 0 ; i < stormTroopers.length ; i++) {
                stormTroopers[i].setPV(100);
            }
        },
        changeBackground: function changeBackground() {
            $('body').css("background-image", backgrounds[nextBackground]);
            nextBackground++;
        },
        setDeathBackground: function setDeathBackground() {
            $('body').css("background-image", backgrounds[0]);
            nextBackground = 1;
        },
        changeStatusColorToBlack: function changeStatusColorToBlack() {
            $('.status').css("color", "black");
        },
        changeStatusColorToWhite: function changeStatusColorToWhite() {
            $('.status').css("color", "white");
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
        fight: function () {
            //perte des pdv du evazan
            if (evazan.getPV() - player.getDamage() <= 0) {
                endFightBar();
                functions.resetEvazan();
            } else {
                evazan.setPV(evazan.getPV() - player.getDamage());
                refresh();
            }

            //perte des pdv du joueurs
            if(player.getPV() - evazan.getDamage() <= 0) {
                if(player.getLife() == 0) {
                    endGame();
                    player.setLife(3);
                    player.setPV(100);
                    inventory.setNbPotion(0);
                    console.log(player);
                    refresh();
                    console.log(player);
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
              if(player.getLife()  == 0) {
                  endGame();
                  functions.resetSandMans();
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
        combat: function () {
            //number between 0 and 4
            var rand = Math.floor(Math.random() * (4 - 0 + 1));

            while (stormTroopers[rand].getPV() == 0) {
                rand = Math.floor(Math.random() * (4 - 0 + 1));
            }

            var target = stormTroopers[rand];

            for (var i = 0; i < stormTroopers.length; i++) {
                if (player.getPV() - stormTroopers[i].getDamage() <= 0) {
                    if (player.getLife() == 0) {
                        endGame();
                        player.setLife(3);
                        player.setPV(100);
                        inventory.setNbPotion(1);
                        functions.resetStormTroopers();
                        refresh();
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
            if (target.getPV() - target.getDamage() <= 0) {
                target.setPV(0);
            } else {
                target.setPV(target.getPV() - player.getDamage());
                refresh();
            }
        }
    };

    functions['init']();

    function goToSection(key) {
        if(key == 'begin') {
            tatooineChecked = true;
        } else if(key == 'takeYourCojones') {
            eisleyChecked = true;
        } else if(key == 'leaveMosEisley') {
            etoileNoireChecked = true;
        }

        if(key == 'intro') {

            functions.reset();

            if(etoileNoireChecked) {
                var sectionEtoileNoire = $("#" + 'leaveMosEisley');
                sectionEtoileNoire.show();
                executeAction(sectionEtoileNoire);

                player.setLife(3);
                player.setPV(100);
                inventory.setNbPotion(1);
                statusDiv.show();
                refresh();

                nextBackground = 5;
                functions.changeBackground();

            } else if(eisleyChecked) {

                var sectionMosEisley = $("#" + 'takeYourCojones');
                sectionMosEisley.show();
                executeAction(sectionMosEisley);

                player.setLife(3);
                player.setPV(100);
                inventory.setNbPotion(0);
                statusDiv.show();
                refresh();

                nextBackground = 2;
                functions.changeBackground();

            }else if(tatooineChecked) {
                var sectionTatooin = $("#" + 'begin');
                sectionTatooin.show();
                executeAction(sectionTatooin);

                player.setLife(3);
                player.setPV(100);
                inventory.setNbPotion(0);
                statusDiv.show();
                refresh();

                nextBackground = 1;
                functions.changeBackground();

            } else {
                var sectionDefault = $("#" + key);
                sectionDefault.show();
                executeAction(sectionDefault);
            }
        } else if(key == 'intro2') {
            var intro = $('#intro');
            intro.show();
            executeAction(intro);
        } else {
            var section = $("#" + key);
            section.show();
            executeAction(section);
        }
    }

    function executeAction(section) {
        var actions = section.find("action");
        if (actions != undefined) {
            $.each(actions, function(key, value) {
                functions[$(value).attr('name')]();
            });
        }
    }

    function endGame() {
        $('.section').hide();
        goToSection('death');
    }

    function endFightBar() {
        $('.section').hide();
        goToSection('victoryBar');
    }

    function endFightSandMans() {

    }

    function endFightStormtrooper() {

    }

});
