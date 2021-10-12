// If we couldn't parse RSS on server side
const getFeedRSS = { // params: userID
  data: {
    rssLink: 'https://blog.ethereum.org/feed.xml', // Link to RSS in string format
  }
}

// If we can send JSON instead of RSS (This way is more effective)
const getFeedData = { // params: userID
  data: {
    feed: [{
       title: "Road to Devcon Meetup and Event Grants",
       description: "Community organizers are the glue that holds the Ethereum ecosystem together, and whether they’re leading large-scale events, local meetups, hackathons or seminars, we might all be wandering in the dark forest of the analog world without them. But where’s the fun in relying on chance encounters with kindred spirits identified...",
       pubDate: 1626332400000, // Number
       guid: "", // ID of post. Which is needed for opening comments page on url /{ID}/comments
       podcast: 'link/to/podcast.mp3', // Not required. String
       paper: { // Not required
         slug: "road_to_devcon", // String. Unique ID of paper which I can use in url
         authors: ['Paola Peynetti Velázquez', 'G. Gupta'], // array of strings
         title: "New Measurement for Impact in Academic Research.", // String
         description: "He option of phone and video visits has expanded access to vulnerable population during a time opportunities…", // String
         pubDate: 1626332400000, // Number
         likes: 84, // Number
         comments: 45, // Number
         value: 1984, // Number
         delta: 7, // Number
         apy: 7.5, // Number (Float). Can be negative
       }
    }] // array of objects
  }
}

const getWeeklyStats = {
  data:  {
    read: {
      total: 540, // Number
      users: [{
        userID: 124121, // Nickname or ID or slug
        photo: 'link/to/image.png', // String
      }] // array of objects. Max length is 3
    },
    investors: {
      total: 32, // Number
      users: [{
        userID: 124121, // Nickname or ID or slug
        photo: 'link/to/image.png', // String
      }] // array of objects. Max length is 3
    }
  }
}

const getBalanceStats = {
  data:  {
    balance: 10000, // Nummber
    monthlyPayment: 3000 // Number
  }
}
