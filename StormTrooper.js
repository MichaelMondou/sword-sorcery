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
