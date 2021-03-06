import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../home/HomePage.vue";
import RobotBuilder from "../build/RobotBuilder.vue";
import PartInfo from "../parts/PartInfo.vue";
import BrowserParts from "../parts/BrowserParts.vue";
import RobotHeads from "../parts/RobotHeads.vue";
import RobotArms from "../parts/RobotArms.vue";
import RobotBases from "../parts/RobotBases.vue";
import RobotTorsos from "../parts/RobotTorsos.vue";
import SidebarStandard from "../sidebars/SidebarStandard.vue";
import SidebarBuild from "../sidebars/SidebarBuild.vue";
import ShoppingCart from "../cart/ShoppingCart.vue";

Vue.use(VueRouter);

const routes = [
 {
   path: "/",
   name: "Home",
   components: {
     default: HomePage,
     sidebar: SidebarStandard
   }
 },
 {
  path: "/build",
  name: "Build",
  components: {
    default: RobotBuilder,
    sidebar: SidebarBuild
  }
},
{
  path: "/parts/browse",
  name: "BrowseParts",
  component: BrowserParts,
  children: [
     {
       name: "BrowseHeads",
       path: "heads",
       component: RobotHeads
     },
     {
      name: "BrowseArms",
      path: "arms",
      component: RobotArms
    },
    {
      name: "BrowseTorsos",
      path: "torsos",
      component: RobotTorsos
    },
    {
      name: "BrowseBases",
      path: "bases",
      component: RobotBases
    },
  ]
},
{
  path: "/parts/:partType/:id",
  name: "Parts",
  component: PartInfo,
  props: true,
  /* preventing routing to an unknown url */
  beforeEnter(to, from , next) {
    const isValid = Number.isInteger(Number(to.params.id));
    next(isValid);
  }
},
{
  path: "/cart",
  name: "Cart",
  component: ShoppingCart
}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
