// Mock data for the coworking website

export const pricingPlans = [
  {
    id: 'lounge',
    name: 'Lounge',
    price: 29,
    period: 'month',
    description: 'Perfect for freelancers who need occasional workspace access.',
    features: [
      'Access to lounge area',
      'High-speed Wi-Fi',
      '5 hours meeting room/month',
      'Community events access',
    ],
    isPopular: false,
  },
  {
    id: 'smart-office',
    name: 'Smart Office',
    price: 39,
    period: 'month',
    description: 'Ideal for remote workers who need a dedicated desk.',
    features: [
      'Dedicated desk access',
      'High-speed Wi-Fi',
      '10 hours meeting room/month',
      'Mail handling',
    ],
    isPopular: true,
  },
  {
    id: 'full-space',
    name: 'Full Space',
    price: 59,
    period: 'month',
    description: 'Complete access to all amenities and private office.',
    features: [
      'Private office access',
      'High-speed Wi-Fi',
      'Unlimited meeting rooms',
      '24/7 access',
    ],
    isPopular: false,
  },
];

export const meetingRoomPlans = [
  {
    id: 'day-pass',
    name: 'Day Pass',
    price: 18,
    period: 'day',
    isPopular: false,
  },
  {
    id: 'flex',
    name: 'Flex',
    price: 149,
    period: 'month',
    isPopular: true,
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    price: 299,
    period: 'month',
    isPopular: false,
  },
];

export const featureComparison = [
  { feature: 'Workspace Access', lounge: true, smartOffice: true, fullSpace: true },
  { feature: 'High-Speed Wi-Fi', lounge: true, smartOffice: true, fullSpace: true },
  { feature: 'Meeting Room Hours', lounge: '5 hrs', smartOffice: '10 hrs', fullSpace: 'Unlimited' },
  { feature: 'Dedicated Desk', lounge: false, smartOffice: true, fullSpace: true },
  { feature: 'Private Office', lounge: false, smartOffice: false, fullSpace: true },
  { feature: 'Mail Handling', lounge: false, smartOffice: true, fullSpace: true },
  { feature: '24/7 Access', lounge: false, smartOffice: false, fullSpace: true },
  { feature: 'Team Members', lounge: '1', smartOffice: '1-3', fullSpace: '1-10' },
];

export const meetingRooms = [
  {
    id: 'focus-room',
    name: 'Focus Room',
    description: 'A quiet, private space designed for deep work and one-on-one meetings. Equipped with ergonomic furniture and soundproofing for maximum concentration.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    capacity: 4,
    features: ['Whiteboard', 'Video conferencing', 'Soundproof', 'Ergonomic chairs'],
    badges: ['4 people', 'Whiteboard', 'Video call'],
  },
  {
    id: 'meeting-suite',
    name: 'Meeting Suite',
    description: 'Our flagship meeting room perfect for client presentations, team meetings, and workshops. Features state-of-the-art AV equipment and comfortable seating.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    capacity: 12,
    features: ['Large display', 'Video conferencing', 'Catering available', 'Natural light'],
    badges: ['12 people', 'Display', 'Catering'],
  },
  {
    id: 'open-lounge',
    name: 'Open Lounge',
    description: 'A relaxed, open environment for informal meetings and collaborative sessions. Perfect for brainstorming and creative work with your team.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    capacity: 20,
    features: ['Flexible seating', 'Coffee bar access', 'Natural light', 'Collaborative space'],
    badges: ['20 people', 'Flexible', 'Coffee'],
  },
];

export const amenities = [
  { icon: 'Wifi', title: 'Fast Wi-Fi', description: 'Gigabit internet for seamless work' },
  { icon: 'Coffee', title: 'Coffee Bar', description: 'Complimentary premium coffee & tea' },
  { icon: 'Phone', title: 'Call Pods', description: 'Private booths for calls' },
  { icon: 'Shield', title: 'Secure Access', description: '24/7 keycard entry system' },
  { icon: 'Users', title: 'Community', description: 'Networking events & workshops' },
  { icon: 'Zap', title: 'Reliable', description: 'Backup power & redundant systems' },
];

