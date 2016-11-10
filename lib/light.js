'use strict'
const Gpio = require('onoff').Gpio

const GPIOON = 0
const GPIOOFF = 1

class Light {

  constructor(pinNumber, seq) {
    this.pin = new Gpio(pinNumber, 'out')
    this.seq = seq
    this.stoplight = true
  }

  light(index) {
    if (this.stoplight) return
    if (typeof (index) == 'undefined') index = 0
    index = index % this.seq.length
    var sec = parseFloat(this.seq[index])
    if (Number.isNaN(sec)) {
      sec = 1
    }
    if (sec < 0.1) {
      sec = 0.1
    }
    var duration = sec * 1000
    var state = (index % 2) == 0 ? GPIOON : GPIOOFF
    this.pin.writeSync(state)
    setTimeout(this.light.bind(this, ++index), duration)
  }

  start(delay) {
    if (this.pin && Array.isArray(this.seq) && this.seq.length > 0) {
      this.stoplight = false
      setTimeout(this.light, delay * 1000)
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
