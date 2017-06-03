function Dice(num) {
  this.values = num;
}

Dice.prototype.roll = function() {
  return Math.ceil(
    Math.random() * this.values
  );
}
