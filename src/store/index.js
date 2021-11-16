import { createStore } from "vuex";

export const store = createStore({
    state: {
        GDP: [],
        isMobile: false,
        isLoading: false,
        isDarkMode: false,
        RMSE: null,
        MSE: null,
        MC: {
            M: '',
            C: ''
        },

        currentCountry:{
            years: [],
            realPrice: [],
            predictedPrice: []
        },
        
        compareCountry:{
            years: [],
            realPrice: [],
            predictedPrice: []
        }

    },
    mutations: {
        setIsMobile(state, payload) {
            state.isMobile = payload;
        },
        setIsLoading(state, payload) {
            state.isLoading = payload;
        },
        toggleIsDarkMode(state) {
            state.isDarkMode = !state.isDarkMode;
        },

        setPrice(state , payload){
            if ( payload.curPredict ) state.currentCountry.predictedPrice = payload.curPredict
            if ( payload.curReal ) state.currentCountry.realPrice = payload.curReal
            if ( payload.comparePredict ) state.compareCountry.predictedPrice = payload.comparePredict
            if ( payload.compareReal ) state.compareCountry.realPrice = payload.compareReal
            if ( payload.RMSE ) state.RMSE = payload.RMSE
            if ( payload.MSE ) state.MSE = payload.MSE
            if ( payload.MC ) state.MC = payload.MC
        },

        setYears(state , payload){
            console.log(payload);
            state.currentCountry.years = payload
            state.compareCountry.years = payload
        },

        clearCountryData(state){
            state.currentCountry.predictedPrice = []
            state.currentCountry.realPrice = []
            state.compareCountry.predictedPrice = []
            state.compareCountry.realPrice = []
            state.currentCountry.years = []
            state.compareCountry.years = []
            state.MSE = ''
            state.RMSE = ''
            state.MC = {
                M: '',
                C: ''
            }
        },
        clearCompareData(state){
            state.compareCountry.predictedPrice = []
            state.compareCountry.realPrice = []
            state.compareCountry.years = []
        }
    },
    getters: {},
    actions: {},
    modules: {},
});
