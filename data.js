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
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
    heroImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
    menu: [
      {
        category: "Coffee & Beverages",
        items: [
          { id: "ub1", name: "Cold Coffee", price: 129, description: "Rich cold brew blended with fresh cream and a hint of vanilla. Served chilled.", veg: true, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&q=80", badge: "Bestseller" },
          { id: "ub2", name: "Masala Chai", price: 49, description: "Aromatic ginger-cardamom chai brewed strong.", veg: true, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=200&q=80", badge: "" },
          { id: "ub3", name: "Mango Smoothie", price: 149, description: "Fresh Alphonso mango blended with yogurt and honey.", veg: true, image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=200&q=80", badge: "Seasonal" },
          { id: "ub7", name: "Espresso", price: 79, description: "Strong and bold single shot espresso.", veg: true, image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=200&q=80", badge: "" },
          { id: "ub8", name: "Cappuccino", price: 119, description: "Creamy cappuccino with foam art.", veg: true, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Snacks & Bites",
        items: [
          { id: "ub4", name: "Paneer Grilled Sandwich", price: 129, description: "Herbed paneer with capsicum, onion, and cheese. Toasted golden.", veg: true, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&q=80", badge: "Bestseller" },
          { id: "ub5", name: "Chicken Club Sandwich", price: 179, description: "Grilled chicken breast, lettuce, tomato, mayo. Double-decker.", veg: false, image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=200&q=80", badge: "" },
          { id: "ub9", name: "French Fries", price: 99, description: "Crispy golden fries with seasoning.", veg: true, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Desserts",
        items: [
          { id: "ub6", name: "Brownie with Ice Cream", price: 159, description: "Warm dark chocolate brownie topped with vanilla ice cream.", veg: true, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&q=80", badge: "Must Try" },
          { id: "ub10", name: "Cheesecake", price: 189, description: "Creamy New York style cheesecake.", veg: true, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=200&q=80", badge: "" }
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
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    menu: [
      {
        category: "North Indian",
        items: [
          { id: "sf1", name: "Paneer Butter Masala", price: 180, description: "Creamy tomato-based gravy with soft paneer cubes.", veg: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&q=80", badge: "Bestseller" },
          { id: "sf2", name: "Dal Makhani", price: 140, description: "Slow-cooked black dal with butter and cream.", veg: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&q=80", badge: "" },
          { id: "sf3", name: "Chicken Curry", price: 220, description: "Homestyle spiced chicken in robust onion-tomato gravy.", veg: false, image: "https://images.unsplash.com/photo-1603894584373-5ac82b241413?w=200&q=80", badge: "" },
          { id: "sf8", name: "Dal Tadka", price: 120, description: "Yellow dal tempered with garlic and spices.", veg: true, image: "https://images.unsplash.com/photo-1516714819001-8ee7a13b71be?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Chinese",
        items: [
          { id: "sf4", name: "Veg Hakka Noodles", price: 130, description: "Tossed with seasonal vegetables and soy sauce. Indo-Chinese style.", veg: true, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&q=80", badge: "" },
          { id: "sf5", name: "Chicken Fried Rice", price: 160, description: "Wok-tossed rice with egg and chicken. Smoky, satisfying.", veg: false, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&q=80", badge: "" },
          { id: "sf9", name: "Veg Manchurian", price: 150, description: "Crispy veggie balls in tangy sauce.", veg: true, image: "https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Breads & Rice",
        items: [
          { id: "sf6", name: "Butter Naan", price: 35, description: "Soft tandoor naan brushed with butter.", veg: true, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&q=80", badge: "" },
          { id: "sf7", name: "Steamed Rice", price: 60, description: "Perfectly cooked basmati rice.", veg: true, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&q=80", badge: "" },
          { id: "sf10", name: "Jeera Rice", price: 90, description: "Fragrant basmati rice with cumin.", veg: true, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=200&q=80", badge: "" }
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
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80",
    heroImage: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=1200&q=80",
    menu: [
      {
        category: "Breakfast",
        items: [
          { id: "sg1", name: "Masala Dosa", price: 80, description: "Crispy rice crepe filled with spiced potato masala. Served with sambar and chutney.", veg: true, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200&q=80", badge: "Bestseller" },
          { id: "sg2", name: "Idli Sambar (4 pcs)", price: 60, description: "Soft steamed rice cakes with piping hot sambar and coconut chutney.", veg: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&q=80", badge: "" },
          { id: "sg3", name: "Medu Vada (2 pcs)", price: 55, description: "Crispy lentil doughnuts. Perfect with chutney.", veg: true, image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Thali",
        items: [
          { id: "sg4", name: "Full Veg Thali", price: 180, description: "Rice, 2 sabzi, dal, roti, papad, salad, pickle, dessert. Unlimited refills.", veg: true, image: "https://images.unsplash.com/photo-1631295868223-63265b40d9c9?w=200&q=80", badge: "Value" }
        ]
      },
      {
        category: "South Indian Mains",
        items: [
          { id: "sg5", name: "Curd Rice", price: 90, description: "Tempered curd rice with mustard, curry leaves, pomegranate. Cooling and light.", veg: true, image: "https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=200&q=80", badge: "" },
          { id: "sg6", name: "Rasam Rice", price: 100, description: "Tangy peppery rasam with soft rice. Soul food.", veg: true, image: "https://images.unsplash.com/photo-1630409351217-bc4fa642207b?w=200&q=80", badge: "" }
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
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    menu: [
      {
        category: "Starters",
        items: [
          { id: "rk1", name: "Chicken Tikka", price: 280, description: "Tender chicken pieces marinated in yogurt and spices.", veg: false, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&q=80", badge: "Bestseller" },
          { id: "rk2", name: "Paneer Tikka", price: 220, description: "Cubes of paneer grilled to perfection.", veg: true, image: "https://images.unsplash.com/photo-1626292467676-1a456741129c?w=200&q=80", badge: "" },
          { id: "rk3", name: "Seekh Kebab", price: 250, description: "Minced meat grilled on skewers with spices.", veg: false, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Main Course",
        items: [
          { id: "rk4", name: "Chicken Biryani", price: 280, description: "Aromatic basmati rice with spiced chicken.", veg: false, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&q=80", badge: "Must Try" },
          { id: "rk5", name: "Mutton Rogan Josh", price: 350, description: "Slow-cooked mutton in rich gravy.", veg: false, image: "https://images.unsplash.com/photo-1603894584373-5ac82b241413?w=200&q=80", badge: "" },
          { id: "rk6", name: "Dal Bukhara", price: 180, description: "Black lentils cooked overnight with cream.", veg: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Desserts",
        items: [
          { id: "rk7", name: "Gulab Jamun", price: 80, description: "Deep fried dumplings in sugar syrup.", veg: true, image: "https://images.unsplash.com/photo-1629127719698-2f2e5472f9b5?w=200&q=80", badge: "" },
          { id: "rk8", name: "Kulfi", price: 100, description: "Traditional Indian ice cream.", veg: true, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=200&q=80", badge: "Seasonal" }
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
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    heroImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
    menu: [
      {
        category: "Pizzas",
        items: [
          { id: "pp1", name: "Margherita", price: 299, description: "Classic tomato, mozzarella, and basil.", veg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&q=80", badge: "Bestseller" },
          { id: "pp2", name: "Pepperoni", price: 399, description: "Loaded with pepperoni and extra cheese.", veg: false, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&q=80", badge: "" },
          { id: "pp3", name: "Veggie Supreme", price: 349, description: "Loaded with fresh vegetables.", veg: true, image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Pasta",
        items: [
          { id: "pp4", name: "Arrabiata Pasta", price: 249, description: "Pasta in spicy tomato sauce.", veg: true, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200&q=80", badge: "" },
          { id: "pp5", name: "Chicken Alfredo", price: 329, description: "Creamy pasta with grilled chicken.", veg: false, image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Beverages",
        items: [
          { id: "pp6", name: "Lemonade", price: 79, description: "Fresh squeezed lemonade.", veg: true, image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=200&q=80", badge: "" },
          { id: "pp7", name: "Chocolate Shake", price: 149, description: "Rich and thick chocolate shake.", veg: true, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&q=80", badge: "" }
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    menu: [
      {
        category: "Sweets",
        items: [
          { id: "bs1", name: "Gulab Jamun (4 pcs)", price: 60, description: "Soft doughnuts in rose syrup.", veg: true, image: "https://images.unsplash.com/photo-1629127719698-2f2e5472f9b5?w=200&q=80", badge: "Bestseller" },
          { id: "bs2", name: "Rasgulla (6 pcs)", price: 70, description: "Soft cottage cheese balls in syrup.", veg: true, image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=200&q=80", badge: "" },
          { id: "bs3", name: "Besan Ladoo", price: 80, description: "Gram flour sweets with nuts.", veg: true, image: "https://images.unsplash.com/photo-1605197130044-1e2d832d3c21?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Namkeen",
        items: [
          { id: "bs4", name: "Mix Namkeen", price: 100, description: "Assorted crunchy snacks.", veg: true, image: "https://images.unsplash.com/photo-1600408628039-7d6233e8d480?w=200&q=80", badge: "" },
          { id: "bs5", name: "Aloo Bhujia", price: 80, description: "Crispy potato noodles.", veg: true, image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Fast Food",
        items: [
          { id: "bs6", name: "Samosa (2 pcs)", price: 40, description: "Crispy pastry with spiced potatoes.", veg: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&q=80", badge: "" },
          { id: "bs7", name: "Kachori", price: 35, description: "Puffed dough with lentil filling.", veg: true, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200&q=80", badge: "" }
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
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
    heroImage: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=80",
    menu: [
      {
        category: "Curries",
        items: [
          { id: "sd1", name: "Dal Fry", price: 80, description: "Yellow dal with tadka.", veg: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&q=80", badge: "" },
          { id: "sd2", name: "Paneer Bhuna", price: 140, description: "Dry paneer with onion gravy.", veg: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&q=80", badge: "" },
          { id: "sd3", name: "Egg Curry", price: 100, description: "Boiled eggs in tomato gravy.", veg: false, image: "https://images.unsplash.com/photo-1626645738196-c2a72c7d6e4c?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Breads",
        items: [
          { id: "sd4", name: "Plain Roti", price: 10, description: "Whole wheat flatbread.", veg: true, image: "https://images.unsplash.com/photo-1583209814737-8ec3e9e37757?w=200&q=80", badge: "" },
          { id: "sd5", name: "Lachha Paratha", price: 25, description: "Layered flaky paratha.", veg: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&q=80", badge: "" },
          { id: "sd6", name: "Butter Roti", price: 15, description: "Roti with butter.", veg: true, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Rice",
        items: [
          { id: "sd7", name: "Plain Rice", price: 40, description: "Steamed basmati rice.", veg: true, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&q=80", badge: "" },
          { id: "sd8", name: "Jeera Rice", price: 70, description: "Rice with cumin tempering.", veg: true, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=200&q=80", badge: "" }
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
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
    heroImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&q=80",
    menu: [
      {
        category: "Mandi",
        items: [
          { id: "mh1", name: "Chicken Mandi", price: 350, description: "Chicken cooked in aromatic rice and spices.", veg: false, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&q=80", badge: "Bestseller" },
          { id: "mh2", name: "Mutton Mandi", price: 450, description: "Tender mutton with flavorful rice.", veg: false, image: "https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=200&q=80", badge: "" },
          { id: "mh3", name: "Fish Mandi", price: 400, description: "Fresh fish cooked in traditional style.", veg: false, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Biryani",
        items: [
          { id: "mh4", name: "Hyderabadi Biryani", price: 320, description: "Famous aromatic rice with chicken.", veg: false, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&q=80", badge: "Must Try" },
          { id: "mh5", name: "Veg Biryani", price: 220, description: "Mixed vegetables in aromatic rice.", veg: true, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&q=80", badge: "" }
        ]
      },
      {
        category: "Curries",
        items: [
          { id: "mh6", name: "Chicken Salan", price: 200, description: "Chicken in peanut-based gravy.", veg: false, image: "https://images.unsplash.com/photo-1603894584373-5ac82b241413?w=200&q=80", badge: "" },
          { id: "mh7", name: "Dum Ka Chicken", price: 250, description: "Slow-cooked chicken in spices.", veg: false, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&q=80", badge: "" }
        ]
      }
    ]
  }
];