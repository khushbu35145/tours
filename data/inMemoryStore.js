const bcrypt = require('bcryptjs');

const INITIAL_PACKAGES = [
  {
    _id: "pkg-1",
    slug: "rajasthan-heritage",
    title: "Rajasthan Heritage Escape",
    category: "heritage",
    duration: "8 Days / 7 Nights",
    daysCount: 8,
    nightsCount: 7,
    route: "Jaipur • Jodhpur • Jaisalmer • Udaipur",
    price: "₹39,999",
    priceVal: 39999,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    description: "Immerse yourself in regal splendor across the grand desert palaces, soaring hill forts, vibrant bazaars, and romantic lake retreats of royal Rajasthan.",
    highlights: [
      "Private guided tour of Amber Fort & City Palace, Jaipur",
      "Sunset camel trek across the Sam Sand Dunes in Jaisalmer",
      "Heritage walk through the cobalt blue alleyways of Jodhpur",
      "Private boat cruise on Lake Pichola beneath Udaipur's royal skyline"
    ],
    overview: "The Rajasthan Heritage Escape is our signature bespoke expedition designed for travelers who wish to experience the majesty and timeless romance of India's desert kingdom.",
    accommodations: "Handpicked 4-Star & 5-Star Heritage Havelis & Luxury Palace Hotels.",
    transportation: "Private air-conditioned luxury SUV with experienced royal chauffeur.",
    meals: "Daily royal breakfast buffet & authentic traditional Rajasthani dinner thalis.",
    itinerary: [
      { day: "01", title: "Arrival in Jaipur — Royal Welcome", desc: "VIP airport reception, luxury hotel transfer, evening stroll in Johari Bazaar.", highlights: ["Airport VIP Welcome", "Haveli Check-in"] },
      { day: "02", title: "Pink City Forts & Palaces", desc: "Explore Amber Fort, Hawa Mahal, Jantar Mantar, and City Palace.", highlights: ["Amber Fort Tour", "City Palace Museum"] },
      { day: "03", title: "Jaipur to Jodhpur (Sun City)", desc: "Scenic drive through Thar heartland, artisan village stop, Jodhpur arrival.", highlights: ["Rural Drive", "Artisan Stop"] },
      { day: "04", title: "Blue City Ramparts & Thar Journey", desc: "Tour colossal Mehrangarh Fort and Jaswant Thada, drive to Jaisalmer.", highlights: ["Mehrangarh Fort", "Thar Desert Drive"] },
      { day: "05", title: "Jaisalmer Living Fort & Sand Dunes Glamping", desc: "Golden Fort tour, desert glamping camp with Kalbelia folk performance.", highlights: ["Living Fort Tour", "Camel Safari"] },
      { day: "06", title: "Jaisalmer to Udaipur via Ranakpur", desc: "Visit 15th-century Ranakpur Marble Temple, arrive in romantic Udaipur.", highlights: ["Ranakpur Marble Temple", "Lakeside Check-in"] },
      { day: "07", title: "Romantic Udaipur & Lake Pichola Cruise", desc: "City Palace exploration and twilight private boat cruise on Lake Pichola.", highlights: ["City Palace", "Sunset Lake Cruise"] },
      { day: "08", title: "Farewell Udaipur", desc: "Morning art studio visit, souvenirs, and chauffeur transfer to airport.", highlights: ["Souvenir Shopping", "Airport Transfer"] }
    ],
    inclusions: [
      "7 Nights luxury accommodation in verified heritage 4/5-star properties",
      "Daily gourmet buffet breakfasts and curated welcome dinners",
      "Dedicated AC SUV with professional chauffeur for all transfers",
      "English-speaking licensed monument guides",
      "Private boat cruise on Lake Pichola in Udaipur",
      "Camel safari and luxury tent stay in Sam Dunes, Jaisalmer"
    ],
    exclusions: ["Flight tickets", "Monument camera fees", "Lunches and alcoholic beverages", "Personal expenses"],
    faqs: [
      { q: "What is the best time of year for Rajasthan?", a: "October through March offers ideal, cool weather for desert sightseeing." },
      { q: "Can itineraries be customized?", a: "Yes, all Safaré Journeys are 100% customizable to your preferences." }
    ],
    isFeatured: true
  },
  {
    _id: "pkg-2",
    slug: "golden-triangle-luxury",
    title: "Golden Triangle & Taj Mahal Classic",
    category: "luxury",
    duration: "6 Days / 5 Nights",
    daysCount: 6,
    nightsCount: 5,
    route: "Delhi • Agra • Taj Mahal • Jaipur",
    price: "₹32,500",
    priceVal: 32500,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80",
    description: "Journey through India's famed cultural corridor: imperial monuments of Delhi, sunrise illumination of Taj Mahal, and pink palaces of Jaipur.",
    highlights: [
      "Sunrise private tour of the Taj Mahal with expert historian guide",
      "Rickshaw ride through Old Delhi's bustling Chandni Chowk bazaars",
      "Private sunset cocktail hour overlooking Jaipur's Nahargarh Fort"
    ],
    overview: "Experience India's most celebrated heritage trail in peerless comfort and style.",
    accommodations: "5-Star Luxury Hotels (Taj Mahal Hotel Delhi, ITC Mughal Agra, Jai Mahal Palace Jaipur).",
    transportation: "Private Chauffeur-driven Mercedes / BMW Sedan or Luxury Innova Crysta.",
    meals: "Daily breakfast and fine dining dinner credits included.",
    itinerary: [
      { day: "01", title: "Delhi Arrival & Imperial Welcome", desc: "Private airport reception and check-in at luxury hotel.", highlights: ["VIP Transfer", "Welcome Dinner"] },
      { day: "02", title: "Old & New Delhi Heritage Tour", desc: "Visit Jama Masjid, Chandni Chowk, Qutub Minar, and Humayun's Tomb.", highlights: ["Rickshaw Safari", "Qutub Minar"] },
      { day: "03", title: "Delhi to Agra & Sunset Mehtab Bagh", desc: "Drive to Agra, tour Agra Fort, sunset view of Taj Mahal from across Yamuna.", highlights: ["Agra Fort", "Sunset Taj View"] },
      { day: "04", title: "Sunrise Taj Mahal & Fatehpur Sikri to Jaipur", desc: "Sunrise Taj Mahal entry, Fatehpur Sikri stop, drive to Pink City.", highlights: ["Sunrise Taj Mahal", "Fatehpur Sikri"] },
      { day: "05", title: "Jaipur Palace & Fort Discovery", desc: "Amber Fort elephant/jeep ride, City Palace, Hawa Mahal photo stop.", highlights: ["Amber Fort", "City Palace"] },
      { day: "06", title: "Jaipur Departure to Delhi", desc: "Morning shopping and transfer to Delhi International Airport.", highlights: ["Chauffeur Transfer", "Departure"] }
    ],
    inclusions: [
      "5 Nights accommodation in 5-Star Luxury Hotels",
      "Daily breakfast & luxury welcome dinners",
      "VIP sunrise entrance ticket to Taj Mahal",
      "Private AC luxury vehicle throughout"
    ],
    exclusions: ["International airfare", "Personal expenses"],
    faqs: [
      { q: "Is Taj Mahal open on Fridays?", a: "No, Taj Mahal is closed on Fridays for prayers." }
    ],
    isFeatured: true
  },
  {
    _id: "pkg-3",
    slug: "kashmir-alpine-heaven",
    title: "Kashmir Alpine Valleys & Houseboats",
    category: "honeymoon",
    duration: "7 Days / 6 Nights",
    daysCount: 7,
    nightsCount: 6,
    route: "Srinagar • Gulmarg • Pahalgam • Sonmarg",
    price: "₹36,000",
    priceVal: 36000,
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=900&q=80",
    description: "Discover paradise on earth: romantic Shikara rides on Nigeen Lake, snow peaks in Gulmarg, and lush pine valleys of Pahalgam.",
    highlights: [
      "Overnight luxury stays in handcrafted wooden houseboats on Lake Nigeen",
      "Phase I & II Gondola cable car ride in Gulmarg reaching 14,000 ft",
      "Pony trek through Aru & Betaab Valleys in Pahalgam"
    ],
    overview: "An enchanting mountain voyage crafted for nature lovers and romantic honeymoons.",
    accommodations: "Luxury Heritage Houseboat Srinagar & 4/5-Star Mountain Resorts.",
    transportation: "Dedicated private 4x4 SUV with mountain chauffeur.",
    meals: "Daily Kashmiri breakfast and traditional Wazwan dinners.",
    itinerary: [
      { day: "01", title: "Srinagar Arrival & Heritage Houseboat Check-in", desc: "Airport transfer to luxury houseboat, evening Shikara ride.", highlights: ["Houseboat Check-in", "Sunset Shikara"] },
      { day: "02", title: "Mughal Gardens & Old Srinagar Walk", desc: "Shalimar Bagh, Nishat Bagh, Pari Mahal, Jamia Masjid.", highlights: ["Mughal Gardens", "Heritage Walk"] },
      { day: "03", title: "Srinagar to Gulmarg Meadows of Gold", desc: "Scenic mountain drive, check-in resort, evening snow walk.", highlights: ["Alpine Drive", "Gulmarg Resort"] },
      { day: "04", title: "Gulmarg Gondola Ride & Snow Adventure", desc: "Cable car up to Apharwat peak, skiing & photography.", highlights: ["Gondola Ride", "Snow Peaks"] },
      { day: "05", title: "Gulmarg to Pahalgam Valley of Shepherds", desc: "Drive along Lidder River, saffron fields stop, Pahalgam check-in.", highlights: ["Saffron Fields", "Lidder River"] },
      { day: "06", title: "Pahalgam Valleys Exploration", desc: "Visit Aru Valley, Betaab Valley, and Chandanwari scenic points.", highlights: ["Betaab Valley", "Aru Valley Trek"] },
      { day: "07", title: "Farewell Srinagar Departure", desc: "Breakfast overlooking Lidder, drive to Srinagar Airport.", highlights: ["Return Transfer"] }
    ],
    inclusions: [
      "2 Nights Luxury Houseboat + 4 Nights Mountain Resorts",
      "Daily breakfasts and traditional Wazwan dinners",
      "Shikara ride on Dal/Nigeen Lake",
      "Gulmarg Gondola cable car tickets"
    ],
    exclusions: ["Airfare to Srinagar", "Personal pony rides"],
    faqs: [
      { q: "When does snow fall in Gulmarg?", a: "Snowfall typically occurs from December through March." }
    ],
    isFeatured: true
  },
  {
    _id: "pkg-4",
    slug: "kerala-backwaters-bliss",
    title: "Kerala Backwaters & Tea Garden Odyssey",
    category: "family",
    duration: "7 Days / 6 Nights",
    daysCount: 7,
    nightsCount: 6,
    route: "Cochin • Munnar • Thekkady • Alleppey",
    price: "₹34,800",
    priceVal: 34800,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
    description: "Relax amidst misty tea estates in Munnar, spice plantations in Thekkady, colonial Cochin, and exclusive private houseboat cruises in Alleppey.",
    highlights: [
      "Overnight luxury private Kettuvallam houseboat cruise with personal chef",
      "Guided tea plantation walk and tasting session in Munnar",
      "Periyar Wildlife Sanctuary boat safari to spot wild elephants"
    ],
    overview: "Unwind in God's Own Country with serene watercourses and emerald hill sanctuaries.",
    accommodations: "Colonial Boutique Hotels, Luxury Hill Resorts, & Private Houseboat.",
    transportation: "Private air-conditioned SUV with chauffeur.",
    meals: "Daily breakfast buffet, full board on houseboat.",
    itinerary: [
      { day: "01", title: "Arrival in Fort Kochi", desc: "Explore Chinese Fishing Nets, St. Francis Church, Mattancherry Palace.", highlights: ["Chinese Fishing Nets", "Boutique Hotel"] },
      { day: "02", title: "Cochin to Munnar Tea Country", desc: "Drive past Cheeyappara Waterfalls, check-in tea garden resort.", highlights: ["Waterfall Drive", "Tea Garden View"] },
      { day: "03", title: "Munnar Tea Estates & Eravikulam National Park", desc: "Spot Nilgiri Tahr, tea museum tour, scenic photo stops.", highlights: ["Eravikulam Park", "Tea Museum"] },
      { day: "04", title: "Munnar to Thekkady Spice Trail", desc: "Scenic mountain pass, spice garden walk, evening Kathakali show.", highlights: ["Spice Tour", "Kathakali Show"] },
      { day: "05", title: "Periyar Wildlife Safari & Alleppey Houseboat", desc: "Morning Periyar Lake boat safari, transfer to Alleppey luxury houseboat.", highlights: ["Periyar Safari", "Houseboat Check-in"] },
      { day: "06", title: "Alleppey Backwater Cruise & Marari Beach", desc: "Glide past coconut groves and villages, evening Marari Beach resort stay.", highlights: ["Backwaters Cruise", "Beach Sunset"] },
      { day: "07", title: "Cochin Airport Transfer", desc: "Relaxed breakfast, souvenir shopping, and Cochin Airport transfer.", highlights: ["Return Transfer"] }
    ],
    inclusions: [
      "6 Nights accommodation including 1 Night Private Houseboat",
      "All meals on Houseboat + daily breakfasts at resorts",
      "AC SUV with chauffeur for all transfers"
    ],
    exclusions: ["Flight/Train fare", "Personal Ayurvedic treatments"],
    faqs: [
      { q: "Are houseboats fully air-conditioned?", a: "Yes, Safaré Journeys houseboats feature full-time AC in bedrooms." }
    ],
    isFeatured: true
  },
  {
    _id: "pkg-5",
    slug: "ranthambore-tiger-safari",
    title: "Royal Bengal Tiger Safaris & Wilderness",
    category: "adventure",
    duration: "5 Days / 4 Nights",
    daysCount: 5,
    nightsCount: 4,
    route: "Jaipur • Ranthambore National Park • Sawai Madhopur",
    price: "₹28,500",
    priceVal: 28500,
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=80",
    description: "Embark on thrill-filled 4x4 open jeep safaris with expert naturalists into Ranthambore's ancient jungle ruins in search of the elusive Royal Bengal Tiger.",
    highlights: [
      "3 Exclusive private 4x4 Jeep Safaris into Ranthambore Core Zones",
      "Stay in eco-luxury tented jungle lodges with bonfire dinners",
      "Guided hike to 10th-century Ranthambore Fort overlooking tiger territory"
    ],
    overview: "A thrilling wildlife expedition combining royal wilderness lodges with high-probability tiger tracking.",
    accommodations: "Luxury Tented Lodges & Eco-Heritage Jungle Resorts.",
    transportation: "Private AC SUV transfer from Jaipur + Open 4x4 Safari Gypsies.",
    meals: "All meals included (Breakfast, Lunch, High Tea, & Dinner).",
    itinerary: [
      { day: "01", title: "Jaipur to Ranthambore Wilderness", desc: "Chauffeur transfer to Ranthambore, lodge check-in, naturalist briefing.", highlights: ["Lodge Welcome", "Evening Bonfire"] },
      { day: "02", title: "Morning & Afternoon Core Safari", desc: "Dawn and dusk 4x4 Jeep safaris searching for tigers and leopards.", highlights: ["Tiger Tracking", "Jeep Safari"] },
      { day: "03", title: "Ranthambore Fort & Jungle Safari", desc: "Hike Ranthambore Fort, evening safari in Zone 1-5.", highlights: ["Fort Viewpoint", "Wildlife Photography"] },
      { day: "04", title: "Final Morning Safari & Village Walk", desc: "Dawn safari, afternoon visit to craft center empowering local women.", highlights: ["Dawn Safari", "Craft Village"] },
      { day: "05", title: "Return Transfer to Jaipur", desc: "Relaxed breakfast and private SUV transfer back to Jaipur Airport.", highlights: ["Airport Transfer"] }
    ],
    inclusions: ["4 Nights Luxury Lodge", "All meals & High Tea", "3 Private 4x4 Jeep Safaris", "Park permit fees"],
    exclusions: ["Personal video camera fees", "Tips to drivers"],
    faqs: [{ q: "When is Ranthambore open?", a: "The park is open from October 1st to June 30th annually." }],
    isFeatured: true
  },
  {
    _id: "pkg-6",
    slug: "varanasi-ganges-spiritual",
    title: "Spiritual Varanasi & Sacred Ganges",
    category: "spiritual",
    duration: "4 Days / 3 Nights",
    daysCount: 4,
    nightsCount: 3,
    route: "Varanasi Ghats • Sarnath • Ganges River",
    price: "₹24,000",
    priceVal: 24000,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=80",
    description: "Immerse yourself in India's spiritual heart: private sunset boat rides for the Ganga Aarti ceremony, dawn rowing past ancient ghats, and sacred Sarnath.",
    highlights: [
      "Private hand-rowed boat cruise during the grand evening Ganga Aarti",
      "Dawn rowing boat ride to witness sacred morning rituals along 84 Ghats",
      "Excursion to Sarnath, site of Buddha's first sermon"
    ],
    overview: "An intimate spiritual journey through the world's oldest living city.",
    accommodations: "Lakeside Heritage Haveli overlooking the Ganges.",
    transportation: "Private AC Vehicle for all land transfers + Private Boats.",
    meals: "Daily vegetarian breakfasts and traditional thali dinners.",
    itinerary: [
      { day: "01", title: "Arrival in Varanasi & Evening Aarti", desc: "VIP airport reception, riverfront check-in, private evening boat for Aarti.", highlights: ["Ganga Aarti Boat", "Heritage Haveli"] },
      { day: "02", title: "Sunrise Ganges Boat & Old City Walk", desc: "Dawn boat cruise, visit Kashi Vishwanath temple corridor and silk bazaars.", highlights: ["Sunrise Boat", "Silk Weaving Trail"] },
      { day: "03", title: "Sarnath Pilgrimage & Classical Music Session", desc: "Tour Dhamek Stupa, Sarnath Museum, private evening Sitar performance.", highlights: ["Sarnath Stupa", "Sitar Performance"] },
      { day: "04", title: "Farewell Sacred Varanasi", desc: "Morning blessing ritual and chauffeur transfer to Varanasi Airport.", highlights: ["Blessing Ceremony", "Airport Transfer"] }
    ],
    inclusions: ["3 Nights Heritage Riverside Hotel", "Daily breakfast & dinner", "Private sunrise & sunset boat rides", "Sarnath guided tour"],
    exclusions: ["Airfare", "Personal temple offerings"],
    faqs: [{ q: "Is vegetarian food provided?", a: "Yes, pure sattvic and gourmet vegetarian dining is served." }],
    isFeatured: true
  },
  {
    _id: "pkg-uttrakhand",
    slug: "uttrakhand",
    title: "uttrakhand",
    category: "dehradun",
    subcategory: "uttrakhand",
    duration: "7 Days / 6 Nights",
    daysCount: 7,
    nightsCount: 6,
    route: "Delhi • Agra • Jaipur",
    price: "₹35,000",
    priceVal: 35000,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    description: "Uttarakhand classic tour itinerary.",
    overview: "Explore Uttarakhand state beauty.",
    highlights: ["Private chauffeur tour"],
    isFeatured: true
  },
  {
    _id: "pkg-masuri",
    slug: "masuri",
    title: "masuri",
    category: "dehradun",
    subcategory: "masuri",
    duration: "7 Days / 6 Nights",
    daysCount: 7,
    nightsCount: 6,
    route: "Delhi • Agra • Jaipur",
    price: "₹35,000",
    priceVal: 35000,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    description: "hiii",
    overview: "hiii",
    highlights: ["Mussoorie mountain tour"],
    isFeatured: true
  }
];

