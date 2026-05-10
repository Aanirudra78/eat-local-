// data.js - Shared Logic for Eat Local

const CONFIG = {
    BASE_DISTANCE: 4.0, // 4 km tak fix
    BASE_PRICE: 50.0,   // ₹50 fix
    EXTRA_KM_RATE: 10.0 // ₹10 per extra km
};

/**
 * Haversine Formula: Do coordinates ke beech ki seedhi distance (KM mein)
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Pricing Logic: Distance ke hisaab se delivery charge
 */
function calculateDeliveryCharge(distance) {
    if (distance <= CONFIG.BASE_DISTANCE) {
        return CONFIG.BASE_PRICE;
    } else {
        const extraDistance = distance - CONFIG.BASE_DISTANCE;
        return CONFIG.BASE_PRICE + (Math.ceil(extraDistance) * CONFIG.EXTRA_KM_RATE);
    }
}

// Global Export (Browser friendly)
window.EatLocalLogic = { calculateDistance, calculateDeliveryCharge, CONFIG };

const restaurants = [
  {
    id: "urban-brew-cafe",
    name: "Urban Brew Cafe",
    tagline: "Specialty coffee & all-day bites",
    cuisine: "Cafe · Continental · Beverages",
    area: "Napier Town",
    city: "Jabalpur",
    timing: "9:00 AM – 11:00 PM",
    phone: "919876543210",
    rating: 4.5,
    reviews: 218,
    deliveryTime: "20–35 min",
    priceForTwo: 400,
    isOpen: true,
    filterTags: ["cafe", "continental"],
    image: "https://picsum.photos/seed/cafe1/600/400",
    heroImage: "https://picsum.photos/seed/cafehero/1200/600",
    menu: [
      {
        category: "Coffee & Beverages",
        items: [
          { id: "ub1", name: "Cold Coffee", price: 129, description: "Rich cold brew blended with fresh cream and a hint of vanilla.", veg: true, image: "https://picsum.photos/seed/coffee1/200/200", badge: "Bestseller" },
          { id: "ub2", name: "Masala Chai", price: 49, description: "Aromatic ginger-cardamom chai brewed strong.", veg: true, image: "https://picsum.photos/seed/tea1/200/200", badge: "" },
          { id: "ub3", name: "Mango Smoothie", price: 149, description: "Fresh Alphonso mango blended with yogurt and honey.", veg: true, image: "https://picsum.photos/seed/mango1/200/200", badge: "Seasonal" },
          { id: "ub7", name: "Espresso", price: 79, description: "Strong and bold single shot espresso.", veg: true, image: "https://picsum.photos/seed/espresso1/200/200", badge: "" },
          { id: "ub8", name: "Cappuccino", price: 119, description: "Creamy cappuccino with foam art.", veg: true, image: "https://picsum.photos/seed/cappuccino1/200/200", badge: "" }
        ]
      },
      {
        category: "Snacks & Bites",
        items: [
          { id: "ub4", name: "Paneer Grilled Sandwich", price: 129, description: "Herbed paneer with capsicum, onion, and cheese. Toasted golden.", veg: true, image: "https://picsum.photos/seed/sandwich1/200/200", badge: "Bestseller" },
          { id: "ub5", name: "Chicken Club Sandwich", price: 179, description: "Grilled chicken breast, lettuce, tomato, mayo.", veg: false, image: "https://picsum.photos/seed/chickensandwich/200/200", badge: "" },
          { id: "ub9", name: "French Fries", price: 99, description: "Crispy golden fries with seasoning.", veg: true, image: "https://picsum.photos/seed/fries1/200/200", badge: "" }
        ]
      },
      {
        category: "Desserts",
        items: [
          { id: "ub6", name: "Brownie with Ice Cream", price: 159, description: "Warm dark chocolate brownie topped with vanilla ice cream.", veg: true, image: "https://picsum.photos/seed/brownie1/200/200", badge: "Must Try" },
          { id: "ub10", name: "Cheesecake", price: 189, description: "Creamy New York style cheesecake.", veg: true, image: "https://picsum.photos/seed/cheesecake1/200/200", badge: "" }
        ]
      }
    ]
  },
  {
    id: "sagar-fast-food",
    name: "Sagar Fast Food Corner",
    tagline: "North Indian & Chinese since 2003",
    cuisine: "North Indian · Chinese · Street Food",
    area: "Chhatarpur Road",
    city: "Jabalpur",
    timing: "10:00 AM – 10:30 PM",
    phone: "919876543211",
    rating: 4.3,
    reviews: 156,
    deliveryTime: "25–40 min",
    priceForTwo: 300,
    isOpen: true,
    filterTags: ["north-indian", "chinese"],
    image: "https://picsum.photos/seed/indianfood/600/400",
    heroImage: "https://picsum.photos/seed/indianhero/1200/600",
    menu: [
      {
        category: "North Indian",
        items: [
          { id: "sf1", name: "Paneer Butter Masala", price: 180, description: "Creamy tomato-based gravy with soft paneer cubes.", veg: true, image: "https://picsum.photos/seed/paneer1/200/200", badge: "Bestseller" },
          { id: "sf2", name: "Dal Makhani", price: 140, description: "Slow-cooked black dal with butter and cream.", veg: true, image: "https://picsum.photos/seed/dal1/200/200", badge: "" },
          { id: "sf3", name: "Chicken Curry", price: 220, description: "Homestyle spiced chicken in robust onion-tomato gravy.", veg: false, image: "https://picsum.photos/seed/curry1/200/200", badge: "" },
          { id: "sf8", name: "Dal Tadka", price: 120, description: "Yellow dal tempered with garlic and spices.", veg: true, image: "https://picsum.photos/seed/dal2/200/200", badge: "" }
        ]
      },
      {
        category: "Chinese",
        items: [
          { id: "sf4", name: "Veg Hakka Noodles", price: 130, description: "Tossed with seasonal vegetables and soy sauce.", veg: true, image: "https://picsum.photos/seed/noodles1/200/200", badge: "" },
          { id: "sf5", name: "Chicken Fried Rice", price: 160, description: "Wok-tossed rice with egg and chicken.", veg: false, image: "https://picsum.photos/seed/friedrice1/200/200", badge: "" },
          { id: "sf9", name: "Veg Manchurian", price: 150, description: "Crispy veggie balls in tangy sauce.", veg: true, image: "https://picsum.photos/seed/manchurian1/200/200", badge: "" }
        ]
      },
      {
        category: "Breads & Rice",
        items: [
          { id: "sf6", name: "Butter Naan", price: 35, description: "Soft tandoor naan brushed with butter.", veg: true, image: "https://picsum.photos/seed/naan1/200/200", badge: "" },
          { id: "sf7", name: "Steamed Rice", price: 60, description: "Perfectly cooked basmati rice.", veg: true, image: "https://picsum.photos/seed/rice1/200/200", badge: "" },
          { id: "sf10", name: "Jeera Rice", price: 90, description: "Fragrant basmati rice with cumin.", veg: true, image: "https://picsum.photos/seed/jeerarice/200/200", badge: "" }
        ]
      }
    ]
  },
  {
    id: "spice-garden",
    name: "Spice Garden Restaurant",
    tagline: "Authentic flavors, family recipes",
    cuisine: "South Indian · Tiffin · Thali",
    area: "Vijay Nagar",
    city: "Jabalpur",
    timing: "7:00 AM – 10:00 PM",
    phone: "919876543212",
    rating: 4.6,
    reviews: 342,
    deliveryTime: "15–30 min",
    priceForTwo: 250,
    isOpen: false,
    filterTags: ["south-indian"],
    image: "https://picsum.photos/seed/southindian/600/400",
    heroImage: "https://picsum.photos/seed/southhero/1200/600",
    menu: [
      {
        category: "Breakfast",
        items: [
          { id: "sg1", name: "Masala Dosa", price: 80, description: "Crispy rice crepe filled with spiced potato masala.", veg: true, image: "https://picsum.photos/seed/dosa1/200/200", badge: "Bestseller" },
          { id: "sg2", name: "Idli Sambar (4 pcs)", price: 60, description: "Soft steamed rice cakes with piping hot sambar.", veg: true, image: "https://picsum.photos/seed/idli1/200/200", badge: "" },
          { id: "sg3", name: "Medu Vada (2 pcs)", price: 55, description: "Crispy lentil doughnuts.", veg: true, image: "https://picsum.photos/seed/vada1/200/200", badge: "" }
        ]
      },
      {
        category: "Thali",
        items: [
          { id: "sg4", name: "Full Veg Thali", price: 180, description: "Rice, 2 sabzi, dal, roti, papad, salad, pickle, dessert.", veg: true, image: "https://picsum.photos/seed/thali1/200/200", badge: "Value" }
        ]
      },
      {
        category: "South Indian Mains",
        items: [
          { id: "sg5", name: "Curd Rice", price: 90, description: "Tempered curd rice with mustard and curry leaves.", veg: true, image: "https://picsum.photos/seed/curdrice/200/200", badge: "" },
          { id: "sg6", name: "Rasam Rice", price: 100, description: "Tangy peppery rasam with soft rice.", veg: true, image: "https://picsum.photos/seed/rasam1/200/200", badge: "" }
        ]
      }
    ]
  },
  {
    id: "royal-kitchen",
    name: "Royal Kitchen",
    tagline: "Fine dining with royal touch",
    cuisine: "North Indian · Mughlai · Kebabs",
    area: "Civil Lines",
    city: "Jabalpur",
    timing: "12:00 PM – 11:00 PM",
    phone: "919876543213",
    rating: 4.7,
    reviews: 289,
    deliveryTime: "30–45 min",
    priceForTwo: 600,
    isOpen: true,
    filterTags: ["north-indian", "mughlai"],
    image: "https://picsum.photos/seed/royal1/600/400",
    heroImage: "https://picsum.photos/seed/royalhero/1200/600",
    menu: [
      {
        category: "Starters",
        items: [
          { id: "rk1", name: "Chicken Tikka", price: 280, description: "Tender chicken pieces marinated in yogurt and spices.", veg: false, image: "https://picsum.photos/seed/tikka1/200/200", badge: "Bestseller" },
          { id: "rk2", name: "Paneer Tikka", price: 220, description: "Cubes of paneer grilled to perfection.", veg: true, image: "https://picsum.photos/seed/paneertikka/200/200", badge: "" },
          { id: "rk3", name: "Seekh Kebab", price: 250, description: "Minced meat grilled on skewers.", veg: false, image: "https://picsum.photos/seed/kebab1/200/200", badge: "" }
        ]
      },
      {
        category: "Main Course",
        items: [
          { id: "rk4", name: "Chicken Biryani", price: 280, description: "Aromatic basmati rice with spiced chicken.", veg: false, image: "https://picsum.photos/seed/biryani1/200/200", badge: "Must Try" },
          { id: "rk5", name: "Mutton Rogan Josh", price: 350, description: "Slow-cooked mutton in rich gravy.", veg: false, image: "https://picsum.photos/seed/mutton1/200/200", badge: "" },
          { id: "rk6", name: "Dal Bukhara", price: 180, description: "Black lentils cooked overnight.", veg: true, image: "https://picsum.photos/seed/dalbukhara/200/200", badge: "" }
        ]
      },
      {
        category: "Desserts",
        items: [
          { id: "rk7", name: "Gulab Jamun", price: 80, description: "Deep fried dumplings in sugar syrup.", veg: true, image: "https://picsum.photos/seed/gulabjamun/200/200", badge: "" },
          { id: "rk8", name: "Kulfi", price: 100, description: "Traditional Indian ice cream.", veg: true, image: "https://picsum.photos/seed/kulfi1/200/200", badge: "Seasonal" }
        ]
      }
    ]
  },
  {
    id: "pizza-paradise",
    name: "Pizza Paradise",
    tagline: "Authentic Italian pizzas & more",
    cuisine: "Italian · Pizza · Pasta",
    area: "Madhapur",
    city: "Jabalpur",
    timing: "11:00 AM – 10:00 PM",
    phone: "919876543214",
    rating: 4.4,
    reviews: 198,
    deliveryTime: "25–35 min",
    priceForTwo: 500,
    isOpen: true,
    filterTags: ["italian", "pizza"],
    image: "https://picsum.photos/seed/pizza1/600/400",
    heroImage: "https://picsum.photos/seed/pizzahero/1200/600",
    menu: [
      {
        category: "Pizzas",
        items: [
          { id: "pp1", name: "Margherita", price: 299, description: "Classic tomato, mozzarella, and basil.", veg: true, image: "https://picsum.photos/seed/margherita/200/200", badge: "Bestseller" },
          { id: "pp2", name: "Pepperoni", price: 399, description: "Loaded with pepperoni and extra cheese.", veg: false, image: "https://picsum.photos/seed/pepperoni/200/200", badge: "" },
          { id: "pp3", name: "Veggie Supreme", price: 349, description: "Loaded with fresh vegetables.", veg: true, image: "https://picsum.photos/seed/veggiepizza/200/200", badge: "" }
        ]
      },
      {
        category: "Pasta",
        items: [
          { id: "pp4", name: "Arrabiata Pasta", price: 249, description: "Pasta in spicy tomato sauce.", veg: true, image: "https://picsum.photos/seed/pasta1/200/200", badge: "" },
          { id: "pp5", name: "Chicken Alfredo", price: 329, description: "Creamy pasta with grilled chicken.", veg: false, image: "https://picsum.photos/seed/alfredo/200/200", badge: "" }
        ]
      },
      {
        category: "Beverages",
        items: [
          { id: "pp6", name: "Lemonade", price: 79, description: "Fresh squeezed lemonade.", veg: true, image: "https://picsum.photos/seed/lemonade1/200/200", badge: "" },
          { id: "pp7", name: "Chocolate Shake", price: 149, description: "Rich and thick chocolate shake.", veg: true, image: "https://picsum.photos/seed/chocolateshake/200/200", badge: "" }
        ]
      }
    ]
  },
  {
    id: "baba-sweets",
    name: "Baba Sweets & Snacks",
    tagline: "Traditional sweets since 1975",
    cuisine: "Sweets · Snacks · Fast Food",
    area: "Garha",
    city: "Jabalpur",
    timing: "8:00 AM – 9:00 PM",
    phone: "919876543215",
    rating: 4.5,
    reviews: 412,
    deliveryTime: "20–30 min",
    priceForTwo: 200,
    isOpen: true,
    filterTags: ["sweets", "north-indian"],
    image: "https://picsum.photos/seed/sweets1/600/400",
    heroImage: "https://picsum.photos/seed/sweetshero/1200/600",
    menu: [
      {
        category: "Sweets",
        items: [
          { id: "bs1", name: "Gulab Jamun (4 pcs)", price: 60, description: "Soft doughnuts in rose syrup.", veg: true, image: "https://picsum.photos/seed/gulab2/200/200", badge: "Bestseller" },
          { id: "bs2", name: "Rasgulla (6 pcs)", price: 70, description: "Soft cottage cheese balls.", veg: true, image: "https://picsum.photos/seed/rasgulla/200/200", badge: "" },
          { id: "bs3", name: "Besan Ladoo", price: 80, description: "Gram flour sweets with nuts.", veg: true, image: "https://picsum.photos/seed/ladoo1/200/200", badge: "" }
        ]
      },
      {
        category: "Namkeen",
        items: [
          { id: "bs4", name: "Mix Namkeen", price: 100, description: "Assorted crunchy snacks.", veg: true, image: "https://picsum.photos/seed/namkeen1/200/200", badge: "" },
          { id: "bs5", name: "Aloo Bhujia", price: 80, description: "Crispy potato noodles.", veg: true, image: "https://picsum.photos/seed/aloo/200/200", badge: "" }
        ]
      },
      {
        category: "Fast Food",
        items: [
          { id: "bs6", name: "Samosa (2 pcs)", price: 40, description: "Crispy pastry with spiced potatoes.", veg: true, image: "https://picsum.photos/seed/samosa1/200/200", badge: "" },
          { id: "bs7", name: "Kachori", price: 35, description: "Puffed dough with lentil filling.", veg: true, image: "https://picsum.photos/seed/kachori1/200/200", badge: "" }
        ]
      }
    ]
  },
  {
    id: "sharma-dhaba",
    name: "Sharma Ji Dhaba",
    tagline: "Authentic road-side flavors",
    cuisine: "North Indian · Street Food",
    area: "Godhani",
    city: "Jabalpur",
    timing: "7:00 AM – 11:00 PM",
    phone: "919876543216",
    rating: 4.2,
    reviews: 167,
    deliveryTime: "15–25 min",
    priceForTwo: 150,
    isOpen: true,
    filterTags: ["north-indian", "street-food"],
    image: "https://picsum.photos/seed/dhaba1/600/400",
    heroImage: "https://picsum.photos/seed/dhabahero/1200/600",
    menu: [
      {
        category: "Curries",
        items: [
          { id: "sd1", name: "Dal Fry", price: 80, description: "Yellow dal with tadka.", veg: true, image: "https://picsum.photos/seed/dalfry/200/200", badge: "" },
          { id: "sd2", name: "Paneer Bhuna", price: 140, description: "Dry paneer with onion gravy.", veg: true, image: "https://picsum.photos/seed/paneerbhuna/200/200", badge: "" },
          { id: "sd3", name: "Egg Curry", price: 100, description: "Boiled eggs in tomato gravy.", veg: false, image: "https://picsum.photos/seed/eggcurry/200/200", badge: "" }
        ]
      },
      {
        category: "Breads",
        items: [
          { id: "sd4", name: "Plain Roti", price: 10, description: "Whole wheat flatbread.", veg: true, image: "https://picsum.photos/seed/roti1/200/200", badge: "" },
          { id: "sd5", name: "Lachha Paratha", price: 25, description: "Layered flaky paratha.", veg: true, image: "https://picsum.photos/seed/paratha1/200/200", badge: "" },
          { id: "sd6", name: "Butter Roti", price: 15, description: "Roti with butter.", veg: true, image: "https://picsum.photos/seed/butterroti/200/200", badge: "" }
        ]
      },
      {
        category: "Rice",
        items: [
          { id: "sd7", name: "Plain Rice", price: 40, description: "Steamed basmati rice.", veg: true, image: "https://picsum.photos/seed/plainrice/200/200", badge: "" },
          { id: "sd8", name: "Jeera Rice", price: 70, description: "Rice with cumin tempering.", veg: true, image: "https://picsum.photos/seed/jeera2/200/200", badge: "" }
        ]
      }
    ]
  },
  {
    id: "mandi-house",
    name: "Mandi House",
    tagline: "Original Hyderabadi Dum Biryani",
    cuisine: "Mandi · Biryani · Mughlai",
    area: "Shivpuri",
    city: "Jabalpur",
    timing: "12:00 PM – 10:30 PM",
    phone: "919876543217",
    rating: 4.6,
    reviews: 276,
    deliveryTime: "35–45 min",
    priceForTwo: 450,
    isOpen: true,
    filterTags: ["mughlai", "biryani"],
    image: "https://picsum.photos/seed/mandi1/600/400",
    heroImage: "https://picsum.photos/seed/mandihero/1200/600",
    menu: [
      {
        category: "Mandi",
        items: [
          { id: "mh1", name: "Chicken Mandi", price: 350, description: "Chicken cooked in aromatic rice and spices.", veg: false, image: "https://picsum.photos/seed/chickenmandi/200/200", badge: "Bestseller" },
          { id: "mh2", name: "Mutton Mandi", price: 450, description: "Tender mutton with flavorful rice.", veg: false, image: "https://picsum.photos/seed/muttonmandi/200/200", badge: "" },
          { id: "mh3", name: "Fish Mandi", price: 400, description: "Fresh fish cooked in traditional style.", veg: false, image: "https://picsum.photos/seed/fishmandi/200/200", badge: "" }
        ]
      },
      {
        category: "Biryani",
        items: [
          { id: "mh4", name: "Hyderabadi Biryani", price: 320, description: "Famous aromatic rice with chicken.", veg: false, image: "https://picsum.photos/seed/hydbiryani/200/200", badge: "Must Try" },
          { id: "mh5", name: "Veg Biryani", price: 220, description: "Mixed vegetables in aromatic rice.", veg: true, image: "https://picsum.photos/seed/vegbiryani/200/200", badge: "" }
        ]
      },
      {
        category: "Curries",
        items: [
          { id: "mh6", name: "Chicken Salan", price: 200, description: "Chicken in peanut-based gravy.", veg: false, image: "https://picsum.photos/seed/chickensalan/200/200", badge: "" },
          { id: "mh7", name: "Dum Ka Chicken", price: 250, description: "Slow-cooked chicken in spices.", veg: false, image: "https://picsum.photos/seed/dumka/200/200", badge: "" }
        ]
      }
    ]
  }
];