require('dotenv').config()
const axios = require('axios');

const lightsIDS = [1, 2]

async function controlLight(lightID, on, hue, sat, bri) {
    try {
        return await axios.put(`http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights/${lightID}/state`,
            {
                on,
                ... (hue && { hue }),
                ... (sat && { sat }),
                ... (bri && { bri })
            })
    } catch (err) {
        console.log(err)
    }
}

function controlAllLights(state) {
    lightsIDS.forEach(lightID => {
        controlLight(lightID, state)
    })
}

function setRandomColor() {
    lightsIDS.forEach(lightID => {
        const hue = Math.floor(Math.random() * 65535) + 1
        const sat = 200
        const bri = 175
        controlLight(lightID, true, hue, sat, bri)
    })
}

//controlAllLights(true)
setRandomColor()