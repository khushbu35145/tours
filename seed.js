const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Package = require('./models/Package');
const Testimonial = require('./models/Testimonial');
const Setting = require('./models/Setting');

dotenv.config();

const INITIAL_PACKAGES = [
  {
    slug: "same-day-taj-mahal-agra-tour-by-car",
    title: "Same Day Taj Mahal & Agra Tour by Car",
    category: "same-day",
    duration: "1 Day (12-14 Hours)",
    daysCount: 1,
    nightsCount: 0,
    route: "Delhi • Agra • Taj Mahal • Agra Fort • Mehtab Bagh • Delhi",
    price: "₹4,500",
    priceVal: 4500,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80",
    description: "Experience the magnificent Taj Mahal at sunrise or express morning trip from Delhi via Yamuna Expressway in a private AC chauffeur-driven sedan or SUV.",
    highlights: [
      "Pick-up and drop-off anywhere in Delhi NCR / Airport included",
      "Express 3-hour smooth highway drive via Yamuna Expressway",
      "Private guided tour of the iconic Taj Mahal with official approved guide",
      "Visit Agra Fort — Mughal stronghold of Emperor Akbar & Shah Jahan",
      "Gourmet lunch at top 5-star hotel / authentic Indian restaurant in Agra",
      "Sunset view of Taj Mahal from across Yamuna River at Mehtab Bagh"
    ],
    overview: "Our flagship Same Day Agra Tour by Private Car is tailor-made for travelers with limited time who want to witness the World Wonder Taj Mahal in supreme comfort and privacy.",
    accommodations: "Day Tour — No overnight stay (Luxury day-use room available on request).",
    transportation: "Private AC Sedan (Swift Dzire / Etios) or SUV (Toyota Innova Crysta) with professional uniformed chauffeur.",
    meals: "Buffet Lunch at 5-Star Hotel (Courtyard by Marriott / Jaypee Palace Agra).",
    itinerary: [
      { day: "01", title: "06:00 AM — Pick-up from Delhi NCR & Drive to Agra", desc: "Private driver picks you up from your hotel or Delhi Airport in a private AC vehicle. Scenic 3-hour drive via Yamuna Expressway.", highlights: ["Hotel/Airport Pickup", "Yamuna Expressway Drive"] },
      { day: "01", title: "09:30 AM — Arrival in Agra & Guided Taj Mahal Sightseeing", desc: "Meet your licensed professional guide in Agra. Enjoy priority skip-the-line entry into the magnificent Taj Mahal.", highlights: ["Skip-the-Line Ticket", "Guided Taj Mahal Tour"] },
      { day: "01", title: "12:30 PM — Gourmet Buffet Lunch", desc: "Savor a delicious multi-cuisine buffet lunch at an air-conditioned 5-star hotel in Agra.", highlights: ["5-Star Buffet Lunch", "Relaxation"] },
      { day: "01", title: "02:00 PM — Tour Colossal Agra Fort", desc: "Explore the UNESCO World Heritage Agra Fort, visiting Jahangir Palace, Khas Mahal, and Musamman Burj where Shah Jahan spent his final days.", highlights: ["Agra Fort Exploration", "Mughal Architecture"] },
      { day: "01", title: "04:30 PM — Visit Mehtab Bagh & Artisan Workshops", desc: "Photograph Taj Mahal across the Yamuna river at Mehtab Bagh. Optional demonstration of famous Agra marble inlay handicrafts.", highlights: ["Sunset View", "Marble Handicrafts"] },
      { day: "01", title: "06:00 PM — Drive Back to Delhi & Drop-off", desc: "Relax in your private vehicle during the return journey to Delhi. Driver drops you at hotel, residence, or airport.", highlights: ["Comfortable Return Drive", "Hotel/Airport Drop-off"] }
    ],
    inclusions: [
      "Pick-up and Drop-off anywhere in Delhi, Noida, Gurugram, or Delhi Airport (DEL)",
      "Private Air-Conditioned Vehicle (Sedan or SUV) with all toll taxes, parking & fuel charges",
      "Government Approved English speaking Tour Guide in Agra",
      "Skip-the-line express monument entry tickets to Taj Mahal & Agra Fort",
      "Buffet Lunch at 5-Star Hotel in Agra",
      "Bottled mineral water and refreshments during travel"
    ],
    exclusions: [
      "Tipping / Gratuities to driver & guide",
      "Alcoholic beverages",
      "Personal expenses and camera fees"
    ],
    faqs: [
      { q: "Is Taj Mahal open every day?", a: "No, the Taj Mahal is closed every Friday for prayers." },
      { q: "Can we adjust pick-up timing?", a: "Yes! As this is a 100% private tour, pick-up time is completely flexible between 03:00 AM and 09:00 AM." }
    ],
    isFeatured: true
  },
  {
    slug: "same-day-agra-tour-by-superfast-gatimaan-train",
    title: "Same Day Agra Tour by Superfast Gatimaan Express Train",
    category: "same-day",
    duration: "1 Day (12 Hours)",
    daysCount: 1,
    nightsCount: 0,
    route: "Delhi (Hazrat Nizamuddin) • Agra Cantt • Taj Mahal • Agra Fort • Delhi",
    price: "₹5,800",
    priceVal: 5800,
    image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=900&q=80",
    description: "Travel in speed and style aboard India's fastest Gatimaan Express train from Delhi to Agra in just 100 minutes, featuring AC Chair Car seats & onboard meals.",
    highlights: [
      "Round-trip Express Train Tickets (Gatimaan Express AC Chair Car / Executive Class)",
      "Delhi Railway Station transfers in private AC vehicle",
      "Superfast 100-minute journey with hot breakfast & dinner served on train",
      "Private AC Car & Guide waiting for you at Agra Cantt station",
      "Guided visits to Taj Mahal, Agra Fort, and Baby Taj (Itimad-ud-Daulah)"
    ],
    overview: "Avoid highway traffic and enjoy a smooth, high-speed rail experience to Agra with Real India Journey's all-inclusive Gatimaan Express Package.",
    accommodations: "Day Rail Tour — No hotel stay required.",
    transportation: "Gatimaan Express Train + Private AC SUV/Sedan for all Agra sightseeing.",
    meals: "Onboard breakfast on morning train & onboard dinner on evening train included.",
    itinerary: [
      { day: "01", title: "07:00 AM — Hotel Pickup & Transfer to Hazrat Nizamuddin Station", desc: "Private driver picks you up from your Delhi hotel and assists you onto Gatimaan Express train (Train No. 12050).", highlights: ["Delhi Station Transfer", "Boarding Assistance"] },
      { day: "01", title: "08:10 AM — Gatimaan Express Departs with Onboard Breakfast", desc: "Relax in air-conditioned comfort as train reaches speeds of 160 km/h. Hot breakfast served at your seat.", highlights: ["High-speed Rail", "Onboard Breakfast"] },
      { day: "01", title: "09:50 AM — Arrival at Agra Cantt Station", desc: "Meet your private guide and driver waiting outside Agra Cantt railway station with your name board.", highlights: ["VIP Reception", "Private Car Sightseeing"] },
      { day: "01", title: "10:15 AM — Taj Mahal Exploration", desc: "Visit the world-renowned Taj Mahal with your expert guide, learning about Mughal Emperor Shah Jahan's eternal love story.", highlights: ["Taj Mahal Tour", "Photography"] },
      { day: "01", title: "01:30 PM — Luxury Lunch & Agra Fort Visit", desc: "Enjoy lunch followed by guided tour of Agra Fort's grand palaces and halls of audience.", highlights: ["Agra Fort", "Buffet Lunch"] },
      { day: "01", title: "05:00 PM — Transfer to Agra Cantt Station", desc: "Board Gatimaan Express (Train No. 12049) departing at 05:50 PM. Dinner served onboard.", highlights: ["Return Train", "Onboard Dinner"] },
      { day: "01", title: "07:30 PM — Arrival in Delhi & Hotel Transfer", desc: "Arrive at Nizamuddin Station; private driver escorts you back to your hotel or airport.", highlights: ["Delhi Drop-off"] }
    ],
    inclusions: [
      "Round-trip Gatimaan Express AC Train Tickets (Delhi to Agra & Agra to Delhi)",
      "Private AC Car transfers in Delhi and full day sightseeing in Agra",
      "Government authorized English-speaking guide in Agra",
      "All monument entry tickets (Taj Mahal & Agra Fort)",
      "Onboard breakfast & dinner served on the train",
      "Buffet lunch in Agra"
    ],
    exclusions: ["Tips and personal purchases"],
    faqs: [
      { q: "Is train booking guaranteed?", a: "Yes, we reserve confirmed AC Chair Car tickets upon booking confirmation." }
    ],
    isFeatured: true
  },
  {
    slug: "golden-triangle-classic-3-days",
    title: "Golden Triangle Classic Tour (3 Days / 2 Nights)",
    category: "golden-triangle",
    duration: "3 Days / 2 Nights",
    daysCount: 3,
    nightsCount: 2,
    route: "Delhi • Agra (Taj Mahal) • Fatehpur Sikri • Jaipur • Delhi",
    price: "₹18,500",
    priceVal: 18500,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    description: "The ultimate 3-day imperial express tour covering India's historic Golden Triangle: Delhi's monuments, Agra's Taj Mahal, and Jaipur's Pink City fortresses.",
    highlights: [
      "Private AC luxury vehicle with dedicated chauffeur for all 3 days",
      "Delhi highlights: Qutub Minar, India Gate, Lotus Temple, & Parliament House",
      "Sunrise Taj Mahal tour with expert local historian",
      "En-route visit to ghost city Fatehpur Sikri & Abhaneri Chand Baori stepwell",
      "Jeep ride up to Amber Fort in Jaipur & photo stop at Hawa Mahal (Palace of Winds)"
    ],
    overview: "Discover India's most celebrated heritage corridor in 3 memorable days, crafted with 4-star / 5-star hotel options and private guides in every city.",
    accommodations: "1 Night Agra (ITC Mughal / Howard Plaza) + 1 Night Jaipur (Trident / Royal Orchid).",
    transportation: "Private Air-Conditioned Sedan (Dzire/Etios) or SUV (Innova Crysta).",
    meals: "Daily buffet breakfast at hotels.",
    itinerary: [
      { day: "01", title: "Delhi Sightseeing & Drive to Agra", desc: "Morning pick-up in Delhi, tour Qutub Minar and India Gate, then drive to Agra. Evening check-in at Agra hotel.", highlights: ["Delhi Tour", "Agra Drive"] },
      { day: "02", title: "Sunrise Taj Mahal, Agra Fort & Drive to Jaipur via Fatehpur Sikri", desc: "Experience Taj Mahal at sunrise. Visit Agra Fort, then drive to Jaipur stopping at Fatehpur Sikri Mughal ghost city. Evening arrival in Jaipur.", highlights: ["Sunrise Taj Mahal", "Fatehpur Sikri"] },
      { day: "03", title: "Jaipur Pink City Tour & Return to Delhi", desc: "Explore Amber Fort with Jeep ride, City Palace, Jantar Mantar, and Hawa Mahal. Afternoon drive back to Delhi hotel or airport.", highlights: ["Amber Fort Jeep Ride", "Hawa Mahal", "Delhi Return"] }
    ],
    inclusions: [
      "2 Nights accommodation in selected 4-Star or 5-Star hotels with breakfast",
      "Private AC Car for 3 days with all fuel, tolls, parking, and driver charges",
      "Licensed local guides in Delhi, Agra, and Jaipur",
      "Jeep ride at Amber Fort Jaipur",
      "Bottled water during sightseeing"
    ],
    exclusions: ["Flight tickets", "Monument entrance fees (can be added on request)", "Lunches & dinners"],
    faqs: [
      { q: "Can we extend this tour to 4 or 5 days?", a: "Yes! We offer 4-day and 5-day variations of the Golden Triangle with extra time in Jaipur or Delhi." }
    ],
    isFeatured: true
  },
  {
    slug: "golden-triangle-with-wildlife-ranthambore-5-days",
    title: "Golden Triangle & Ranthambore Tiger Safari (5 Days / 4 Nights)",
    category: "golden-triangle",
    duration: "5 Days / 4 Nights",
    daysCount: 5,
    nightsCount: 4,
    route: "Delhi • Agra • Ranthambore Tiger Sanctuary • Jaipur • Delhi",
    price: "₹32,000",
    priceVal: 32000,
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=80",
    description: "Combine imperial monuments and wild tiger thrill! Tour Delhi, Taj Mahal in Agra, open 4x4 Jeep Safari in Ranthambore National Park, and royal Jaipur.",
    highlights: [
      "Open 4x4 Jungle Jeep Safari in Ranthambore National Park to track Bengal Tigers",
      "Sunrise visit to the iconic Taj Mahal & Agra Fort",
      "Amber Fort Jeep ascent, City Palace & Jal Mahal photo stops in Jaipur",
      "Drive through scenic Rajasthani countryside with private chauffeur"
    ],
    overview: "This 5-day tour seamlessly blends world heritage architecture with wild tiger adventure in India's top wildlife sanctuary.",
    accommodations: "4-Star & 5-Star Luxury Resorts in Agra, Ranthambore, and Jaipur.",
    transportation: "Private AC SUV Innova Crysta + 4x4 Open Safari Gypsy in Ranthambore.",
    meals: "Daily Breakfast + All Meals included during stay in Ranthambore Resort.",
    itinerary: [
      { day: "01", title: "Delhi to Agra & Agra Fort", desc: "Pick up in Delhi, drive to Agra, check in, visit Agra Fort and Mehtab Bagh.", highlights: ["Delhi Pickup", "Agra Fort"] },
      { day: "02", title: "Sunrise Taj Mahal & Drive to Ranthambore", desc: "Sunrise Taj Mahal tour. Drive to Ranthambore National Park. Check into jungle resort.", highlights: ["Sunrise Taj Mahal", "Jungle Lodge Check-in"] },
      { day: "03", title: "Ranthambore Tiger Safari & Drive to Jaipur", desc: "Early morning 4x4 open jeep safari into core tiger territory. Return for breakfast, then drive to Pink City Jaipur.", highlights: ["4x4 Tiger Safari", "Drive to Jaipur"] },
      { day: "04", title: "Jaipur Palace & Fort Discovery", desc: "Full day tour of Amber Fort, Hawa Mahal, City Palace, and Jantar Mantar observatory.", highlights: ["Amber Fort", "City Palace"] },
      { day: "05", title: "Jaipur to Delhi Departure", desc: "Morning breakfast, shopping in Jaipur markets, and drive back to Delhi Airport/Hotel.", highlights: ["Delhi Return Transfer"] }
    ],
    inclusions: [
      "4 Nights accommodation in 4/5 Star hotels",
      "1 Open 4x4 Jeep Safari in Ranthambore National Park with forest permit & naturalist",
      "All meals in Ranthambore + Daily breakfasts in Agra & Jaipur",
      "Private AC Innova Crysta with chauffeur for the entire trip"
    ],
    exclusions: ["Airfare", "Personal expenses"],
    faqs: [{ q: "When is Ranthambore open?", a: "Ranthambore National Park is open for safaris from October 1st to June 30th." }],
    isFeatured: true
  },
  {
    slug: "rajasthan-forts-palaces-heritage-tour-7-days",
    title: "Rajasthan Royal Forts & Palaces Expedition (7 Days / 6 Nights)",
    category: "rajasthan",
    duration: "7 Days / 6 Nights",
    daysCount: 7,
    nightsCount: 6,
    route: "Jaipur • Jodhpur • Jaisalmer • Sam Sand Dunes • Udaipur",
    price: "₹38,500",
    priceVal: 38500,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
    description: "Immerse yourself in regal magnificence across Jaipur's pink palaces, Jodhpur's blue fort, Jaisalmer's golden desert dunes camp, and Udaipur's lake city.",
    highlights: [
      "Sunset Camel Safari & Luxury Swiss Tent Glamping in Jaisalmer Sam Dunes",
      "Private boat cruise on Lake Pichola with views of City Palace Udaipur",
      "Guided walk through Mehrangarh Fort & cobalt blue lanes of Jodhpur",
      "Visit 15th-century carved marble Ranakpur Jain Temple"
    ],
    overview: "Real India Journey's grand Rajasthani itinerary curated for couples, families, and luxury seekers wanting the complete land of kings.",
    accommodations: "Heritage Havelis, Luxury Resorts & Desert Glamping Camp.",
    transportation: "Private AC SUV (Toyota Innova Crysta) with experienced desert chauffeur.",
    meals: "Daily breakfast + Rajasthani dinner & folk dance in desert camp.",
    itinerary: [
      { day: "01", title: "Jaipur Arrival & Pink City Welcome", desc: "Welcome at Jaipur airport/station, check in, visit Albert Hall and Birla Temple.", highlights: ["Jaipur Arrival", "City Sightseeing"] },
      { day: "02", title: "Jaipur Forts & Drive to Jodhpur", desc: "Tour Amber Fort and Hawa Mahal, then drive to Jodhpur Sun City.", highlights: ["Amber Fort", "Drive to Blue City"] },
      { day: "03", title: "Jodhpur Mehrangarh Fort & Drive to Jaisalmer", desc: "Explore Mehrangarh Fort, Jaswant Thada, drive to golden desert city Jaisalmer.", highlights: ["Mehrangarh Fort", "Golden City"] },
      { day: "04", title: "Jaisalmer Fort & Thar Desert Camel Safari", desc: "Tour Sonar Quila living fort, Patwon Ki Haveli, evening camel safari & desert glamping camp.", highlights: ["Sonar Quila", "Camel Safari", "Desert Camp"] },
      { day: "05", title: "Jaisalmer to Udaipur via Ranakpur", desc: "Drive to Udaipur stopping at the exquisite 1444-pillar Ranakpur Temple.", highlights: ["Ranakpur Marble Temple", "Lake City Check-in"] },
      { day: "06", title: "Udaipur City Palace & Lake Pichola Cruise", desc: "Explore City Palace, Jagdish Temple, Saheliyon Ki Bari, and sunset boat ride.", highlights: ["City Palace", "Sunset Lake Cruise"] },
      { day: "07", title: "Farewell Udaipur Departure", desc: "Morning shopping and transfer to Udaipur Airport / Railway Station.", highlights: ["Airport Transfer"] }
    ],
    inclusions: [
      "6 Nights accommodation in heritage 4/5 star hotels & desert camp",
      "Camel safari, Rajasthani folk music, dance & buffet dinner in desert",
      "Lake Pichola boat cruise in Udaipur",
      "Dedicated AC SUV with experienced driver for 7 days"
    ],
    exclusions: ["Flight tickets", "Monument entry tickets"],
    faqs: [{ q: "Are the desert tents air-conditioned?", a: "Yes, our Swiss luxury tents feature attached private bathrooms and AC." }],
    isFeatured: true
  },
  {
    slug: "sacred-varanasi-spiritual-ganges-experience",
    title: "Sacred Varanasi & Spiritual Ganges Odyssey (4 Days / 3 Nights)",
    category: "spiritual",
    duration: "4 Days / 3 Nights",
    daysCount: 4,
    nightsCount: 3,
    route: "Varanasi Ghats • Ganges River • Sarnath • Kashi Vishwanath",
    price: "₹22,000",
    priceVal: 22000,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=80",
    description: "Discover the spiritual soul of India in the ancient city of Varanasi: private Ganga Aarti boat rides, sunrise rowing past 84 ghats, and sacred Sarnath.",
    highlights: [
      "Private boat cruise on the Ganges during the mesmerizing evening Ganga Aarti",
      "Dawn boat ride witnessing morning prayers, rituals, and cremation ghats",
      "Guided trip to Sarnath where Lord Buddha gave his first sermon",
      "Walk through Banaras heritage silk weaving alleys & ancient temples"
    ],
    overview: "Step back 3,000 years into the world's oldest living city with Real India Journey's spiritual Varanasi package.",
    accommodations: "Riverside Heritage Hotel / 4-Star Hotel in Varanasi.",
    transportation: "Private AC vehicle for land transfers + Hand-rowed private boats.",
    meals: "Daily vegetarian breakfasts and traditional Banarasi meals.",
    itinerary: [
      { day: "01", title: "Varanasi Arrival & Evening Ganga Aarti Boat", desc: "Airport pickup, check-in, sunset private boat ride at Dashashwamedh Ghat for Ganga Aarti.", highlights: ["Ganga Aarti Boat", "Dashashwamedh Ghat"] },
      { day: "02", title: "Sunrise Ganges Cruise & Kashi Vishwanath Temple", desc: "Dawn boat cruise, visit Kashi Vishwanath Corridor, Annapurna temple, and Banaras silk market.", highlights: ["Sunrise Boat", "Kashi Vishwanath Corridor"] },
      { day: "03", title: "Sarnath Pilgrimage & Evening Cultural Performance", desc: "Visit Sarnath Dhamek Stupa, Archaeological Museum, and evening classical Sitar music.", highlights: ["Sarnath Stupa", "Classical Music"] },
      { day: "04", title: "Varanasi Departure", desc: "Morning blessing, souvenir shopping, and transfer to Varanasi Airport.", highlights: ["Airport Transfer"] }
    ],
    inclusions: ["3 Nights Hotel stay", "Private sunrise & sunset boat rides", "Sarnath excursion", "AC Car transfers"],
    exclusions: ["Airfare", "Personal temple offerings"],
    faqs: [{ q: "Is vegetarian food provided?", a: "Yes, pure vegetarian sattvic meals are provided throughout." }],
    isFeatured: true
  }
];

