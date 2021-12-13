<template>
  <div>
    <button class="btn btn-primary" @click="setRandomColor">
      Random color
    </button>
    <button class="btn btn-primary" @click="playRainbow">Rainbow</button>
    <button class="btn btn-danger" @click="stop = true">Stop animation</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lightsIDS: [1, 2],
      stop: false,
      rainbowHue: 0,
    }
  },
  methods: {
    async controlLight(lightID, on, hue, sat, bri) {
      try {
        return await this.axios.put(
          `http://${process.env.VUE_APP_HUE_BRIDGE_IP}/api/${process.env.VUE_APP_HUE_USERNAME}/lights/${lightID}/state`,
          {
            on,
            ...(hue && { hue }),
            ...(sat && { sat }),
            ...(bri && { bri }),
          }
        )
      } catch (err) {
        console.log(err)
      }
    },

    controlAllLights(state) {
      this.lightsIDS.forEach((lightID) => {
        this.controlLight(lightID, state)
      })
    },

    setRandomColor() {
      this.lightsIDS.forEach((lightID) => {
        const hue = Math.floor(Math.random() * 65535) + 1
        const sat = 200
        const bri = 175
        this.controlLight(lightID, true, hue, sat, bri)
      })
    },

    async playRainbow() {
      this.stop = false
      const sat = 255
      const bri = 255
      while (!this.stop) {
        if (this.rainbowHue < 65535) {
          this.lightsIDS.forEach((lightID) => {
            this.controlLight(lightID, true, this.rainbowHue, sat, bri)
          })
          this.rainbowHue += 500
          await new Promise((resolve) => setTimeout(resolve, 500))
          console.log(this.stop)
        } else {
          this.rainbowHue = 0
        }
      }
    },
  },
}
// TODO : dispay the state and the color of each light => http://192.168.1.89/api/Vh1L2FGD49gH7tflufC2R36GQq3kGq0XZJE5zbpe
// TODO : add a control panel to control all lights
</script>
