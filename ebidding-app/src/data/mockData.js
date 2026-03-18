export const depotList = [
  { name: 'LUCKNOW', code: 6601 },
  { name: 'AYODHYA', code: 6602 },
  { name: 'SITAPUR', code: 6605 },
  { name: 'GONDA', code: 6606 },
  { name: 'HARDOI', code: 6608 },
  { name: 'TANDA RAIL HUB', code: 6616 },
  { name: 'UTCL TANDA HUB', code: 6617 },
  { name: 'GORAKHPUR', code: 6622 },
  { name: 'MAU', code: 6623 },
  { name: 'DEORIA', code: 6624 },
  { name: 'BASTI', code: 6637 },
];

export const orderTypes = [
  { name: 'CUSTOMER ORDER', code: 1 },
  { name: 'TRANSFER ORDER', code: 2 },
];

export const plants = [
  'TANDA CEMENT WORKS',
  'ARAKKONAM CEMENT WORKS',
  'HIRMI CEMENT WORKS',
];

export const packTypes = [
  '1127-BAG-AL/REGULAR/TRADE/MCV3',
  '1126-BAG-AL/REGULAR/TRADE/MCV2',
  '1130-BAG-AL/PREMIUM/TRADE/MCV3',
];

export const destinations = ['SITAPUR', 'LUCKNOW', 'AYODHYA', 'GONDA', 'HARDOI', 'GORAKHPUR', 'MAU', 'DEORIA', 'BASTI'];

const baseClubId = 5570333955;

export const mockOrders = Array.from({ length: 20 }, (_, i) => {
  const dest = destinations[i % destinations.length];
  const depot = destinations[i % destinations.length];
  const qty = i % 3 === 0 ? 35.0 : 30.0;
  const freight = qty === 35.0 ? 659 : 674;
  return {
    id: i + 1,
    clubId: String(baseClubId - i * 67),
    cofOrderId: '',
    segment: 'Trade Customer',
    destination: dest,
    taluka: dest,
    depot: depot,
    bgp: 'PPC-ULTRATECH CEMENT-LAMINATED PAPER PACK',
    processingDate: '20/03/2026 00:25:48',
    truckReportingDate: '19/03/2026 21:25:48',
    orderQuantity: qty.toFixed(3),
    spi: qty === 35.0 ? '1126-BAG-AL/REGULAR/TRADE/MCV2' : '1127-BAG-AL/REGULAR/TRADE/MCV3',
    freight,
    bidAmount: 0,
    bidRank: 0,
    avgWtBidAmount: 0,
    freightWeighted: freight,
    l1BidAmount: 0,
    cofLineId: '000102',
    customerOrg: 'JAI BHARAT ENTERPRISES (SIS)',
    creationDate: '18/3/2026',
    shipFromPlant: 'TANDA CEMENT WORKS',
    deliveryWindow: 'Working Hours2 (1PM - 7PM)',
    biddingRemark: '',
    competitorBids: [
      { vendor: 'Vendor A', amount: freight - Math.floor(Math.random() * 30 + 10) },
      { vendor: 'Vendor B', amount: freight - Math.floor(Math.random() * 25 + 5) },
    ],
  };
});

