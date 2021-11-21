import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
    faSearch,
    faBars,
    faArrowRight,
    faExchangeAlt,
    faChevronCircleDown,
    faDollarSign,
    faClock,
    faChartBar,
    faTable,
    faBackward,
    faExternalLinkAlt,
    faCalendarAlt,
    faLink,
    faUnlink,
    faBrush
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons'
import {faLine} from '@fortawesome/free-brands-svg-icons'
import {faInstagramSquare} from '@fortawesome/free-brands-svg-icons'
library.add(
    faSearch,
    faBars,
    faArrowRight,
    faExchangeAlt,
    faChevronCircleDown,
    faDollarSign,
    faClock,
    faChartBar,
    faTable,
    faBackward,
    faExternalLinkAlt,
    faCalendarAlt,
    faFacebookSquare,
    faLine,
    faInstagramSquare,
    faLink,
    faUnlink,
    faBrush
);

createApp(App)
    .use(router)
    .component("fa", FontAwesomeIcon)
    .mount("#app");
