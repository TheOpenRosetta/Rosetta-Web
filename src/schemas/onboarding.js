// GET REQUESTS
const getSimilarUsers = { // params: userID
  data: [{
    firstName: "Anthony", // String.
    lastName: "Rayan", // String.
    photo: "link/to/image.png", // String.
    userID: "anthonyrayan", // String or Number. Your choice. Something like nickname. I send it if user clicks 'Claim' on profile card
    institution: 'Harvard University', // String. Not required
    tokens: {
      once: 50000, // Number (Integer)
      monthly: 10000 // Number (Integer)
    },
    papers: [{
      id: 123123123, // some paper ID. String or Number - your choice. Can we use slug instead of id?
      impactScore: 5.765, // Number (Float)
      title: 'New Measurement for Impact in Academic Research',  // String
      authors: ['Paola Peynetti Velázquez', 'G. Gupta'], // array of strings
      date: 1633974335016 // timestamp
    }] // array of objects. Max length is 3. Main papers
  }] // array of objects
};

const verifyPapers = { // params: userID
  data: {
    user: {
      firstName: "Anthony", // String
      lastName: "Rayan", // String
      photo: "link/to/image.png", // String
      userID: 'anilapandy', // String or Number. Your choice
    },
    papers: [{
      id: 123123123, // some paper ID. String or number - your choice. Can we use slug instead of id?
      impactScore: 5.765, // Number (Float)
      title: 'New Measurement for Impact in Academic Research', // String
      authors: ['Paola Peynetti Velázquez', 'G. Gupta'], // array of strings
      date: 1633974335016 // timestamp
    }] // array of objects
  }
};

const getSuggestUsers = { // params: userID
  data: [{
    firstName: "Anila", // String
    lastName: "Pandy", // String
    job: 'Founder at Gugugaga', // String is it like institution from similarUsers?
    photo: "link/to/image.png", // String
    userID: 'anilapandy' // String or Number. Your choice. I send that when user clicks to "follow"
  }] // array of objects. There is need to send param of array size
};

const getSkills = {
  data: [{
    title: 'Support Vector Machine', // String title of skill
    value: 'supportVectorMachine', // String. unique ID of skill. Type of this on your choice
  }] // array of objects
};

const getDisciplines = {
  data: [{
    title: 'Support Vector Machine', // String. title of discipline
    value: 'supportVectorMachine', // String. unique ID of discipline. Type of this on your choice
  }] // array of objects
};
// END GET REQUESTS

//  ------------------------------------------------------------------------------------------  //

// POST REQUESTS
const startInfo = {
  firstName: 'Some string',  // String
  lastName: 'Some string',  // String
  institution: 'Some string',  // String
  email: 'Some string'  // String
}; // response has userID: "anthonyrayan" // String or Number. Your choice. Something like nickname. I send it if user clicks 'Claim' on profile card

const setVerifiedUser = {
  exist: true, // boolean. User clicked 'claim' on profile card (true) or choose "I'm not in the list" (false)
  userID: 'anthonyrayan' // String or number. Not required. If user clicked 'claim' only, UserId of exist user.
}; // response is { success: true/false }

const setVerifiedPappers = {
  userID: 'anthonyrayan', // String or number. Not required. If user clicked 'claim' only, UserId of exist user.
  papers: [123123123, 123123125, 123123121] // array of choosen paper IDs
}; // response is { success: true/false }

const follow = {
  status: true, // true - follow, false - unfollow
  userID: 'anthonyrayan', // String or Number. Your choice. ID of active user
  followUserId: 'anthonyrayan' // String or Number. Your choice. ID of user from profile card
}; // response is { success: true/false }

const addAvatar = {
  userID: 'anthonyrayan', // String or number. UserId of active user
  file: {} // Photo file
}; // response is { success: true/false }

const setSkills = {
  userID: 'anthonyrayan', // String or number. Not required. If user clicked 'claim' only, UserId of exist user.
  skills: ['supportVectorMachine', 'supportVectorMachine', 'supportVectorMachine'] // array of choosen skill values
}; // response is { success: true/false }

const setDisciplines = {
  userID: 'anthonyrayan', // String or number. Not required. If user clicked 'claim' only, UserId of exist user.
  skills: ['supportVectorMachine', 'supportVectorMachine', 'supportVectorMachine'] // array of choosen skill values
}; // response is { success: true/false }