const INITIAL_TESTIMONIALS = [
  {
    _id: "test-1",
    clientName: "Dr. Alistair & Elena Vance",
    location: "London, United Kingdom",
    tourName: "Rajasthan Heritage Escape",
    rating: 5,
    reviewText: "Safaré Journeys orchestrated the trip of a lifetime. From private palace tours to starlit desert glamping in Jaisalmer, every single detail was executed with royal precision.",
    tourDate: "January 2026",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    _id: "test-2",
    clientName: "Vikram & Ananya Malhotra",
    location: "Mumbai, India",
    tourName: "Kashmir Alpine Valleys",
    rating: 5,
    reviewText: "The houseboat stay on Nigeen Lake and private Gondola experience in Gulmarg were beyond breathtaking. Our chauffeur and concierge service exceeded all expectations!",
    tourDate: "February 2026",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    _id: "test-3",
    clientName: "Sarah & David Miller",
    location: "Sydney, Australia",
    tourName: "Golden Triangle & Taj Mahal Classic",
    rating: 5,
    reviewText: "Watching the sunrise over the Taj Mahal with Safaré's historian guide was magical. Flawless vehicles, top-tier luxury hotels, and genuine Indian hospitality.",
    tourDate: "December 2025",
    status: "approved",
    createdAt: new Date().toISOString()
  }
];

