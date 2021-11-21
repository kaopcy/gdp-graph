import { createStore } from "vuex";

export const store = createStore({
    state: {
        GDP: [],
        isMobile: false,
        isLoading: false,
        isDarkMode: false,
        

        currentCountry:{
            years: [],
            realPrice: [],
            predictedPrice: [],
            RMSE: null,
            MSE: null,
            MC: {
                M: '',
                C: ''
            },
        },
        
        compareCountry:{
            years: [],
            realPrice: [],
            predictedPrice: [],
            RMSE: null,
            MSE: null,
            MC: {
                M: '',
                C: ''
            },
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
            if ( payload.curRMSE ) state.currentCountry.RMSE = payload.curRMSE
            if ( payload.curMSE ) state.currentCountry.MSE = payload.curMSE
            if ( payload.curMC ) state.currentCountry.MC = payload.curMC

            if ( payload.comparePredict ) state.compareCountry.predictedPrice = payload.comparePredict
            if ( payload.compareReal ) state.compareCountry.realPrice = payload.compareReal
            if ( payload.compareRMSE ) state.compareCountry.RMSE = payload.compareRMSE
            if ( payload.compareMSE ) state.compareCountry.MSE = payload.compareMSE
            if ( payload.compareMC ) state.compareCountry.MC = payload.compareMC
        },

        setYears(state , payload){
            console.log(payload);
            state.currentCountry.years = payload
            state.compareCountry.years = payload
        },

        clearCountryData(state){
            state.currentCountry.predictedPrice = []
            state.currentCountry.realPrice = []
            state.currentCountry.years = []
            state.currentCountry.MSE = ''
            state.currentCountry.RMSE = ''
            state.currentCountry.MC = {
                M: '',
                C: ''
            }
        },
        clearCompareData(state){
            state.compareCountry.predictedPrice = []
            state.compareCountry.realPrice = []
            state.compareCountry.years = []
            state.compareCountry.MSE = ''
            state.compareCountry.RMSE = ''
            state.compareCountry.MC = {
                M: '',
                C: ''
            }
        }
    },
    getters: {},
    actions: {},
    modules: {},
});
