'use strict'
const Gpio = require('onoff').Gpio

const GPIOON = 0
const GPIOOFF = 1

class Light {

  constructor(pinNumber, seq = [5]) {
    this.pin = new Gpio(pinNumber, 'out')
    this.seq = seq
    this.stoplight = true
  }

  light(index = 0) {
    console.log(this)
    if (this.stoplight) return
    index = index % this.seq.length
    let sec = parseFloat(this.seq[index])
    if (Number.isNaN(sec)) {
      sec = 1
    }
    if (sec < 0.1) {
      sec = 0.1
    }
    let duration = sec * 1000
    let state = (index % 2) == 0 ? GPIOON : GPIOOFF
    this.pin.writeSync(state)
    // setTimeout creates its own scope. Therefore, 'this' in setTimeout
    // is not the scope of caller. So in ES5, we either use 'bind' or
    // a reference to 'this'.
    // In ES6, we use arrow function, in which 'this' is the scope where
    // the arrow function is created, not the scope it is running.
    setTimeout(() => { this.light(++index) }, duration)
  }

  start(delay = 0) {
    if (this.pin && Array.isArray(this.seq) && this.seq.length > 0) {
      this.stoplight = false
      setTimeout(() => { this.light() }, delay * 1000)
    }
  }

  stop() {
    if (this.pin) {
      this.stoplight = true
    }
  }

  destroy() {
    if (this.pin) {
      this.pin.unexport()
      this.pin = null
    }
  }
}

module.exports = Light

