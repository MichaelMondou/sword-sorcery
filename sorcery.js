$(function () {
    var buttons = $(".section button");
    var status = $("#status");

    var functions = {
        reset: function resetGame() {
            setLife('--');
        },
        start: function startGame() {
            setLife('3');
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

    function getLife() {
        return parseInt($(".life .value").text());
    }

    function setLife(v) {
        $(".life .value").text(v);
    }

    function endGame() {
        $('.section').hide();
        gotoSection('death');
    }

});