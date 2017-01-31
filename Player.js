function Player() {
    this.life = 3;
    this.pv = 100;
    this.damage = 50;

    this.getLife = function () {
        return this.life;
    };
    this.setLife = function (v) {
        this.life = v;
    };
    this.getPV = function () {
        return this.pv;
    };
    this.setPV = function (v) {
        this.pv = v;
    };
    this.getDamage = function () {
        return this.damage;
    };

    this.resetPv = function () {
        this.pv = 100;
    }
}