export const mockVendors = [
  { id: 'V001', name: 'GANGOTRI STEEL', contact: '9876543210', depots: ['SITAPUR', 'LUCKNOW'], status: 'Active', lastBid: '18/03/2026 09:15' },
  { id: 'V002', name: 'SHARMA TRANSPORT', contact: '9876543211', depots: ['AYODHYA', 'GONDA'], status: 'Active', lastBid: '18/03/2026 08:42' },
  { id: 'V003', name: 'RAJ LOGISTICS', contact: '9876543212', depots: ['GORAKHPUR', 'MAU'], status: 'Active', lastBid: '18/03/2026 07:30' },
  { id: 'V004', name: 'SINGH CARRIERS', contact: '9876543213', depots: ['HARDOI', 'DEORIA'], status: 'Active', lastBid: '17/03/2026 16:20' },
  { id: 'V005', name: 'GUPTA FREIGHT', contact: '9876543214', depots: ['BASTI', 'LUCKNOW'], status: 'Inactive', lastBid: '16/03/2026 14:10' },
  { id: 'V006', name: 'VERMA MOVERS', contact: '9876543215', depots: ['SITAPUR', 'AYODHYA'], status: 'Active', lastBid: '18/03/2026 10:05' },
  { id: 'V007', name: 'PATEL TRANSPORT', contact: '9876543216', depots: ['GONDA', 'GORAKHPUR'], status: 'Active', lastBid: '18/03/2026 09:55' },
  { id: 'V008', name: 'YADAV LOGISTICS', contact: '9876543217', depots: ['MAU', 'DEORIA'], status: 'Inactive', lastBid: '15/03/2026 11:30' },
  { id: 'V009', name: 'MISHRA CARRIERS', contact: '9876543218', depots: ['HARDOI', 'BASTI'], status: 'Active', lastBid: '18/03/2026 08:15' },
  { id: 'V010', name: 'TIWARI FREIGHT', contact: '9876543219', depots: ['LUCKNOW', 'SITAPUR'], status: 'Active', lastBid: '18/03/2026 07:45' },
];

export const mockTenders = [
  { id: 'T-2026-001', route: 'TANDA → SITAPUR', depot: 'SITAPUR', quantity: 300, baseFreight: 674, status: 'ACTIVE', created: '17/03/2026', vendors: ['V001', 'V002', 'V006'] },
  { id: 'T-2026-002', route: 'TANDA → LUCKNOW', depot: 'LUCKNOW', quantity: 500, baseFreight: 720, status: 'ACTIVE', created: '17/03/2026', vendors: ['V001', 'V005', 'V010'] },
  { id: 'T-2026-003', route: 'TANDA → AYODHYA', depot: 'AYODHYA', quantity: 250, baseFreight: 650, status: 'DRAFT', created: '16/03/2026', vendors: [] },
  { id: 'T-2026-004', route: 'TANDA → GONDA', depot: 'GONDA', quantity: 180, baseFreight: 690, status: 'ACTIVE', created: '16/03/2026', vendors: ['V002', 'V007'] },
  { id: 'T-2026-005', route: 'TANDA → GORAKHPUR', depot: 'GORAKHPUR', quantity: 400, baseFreight: 810, status: 'CLOSED', created: '15/03/2026', vendors: ['V003', 'V007'] },
  { id: 'T-2026-006', route: 'TANDA → HARDOI', depot: 'HARDOI', quantity: 220, baseFreight: 660, status: 'ACTIVE', created: '18/03/2026', vendors: ['V004', 'V009'] },
  { id: 'T-2026-007', route: 'TANDA → MAU', depot: 'MAU', quantity: 150, baseFreight: 780, status: 'DRAFT', created: '18/03/2026', vendors: [] },
  { id: 'T-2026-008', route: 'TANDA → DEORIA', depot: 'DEORIA', quantity: 200, baseFreight: 750, status: 'ACTIVE', created: '18/03/2026', vendors: ['V004', 'V008'] },
];

export const mockAdminStats = {
  totalActiveTenders: 5,
  totalBidsToday: 142,
  vendorsOnline: 7,
  tendersClosingSoon: 2,
};

const statuses = ['WON', 'LOST', 'ACTIVE'];
export const bidHistory = Array.from({ length: 30 }, (_, i) => ({
  id: `BH-${1000 + i}`,
  orderId: String(baseClubId - i * 50),
  depot: depotList[i % depotList.length].name,
  destination: destinations[i % destinations.length],
  bidAmount: 600 + Math.floor(Math.random() * 80),
  freight: 674,
  status: statuses[i % 3],
  date: `${18 - (i % 5)}/03/2026`,
  rank: (i % 3) + 1,
}));

export const bidsPerDepot = depotList.map(d => ({
  name: d.name,
  bids: Math.floor(Math.random() * 50 + 10),
}));

export const orderTypeDistribution = [
  { name: 'Customer Order', value: 65 },
  { name: 'Transfer Order', value: 35 },
];

