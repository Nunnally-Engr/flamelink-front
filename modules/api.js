const axios = require('axios')

module.exports = async function asyncModule() {

  // データ取得
  const json = await axios.get(this.options.env.FLAMELINK_WEBHOOK)

  console.log('=== json ===')
  console.log(json.data.return)
  let myblogList = await json.data.return.myblogList

  // JSONファイル書出し
  this.options.build.plugins.push({
    apply (compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        // console.log('=== json: 2 ===')
        // console.log(compilation.assets.env)
        // source はバッファとなる
        compilation.assets['blog.json'] = { source: () => JSON.stringify(myblogList), size: () => 1537 }
        cb()
      })
    }
  })
}