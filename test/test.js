const Light = require('../lib/light.js')

var light1 = new Light(2, [1, 1])
var light2 = new Light(4, [2, 2])

light1.start()
light2.start(0.5)

setTimeout(
  function () {
    light1.stop()
    light2.stop()
    light1.destroy()
    light2.destroy()
  }, 5000)