export const biddingActivityData = [
  { day: 'Mon', bids: 12, won: 4 },
  { day: 'Tue', bids: 18, won: 7 },
  { day: 'Wed', bids: 15, won: 5 },
  { day: 'Thu', bids: 22, won: 9 },
  { day: 'Fri', bids: 19, won: 6 },
  { day: 'Sat', bids: 8, won: 3 },
  { day: 'Sun', bids: 5, won: 2 },
];

export const platformActivityData = [
  { month: 'Oct', bids: 1200, companies: 15 },
  { month: 'Nov', bids: 1500, companies: 18 },
  { month: 'Dec', bids: 1350, companies: 20 },
  { month: 'Jan', bids: 1800, companies: 22 },
  { month: 'Feb', bids: 2100, companies: 25 },
  { month: 'Mar', bids: 2400, companies: 28 },
];

export const customerOrders = Array.from({ length: 15 }, (_, i) => ({
  id: `ORD-${5000 + i}`,
  depot: depotList[i % depotList.length].name,
  destination: destinations[i % destinations.length],
  quantity: (i % 3 === 0 ? 35 : 30).toFixed(3),
  status: ['BIDDING', 'ALLOCATED', 'PENDING'][i % 3],
  l1Bid: 640 + Math.floor(Math.random() * 40),
  assignedVendor: i % 3 === 1 ? mockVendors[i % mockVendors.length].name : '-',
}));

export const mockCompanies = [
  { id: 'C001', name: 'GANGOTRI STEEL', plan: 'Enterprise', users: 12, status: 'Active', joined: '01/01/2025' },
  { id: 'C002', name: 'TATA CEMENT LTD', plan: 'Professional', users: 8, status: 'Active', joined: '15/03/2025' },
  { id: 'C003', name: 'AMBUJA LOGISTICS', plan: 'Basic', users: 3, status: 'Active', joined: '20/06/2025' },
  { id: 'C004', name: 'ULTRATECH DISPATCH', plan: 'Enterprise', users: 15, status: 'Active', joined: '10/09/2025' },
  { id: 'C005', name: 'ACC CARRIERS', plan: 'Professional', users: 6, status: 'Inactive', joined: '05/12/2025' },
];

export const subscriptionPlans = [
  { name: 'Basic', price: '₹9,999/mo', features: ['Up to 5 users', '50 bids/month', 'Email support', 'Basic reports'], activeCompanies: 12 },
  { name: 'Professional', price: '₹24,999/mo', features: ['Up to 20 users', 'Unlimited bids', 'Priority support', 'Advanced reports', 'API access'], activeCompanies: 28 },
  { name: 'Enterprise', price: '₹49,999/mo', features: ['Unlimited users', 'Unlimited bids', '24/7 support', 'Custom reports', 'API access', 'White-label', 'Dedicated manager'], activeCompanies: 8 },
];

export const recentAdminActivity = [
  { time: '10:05 AM', text: 'GANGOTRI STEEL placed bid ₹654 on T-2026-001', type: 'bid' },
  { time: '09:58 AM', text: 'SHARMA TRANSPORT placed bid ₹648 on T-2026-004', type: 'bid' },
  { time: '09:45 AM', text: 'Tender T-2026-006 created for HARDOI route', type: 'tender' },
  { time: '09:30 AM', text: 'RAJ LOGISTICS logged in', type: 'login' },
  { time: '09:15 AM', text: 'GANGOTRI STEEL placed bid ₹660 on T-2026-002', type: 'bid' },
  { time: '09:00 AM', text: 'Bidding started for T-2026-001', type: 'system' },
  { time: '08:42 AM', text: 'SHARMA TRANSPORT placed bid ₹670 on T-2026-001', type: 'bid' },
  { time: '08:30 AM', text: 'Admin created tender T-2026-008', type: 'tender' },
];

export const orderTrendData = [
  { day: '12 Mar', orders: 8 },
  { day: '13 Mar', orders: 12 },
  { day: '14 Mar', orders: 10 },
  { day: '15 Mar', orders: 15 },
  { day: '16 Mar', orders: 11 },
  { day: '17 Mar', orders: 18 },
  { day: '18 Mar', orders: 14 },
];
