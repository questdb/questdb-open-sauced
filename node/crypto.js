const axios = require("axios")
const net = require("net")

const questdbClient = new net.Socket()

const HOST = "localhost"
const PORT = 9009

async function main() {
  await questdbClient.connect(PORT, HOST)

  async function getBinanceData() {
    const { data } = await axios.get(
      "https://api.binance.us/api/v3/avgPrice?symbol=BTCUSD",
    )
    const row = `crypto,currency=BTC,exchange=Binance price=${data.price}`
    console.log(`[INFO] sending '${row}'`)
    await questdbClient.write(`${row}\n`)
    
    setTimeout(getBinanceData, 1000)
  }

  async function getGeminiData() {
    const { data } = await axios.get("https://api.gemini.com/v1/pricefeed")
    const { price } = data.find((i) => i.pair === "BTCUSD")
    const row = `crypto,currency=BTC,exchange=Gemini price=${price}`
    console.log(`[INFO] sending '${row}'`)
    await questdbClient.write(`${row}\n`)

    setTimeout(getGeminiData, 1000)
  }

  getBinanceData()
  getGeminiData()
}

main()