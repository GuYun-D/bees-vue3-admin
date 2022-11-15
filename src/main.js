import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './styles/index.scss'
import installSvgIcon from './icons'
import './permission'
import i18n from './i18n'
import installGlobalData from './global'
import initDirectives from './directives'

const app = createApp(App)
installElementPlus(app)
installSvgIcon(app)
installGlobalData(app)
initDirectives(app)
app.use(store).use(router).use(i18n).mount('#app')
