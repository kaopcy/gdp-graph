import { ref, watch , computed } from "vue";
import { useRoute } from "vue-router";
import useFetch from "../composables/use-fetch";

const compareCountry = ref("");
const currentCountry = ref("");
export default () => {
    const { getAllCountryNameFlag } = useFetch();
    const route = useRoute();
    const setCompareCountry = (payload) => {
        compareCountry.value = payload;
    };

    const setCurrentCountry = (payload) => {
        currentCountry.value = payload;
    };

    const CurrentCountryFlag = computed(() =>
        currentCountry.value === "" ?
        'https://i.pinimg.com/originals/74/8c/28/748c28cd15f309f6ae3895f6828861f9.jpg' :
        getAllCountryNameFlag(currentCountry.value)[0][1]
    );
    const CompareCountryFlag = computed(() =>
        compareCountry.value === "" ?
        'https://i.pinimg.com/originals/74/8c/28/748c28cd15f309f6ae3895f6828861f9.jpg' :
        getAllCountryNameFlag(compareCountry.value)[0][1] 
    );

    watch(route, () => {
        if (route.path == "/") currentCountry.value = "";
    });

    return {
        setCurrentCountry,
        setCompareCountry,
        compareCountry,
        currentCountry,
        CurrentCountryFlag,
        CompareCountryFlag,
    };
};
