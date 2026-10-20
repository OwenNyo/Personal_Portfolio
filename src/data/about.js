// Bake photos: import images and list them in bakes. Empty list shows placeholder slots.
// import bake1 from '../assets/bakes/bake1.jpg';

export const about = {
  title: 'the guy behind the counter',
  engineer: {
    blurb:
      "went from a rogue secondary school kid who wanted to do culinary arts, to an infosec diploma, to software engineer (long story). right now i'm interning at Red Airship, learning everything from development to talking to clients, and overall cruising my way through uni and intern life.",
    wall: 'also on the wall: PSM I · OCI generative AI professional · Claude certified architect · two published papers',
  },
  offClock: {
    blurb:
      "coffee lover, weekend baker, and a gamer when the oven's off. this is the playlist that gets me through a shift, press play and judge me.",
    // Spotify share link, e.g. https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
    playlist: 'https://open.spotify.com/playlist/61bENOnOxTu5IpOvXdZ4KP',
    funFacts: [
      'enfj, which explains the amount of yapping on this page',
      'has a pet bird named soda who steals my breakfast most mornings',
      'there was a pepsi too, until he spooked and flew off. rip pepsi, the fridge is not the same',
      "collecting memories from japan like they're pokemon cards. gotta get 'em all",
    ],
  },
  teacher: {
    blurb:
      "two trimesters as a teaching assistant at SIT. could never understand why they always put our lessons at 9am, like who is even awake enough to learn. also three years as a mentor in the ICT-SMC programme. simply lovely to guide lost sheep back home when they need it the most.",
    // Click a module on the site to read its note.
    modules: [
      {
        name: 'Intro to Software Engineering',
        note: 'got assigned to help the very professor i may have ragebaited a little too much as a student.',
      },
      {
        name: 'Software Design',
        note: 'once mediated a team dispute because my professor wanted a gen z to handle it. it worked, somehow.',
      },
      {
        name: 'Human Computer Interaction',
        note: 'the module that made me care about buttons. yes, padding matters. yes, i will bring it up.',
      },
      {
        name: 'Mathematics 1',
        note: 'caught a few people submitting the exact same homework every single time i marked. zz.',
      },
      {
        name: 'Mathematics 2',
        note: 'felt more like an english class than a math class. like, who uses stats man.',
      },
    ],
  },
  baker: {
    blurb:
      "the culinary dream didn't die, it just moved to weekends. sourdough, croissants on a good week, and whatever the office asks for. a bake is just a build with a longer feedback loop.",
    bakes: [],
  },
};
