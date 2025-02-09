import Axios from 'axios'

import { storageService } from '../async-storage.service'
import { makeId } from '../utils'

import { httpService } from '../http.service'

const STORAGE_KEY = 'item'
const PAGE_SIZE = 6

const axios = Axios.create({ withCredentials: true })

export const itemService = {
  query,
  getById,
  save,
  remove,
  getItems,
  getEmptyItem,
  getDefaultFilter,
  getMaxPage,
}
window.cs = itemService

async function query(filterBy = { txt: '', category: 'all' }) {
  var items = getItems()
  const { txt, category } = filterBy

  if (txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    items = items.filter(
      (item) =>
        regex.test(item.name) || regex.test(item.num) || regex.test(item.entry)
    )
  }

  if (category !== 'all') {
    items = items.filter((item) => item.category === category)
  }

  return items
}

function getById(itemId) {
  return storageService.get(STORAGE_KEY, itemId)
}

async function remove(itemId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, itemId)
}

async function save(item) {
  var savedItem
  if (item._id) {
    const itemToSave = {
      _id: item._id,
      cover: item.cover,
      preview: item.preview,
      price: item.price,
      stockQuantity: item.stockQuantity,
      title: item.title,
      types: item.types,
    }
    savedItem = await storageService.put(STORAGE_KEY, itemToSave)
  } else {
    const itemToSave = {
      cover:
        'https://res.cloudinary.com/dnxi70mfs/image/upload/v1729010361/cropping_j9auka.webp',
      preview: item.preview,
      price: item.price,
      stockQuantity: item.stockQuantity,
      title: item.title,
      types: [],
    }
    savedItem = await storageService.post(STORAGE_KEY, itemToSave)
  }
  return savedItem
}