export const blogPosts = [
  {
    id: 'flexible-workspaces-productivity',
    title: 'How Flexible Workspaces Help You Stay Productive',
    excerpt: 'Discover how modern coworking spaces are designed to boost your focus and creativity while maintaining work-life balance.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
    category: 'Productivity',
    date: '2026-01-15',
    readTime: '5 min read',
    tags: ['Productivity', 'Remote Work', 'Workspace'],
    author: 'Sarah Johnson',
  },
  {
    id: 'future-of-coworking',
    title: 'The Future of Coworking in 2026 and Beyond',
    excerpt: 'Explore the latest trends shaping the coworking industry and what they mean for businesses and freelancers.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600',
    category: 'Industry',
    date: '2026-01-10',
    readTime: '7 min read',
    tags: ['Trends', 'Industry', 'Future'],
    author: 'Michael Chen',
  },
  {
    id: 'building-community-workspace',
    title: 'Building Community in Your Workspace',
    excerpt: 'Learn how to create meaningful connections and build a supportive professional network in shared workspaces.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600',
    category: 'Community',
    date: '2026-01-05',
    readTime: '4 min read',
    tags: ['Community', 'Networking', 'Culture'],
    author: 'Emily Roberts',
  },
  {
    id: 'choosing-right-membership',
    title: 'Choosing the Right Membership for Your Needs',
    excerpt: 'A comprehensive guide to selecting the perfect coworking membership based on your work style and requirements.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600',
    category: 'Guide',
    date: '2025-12-28',
    readTime: '6 min read',
    tags: ['Guide', 'Membership', 'Tips'],
    author: 'David Wilson',
  },
  {
    id: 'remote-work-best-practices',
    title: 'Remote Work Best Practices for 2026',
    excerpt: 'Essential tips and strategies for maintaining productivity and well-being while working remotely.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600',
    category: 'Remote Work',
    date: '2025-12-20',
    readTime: '8 min read',
    tags: ['Remote Work', 'Tips', 'Wellness'],
    author: 'Lisa Anderson',
  },
];

export const blogCategories = [
  'All',
  'Productivity',
  'Industry',
  'Community',
  'Guide',
  'Remote Work',
  'Wellness',
];

export const popularTags = [
  'Productivity',
  'Remote Work',
  'Coworking',
  'Networking',
  'Tips',
  'Industry',
  'Wellness',
  'Guide',
];

export const faqItems = [
  {
    question: 'What membership plans do you offer?',
    answer: 'We offer three main membership plans: Lounge (£29/month) for occasional workspace access, Smart Office (£39/month) for dedicated desk access, and Full Space (£59/month) for complete access including private offices. Each plan comes with different perks and meeting room hours.',
  },
  {
    question: 'Can I try the space before committing?',
    answer: 'Absolutely! We offer free day passes for first-time visitors. You can book a tour and experience our space firsthand before making any commitment.',
  },
  {
    question: 'What are your operating hours?',
    answer: 'Our standard hours are Monday to Friday, 8:00 AM to 8:00 PM. Full Space members enjoy 24/7 access with their keycard.',
  },
  {
    question: 'Is there parking available?',
    answer: 'Yes, we have both street parking and a dedicated parking garage nearby. Members receive discounted parking rates.',
  },
  {
    question: 'Can I book meeting rooms as a non-member?',
    answer: 'Yes, meeting rooms can be booked by non-members on an hourly basis. Contact us for rates and availability.',
  },
  {
    question: 'Do you offer virtual office services?',
    answer: 'Yes, our virtual office service includes a prestigious business address, mail handling, and access to meeting rooms when needed.',
  },
  {
    question: 'What amenities are included?',
    answer: 'All memberships include high-speed Wi-Fi, access to our coffee bar, printing facilities, and community events. Higher tier plans include additional perks like dedicated desks and extended hours.',
  },
  {
    question: 'Can I upgrade or downgrade my membership?',
    answer: 'Yes, you can change your membership plan at any time. Changes take effect at the start of your next billing cycle.',
  },
];

