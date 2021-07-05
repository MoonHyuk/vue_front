import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";

const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Oxygen = () => import(/* webpackChunkName: "dashboard" */"@/pages/Oxygen.vue");
const Co2 = () => import(/* webpackChunkName: "dashboard" */"@/pages/Co2.vue");
const LongTerm = () => import("@/pages/LongTerm.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "long-term",
        name: "long-term",
        component: LongTerm,
      },
      {
        path: "co2",
        name: "co2",
        component: Co2
      },
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
