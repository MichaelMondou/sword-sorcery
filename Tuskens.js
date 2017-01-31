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
