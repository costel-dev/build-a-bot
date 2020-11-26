import axios from "axios";

export default {
    namespaced: true,
    state: {
        cart: [],
        parts: null
      },
      mutations: {
        addRobotToCart(state, robot){
          state.cart.push(robot);
        },
        updateParts(state, parts) {
          state.parts = parts;
        }
      },
      actions: {
        getParts({commit}) {
          axios.get("/api/parts")
          .then(result => commit("updateParts", result.data))
          .catch(err => console.log(err));
        },
        addRobotToCart({commit, state}, robot) {
          /* adding robots to our cart */
          const cart = [...state.cart, robot];
          /*  */
          return axios.post("/api/cart", cart)
          .then(() => commit("addRobotToCart", robot))
          .catch(err => console.log(err));
    
        }
      },
      getters: {
        cartSaleItems(state) {
          return state.cart.filter(item => item.head.onSale);
        }
      },
      modules: {}
}