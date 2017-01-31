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
