import { createStore } from 'vuex'

export default createStore({
  state: {
    isMobile: false,
    isLoading: false,
  },
  mutations: {
    setIsMobile(state , payload ){ state.isMobile = payload },
    setIsLoading(state , payload ){ state.isLoading = payload },
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
