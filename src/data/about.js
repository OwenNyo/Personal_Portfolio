import lemonBars from '../assets/bakes/lemon-bars.jpg';
import cookie from '../assets/bakes/cookie.jpg';
import brownies from '../assets/bakes/brownies.jpg';
import bananaBread from '../assets/bakes/banana-bread.jpg';

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
    // Tap a bake on the site for its recipe. `sugar` has the regular line and the less-sugar swap.
    bakes: [
      {
        src: lemonBars,
        alt: 'A stack of glazed lemon bars',
        name: 'lemon bars',
        time: '50 min',
        yields: '12 bars',
        ingredients: [
          '120 g butter, soft',
          '150 g plain flour',
          'pinch of salt',
          '3 eggs',
          '90 ml fresh lemon juice',
          'zest of 2 lemons',
          '25 g plain flour, for the filling',
        ],
        sugar: {
          regular: '30 g sugar in the base, 120 g in the filling, 60 g icing sugar for the glaze',
          less: '20 g sugar in the base, 80 g in the filling, 40 g icing sugar for a thin glaze',
        },
        tip: 'the extra zest does the work the sugar used to do. keep the glaze thin, it is the best bit.',
        steps: [
          'rub butter, flour, salt and the base sugar into crumbs. press into a lined 20 cm tin. bake at 175°C for 15 min.',
          'whisk eggs, filling sugar, lemon juice, zest and the 25 g flour until smooth.',
          'pour over the hot base and bake another 20 min until just set.',
          'cool fully in the tin, whisk the icing sugar with a little lemon juice, spread the glaze on top, and cut into 12.',
        ],
      },
      {
        src: cookie,
        alt: 'A chocolate chip cookie with flaky salt',
        name: 'brown butter choc chip cookies',
        time: '45 min + chill',
        yields: '8 big cookies',
        ingredients: [
          '110 g butter, browned and cooled',
          '1 egg',
          '1 tsp vanilla',
          '170 g plain flour',
          '½ tsp baking soda',
          'pinch of salt',
          '120 g dark chocolate, chopped',
          'flaky salt on top',
        ],
        sugar: {
          regular: '90 g brown sugar and 40 g white sugar',
          less: '70 g brown sugar, no white sugar, use 70% chocolate',
        },
        tip: 'brown sugar keeps them chewy. the darker chocolate and flaky salt carry the flavour.',
        steps: [
          'brown the butter in a pan until it smells nutty, then let it cool 10 min.',
          'whisk the butter with the sugar, egg and vanilla until glossy.',
          'fold in flour, baking soda and salt, then the chocolate. chill the dough 30 min.',
          'scoop big balls onto a tray, bake at 180°C for 11 to 13 min, salt while hot.',
        ],
      },
      {
        src: brownies,
        alt: 'Three fudgy brownies stacked on marble',
        name: 'fudgy brownies',
        time: '40 min',
        yields: '16 squares',
        ingredients: [
          '170 g dark chocolate',
          '150 g butter',
          '3 eggs',
          '70 g plain flour',
          '20 g cocoa powder',
          'pinch of salt',
        ],
        sugar: {
          regular: '180 g sugar',
          less: '110 g sugar, and use 70% chocolate so it stays rich',
        },
        tip: 'less sugar means a denser, more chocolatey brownie. pull them early, the middle should still wobble.',
        steps: [
          'melt chocolate and butter together, let it cool a little.',
          'whisk eggs and sugar for 2 min until pale, then stir in the chocolate.',
          'fold in flour, cocoa and salt until just combined.',
          'bake in a lined 20 cm tin at 175°C for 22 to 25 min. cool before cutting.',
        ],
      },
      {
        src: bananaBread,
        alt: 'Slices of chocolate chip banana bread on a plate',
        name: 'choc chip banana bread',
        time: '70 min',
        yields: '1 loaf',
        ingredients: [
          '3 very ripe bananas, mashed',
          '80 g butter, melted',
          '1 egg',
          '1 tsp vanilla',
          '200 g plain flour',
          '1 tsp baking soda',
          'pinch of salt',
          '80 g chocolate chips',
        ],
        sugar: {
          regular: '100 g sugar',
          less: '50 g sugar, the bananas do the rest',
        },
        tip: 'the browner the bananas, the less sugar you need. black-spotted is the goal.',
        steps: [
          'mix mashed banana, melted butter, sugar, egg and vanilla.',
          'fold in flour, baking soda and salt, then the chocolate chips.',
          'pour into a lined loaf tin and bake at 175°C for 55 to 60 min.',
          'rest 10 min in the tin, then cool on a rack before slicing.',
        ],
      },
    ],
  },
};
