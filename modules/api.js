const axios = require('axios')
const express = require('express')

module.exports = async function apiModule(moduleOptions) {
  this.nuxt.hook('build:before', async ({ isStatic, isDev }) => {

    console.log(process.env.FLAMELINK_WEBHOOK)
    
    // データ取得
    const json = await axios.get(this.options.env.FLAMELINK_WEBHOOK)

    console.log('=== json ===')
    console.log(json.data.myblogList)

    // jsonに書き出す
    this.options.build.plugins.push({
      apply (compiler) {
        compiler.plugin('emit', (compilation, cb) => {
          // source はバッファとなる
          compilation.assets['blog.json'] = { source: () => JSON.stringify(json.data.myblogList), size: () => 1537 }
          cb()
        })
      }
    })
  })
}