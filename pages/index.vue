<template>
  <v-layout>
    <v-flex 
      xs12
      sm10>
      <div class="myblogs">
        <div 
          v-for="myblog in myblogs" 
          :key="myblog.id" 
          class="card_container">
          <AppArticleList :myblog="myblog" />
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import MyBlog from '~/components/MyBlog.vue'
import AppArticleList from '~/components/AppArticleList.vue'
import { orderby } from '~/utils/format'

export default {
  components: {
    MyBlog,
    AppArticleList
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
<style scoped>
.layout {
  justify-content: center;
}
</style>