const INITIAL_ENQUIRIES = [
  {
    _id: "enq-1",
    fullName: "Arthur Pendelton",
    email: "arthur.p@traveler.co.uk",
    phone: "+44 7700 900077",
    destination: "Rajasthan",
    travelDate: "2026-11-15",
    duration: "10 Days",
    adults: "2 Adults",
    children: "0 Children",
    travelStyle: "Royal Palaces & Heritage",
    budget: "₹1 Lakh - ₹2 Lakhs",
    specialRequests: "Anniversary celebration trip. Require quiet lake view rooms.",
    packageName: "Rajasthan Heritage Escape",
    status: "new",
    createdAt: new Date().toISOString()
  }
];

const INITIAL_CONTACTS = [
  {
    _id: "cnt-1",
    fullName: "Sophia Martinez",
    email: "sophia.m@luxurytours.es",
    phone: "+34 600 123 456",
    subject: "Private Charter & Custom Wildlife Safari Query",
    message: "Hello Safaré team, we are planning a party of 6 for Ranthambore wildlife tiger safaris with private chartered flight connections from Jaipur.",
    status: "new",
    createdAt: new Date().toISOString()
  }
];

const INITIAL_SETTINGS = {
  siteName: "Real India Journey",
  tagline: "Authentic Luxury India Travel & Tailor-Made Tours",
  phone: "+91 98765 43210",
  email: "info@realindiajourney.com",
  address: "Real India Journey House, C-Scheme, Jaipur, Rajasthan 302001, India",
  whatsapp: "+918294312349",
  whatsappNotifyPhone: "+918294312349",
  whatsappEnableNotify: true,
  whatsappApiKey: "4bef5daff4308994b8018be5eb20ff4f",
  whatsappInstanceId: "instance1120",
  whatsappProvider: "ultramsg",
  heroTitle: "Authentic Luxury India Travel",
  heroSubtitle: "Curated Real India Journey expeditions across royal Rajasthan, tranquil Kerala backwaters, and alpine Kashmir.",
  statsTravelers: "50,000+",
  statsTours: "1,500+",
  statsRating: "4.9/5",
  statsYears: "15+",
  homeHeroImage1: "/images/jodhpur_blue_city.jpg",
  homeHeroImage2: "/images/jodhpur_jaswant_thada.jpg",
  homeHeroImage3: "/images/rajasthan_hawa_mahal.jpg",
  homeHeroImage4: "/images/rajasthan_thar_desert.jpg",
  aboutHeroImage: "/images/about_hero.jpg",
  contactHeroImage: "/images/contact_hero.jpg",
  blogsHeroImage: "/images/blogs_hero.jpg",
  packagesHeroImage: "/images/packages_hero.jpg",
  categoriesHeroImage: "/images/categories_hero.jpg",
  testimonialsHeroImage: "/images/testimonials_hero.jpg",
  carRentalHeroImage: "/images/van2.png",
  enquiryHeroImage: "/images/enquiry_hero.jpg",

  seoHomeTitle: "Real India Journey | Luxury India Travel & Custom Tour Packages",
  seoHomeKeywords: "luxury india travel, rajasthan tour packages, golden triangle tour, india luxury travel agency",
  seoHomeDescription: "Experience authentic luxury travel across India. Tailor-made royal palace tours, Golden Triangle expeditions, wildlife safaris, and private chauffeur travel.",

  seoAboutTitle: "About Us | Real India Journey - Premier Luxury Travel Concierge",
  seoAboutKeywords: "about real india journey, luxury travel concierge india, royal tour operator",
  seoAboutDescription: "Learn about Real India Journey, India's leading luxury travel agency specializing in high-end royal heritage tours and custom luxury itineraries.",

  seoPackagesTitle: "Real India Journey Tour Packages",
  seoPackagesKeywords: "india holiday packages, rajasthan heritage tours, kerala backwaters tour, luxury india itineraries",
  seoPackagesDescription: "Browse our handpicked collection of luxury India tour packages across Rajasthan, Kerala, Golden Triangle, Kashmir, and spiritual circuits.",

  seoBlogsTitle: "India Travel Blog & Insider Guides | Real India Journey",
  seoBlogsKeywords: "india travel blog, taj mahal travel tips, rajasthan travel guide, golden triangle itinerary",
  seoBlogsDescription: "Read expert travel advice, secret monument guides, and cultural insights from Real India Journey's luxury travel concierges.",

  seoCarTitle: "Luxury Car Rental & Chauffeur Services | Real India Journey",
  seoCarKeywords: "luxury car rental india, innova crysta rental jaipur, tempo traveller rental delhi, private chauffeur tour india",
  seoCarDescription: "Hire premium air-conditioned vehicles (Innova Crysta, Fortuner, Tempo Traveller) with professional English-speaking chauffeurs across India.",

  seoContactTitle: "Contact Us & Plan Your Journey | Real India Journey",
  seoContactKeywords: "contact real india journey, plan india tour, luxury travel inquiry",
  seoContactDescription: "Get in touch with Real India Journey's luxury travel specialists to craft your personalized trip to India."
};

