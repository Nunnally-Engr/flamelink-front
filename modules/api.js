const axios = require('axios')

module.exports = async function asyncModule() {

  // データ取得
  const json = await axios.get(this.options.env.FLAMELINK_WEBHOOK)

  console.log('=== json ===')
  console.log(json.data.myblogList)

  // JSONファイル書出し
  this.options.build.plugins.push({
    apply (compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        // source はバッファとなる
        compilation.assets['blog.json'] = { source: () => JSON.stringify(json.data.myblogList), size: () => 1537 }
        cb()
      })
    }
  })
}