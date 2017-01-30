$(function () {
    // Classes
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
    function Tusken(cls) {
        this.pv = 500;
        this.class = cls;
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
    function Stormtrooper(img, scoreCls) {
        this.pv = 100;
        this.imgclass = img;
        this.scoreclass = scoreCls;
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

    // Define backgrounds
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
    var backgroundsDiv = $('.backgrounds');

    var player = new Player();
    var inventory = new Inventory();
    var evazan = new Enemy();
    var tuskens = [
        new Tusken('life-sm-1'),
        new Tusken('life-sm-2'),
        new Tusken('life-sm-3')
    ];
    var stormtroopers = [
        new Stormtrooper('img-st-1', 'st-1'),
        new Stormtrooper('img-st-2', 'st-2'),
        new Stormtrooper('img-st-3', 'st-3'),
        new Stormtrooper('img-st-4', 'st-4'),
        new Stormtrooper('img-st-5', 'st-5')
    ];

    var buttons = $(".section button");
    var statusDiv = $(".status");
    var lifeDiv = $(".life");
    var pvDiv = $(".pv");
    var potionDiv = $(".potion");

    // Define checkpoints
    var tatooineChecked = false;
    var eisleyChecked = false;
    var deathStarChecked = false;

    // Init buttons behavior
    buttons.click(function () {
        $(this).parents("div.section:first").css('display', 'none');
        goToSection($(this).attr("go"));
    });

    // Init potion button behavior
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

    // Allows to refresh the display
    var refresh = function () {
        var lifes = "";
        for (var nbLife = 0; nbLife < player.getLife(); nbLife++) {
            lifes = lifes + '<img src="img/luke.png" />';
        }
        lifeDiv.find('.value').html(lifes);

        pvDiv.find('.value').html(player.getPV());

        $(".evazan-life").html("pv : " + evazan.getPV());

        for (var i = 0; i < tuskens.length; i++) {
            var tusken = "." + tuskens[i].getClass();
            $(tusken).html("pv : " + tuskens[i].getPV());
        }

        for (var x = 0; x < stormtroopers.length; x++) {
            var stormtrooper = "." + stormtroopers[x].getScoreClass();
            $(stormtrooper).html("pv : " + stormtroopers[x].getPV());
        }

        var cptDead = 0;
        for (var y = 0; y < stormtroopers.length; y++) {
            if (stormtroopers[y].isDead())
                cptDead++;
        }
        if (cptDead == 5) {
            $(".section").hide();
            goToSection('findLeia');
            functions.resetStormtroopers();
        }

        // Check if potion needs to display or not
        if (inventory.getPotion().nb > 0) {
            potionDiv.find('.value').html(inventory.getPotion().nb);
            potionDiv.css('display', 'inline-block');
        } else {
            potionDiv.hide();
        }
    };

    // Library of functions enable to access in html
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
        resetTuskens : function () {
          for(var i = 0; i < tuskens; i ++) {
              tuskens[i].setPV(500);
          }
        },
        resetStormtroopers : function() {
            for (var i = 0 ; i < stormtroopers.length ; i++) {
                stormtroopers[i].setPV(100);
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
        hit: function hit() {
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
        evazanCombat: function () {
            // Hit Evazan
            if (evazan.getPV() - player.getDamage() <= 0) {
                endFightBar();
                functions.resetEvazan();
            } else {
                evazan.setPV(evazan.getPV() - player.getDamage());
                refresh();
            }

            // Hit player
            if(player.getPV() - evazan.getDamage() <= 0) {
                if(player.getLife() == 0) {
                    endGame();
                    player.setLife(3);
                    player.setPV(100);
                    inventory.setNbPotion(0);
                    refresh();
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
        tuskensCombat: function () {
          //number between 0 and 2
          var rand = Math.floor(Math.random()*(2-0+1));

          var target = tuskens[rand];
          // Hit tuskens
          if(target.getPV() - target.getDamage() > 0) {
              target.setPV(target.getPV() - target.getDamage());
              refresh();
          }

          // Hit player
          if(player.getPV() - target.getDamage() <= 0) {
              if(player.getLife()  == 0) {
                  endGame();
                  functions.resetTuskens();
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
        stormtroopersCombat: function () {
            //number between 0 and 4
            var rand = Math.floor(Math.random() * (4 - 0 + 1));

            while (stormtroopers[rand].getPV() == 0) {
                rand = Math.floor(Math.random() * (4 - 0 + 1));
            }

            var target = stormtroopers[rand];

            // Hit player
            for (var i = 0; i < stormtroopers.length; i++) {
                if (player.getPV() - stormtroopers[i].getDamage() <= 0) {
                    if (player.getLife() == 0) {
                        endGame();
                        player.setLife(3);
                        player.setPV(100);
                        inventory.setNbPotion(1);
                        functions.resetStormtroopers();
                        refresh();
                    } else {
                        player.resetPv();
                        player.setLife(player.getLife() - 1);
                        refresh();
                    }
                } else {
                    player.setPV(player.getPV() - stormtroopers[i].getDamage());
                    refresh();
                }
            }

            // Hit stormtroopers
            if (target.getPV() - target.getDamage() <= 0) {
                target.setPV(0);
            } else {
                target.setPV(target.getPV() - player.getDamage());
                refresh();
            }
        }
    };
    function goToSection(key) {
        // Enable checkpoints
        if(key == 'begin') {
            tatooineChecked = true;
        } else if(key == 'takeYourCojones') {
            eisleyChecked = true;
        } else if(key == 'leaveMosEisley') {
            deathStarChecked = true;
        }

        if(key == 'intro') {
            functions.reset();
            if(deathStarChecked) {
                var deathStarSection = $("#" + 'leaveMosEisley');
                deathStarSection.show();
                executeAction(deathStarSection);

                player.setLife(3);
                player.setPV(100);
                statusDiv.show();
                refresh();

                nextBackground = 5;
                functions.changeBackground();

            } else if(eisleyChecked) {

                var mosEisleySection = $("#" + 'takeYourCojones');
                mosEisleySection.show();
                executeAction(mosEisleySection);

                player.setLife(3);
                player.setPV(100);
                inventory.setNbPotion(0);
                statusDiv.show();
                refresh();

                nextBackground = 2;
                functions.changeBackground();

            }else if(tatooineChecked) {
                var tatooineSection = $("#" + 'begin');
                tatooineSection.show();
                executeAction(tatooineSection);

                player.setLife(3);
                player.setPV(100);
                inventory.setNbPotion(0);
                statusDiv.show();
                refresh();

                nextBackground = 1;
                functions.changeBackground();

            } else {
                var defaultSection = $("#" + key);
                defaultSection.show();
                executeAction(defaultSection);
            }
        } else if(key == 'backToIntro') {
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

    functions['init']();

});
