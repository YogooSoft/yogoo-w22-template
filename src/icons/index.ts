import Vue from 'vue';
import App from "@/App.vue";
//import {App} from 'vue';
//import App from "@/App.vue";

import SvgIcon from '@/components/SvgIcon/index.vue'; // svg component


// register globally
//Vue.component('svg-icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
const YGIcons = requireAll(req)
// console.log("----------------",YGIcons);

// Object.keys(requ).forEach(key => {
//     console.log("----icon---------",requ[key as keyof typeof requ])
//     App.component(key, requ[key as keyof typeof requ])
//   })

 //export default requ;

export {YGIcons}