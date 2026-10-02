import { Product, ProductReview } from '../types';

import heroImg from '../assets/images/hero_tech_accessories_1790514348102.jpg';
import earbudsImg from '../assets/images/product_wireless_earbuds_1790514367274.jpg';
import chargerImg from '../assets/images/product_fast_charger_1790514382713.jpg';
import powerbankImg from '../assets/images/product_powerbank_20k_1790514396223.jpg';
import smartwatchImg from '../assets/images/product_smart_watch_1790514409890.jpg';
import holderImg from '../assets/images/product_phone_holder_1790514425424.jpg';
import speakerImg from '../assets/images/product_bt_speaker_1790514439386.jpg';
import cableImg from '../assets/images/product_typec_cable_1790514458040.jpg';
import lampImg from '../assets/images/product_desk_lamp_1790514474357.jpg';

export const HERO_IMAGE = heroImg;

export const CATEGORIES = [
  'All',
  'Chargers',
  'Cables',
  'Audio Devices',
  'Wearables',
  'Mobile Holders',
  'Other Accessories'
] as const;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'wireless-earbuds',
    name: 'Wireless Earbuds',
    category: 'Audio Devices',
    price: 999,
    originalPrice: 1499,
    image: earbudsImg,
    tagline: 'Deep bass, clear calls & 24h battery life with charging case',
    description:
      'Immerse yourself in crystal clear stereo sound with A.M Accessories wireless earbuds. Equipped with Bluetooth 5.3 low-latency connection, ergonomic silicone ear tips, touch controls, and smart noise cancellation for clear phone calls on the go.',
    features: [
      'Bluetooth 5.3 Instant Pairing',
      '24 Hours Total Playtime with Pocket Case',
      'Touch Controls for Calls & Music',
      'IPX4 Sweat & Splash Resistant',
      'Universal compatibility with Android & iPhone'
    ],
    specs: {
      'Connectivity': 'Bluetooth 5.3 (10m range)',
      'Battery Life': '5h per charge / 24h total',
      'Charging Port': 'USB Type-C Fast Charge',
      'Weight': '38g (earbuds + case)',
      'Warranty': '7 Days Replacement Warranty'
    },
    inStock: true,
    isPopular: true
  },
  {
    id: 'fast-typec-charger',
    name: 'Fast Type-C Charger',
    category: 'Chargers',
    price: 999,
    originalPrice: 1399,
    image: chargerImg,
    tagline: 'Quick Charge 3.0 & PD fast wall charger with surge safety protection',
    description:
      'Engineered for maximum charging efficiency, this Type-C fast wall adapter delivers safe, stable high-current power for Samsung, Xiaomi, Infinix, Tecno, Vivo, and iPhone devices. Built-in temperature monitor prevents overheating.',
    features: [
      'Power Delivery (PD) & Quick Charge 3.0 protocol',
      'Multi-protect safety system against overcurrent and voltage spikes',
      'Compact travel-friendly flame-retardant casing',
      'Consistent rapid charging from 0% to 65% in 30 minutes',
      'Works with all modern Type-C and Lightning cables'
    ],
    specs: {
      'Max Output': '20W / 3.0A Max',
      'Input Voltage': '100-240V AC, 50/60Hz',
      'Port Type': 'USB-C Fast Port',
      'Protection': 'Over-temp, Short-circuit, Over-voltage',
      'Warranty': '7 Days Replacement Warranty'
    },
    inStock: true,
    isPopular: true
  },
  {
    id: 'power-bank-20000mah',
    name: 'Power Bank 20,000mAh',
    category: 'Other Accessories',
    price: 2999,
    originalPrice: 3899,
    image: powerbankImg,
    tagline: 'Heavy-duty 20,000mAh capacity with LED percentage battery indicator',
    description:
      'Never run out of power during load-shedding or travel. The A.M 20,000mAh power bank can charge an average smartphone 4-5 times over. Features dual USB output ports and dual input (Type-C + Micro-USB) with a real-time digital LED display.',
    features: [
      'Massive 20,000mAh Li-Polymer high-density cells',
      'Digital LED percentage readout (1% to 100%)',
      'Dual output: charge two smartphones simultaneously',
      'Bi-directional Type-C input/output fast recharging',
      'Airline approved carry-on capacity'
    ],
    specs: {
      'Capacity': '20,000mAh (74Wh)',
      'Outputs': '2x USB-A (5V/2.4A, 9V/2A), 1x Type-C PD',
      'Inputs': 'USB Type-C & Micro-USB',
      'Recharge Time': 'approx. 6-7 hours with PD charger',
      'Dimensions': '142 x 68 x 26 mm'
    },
    inStock: true,
    isPopular: true
  },
  {
    id: 'smart-watch',
    name: 'Smart Watch',
    category: 'Wearables',
    price: 2499,
    originalPrice: 3299,
    image: smartwatchImg,
    tagline: 'Vibrant HD touch display, Bluetooth call answering & fitness tracking',
    description:
      'Elevate your daily connectivity with this feature-packed smart watch. Receive incoming call notifications, sync your health metrics (heart rate, blood oxygen, step counter, sleep tracker), and customize with multiple digital dial faces.',
    features: [
      'High-contrast crisp HD full-touch color screen',
      'Bluetooth Calling & WhatsApp message alert sync',
      '24/7 Heart rate, SpO2 & multi-sport activity tracking',
      'Up to 5-7 days battery backup on a single magnetic charge',
      'Comfortable skin-friendly breathable silicone strap'
    ],
    specs: {
      'Screen Size': '1.85-inch HD IPS display',
      'Battery': '280mAh (5-7 days typical use)',
      'Water Resistance': 'IP67 water and dust resistant',
      'Compatibility': 'Android 5.0+ and iOS 9.0+',
      'App Support': 'Da Fit / FitPro companion app'
    },
    inStock: true,
    isPopular: true
  },
  {
    id: 'mobile-phone-holder',
    name: 'Mobile Phone Holder',
    category: 'Mobile Holders',
    price: 699,
    originalPrice: 999,
    image: holderImg,
    tagline: 'Ergonomic aluminum desktop stand for phones & tablets with silicone grips',
    description:
      'Keep your workspace neat and comfortable. This sturdy metal phone holder provides 270-degree angle adjustments for video calls, YouTube streaming, and office work without neck strain. Anti-skid rubber base prevents sliding.',
    features: [
      'Premium aviation-grade aluminum alloy construct',
      'Dual hinges allow height and viewing angle tuning',
      'Reserved cutout slot for charging cable while standing',
      'Soft non-scratch silicone pads protect device edges',
      'Folds flat for effortless pocket or bag portability'
    ],
    specs: {
      'Material': 'Aluminum Alloy + Silicone',
      'Device Compatibility': '4.0 to 10.5 inch phones & tablets',
      'Weight': '115g',
      'Adjustability': 'Dual axis 270-degree rotation',
      'Color': 'Matte Space Gray'
    },
    inStock: true,
    isPopular: false
  },
  {
    id: 'bluetooth-speaker',
    name: 'Bluetooth Speaker',
    category: 'Audio Devices',
    price: 1799,
    originalPrice: 2299,
    image: speakerImg,
    tagline: '360° surround audio, punchy bass & durable mesh outdoor design',
    description:
      'Small footprint, colossal sound! The A.M portable Bluetooth speaker delivers room-filling acoustics with rich low-end bass and crisp highs. Supports Bluetooth audio, TF/SD card playback, and USB flash drive direct playback.',
    features: [
      'Custom 45mm acoustic driver with passive bass radiator',
      'Hands-free microphone for conference & family calls',
      'FM Radio, TF Card, AUX & USB flash drive inputs',
      'Tough braided fabric grill with non-slip silicone base',
      '6 to 8 hours non-stop playback on medium volume'
    ],
    specs: {
      'Audio Output': '5W RMS (Peak 10W)',
      'Battery': '1200mAh rechargeable lithium battery',
      'Playtime': '6-8 hours',
      'Charging Time': '2 hours via Micro/Type-C',
      'Dimensions': '110 x 85 mm'
    },
    inStock: true,
    isPopular: false
  },
  {
    id: 'usb-typec-cable',
    name: 'USB Type-C Cable',
    category: 'Cables',
    price: 499,
    originalPrice: 699,
    image: cableImg,
    tagline: 'Heavy-duty braided nylon fast-charging and 480Mbps data transfer cable',
    description:
      'Say goodbye to broken cable necks. Our reinforced double-braided nylon Type-C cable withstands 15,000+ bends. Supports up to 3A fast charging and reliable data syncing with laptops and PCs.',
    features: [
      'Military-grade double braided nylon jacket',
      'Reinforced aluminum alloy connector tips',
      'High-speed 480 Mbps data synchronization',
      'Tangle-free design with complimentary velcro tie',
      'Compatible with all Type-C phones, tablets & power banks'
    ],
    specs: {
      'Length': '1.2 Meters (4 Feet)',
      'Current Rating': '3.0 Amp Max Fast Charge',
      'Material': 'Braided Nylon + Pure Tinned Copper Core',
      'Bend Test': '15,000+ bends tested',
      'Warranty': '7 Days Replacement'
    },
    inStock: true,
    isPopular: false
  },
  {
    id: 'led-desk-lamp',
    name: 'LED Desk Lamp',
    category: 'Other Accessories',
    price: 1299,
    originalPrice: 1799,
    image: lampImg,
    tagline: 'Eye-care dimmable LED study light with touch control & foldable arm',
    description:
      'Perfect for late-night studying, office work, or bedside reading. Features flicker-free, glare-reduced warm and cool lighting with smooth touch dimming. Can be powered via USB power bank or wall charger.',
    features: [
      'Flicker-free eye protection technology (No blue-light hazard)',
      'Sensitive touch switch with multi-level brightness adjustment',
      '3 color temperatures: Warm Light, Natural Light, Cool White',
      '180-degree flexible hinge to direct beam precisely',
      'USB powered — ideal for use during load-shedding with a power bank'
    ],
    specs: {
      'LED Count': '24 High-luminescence SMD LEDs',
      'Color Temperature': '3000K - 6000K',
      'Power Source': 'USB 5V/1A Input',
      'Power Consumption': '5W Max',
      'Foldable Height': '33 cm'
    },
    inStock: true,
    isPopular: false
  }
];

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    productId: 'wireless-earbuds',
    authorName: 'Hamza Tariq',
    authorCity: 'Karachi',
    rating: 5,
    date: '2026-08-14',
    title: 'Superb quality for 999 Rs!',
    comment:
      'Honestly was not expecting this level of sound quality for just Rs. 999. Bass is punchy, connects instantly with my Xiaomi phone, and battery easily lasts 5 hours on a single charge. Delivered to Gulshan-e-Iqbal in 2 days.',
    verifiedPurchase: true,
    helpfulCount: 14
  },
  {
    id: 'rev-2',
    productId: 'wireless-earbuds',
    authorName: 'Zainab Bibi',
    authorCity: 'Lahore',
    rating: 5,
    date: '2026-08-28',
    title: 'Very comfortable and clear mic',
    comment:
      'Bought these for online university lectures. The ear tips fit snugly and the microphone clarity is great on WhatsApp calls. Highly recommended A.M Accessories!',
    verifiedPurchase: true,
    helpfulCount: 9
  },
  {
    id: 'rev-3',
    productId: 'fast-typec-charger',
    authorName: 'Muhammad Bilal',
    authorCity: 'Rawalpindi',
    rating: 5,
    date: '2026-09-02',
    title: 'Fast charging works perfectly',
    comment:
      'Charges my Samsung phone from 15% to 80% in about 40 minutes. Charger doesn’t heat up excessively like cheap local market adapters. Genuine quality.',
    verifiedPurchase: true,
    helpfulCount: 11
  },
  {
    id: 'rev-4',
    productId: 'power-bank-20000mah',
    authorName: 'Syed Owais',
    authorCity: 'Karachi',
    rating: 5,
    date: '2026-09-08',
    title: 'Lifesaver in load shedding!',
    comment:
      'The 20000mAh capacity is 100% real. The digital LED display showing exact battery percentage is super handy. Charged my phone 4 times and still had 22% left.',
    verifiedPurchase: true,
    helpfulCount: 19
  },
  {
    id: 'rev-5',
    productId: 'smart-watch',
    authorName: 'Adeel Khan',
    authorCity: 'Islamabad',
    rating: 4,
    date: '2026-09-12',
    title: 'Looks premium on the wrist',
    comment:
      'The screen brightness is crisp outdoors in the sun. Call alerts and steps counter are accurate. Great value for Rs. 2,499. Arrived nicely packed in bubble wrap.',
    verifiedPurchase: true,
    helpfulCount: 7
  },
  {
    id: 'rev-6',
    productId: 'mobile-phone-holder',
    authorName: 'Fatima Noor',
    authorCity: 'Faisalabad',
    rating: 5,
    date: '2026-09-15',
    title: 'Solid metal body, no shaking',
    comment:
      'Very sturdy aluminum material. Doesn’t tilt over even when holding an iPad. Rubber pads protect the phone from scratches. Good deal for Rs. 699.',
    verifiedPurchase: true,
    helpfulCount: 4
  },
  {
    id: 'rev-7',
    productId: 'bluetooth-speaker',
    authorName: 'Usman Ali',
    authorCity: 'Multan',
    rating: 5,
    date: '2026-09-18',
    title: 'Surprising volume for compact size',
    comment:
      'Bass is deep and sound does not distort even at 90% volume. We used it for a rooftop BBQ party and it was plenty loud. Bluetooth connection is solid.',
    verifiedPurchase: true,
    helpfulCount: 8
  },
  {
    id: 'rev-8',
    productId: 'usb-typec-cable',
    authorName: 'Kashif Mehmood',
    authorCity: 'Peshawar',
    rating: 5,
    date: '2026-09-20',
    title: 'Durable nylon braid',
    comment:
      'Much stronger than the standard white rubber cables that tear in 2 months. Supports fast charging on my Infinix Note. Will order again.',
    verifiedPurchase: true,
    helpfulCount: 5
  },
  {
    id: 'rev-9',
    productId: 'led-desk-lamp',
    authorName: 'Maria Riaz',
    authorCity: 'Lahore',
    rating: 5,
    date: '2026-09-22',
    title: 'Excellent study light',
    comment:
      'The three light warmth modes (warm, natural, cool) are gentle on the eyes for nighttime reading. Plugged it into my power bank and it works smoothly during outages.',
    verifiedPurchase: true,
    helpfulCount: 6
  }
];

