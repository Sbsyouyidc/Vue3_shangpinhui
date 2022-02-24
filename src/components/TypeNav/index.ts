import TypeNav from './index.vue'
import { App } from 'vue'

export default {
  install: function(app: App) {
    app.component('TypeNav', TypeNav)
  }
}