const INITIAL_TESTIMONIALS = [
  {
    clientName: "Mark & Sarah Jenkins",
    location: "London, United Kingdom",
    tourName: "Golden Triangle Classic Tour (3 Days)",
    rating: 5,
    reviewText: "Real India Journey organized an outstanding tour for us! Our driver Mr. Singh was punctual, polite, and drove so smoothly. Seeing the Taj Mahal at sunrise with our private guide was a dream come true. Highly recommended on TripAdvisor!",
    tourDate: "February 2026",
    status: "approved"
  },
  {
    clientName: "Michael Rossi & Family",
    location: "New York, USA",
    tourName: "Same Day Taj Mahal Tour by Car",
    rating: 5,
    reviewText: "We booked the Same Day Agra tour from Delhi via car. Everything was seamless! Picked up right from our hotel lobby at 6 AM, luxury Innova vehicle, fantastic 5-star lunch in Agra, and zero hassle at monuments. 10/10 service!",
    tourDate: "January 2026",
    status: "approved"
  },
  {
    clientName: "Elena Rostova",
    location: "Moscow, Russia",
    tourName: "Same Day Agra Tour by Gatimaan Train",
    rating: 5,
    reviewText: "The Gatimaan Express train option was super fast and comfortable! Real India Journey team met us at both stations, provided delicious meals, and made us feel extremely safe as solo travelers.",
    tourDate: "December 2025",
    status: "approved"
  },
  {
    clientName: "Carlos & Maria Fernandez",
    location: "Madrid, Spain",
    tourName: "Rajasthan Forts & Palaces Heritage Tour",
    rating: 5,
    reviewText: "7 days across Jaipur, Jodhpur, Jaisalmer and Udaipur. The camel safari and desert glamping in Jaisalmer was magical! Excellent car condition, great English-speaking guides. Thank you Real India Journey team!",
    tourDate: "November 2025",
    status: "approved"
  },
  {
    clientName: "David Tan",
    location: "Singapore",
    tourName: "Golden Triangle & Ranthambore Tiger Safari",
    rating: 5,
    reviewText: "We spotted a Bengal tiger in Ranthambore Zone 3! Real India Journey made sure all our park permits, train seats, and hotel bookings were handled impeccably. Truly the best tour agency for India!",
    tourDate: "October 2025",
    status: "approved"
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/safare_journeys');
    console.log('[Seed]: Connected to MongoDB...');

    // Seed Admin User
    await User.deleteMany();
    await User.create({
      name: 'Real India Journey Concierge',
      email: 'admin@realindiajourney.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log(`[Seed]: Admin Created -> Email: admin@realindiajourney.com | Pass: admin123`);

    // Seed Packages
    await Package.deleteMany();
    await Package.insertMany(INITIAL_PACKAGES);
    console.log(`[Seed]: ${INITIAL_PACKAGES.length} Tour Packages seeded.`);

    // Seed Testimonials
    await Testimonial.deleteMany();
    await Testimonial.insertMany(INITIAL_TESTIMONIALS);
    console.log(`[Seed]: ${INITIAL_TESTIMONIALS.length} Testimonials seeded.`);

    // Seed Settings
    await Setting.deleteMany();
    await Setting.create({
      siteName: "Real India Journey",
      tagline: "Explore Authentic India with Premier Comfort & Royal Hospitality",
      phone: "+91 98765 43210",
      email: "info@realindiajourney.com",
      address: "Real India Journey Office, Near Taj Mahal Eastern Gate, Agra & CP, New Delhi, India",
      whatsapp: "+919876543210",
      heroTitle: "Discover the Magic of India with Real India Journey",
      heroSubtitle: "Government Authorized Tour Operator specializing in Golden Triangle Tours, Same Day Taj Mahal Expeditions, Rajasthan Forts, and Private Car Rentals.",
      statsTravelers: "25,000+",
      statsTours: "2,500+",
      statsRating: "4.9/5",
      statsYears: "15+"
    });
    console.log('[Seed]: Site settings seeded for Real India Journey.');

    console.log('[Seed]: All database records successfully populated!');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error]: ${error.message}`);
    process.exit(1);
  }
};

seedData();

