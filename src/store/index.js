import { createStore } from 'vuex'

export const store =  createStore({
  state: {
    GDP: [],
    isMobile: false,
    isLoading: false,
    isDarkMode: false,
  },
  mutations: {
    setIsMobile(state , payload ){ state.isMobile = payload },
    setIsLoading(state , payload ){ state.isLoading = payload },
    toggleIsDarkMode(state ){ state.isDarkMode = !state.isDarkMode }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
