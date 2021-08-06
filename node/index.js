const axios = require("axios")
const net = require("net")

const questdbClient = new net.Socket()

const HOST = "localhost"
const PORT = 9009

const package = "theweeknum"

async function getPackageStats() {
  const { data } = await axios.get(
    `https://api.npms.io/v2/package/${package}`,
  )
  var version = data.collected.metadata.version
  var downloads = data.evaluation.popularity.downloadsCount
  var npm_stars = data.collected.npm.starsCount

  const row = `npm_packages,package=${package},version=${version} npm_stars=${npm_stars}i,total_downloads=${downloads}i`
  console.log(`[INFO] sending '${row}'`)
  await questdbClient.write(`${row}\n`)

  setTimeout(getPackageStats, 50000)
}

async function main() {
  await questdbClient.connect(PORT, HOST)
  getPackageStats()
}

main()