export const BUSINESS_INFO = {
  name: 'A.M ACCESSORIES',
  type: 'Online Shopping Store',
  tagline: 'Quality Accessories, Better Connections.',
  phone: '+92 3462557668',
  phoneRaw: '+923462557668',
  whatsapp: '+92 317 7840238',
  whatsappRaw: '923177840238',
  email: 'mutaalabdul89@gmail.com',
  location: 'Karachi, Sindh, Pakistan',
  delivery: 'Nationwide delivery across Pakistan',
  deliveryTime: '3–5 working days',
  shippingFee: 150,
  freeShippingThreshold: 1000000000,
  aboutParagraphs: [
    'Welcome to A.M Accessories, your trusted destination for premium mobile accessories and everyday tech essentials. We are dedicated to providing high-quality products that combine performance, durability, and affordability.',
    'Our product range includes mobile chargers, USB and Type-C data cables, iPhone accessories, power banks, wireless earbuds, AirPods, mobile protectors, and many other essential accessories. Every product is carefully selected to ensure it meets our standards for quality and reliability.',
    'At A.M Accessories, customer satisfaction is our top priority. We believe in offering genuine products, competitive prices, and friendly customer service. Whether you\'re replacing an old accessory or upgrading to the latest technology, we\'re here to help you find the perfect solution.',
    'Our goal is to make shopping simple, convenient, and enjoyable by providing reliable products and excellent support. Thank you for choosing A.M Accessories. We look forward to serving you and becoming your trusted partner for all your mobile accessory needs.'
  ],
  bankDetails: {
    bankIslami: {
      bankName: 'BankIslami Pakistan Limited',
      accountTitle: 'Abdul Mutaal / A.M ACCESSORIES',
      accountNumber: '100800123450001',
      iban: 'PK36BKIP0100800123450001'
    },
    meezanBank: {
      bankName: 'Meezan Bank Limited',
      accountTitle: 'A.M ACCESSORIES STORE',
      accountNumber: '02840105892301',
      iban: 'PK49MEZN0002840105892301'
    }
  },
  easypaisaNumber: '03177840238',
  jazzcashNumber: '03410219550'
};
