import {App} from 'vue'
import Pagination from './index.vue'

export default {
  install: function(app: App) {
    app.component('Pagination', Pagination)
  }
}