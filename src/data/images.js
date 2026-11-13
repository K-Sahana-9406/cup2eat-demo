// Centralized Photography & Asset Registry for CUP2EAT
// High-resolution Unsplash editorial imagery paired with verified local client fallbacks.
// Every product and major section has a distinct photograph.

export const ASSETS = {
  logo: "/public/images/logo.png",
  logoFallback: "./public/images/logo.png",
  favicon: "/public/favicon.png",
  
  // Products
  products: {
    // 01: Regular Edible Cup 100 ML (Hot tea, chai & coffee)
    regular100ml: {
      primary: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80",
      fallback: "/public/images/client/product_100ml_regular.jpg",
      alt: "100 ML Regular Edible Cup with hot spiced chai on ceramic saucer with linen napkin"
    },
    // 02: Regular Edible Cup 150 ML (Cold coffee & shakes - 432 pack)
    cold150ml_432: {
      primary: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1000&q=80",
      fallback: "/public/images/client/product_150ml_cold_pair.jpg",
      alt: "150 ML Regular Edible Cup filled with iced cold coffee on marble surface"
    },
    // 03: Regular Edible Cup 150 ML (Cold coffee & shakes - 125 pack)
    cold150ml_125: {
      primary: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80",
      fallback: "/public/images/client/product_150ml_chocolate_shake.jpg",
      alt: "150 ML Edible Cup filled with rich blended chocolate shake and chocolate drizzle"
    },
    // 04: Chocolate-Coated Edible Cup 100 ML (200 pack)
    chocolateCoated100ml: {
      primary: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80",
      fallback: "/public/images/client/product_100ml_chocolate_coated.jpg",
      alt: "100 ML Chocolate-Coated Edible Cup with dense dark chocolate crust and espresso"
    },
    // 05: Chocolate Rim Edible Cup 100 ML (396 pack)
    chocolateRim100ml: {
      primary: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1000&q=80",
      fallback: "/public/images/client/product_100ml_chocolate_rim.jpg",
      alt: "100 ML Chocolate Rim Edible Cup with smooth chocolate band and velvety cappuccino art"
    }
  },

  // Homepage Sections
  hero: {
    primary: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1800&q=85",
    fallback: "/public/images/client/story_experience.jpg",
    alt: "Handcrafted coffee served in a warm edible waffle biscuit cup in an artisanal café setting"
  },
  brandStory: {
    primary: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=80",
    fallback: "/public/images/client/story_experience.jpg",
    alt: "Guest enjoying an edible cup beverage in a sunlit rustic café kitchen"
  },
  
  // How it works 3 steps
  howItWorks: {
    step1: {
      primary: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
      fallback: "/public/images/client/story_experience.jpg",
      alt: "Barista pouring velvety steamed milk into an edible cup"
    },
    step2: {
      primary: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80",
      fallback: "/public/images/client/story_experience.jpg",
      alt: "Customer savoring hot specialty beverage in an edible biscuit cup"
    },
    step3: {
      primary: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=80",
      fallback: "/public/images/client/product_100ml_chocolate_rim.jpg",
      alt: "Taking a crisp, delicious bite of the edible cup dessert"
    }
  },

  // Collections
  collections: {
    hot: {
      primary: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80",
      alt: "Warm tea and artisanal pour-over coffee experience in edible cups"
    },
    cold: {
      primary: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80",
      alt: "Chilled iced latte and thick frappe shakes in 150 ML edible cups"
    }
  },

  // B2B & Hospitality Venues
  businessVenues: {
    cafes: {
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
      title: "Artisanal Cafés",
      desc: "Turn your signature espresso and cappuccino into an unforgettable edible dessert."
    },
    coffeeShops: {
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80",
      title: "Specialty Coffee Shops",
      desc: "Stand out on social media and give patrons an experience worth posting."
    },
    teaShops: {
      image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=900&q=80",
      title: "Chai & Tea Lounges",
      desc: "Serve authentic Elaichi and ginger chai in crisp edible cups that match the flavor."
    },
    restaurants: {
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      title: "Fine Dine & Bistro",
      desc: "Elevate after-dinner digestifs, affogatos, and gourmet hot chocolate presentations."
    },
    hotels: {
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
      title: "Luxury Hotels & Resorts",
      desc: "Welcome VIP guests with a signature beverage in an edible luxury cup."
    },
    dessert: {
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=900&q=80",
      title: "Dessert Parlours",
      desc: "Combine gelato, mousse, and shakes inside edible biscuit cups for dual pleasure."
    },
    catering: {
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80",
      title: "Bespoke Catering",
      desc: "Zero single-use paper cups to discard — high aesthetic, effortless clean-up."
    },
    events: {
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80",
      title: "Corporate & Private Events",
      desc: "Conferences, weddings, and launch parties where every attendee talks about the cup."
    }
  },

  // Final Brand CTA
  finalCta: {
    primary: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=85",
    alt: "Fresh roasted specialty coffee beans and premium natural cocoa ingredients"
  }
};

