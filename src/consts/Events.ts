const EVENTS = [
  {
    title: 'AI and Machine Learning Workshop',
    date: 'Monday, 9th February',
    time: '12:00 pm',
    location: 'Online event (Zoom)',
    image: '/images/ai-workshop.jpg',
    description:
      "Join us for a comprehensive workshop on AI and Machine Learning, where we will delve into the latest trends and cutting-edge technologies in the field. This workshop is designed for both beginners and experienced professionals, offering a deep dive into machine learning algorithms, neural networks, and practical AI applications. Participants will have the opportunity to engage with industry experts, participate in hands-on sessions, and network with peers. Don't miss out on this chance to enhance your skills and knowledge in AI and ML.",
    attendees: 150,
    id: 101,
    tags: ['AI', 'Machine Learning', 'Workshop'],
    eventBrochure: 'AI_ML_Workshop_Brochure.pdf',
  },
  {
    title: 'Blockchain Technology Seminar',
    date: 'Tuesday, 10th February',
    time: '3:00 pm',
    location: 'Online event (Zoom)',
    image: '/images/block-chain.jpg',
    description:
      "This seminar will provide an in-depth look at Blockchain technology, exploring its potential to revolutionize various industries. Experts will discuss the fundamentals of Blockchain, its security features, and real-world applications. Whether you're a developer, entrepreneur, or tech enthusiast, this seminar will offer valuable insights into the future of Blockchain. Participants will also have the opportunity to ask questions and engage in discussions with leading Blockchain professionals.",
    attendees: 200,
    id: 102,
    tags: ['Blockchain', 'Technology', 'Seminar'],
    eventBrochure: 'Blockchain_Seminar_Brochure.pdf',
  },
  {
    title: 'Women in Tech Networking Night',
    date: 'Wednesday, 11th July',
    time: '6:00 pm',
    location: 'Login Lounge, UK',
    image: '/images/women-in-tech.jpg',
    description:
      "Join us for a special networking night dedicated to women in the tech industry. This event is an excellent opportunity to connect with fellow professionals, share experiences, and build lasting relationships. The evening will feature keynote speeches from influential women leaders in tech, interactive networking sessions, and plenty of opportunities for informal conversations. Whether you're looking to expand your network, find a mentor, or simply have a great time with like-minded individuals, this event is not to be missed.",
    attendees: 100,
    id: 103,
    tags: ['Women in Tech', 'Networking', 'Night Event'],
    eventBrochure: 'Women_in_Tech_Brochure.pdf',
  },
  {
    title: 'Cybersecurity Conference',
    date: 'Monday, 9th February',
    time: '10:00 am',
    location: 'VC Mall, Itahari',
    image: '/images/cybersecurity.jpg',
    description:
      'The annual Cybersecurity Conference brings together professionals from around the globe to discuss the latest threats, defense strategies, and innovations in the field of cybersecurity. Attendees will have access to keynote presentations from top industry experts, breakout sessions on various cybersecurity topics, and an exhibition hall showcasing the latest products and services. This conference is essential for anyone involved in protecting digital assets and managing cybersecurity risks.',
    attendees: 300,
    id: 104,
    tags: ['Cybersecurity', 'Conference', 'Tech'],
    eventBrochure: 'Cybersecurity_Conference_Brochure.pdf',
  },
  {
    title: 'Startup Pitch Competition',
    date: 'Thursday, 12th February',
    time: '1:00 pm',
    location: 'LFEBS, Itahari',
    image: '/images/entrepreneur.jpg',
    description:
      'Watch as some of the most innovative startups pitch their ideas to a panel of experienced judges and potential investors. This competition provides a platform for entrepreneurs to showcase their business ideas, gain valuable feedback, and compete for investment opportunities. Attendees will have the chance to network with investors, learn about emerging trends in the startup ecosystem, and be inspired by the creativity and ingenuity of the participants.',
    attendees: 250,
    id: 105,
    tags: ['Startup', 'Pitch', 'Competition'],
    eventBrochure: 'Startup_Pitch_Brochure.pdf',
  },
  {
    title: 'Virtual Reality Expo',
    date: 'Friday, 13th February',
    time: '11:00 am',
    location: 'Sardu, Dharan',
    image: '/images/vr.jpg',
    description:
      "Explore the fascinating world of Virtual Reality at our annual expo. This event features a wide range of VR applications, from gaming and entertainment to education and healthcare. Attendees will have the opportunity to experience live VR demonstrations, attend workshops on VR development, and interact with leading VR experts. Whether you're a VR enthusiast, a developer, or just curious about the technology, this expo offers something for everyone.",
    attendees: 200,
    id: 106,
    tags: ['Virtual Reality', 'Expo', 'Technology'],
    eventBrochure: 'VR_Expo_Brochure.pdf',
  },
  {
    title: 'Data Science Bootcamp',
    date: 'Saturday, 14th February',
    time: '9:00 am',
    location: 'Tech Hub, Kathmandu',
    image: '/images/data-science.jpg',
    description:
      "Join our intensive Data Science Bootcamp designed to equip you with the skills and knowledge needed to excel in the field of data science. This bootcamp covers various topics, including data analysis, machine learning, and data visualization. Participants will work on real-world projects, gain hands-on experience with popular data science tools, and receive guidance from experienced instructors. Whether you're looking to start a career in data science or enhance your existing skills, this bootcamp is the perfect opportunity.",
    attendees: 180,
    id: 107,
    tags: ['Data Science', 'Bootcamp', 'Training'],
    eventBrochure: 'Data_Science_Bootcamp_Brochure.pdf',
  },
  {
    title: 'Fintech Innovations Summit',
    date: 'Sunday, 15th February',
    time: '10:00 am',
    location: 'Business Center, Pokhara',
    image: '/images/innovation.jpg',
    description:
      'The Fintech Innovations Summit brings together industry leaders, entrepreneurs, and technology enthusiasts to discuss the latest trends and advancements in financial technology. This summit will feature keynote presentations, panel discussions, and networking sessions focused on topics such as blockchain, digital banking, and financial inclusion. Attendees will have the opportunity to learn from experts, share ideas, and explore the future of fintech.',
    attendees: 220,
    id: 108,
    tags: ['Fintech', 'Innovations', 'Summit'],
    eventBrochure: 'Fintech_Innovations_Summit_Brochure.pdf',
  },
  {
    title: 'Green Technology Expo',
    date: 'Monday, 16th February',
    time: '11:00 am',
    location: 'Expo Center, Biratnagar',
    image: '/images/green.jpg',
    description:
      "Discover the latest innovations in green technology at our annual expo. This event showcases a wide range of sustainable technologies and solutions aimed at promoting environmental conservation and energy efficiency. Attendees will have the chance to explore exhibits, attend workshops, and interact with industry experts. Whether you're an environmental advocate, a tech enthusiast, or a business professional, this expo offers valuable insights into the future of green technology.",
    attendees: 150,
    id: 109,
    tags: ['Green Technology', 'Expo', 'Sustainability'],
    eventBrochure: 'Green_Technology_Expo_Brochure.pdf',
  },
  {
    title: 'Robotics and Automation Workshop',
    date: 'Tuesday, 17th February',
    time: '2:00 pm',
    location: 'Innovation Lab, Patan',
    image: '/images/robotics.jpg',
    description:
      'Join us for an engaging workshop on robotics and automation, where you will learn about the latest developments in the field and gain hands-on experience with cutting-edge technologies. This workshop covers various topics, including robot design, programming, and automation techniques. Participants will work on projects, interact with industry professionals, and explore the potential applications of robotics and automation in different sectors.',
    attendees: 170,
    id: 110,
    tags: ['Robotics', 'Automation', 'Workshop'],
    eventBrochure: 'Robotics_Automation_Workshop_Brochure.pdf',
  },
  {
    title: 'Tech Leadership Conference',
    date: 'Wednesday, 18th February',
    time: '9:00 am',
    location: 'Leadership Center, Lalitpur',
    image: '/images/seminar.jpg',
    description:
      'The Tech Leadership Conference is designed for professionals seeking to enhance their leadership skills in the technology industry. This conference features keynote speeches, panel discussions, and interactive sessions with experienced leaders from top tech companies. Topics include strategic leadership, team management, and innovation in technology. Attendees will have the opportunity to network with peers, share experiences, and gain valuable insights into effective leadership practices.',
    attendees: 250,
    id: 111,
    tags: ['Tech Leadership', 'Conference', 'Professional Development'],
    eventBrochure: 'Tech_Leadership_Conference_Brochure.pdf',
  },
  {
    title: 'Cloud Computing Summit',
    date: 'Thursday, 19th February',
    time: '11:00 am',
    location: 'Sky Tower, Bhaktapur',
    image: '/images/cloud-computing.jpg',
    description:
      "The Cloud Computing Summit is the perfect event for professionals looking to stay ahead in the rapidly evolving field of cloud technology. This summit will cover various aspects of cloud computing, including infrastructure as a service (IaaS), platform as a service (PaaS), and software as a service (SaaS). Attendees will have the chance to learn from industry experts, participate in hands-on labs, and network with peers. Don't miss this opportunity to enhance your knowledge and skills in cloud computing.",
    attendees: 200,
    id: 112,
    tags: ['Cloud Computing', 'Summit', 'Technology'],
    eventBrochure: 'Cloud_Computing_Summit_Brochure.pdf',
  },
  {
    title: 'Internet of Things (IoT) Workshop',
    date: 'Friday, 20th February',
    time: '10:00 am',
    location: 'Innovation Hub, Bharatpur',
    image: '/images/iot.jpg',
    description:
      'Explore the world of the Internet of Things (IoT) in this interactive workshop. Participants will learn about IoT technologies, device connectivity, and data management. The workshop includes hands-on sessions where attendees can work with IoT devices and develop their own IoT projects. This event is ideal for developers, engineers, and tech enthusiasts looking to dive into the IoT landscape and understand its applications across various industries.',
    attendees: 160,
    id: 113,
    tags: ['IoT', 'Workshop', 'Technology'],
    eventBrochure: 'IoT_Workshop_Brochure.pdf',
  },
  {
    title: 'AR/VR Development Hackathon',
    date: 'Saturday, 21st February',
    time: '9:00 am',
    location: 'Tech Arena, Janakpur',
    image: '/images/vr.jpg',
    description:
      "Join us for an exciting hackathon focused on Augmented Reality (AR) and Virtual Reality (VR) development. This event is open to developers, designers, and innovators who are passionate about creating immersive AR/VR experiences. Participants will form teams, brainstorm ideas, and develop prototypes over the course of the hackathon. The event will conclude with presentations and awards for the best projects. Whether you're an experienced developer or new to AR/VR, this hackathon is a great opportunity to learn and collaborate.",
    attendees: 180,
    id: 114,
    tags: ['AR', 'VR', 'Hackathon'],
    eventBrochure: 'AR_VR_Hackathon_Brochure.pdf',
  },
  {
    title: 'Digital Marketing Conference',
    date: 'Sunday, 22nd February',
    time: '10:00 am',
    location: 'Media Center, Chitwan',
    image: '/images/marketing.jpg',
    description:
      "The Digital Marketing Conference is the ultimate event for marketing professionals looking to enhance their digital strategies. This conference covers a wide range of topics, including social media marketing, search engine optimization (SEO), content marketing, and data analytics. Attendees will have the opportunity to learn from industry experts, participate in workshops, and network with peers. Don't miss this chance to stay updated on the latest trends and techniques in digital marketing.",
    attendees: 230,
    id: 115,
    tags: ['Digital Marketing', 'Conference', 'Marketing'],
    eventBrochure: 'Digital_Marketing_Conference_Brochure.pdf',
  },
  {
    title: 'Health Tech Symposium',
    date: 'Monday, 23rd February',
    time: '11:00 am',
    location: 'Health Center, Dharan',
    image: '/images/health.jpg',
    description:
      "The Health Tech Symposium brings together healthcare professionals, technology experts, and innovators to discuss the latest advancements in health technology. This symposium will feature keynote presentations, panel discussions, and interactive sessions on topics such as telemedicine, health data analytics, and wearable technology. Attendees will have the chance to explore cutting-edge solutions and network with peers. Whether you're a healthcare provider or a tech enthusiast, this event offers valuable insights into the future of healthcare.",
    attendees: 200,
    id: 116,
    tags: ['Health Tech', 'Symposium', 'Healthcare'],
    eventBrochure: 'Health_Tech_Symposium_Brochure.pdf',
  },
  {
    title: 'E-commerce Trends Summit',
    date: 'Tuesday, 24th February',
    time: '9:00 am',
    location: 'Commerce Hub, Kathmandu',
    image: '/images/ecommerce.jpg',
    description:
      "Join us for the E-commerce Trends Summit, where industry leaders and experts will discuss the latest trends and innovations in the e-commerce space. This summit will cover topics such as omnichannel retail, customer experience, and digital payment solutions. Attendees will have the opportunity to learn from successful e-commerce businesses, participate in panel discussions, and network with other professionals in the industry. Don't miss this chance to gain insights into the future of e-commerce.",
    attendees: 210,
    id: 117,
    tags: ['E-commerce', 'Trends', 'Summit'],
    eventBrochure: 'E-commerce_Trends_Summit_Brochure.pdf',
  },
]

export default EVENTS
