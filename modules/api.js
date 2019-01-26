const axios = require('axios')
const express = require('express')

module.exports = async function apiModule(moduleOptions) {
  this.nuxt.hook('build:before', async ({ isStatic, isDev }) => {

    console.log(process.env.FLAMELINK_WEBHOOK)
    
    // データ取得
    const json = await axios.get(process.env.FLAMELINK_WEBHOOK)

    console.log('=== json ===')
    console.log(json.data.myblogList)

    // jsonに書き出す
    this.options.build.plugins.push({
      apply (compiler) {
        compiler.plugin('emit', (compilation, cb) => {
  
          // info 変数の内容を用いて `.nuxt/dist/info.txt' を生成する
          // source はバッファとなる
          compilation.assets['blog.json'] = { source: () => JSON.stringify(json.data.myblogList), size: () => 1537 }
          cb()
        })
      }
    })
    
    // TODO: プリフェッチを設定
    // console.log('**[generate]** add prefetch link')
    // this.options.head.link = [
    //   ...this.options.head.link,
    //   ...refsPath.map(path => ({
    //     rel: 'prefetch',
    //     href: `${this.options.build.publicPath}${path}`
    //   }))
    // ]

    // dev時はここで終了
    if (!isStatic) return

    // generate時にexpress立ててhttpでjson取得できるようにする
    this.requireModule(['@nuxtjs/axios'])
    this.nuxt.hook('build:done', generator => {
      console.log('**[generate]** opening server connection')
      const app = express()
      app.use(express.static(this.options.generate.dir))
      console.log(process.env.PORT)
      this.nuxt.hook('generate:done', () => {
        console.log('**[generate]** closing server connection')
        server.close()
      })
    })
  })
}