const INITIAL_BLOGS = [
  {
    _id: "blog-1",
    slug: "golden-triangle-travel-guide",
    title: "The Ultimate Golden Triangle Travel Guide (Delhi, Agra & Jaipur)",
    category: "Travel Guides",
    date: "February 24, 2026",
    author: "Real India Journey Concierge",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    excerpt: "Planning your first trip to India? Learn everything you need to know about navigating the Golden Triangle circuit in 3 to 5 days with maximum comfort.",
    content: "<p>The Golden Triangle — connecting Delhi, Agra, and Jaipur — is India's most famous cultural travel circuit. Spanning roughly 720 kilometers across northern India, this route offers first-time travelers an ideal introduction to the country's magnificent Mughal monuments, royal fortresses, and vibrant bazaars.</p><h3 style=\"font-family: Playfair Display, serif; color: #171717; margin-top: 1.5rem; margin-bottom: 0.5rem;\">Why is it Called the Golden Triangle?</h3><p>When plotted on a map of India, Delhi, Agra, and Jaipur form an equilateral triangle. Each city represents a distinct chapter in Indian history:</p><ul style=\"padding-left: 1.25rem; margin-bottom: 1rem;\"><li><strong>Delhi:</strong> The imperial capital blending ancient sultanates with British colonial architecture.</li><li><strong>Agra:</strong> The Mughal throne city, home to the breathtaking Taj Mahal & Agra Fort.</li><li><strong>Jaipur:</strong> The Pink City of Rajasthan, famous for Amber Fort, City Palace, and royal Rajput heritage.</li></ul>",
    isPublished: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: "blog-2",
    slug: "best-time-tips-taj-mahal-agra",
    title: "Best Time & Top Insider Tips for Visiting Taj Mahal in Agra",
    category: "Monument Tips",
    date: "February 18, 2026",
    author: "Agra Local Historian",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    excerpt: "Avoid crowds, capture stunning sunrise photos, and learn crucial dress code and ticket guidelines before visiting the Taj Mahal.",
    content: "<p>The Taj Mahal is an architectural masterpiece crafted from translucent white Makrana marble. Built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal between 1631 and 1648, it attracts millions of visitors every year.</p><h3 style=\"font-family: Playfair Display, serif; color: #171717; margin-top: 1.5rem; margin-bottom: 0.5rem;\">1. Visit at Sunrise</h3><p>Sunrise is undeniably the best time to visit the Taj Mahal. The soft morning light turns the white marble into soft shades of golden pink, and queue times are significantly shorter than midday.</p>",
    isPublished: true,
    createdAt: new Date().toISOString()
  }
];

