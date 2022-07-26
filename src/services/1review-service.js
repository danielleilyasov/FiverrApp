import { storageService } from './storage-service.js'
import { utilService } from './util-service.js'
import { userService } from './user-service.js'

const KEY = 'reviews_db'

_createReviews()
export const reviewService = {
  query,
  getById,
  remove,
  save,
  getEmptyGig,
  getLabels,
}

const BASE_URL =
  process.env.NODE_ENV !== 'development'
    ? '/api/gig'
    : '//localhost:3030/api/gig'

async function query(filterBy) {
  try {
    const reviews = await storageService.query(KEY)
    return Promise.resolve(reviews)
  } catch (err) {
    console.error(err)
  }
}
  

async function getById(gigId) {
  try {
    // const res = await axios.get(BASE_URL + gigId)
    const gig = await storageService.get(KEY, gigId)
    return gig
  } catch (err) {
    console.error(err)
  }

  // return axios.get(BASE_URL + gigId).then((res) => res.data);
  // return storageService.get(KEY, gigId)
}

async function remove(gigId) {
  try {
    // const res = await axios.delete(BASE_URL + gigId)
    const res = await storageService.remove(KEY, gigId)
    return res
  } catch (err) {
    console.error(err)
  }

  // return axios.delete(BASE_URL + gigId).then((res) => res.data);
  // return storageService.remove(KEY, gigId)
}

async function save(gig) {
  try {
    if (gig._id) {
      // const res = await axios.put(BASE_URL + gig._id, gig)
      const res = await storageService.put(KEY, gig)
      return res
    } else {
      // const res = await axios.post(BASE_URL, gig)
      const res = await storageService.post(KEY, gig)
      return res
    }
  } catch (err) {
    console.error(err)
  }

  // if (gig._id) {
  //   return axios.put(BASE_URL + gig._id, gig).then((res) => res.data);
  // } else {
  //   return axios.post(BASE_URL , gig).then((res) => res.data);
  // }

  // if (gig._id) return storageService.put(KEY, gig)
  // return storageService.post(KEY, gig)
}

function getEmptyGig() {
  return {}
}

function getLabels() {
  return labels
}

function _createReviews() {
  let reviews = utilService.loadFromStorage(KEY)
  if (!reviews || !reviews.length) {
    reviews = [
      {
        "id": "r101",
        "txt": "Very kind and works fast",
        "rate": 5,
        "by": {
          "_id": "u102",
          "fullname": "s",
          "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/65f00e2bbab274bead481367f563d68c-1577778632421/46c9715e-2396-47a5-997a-087adcbd3cca.jpg"
        }
      },
      {
        "id": "r102",
        "txt": "Where do I begin, from before I even placed the order he was responding to my messages and questions about his service. I got the Premium package and was 100% satisfied with everything. He started on my logo first thing and was done within a day, sounds like you would get a low quality logo but rest assured he does a fantastic job. ",
        "rate": 5,
        "by": {
          "_id": "u102",
          "fullname": "alecsel",
          "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/844f102ad220860b5f2592136d36ded7-1624188460230/dc28a0e0-e0c3-40df-9dd2-d5ea86b345fb.png"
        }
      },
      {
        "id": "r103",
        "txt": "The seller was very professional and active on my Discord server! I would recommend 10 stars if it were available! Good Job!!!!",
        "rate": 5,
        "by": {
          "_id": "u102",
          "fullname": "kunaljaiswalin",
          "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/2f79eb5e2a1460699ed3783c7a3cd6ee-1629877724451/9903802c-b7ec-45e5-8c15-7a7291b5f214.jpg"
        }
      },
      {
        "id": "r104",
        "txt": "Good job again",
        "rate": 4,
        "by": {
          "_id": "u102",
          "fullname": "pixome",
          "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/profile/photos/30607964/original/1490649898935_Profile.png"
        }
      },
      {
        "id": "r105",
        "txt": "He is the best I've ever worked with. He is very honest and willing to explore possibilities beyond the normal.",
        "rate": 5,
        "by": {
          "_id": "u102",
          "fullname": "gary2283",
          "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/a8daa215950552274f19f1b46fc55fce-1645123980155/c22d68cc-dba3-4061-801a-c33797f5b6f4.jpeg"
        }
      },
      {
        "id": "r106",
        "txt": "Great service ",
        "rate": 4,
        "by": {
          "_id": "u102",
          "fullname": "jacobam310",
          "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/296c7a0a4d21997217fb30389853bb22-1022872921654715851.750963/1766E1EA-517C-4683-8BEC-17E09B8445A1"
        }
      },
      {
        "id": "r107",
        "txt": "I'm so happy to have found",
        "rate": 4,
        "by": {
          "_id": "u102",
          "fullname": "carolinecapelle",
          "imgUrl": "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/bd35102bc1ef6e36f7c588b602cb9144-1633989234935/0705a236-1a71-4a36-b389-5e8f6f528cf3.jpg"
        }
      }
    ]
    

    utilService.saveToStorage(KEY, reviews)
  }
  return reviews
}