function getEmptyItem() {
  return {
    _id: '679b7b4f1d197b22a0ae6f00',
    label: '',
    price: '',
    categories: [],
    description: '',
    images: [],
  }
}
function getItems() {
  const items = [
    {
      _id: 1,
      num: 1,
      name: 'Bulbasaur',
      types: ['grass', 'poison'],
      entry:
        'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.',
      sprites: {
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/f/fb/0001Bulbasaur.png/500px-0001Bulbasaur.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/9/9f/HOME0001.png/400px-HOME0001.png',

        pixel: 'https://art.pixilart.com/20dc875b721fed5.png',
      },
      category: 'kanto',
    },
    {
      _id: 2,
      num: 2,
      name: 'Ivysaur',
      types: ['grass', 'poison'],
      entry:
        'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.',
      sprites: {
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/8/81/0002Ivysaur.png/500px-0002Ivysaur.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/8/8f/HOME0002.png/400px-HOME0002.png',

        pixel:
          'https://archives.bulbagarden.net/media/upload/a/a0/Spr_2g_002.png',
      },
      category: 'kanto',
    },
    {
      _id: 3,
      num: 3,
      name: 'Venusaur',
      types: ['grass', 'poison'],
      entry:
        'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.',
      sprites: {
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/6/6b/0003Venusaur.png/500px-0003Venusaur.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/3/38/HOME0003.png/400px-HOME0003.png',

        pixel:
          'https://archives.bulbagarden.net/media/upload/6/64/Spr_2g_003.png',
      },
      category: 'kanto',
    },
    {
      _id: 4,
      num: 4,
      name: 'Charmander',
      types: ['fire'],
      entry:
        'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.',
      sprites: {
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/2/27/0004Charmander.png/500px-0004Charmander.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/7/7d/HOME0004.png/400px-HOME0004.png',
        pixel:
          'https://archives.bulbagarden.net/media/upload/6/6f/Spr_2g_004.png',
      },
      category: 'kanto',
    },
    {
      _id: 5,
      num: 5,
      name: 'Charmeleon',
      types: ['fire'],
      entry:
        'When it swings its burning tail, it elevates the temperature to unbearably high levels.',
      sprites: {
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/0/05/0005Charmeleon.png/500px-0005Charmeleon.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/9/94/HOME0005.png/400px-HOME0005.png',

        pixel:
          'https://archives.bulbagarden.net/media/upload/f/f3/Spr_2g_005.png',
      },
      category: 'kanto',
    },
    {
      _id: 6,
      num: 6,
      name: 'Charizard',
      types: ['fire', 'flying'],
      entry:
        'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.',
      sprites: {
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/3/38/0006Charizard.png/500px-0006Charizard.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/c/cd/HOME0006.png/400px-HOME0006.png',

        pixel:
          'https://archives.bulbagarden.net/media/upload/c/cc/Spr_2g_006.png',
      },
      category: 'kanto',
    },
    {
      _id: 7,
      num: 7,
      name: 'Squirtle',
      types: ['water'],
      entry:
        'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.',
      sprites: {
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/5/54/0007Squirtle.png/500px-0007Squirtle.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/a/a9/HOME0007.png/400px-HOME0007.png',

        pixel:
          'https://archives.bulbagarden.net/media/upload/3/34/Spr_2g_007.png',
      },
      category: 'kanto',
    },
    {
      _id: 8,
      num: 8,
      name: 'Wartortle',
      types: ['water'],
      entry:
        'It is recognized by its tail that is large and covered with a rich, thick fur. The tail becomes increasingly deeper in color as Wartortle ages.',
      sprites: {
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/0/0f/0008Wartortle.png/500px-0008Wartortle.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/b/be/HOME0008.png/400px-HOME0008.png',

        pixel:
          'https://archives.bulbagarden.net/media/upload/6/63/Spr_2g_008.png',
      },
      category: 'kanto',
    },
    {
      _id: 9,
      num: 9,
      name: 'Blastoise',
      types: ['water'],
      entry:
        'It deliberately makes itself heavy so it can withstand the recoil of the water jets it fires.',
      sprites: {
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/0/0a/0009Blastoise.png/500px-0009Blastoise.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/7/7a/HOME0009.png/400px-HOME0009.png',

        pixel:
          'https://archives.bulbagarden.net/media/upload/c/c8/Spr_2g_009.png',
      },
      category: 'kanto',
    },
    {
      _id: 10,
      num: 152,
      name: 'Chikorita',
      types: ['grass'],
      entry:
        'A sweet aroma gently wafts from the leaf on its head. It is docile and loves to soak up sun rays.',
      sprites: {
        pixel:
          'https://archives.bulbagarden.net/media/upload/2/2c/Spr_2g_152.png',
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/b/bc/0152Chikorita.png/500px-0152Chikorita.png',
        home: 'https://archives.bulbagarden.net/media/upload/d/d6/HOME0152.png',
      },
      category: 'johto',
    },
    {
      _id: 11,
      num: 153,
      name: 'Bayleef',
      types: ['grass'],
      entry:
        'The scent of spices comes from around its neck. Somehow, sniffing it makes you want to fight.',
      sprites: {
        pixel:
          'https://archives.bulbagarden.net/media/upload/0/0d/Spr_2g_153.png',
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/8/85/0153Bayleef.png/500px-0153Bayleef.png',
        home: 'https://archives.bulbagarden.net/media/upload/7/7d/HOME0153.png',
      },
      category: 'johto',
    },
    {
      _id: 12,
      num: 154,
      name: 'Meganium',
      types: ['grass'],
      entry:
        'The fragrance of Meganium’s flower soothes and calms emotions. It is said to have the ability to revive dead plants and flowers.',
      sprites: {
        pixel:
          'https://archives.bulbagarden.net/media/upload/b/b6/Spr_2g_154.png',
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/8/8b/0154Meganium.png/500px-0154Meganium.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/0/0d/HOME0154.png/400px-HOME0154.png',
      },
      category: 'johto',
    },
    {
      _id: 13,
      num: 155,
      name: 'Cyndaquil',
      types: ['fire'],
      entry:
        'It has a timid nature. If it is startled, the flames on its back burn more vigorously.',
      sprites: {
        pixel:
          'https://archives.bulbagarden.net/media/upload/5/56/Spr_2g_155.png',
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/9/97/0155Cyndaquil.png/500px-0155Cyndaquil.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/5/5f/HOME0156.png/400px-HOME0156.png',
      },
      category: 'johto',
    },
    {
      _id: 14,
      num: 156,
      name: 'Quilava',
      types: ['fire'],
      entry:
        'It intimidates foes with the heat of its flames. The fire burns more strongly when it readies to fight.',
      sprites: {
        pixel:
          'https://archives.bulbagarden.net/media/upload/2/2f/Spr_2g_156.png',
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/3/3f/0156Quilava.png/500px-0156Quilava.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/5/5f/HOME0156.png/400px-HOME0156.png',
      },
      category: 'johto',
    },
    {
      _id: 15,
      num: 157,
      name: 'Typhlosion',
      types: ['fire'],
      entry:
        'It attacks using blasts of fire. It creates heat shimmers with intense fire to hide itself.',
      sprites: {
        pixel:
          'https://archives.bulbagarden.net/media/upload/b/b9/Spr_2g_157.png',
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/1/13/0157Typhlosion.png/500px-0157Typhlosion.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/c/cf/HOME0157.png/400px-HOME0157.png',
      },
      category: 'johto',
    },
    {
      _id: 16,
      num: 158,
      name: 'Totodile',
      types: ['water'],
      entry:
        'It is small but rough and tough. It won’t hesitate to take a bite out of anything that moves.',
      sprites: {
        pixel:
          'https://archives.bulbagarden.net/media/upload/7/72/Spr_2g_158.png',
        artwork:
          'https://archives.bulbagarden.net/media/upload/f/f7/0158Totodile.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/0/0c/HOME0158.png/400px-HOME0158.png',
      },
      category: 'johto',
    },
    {
      _id: 17,
      num: 159,
      name: 'Croconaw',
      types: ['water'],
      entry:
        'It opens its huge jaws wide when attacking. If it loses any fangs while biting, they grow back in quickly.',
      sprites: {
        pixel:
          'https://archives.bulbagarden.net/media/upload/d/d4/Spr_2g_159.png',
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/0/03/0159Croconaw.png/500px-0159Croconaw.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/1/18/HOME0159.png/400px-HOME0159.png',
      },
      category: 'johto',
    },
    {
      _id: 18,
      num: 160,
      name: 'Feraligatr',
      types: ['water'],
      entry:
        'It usually moves slowly, but it goes at blinding speed when it attacks and bites prey.',
      sprites: {
        pixel:
          'https://archives.bulbagarden.net/media/upload/4/4d/Spr_2g_160.png',
        artwork:
          'https://archives.bulbagarden.net/media/upload/thumb/2/29/0160Feraligatr.png/500px-0160Feraligatr.png',
        home: 'https://archives.bulbagarden.net/media/upload/thumb/b/b9/HOME0160.png/400px-HOME0160.png',
      },
      category: 'johto',
    },
  ]

  return items
}

function getDefaultFilter() {
  return {
    txt: '',
    categories: [],
    pageIdx: 0,
    soldBy: '',
  }
}

async function getMaxPage(filterBy) {
  try {
    var items = await query({ ...filterBy, isAll: true })
    let maxPage = items.length / PAGE_SIZE
    maxPage = Math.ceil(maxPage)
    return maxPage
  } catch (err) {
    console.log(err)
  }
}
