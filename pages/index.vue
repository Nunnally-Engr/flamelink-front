<template>
  <v-layout>
    <v-flex 
      xs12
      sm8 
      offset-sm3>
      <div class="myblogs">
        <div 
          v-for="myblog in myblogs" 
          :key="myblog.id" 
          class="card_container">
          <MyBlog :myblog="myblog" />
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import MyBlog from '~/components/MyBlog.vue'
import { orderby } from '~/utils/format'

export default {
  components: {
    MyBlog
  },
  async asyncData({ app }) {
    try {
      
      // TODO: 
      const myblogs = await require(process.env.JSON_PATH)
      if (myblogs) {
        console.log('ブログのデータあるよ♪')
        console.log(myblogs)
      }

      // 降順に並び替えて戻す
      return { myblogs: orderby(myblogs, 'date', false) }

    } catch (err) {
      console.log(err)
      return { myblogs: [] }
    }
  }
}
</script>
