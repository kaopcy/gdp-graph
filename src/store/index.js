import { createStore } from 'vuex'

export const store =  createStore({
  state: {
    GDP: [],
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
