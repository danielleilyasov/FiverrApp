import { storageService } from "./storage-service.js"
import { utilService } from './util-service.js'


export const orderService = {
    query,
    // getEmptyOrder
    saveOrder
   
}
const KEY='orders_db'

_createOrders()

async function saveOrder(order) {
  console.log('order', order)
  const res = await storageService.post(KEY, order)
  return res
  
}


// function getEmptyOrder() {
//     return Promise.resolve({
//         _id: o1225,
//         createdAt: 9898989,
//         buyer: "mini-user",
//         seller: mini-user,
//         gig: {
//           _id: i101,
//           name: 'Design Logo',
//           price: 20
//         },
//         status: 'pending'
//     })
// }

  async function query() {
    try {
       
      const orders = await storageService.query(KEY)
      return Promise.resolve(orders)
    } catch (err) {
      console.error(err)
    }
  }

  
function _createOrders() {
  let orders = utilService.loadFromStorage(KEY) || []
  console.log('firstOrders',orders)
      
  //       {
  //           "_id": "o1225",
  //           "createdAt": new Date(),
  //           "buyer": "mini-user",
  //           "seller": "mini-user",
  //           "gig": {
  //             "_id": "i101",
  //             "name": "Design Logo",
  //             "price": 20
  //           },
  //           "status": "pending"
  //         }
  //   utilService.saveToStorage(KEY, orders)
  // }
  return orders
}
