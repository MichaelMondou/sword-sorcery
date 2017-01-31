function Inventory() {
    this.potion = {
        "nb": 0,
        "value": 50
    };

    this.getPotion = function () {
        return this.potion;
    };
    this.setNbPotion = function (v) {
        this.potion.nb = v;
    };
    this.increaseNbPotion = function () {
        this.potion.nb++;
    };
    this.decreaseNbPotion = function () {
        this.potion.nb--;
    };
}
