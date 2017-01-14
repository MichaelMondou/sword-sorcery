$(function () {
    var buttons = $(".section button");
    var status = $("#status");
    var potion = $(".potion");

    var functions = {
        reset: function resetGame() {
            setLife('--');
            setPotion('--');
        },
        start: function startGame() {
            setLife('3');
            setPotion('1');
        },
        hit: function loseOneLife() {
            var nb_lifes = getLife();

            if (nb_lifes - 1 == 0) {
                endGame();
            }

            setLife(nb_lifes - 1);
        }
    };

    $(".section").hide();

    buttons.click(function () {
        $(this).parents("div:first").hide();
        gotoSection($(this).attr("go"));
    });

    potion.click(function () {
        var potion = getPotion();
        if (!isNaN(potion)) {
            if (potion > 0) {
                setLife(getLife() + 1);
                setPotion(potion - 1);
            } else {
                alert('Vous n\'avez plus de potion !');
            }
        }
    });

    gotoSection('intro');

    function gotoSection(key) {
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
        gotoSection('death');
    }

    function getLife() {
        return parseInt($(".life .value").text());
    }

    function setLife(v) {
        $(".life .value").text(v);
    }

    function getPotion() {
        return parseInt($(".potion .value").text());
    }

    function setPotion(v) {
        $(".potion .value").text(v);
    }

});