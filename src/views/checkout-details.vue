<template>
  <section class="order-container main-layout equal-padding" v-if="gig">
    <div class="order-box">
      <h1 class="head hh">Seller Details</h1>
      <div class="seller-detaile">
        <img :src="gig.imgs[0]" alt="" />
        <div class="rate">
          <h3>{{ gig.title }}</h3>
          <div class="stars">
            <span>&#9733;&#9733;&#9733;&#9733;&#9733; {{ gig.rate }}</span> ({{ gig.review }})
          </div>
        </div>
        <h4>Price $ {{ gig.price }}</h4>
      </div>
      <hr />
      <div class="order-details-container">
        <h1 class="hh">Order Details</h1>

        <ul class="order-features clean-list" v-for="feats in gig.orderFeats" :key="feats">
          <li>
            <i class="checkMark">
              <svg width="16" height="16" viewBox="0 0 11 9" xmins="http://www.w3.org/2000/svg" fill="#1ea968">
                <path
                  d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"
                ></path>
              </svg> </i
            >{{ feats }}
          </li>
        </ul>
      </div>
    </div>
    <div class="chckout-box">
      <div class="calc">
        <h1>Price summary</h1>
        <ul class="clean-list">
          <li>
            Subtotal<span>$ {{ gig.price }}</span>
          </li>
          <li>
            Service Fee<span>$ {{ serviceFee }}</span>
          </li>
        </ul>
      </div>
      <hr />
      <div class="total">
        <ul class="clean-list">
          <li class="thicker">
            Total<span>${{ totalPrice }}</span>
          </li>
          <li>
            Delivery Time<span>{{ gig.daysToMake }} days</span>
          </li>
        </ul>
      </div>
      <button class="side-btn" @click="addOrder">Checkout</button>
    </div>
  </section>
</template>

<script>
import { gigService } from '../services/gig-service'
import { orderService } from '../services/order-service'
import { userService } from '../services/user-service'
import { socketService } from '../services/socket.service'

// import { orderService } from '../services/order-service'
export default {
  data() {
    return {
      gig: null,
      small: false,
      sFee: null,
    }
  },

  async created() {
    //  this.$store.dispatch({ type: 'loadlogedInUser' })
    // this.$store.dispatch({ type: 'loadOrders' })
    const { gigId } = this.$route.params
    this.gig = await gigService.getById(gigId)
    // this.user =( await userService.query())[0]
    console.log('this.userrrrrrrrrrrrr', this.user)

    window.addEventListener('resize', this.changePlace)
  },
  destroyed() {
    window.removeEventListener('resize', this.changePlace)
  },
  methods: {
    async addOrder() {
      const newOrder = await orderService.getEmptyOrder()

      console.log('this.user', this.user)

      newOrder.buyerId = this.user._id
      // newOrder.buyer.memberSince= this.user.memberSince
      newOrder.sellerId = this.gig.owner._id
      newOrder.gigId = this.gig._id

      await this.$store.dispatch({ type: 'addOrder', newOrder: newOrder })
      this.$router.push(`/dashboard/${this.user._id}`)
      socketService.emit('new order', { txt: 'Got New Order', miniTxt: 'A new order is waiting in your dashboard' })

      //  this.$router.push(`/dashboard`)

      // this.$router.push(`/gig/${this.gig._id}`)
    },
  },
  computed: {
    orders() {
      return this.$store.getters.orders
    },
    totalPrice() {
      return (+this.gig.price + +this.sFee).toFixed(2)
    },
    user() {
      console.log('fffffff', this.$store.getters.user)
      return this.$store.getters.user
    },
    serviceFee() {
      this.sFee = this.gig.price * 0.03
      return this.sFee.toFixed(2)
    },
  },

  unmounted() {},
}
</script>