export const testimonials = [
  {
    name: 'Alexandra Chen',
    role: 'Freelance Designer',
    content: 'CoworkingHub has transformed how I work. The community is amazing and the facilities are top-notch. I\'ve never been more productive!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  {
    name: 'Marcus Thompson',
    role: 'Startup Founder',
    content: 'The perfect environment for our growing team. The flexible meeting rooms and professional atmosphere have helped us close several major deals.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
  {
    name: 'Sophie Williams',
    role: 'Remote Developer',
    content: 'Fast internet, great coffee, and even better people. This is my go-to workspace whenever I need to focus or collaborate.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
  },
];

export const dashboardUser = {
  name: 'John',
  email: 'john@example.com',
  initials: 'JD',
  plan: 'Smart Office',
  memberSince: '2024-03-15',
  monthlyFee: 250,
  nextBilling: '2026-02-15',
  paymentMethod: {
    type: 'Visa',
    last4: '4242',
  },
  benefits: [
    'Dedicated desk access',
    'High-speed Wi-Fi',
    '10 hours meeting room/month',
    'Mail handling',
    'Community events',
  ],
};

export const dashboardStats = {
  daysCheckedIn: 18,
  meetingRoomBookings: 4,
  currentMembership: 250,
};

export const upcomingBookings = [
  {
    id: 1,
    room: 'Meeting Suite',
    date: '2026-02-10',
    time: '10:00 AM - 12:00 PM',
  },
  {
    id: 2,
    room: 'Focus Room',
    date: '2026-02-12',
    time: '2:00 PM - 4:00 PM',
  },
  {
    id: 3,
    room: 'Open Lounge',
    date: '2026-02-15',
    time: '9:00 AM - 11:00 AM',
  },
];

export const recentInvoices = [
  {
    id: 'INV-2026-001',
    date: '2026-01-15',
    amount: 250,
    status: 'Paid',
  },
  {
    id: 'INV-2025-012',
    date: '2025-12-15',
    amount: 250,
    status: 'Paid',
  },
  {
    id: 'INV-2025-011',
    date: '2025-11-15',
    amount: 250,
    status: 'Paid',
  },
];

export const relatedWorkspaces = [
  {
    id: 'private-office-1',
    title: 'Executive Suite',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    category: 'Private Office',
  },
  {
    id: 'private-office-2',
    title: 'Team Space',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400',
    category: 'Private Office',
  },
  {
    id: 'private-office-3',
    title: 'Corner Office',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
    category: 'Private Office',
  },
];

export const services = [
  {
    id: 'coworking',
    title: 'Coworking',
    description: 'Flexible workspace solutions for individuals and teams.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500',
  },
  {
    id: 'meeting-room',
    title: 'Meeting Room',
    description: 'Professional meeting spaces equipped with modern technology.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500',
  },
  {
    id: 'virtual-office',
    title: 'Virtual Office',
    description: 'A prestigious business address without the office cost.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500',
  },
];

export const whyChooseUs = [
  {
    icon: 'LayoutGrid',
    title: 'Flexible Workstations',
    description: 'Choose from hot desks, dedicated desks, or private offices based on your needs.',
  },
  {
    icon: 'Lock',
    title: 'Private Cabinet Store',
    description: 'Secure storage solutions for your personal belongings and work materials.',
  },
  {
    icon: 'HeadphonesIcon',
    title: 'Professional Support',
    description: 'Dedicated staff to assist with your daily needs and ensure smooth operations.',
  },
];

export const aboutAmenities = [
  { icon: 'Wifi', title: 'High-Speed Internet', description: 'Gigabit fiber connection throughout the space' },
  { icon: 'Users', title: 'Modern Meeting Rooms', description: 'State-of-the-art conference facilities' },
  { icon: 'Coffee', title: 'Kitchen & Breakout Areas', description: 'Fully equipped kitchen and relaxation zones' },
  { icon: 'Printer', title: 'Print & Scan Facilities', description: 'Professional printing and scanning services' },
];