const INITIAL_CARS = [
  {
    _id: "car-1",
    id: "sedan-swift-dzire",
    name: "Maruti Suzuki Dzire / Toyota Etios",
    category: "Sedan (Standard)",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80",
    capacity: "4 Passengers",
    luggage: "2 Large + 2 Small Bags",
    ac: "Air Conditioned (Dual Zone)",
    transmission: "Manual / Automatic",
    priceDay: "₹2,500",
    perKm: "₹11/km",
    features: [
      "Clean & Sanitized Interiors",
      "Uniformed English Speaking Chauffeur",
      "Free Bottled Mineral Water",
      "All Fuel, Tolls & Parking Taxes Included"
    ],
    badge: "Popular for Couples"
  },
  {
    _id: "car-2",
    id: "suv-innova-crysta",
    name: "Toyota Innova Crysta",
    category: "Luxury SUV / MUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=700&q=80",
    capacity: "6 to 7 Passengers",
    luggage: "4 Large Bags",
    ac: "Rear AC Vents with Climate Control",
    transmission: "Automatic / Captain Seats",
    priceDay: "₹3,800",
    perKm: "₹16/km",
    features: [
      "Reclining Plush Captain Seats",
      "High Ground Clearance for Smooth Highway Drive",
      "Mobile Phone Charger & WiFi on Request",
      "Experienced Highway & Hill Chauffeur"
    ],
    badge: "Top Choice for Families"
  },
  {
    _id: "car-3",
    id: "tempo-traveller-12",
    name: "Luxury Tempo Traveller (12 - 16 Seater)",
    category: "Minibus / Group Coach",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=700&q=80",
    capacity: "12 - 16 Passengers",
    luggage: "10+ Large Bags",
    ac: "Roof-Mounted High-Power AC",
    transmission: "Manual Heavy Duty",
    priceDay: "₹5,500",
    perKm: "₹22/km",
    features: [
      "2x1 Pushback Leather Recliner Seats",
      "LED TV & Surround Audio System",
      "Ample Storage Compartment",
      "Ideal for Golden Triangle & Rajasthan Group Tours"
    ],
    badge: "Best for Groups & Families"
  },
  {
    _id: "car-4",
    id: "executive-fortuner",
    name: "Toyota Fortuner / Luxury Executive SUV",
    category: "VIP Luxury SUV",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80",
    capacity: "4 to 6 Passengers",
    luggage: "4 Large Bags",
    ac: "Tri-Zone Automatic Climate Control",
    transmission: "Automatic 4x4",
    priceDay: "₹6,500",
    perKm: "₹28/km",
    features: [
      "VIP Leather Interior & Ambient Lighting",
      "Premium Sound System & Tinted Sunshade",
      "Protocol Trained VIP Driver",
      "Priority Highway Express Toll Tag"
    ],
    badge: "VIP Executive Comfort"
  }
];

