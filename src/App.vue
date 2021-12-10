<template>
  <div>
    <button @click="setRandomColor">Click ME</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lightsIDS: [1, 2],
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
  },
}
</script>
