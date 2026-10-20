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
      "two trimesters as a teaching assistant at SIT and three years as a mentor in the ICT-SMC programme. turns out explaining recursion at 9am is the fastest way to actually understand it, and watching someone's build go green for the first time never gets old. if you're a junior reading this, my inbox is open.",
    stats: [
      { value: '150+', label: 'students guided' },
      { value: '6', label: 'modules covered' },
      { value: '3 yrs', label: 'mentoring' },
    ],
  },
  baker: {
    blurb:
      "the culinary dream didn't die, it just moved to weekends. sourdough, croissants on a good week, and whatever the office asks for. a bake is just a build with a longer feedback loop.",
    bakes: [],
  },
};