const INITIAL_CATEGORIES = [
  {
    _id: "cat-1",
    name: "Golden Triangle & Heritage",
    slug: "golden-triangle",
    description: "Classic cultural trail covering imperial Delhi, the iconic Taj Mahal in Agra, and royal Jaipur.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
    badge: "Most Popular",
    status: "active",
    subcategories: [
      { _id: "sub-101", name: "Same Day Agra Express", slug: "same-day-agra", description: "Express day tours via highway or Gatimaan train.", status: "active" },
      { _id: "sub-102", name: "3-Day Golden Triangle", slug: "3-day-golden-triangle", description: "Short weekend luxury escape across 3 cities.", status: "active" },
      { _id: "sub-103", name: "5-Day Heritage Classic", slug: "5-day-heritage-classic", description: "In-depth monuments and palace experiences.", status: "active" }
    ]
  },
  {
    _id: "cat-2",
    name: "Rajasthan Forts & Palaces",
    slug: "rajasthan",
    description: "Royal desert kingdom of grand hilltop forts, blue alleyways, romantic lakes, and sand dunes.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    badge: "Heritage Royal",
    status: "active",
    subcategories: [
      { _id: "sub-201", name: "Jodhpur & Marwar Circuit", slug: "jodhpur-marwar", description: "Mehrangarh Fort, Jaswant Thada & Blue City tours.", status: "active" },
      { _id: "sub-202", name: "Udaipur Lake Palaces", slug: "udaipur-lakes", description: "Lake Pichola boat cruises and romantic palaces.", status: "active" },
      { _id: "sub-203", name: "Jaisalmer Desert Glamping", slug: "jaisalmer-desert", description: "Golden Sand Dunes camel safari and luxury tents.", status: "active" }
    ]
  },
  {
    _id: "cat-3",
    name: "Wildlife & Desert Safaris",
    slug: "wildlife",
    description: "Thrill open 4x4 jeep safaris into tiger reserves and golden Thar desert expeditions.",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80",
    badge: "Adventure Special",
    status: "active",
    subcategories: [
      { _id: "sub-301", name: "Ranthambore Tiger Safaris", slug: "ranthambore-tiger-safari", description: "Guaranteed core zone jeep safaris.", status: "active" },
      { _id: "sub-302", name: "Thar Desert Glamping", slug: "thar-desert-safari", description: "Open jeep dunes bashing and folk cultural nights.", status: "active" }
    ]
  },
  {
    _id: "cat-5",
    name: "dehradun",
    slug: "dehradun",
    description: "Dehradun & Uttarakhand hill station experiences.",
    badge: "Popular Destination",
    status: "active",
    subcategories: [
      { _id: "sub-501", name: "uttrakhand", slug: "uttrakhand", description: "Uttarakhand state tours", status: "active" },
      { _id: "sub-502", name: "masuri", slug: "masuri", description: "Mussoorie hill station packages", status: "active" }
    ]
  },
  {
    _id: "cat-6",
    name: "bihar",
    slug: "bihar",
    description: "Historic & Spiritual Bihar Heritage.",
    badge: "Heritage Special",
    status: "active",
    subcategories: [
      { _id: "sub-601", name: "patna", slug: "patna", description: "Patna heritage & culture", status: "active" }
    ]
  },
  {
    _id: "cat-4",
    name: "Spiritual & Pilgrimage Tours",
    slug: "spiritual",
    description: "Soul-stirring journeys along sacred rivers, ancient ghats, and divine marble temples.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    badge: "Soulful Experience",
    status: "active",
    subcategories: [
      { _id: "sub-401", name: "Varanasi Ganges Aarti", slug: "varanasi-ganges", description: "Sunset Ganga Aarti boat ride and ghat walking tours.", status: "active" },
      { _id: "sub-402", name: "Pushkar & Mount Abu", slug: "pushkar-mount-abu", description: "Holy Pushkar lake ghats & Dilwara marble temples.", status: "active" }
    ]
  }
];



class InMemoryStore {
  constructor() {
    this.categories = [...INITIAL_CATEGORIES];
    this.packages = [...INITIAL_PACKAGES];
    this.testimonials = [...INITIAL_TESTIMONIALS];
    this.enquiries = [...INITIAL_ENQUIRIES];
    this.contacts = [...INITIAL_CONTACTS];
    this.blogs = [...INITIAL_BLOGS];
    this.cars = [...INITIAL_CARS];
    this.settings = { ...INITIAL_SETTINGS };
    this.adminUser = {
      _id: "admin-1",
      name: "Real India Journey Admin",
      email: "admin@realindiajourney.com",
      passwordHash: bcrypt.hashSync("admin1234", 10),
      role: "admin"
    };
  }
}

const memoryStore = new InMemoryStore();
module.exports = memoryStore;
