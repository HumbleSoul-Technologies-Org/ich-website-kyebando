 

export const testimonials = [
              {
                name: "Nakamya teddy",
                role: "Student,Kololo High School, Kampala",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s",
                testimonial: "The youth tailoring program opened doors I never knew existed. I now have the skills to pursue a fashion and design career and inspire my younger siblings.",
                community: "Kamwocha"
              },
              {
                name: "Amina Hassan",
                role: "Unemployed youth , Kisaasi, Kampala",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s",
                testimonial: "Thanks to the mentorship and business training, I launched my startup successfully. The support system they built was invaluable.",
                community: "Kisaasi"
              },
              {
                name: "Ssenyonga James",
                role: "Community Leader, kyanja, Kampala",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s",
                testimonial: "Watching our youth discover their potential and gain real skills has been remarkable. This organization truly cares about sustainable growth.",
                community: "kyanja"
              },
              {
                name: "Dev Singh",
                role: "Tech Trainer, Hyderabad",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s",
                testimonial: "As a trainer partner, I've seen firsthand the impact of quality education. The programs are well-structured and truly life-changing.",
                community: "HITEC City Partnership"
              },
              {
                name: "Sneha Gupta",
                role: "Program Graduate, Pune",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s",
                testimonial: "From uncertainty about my future to landing my dream job - this journey was made possible by the talent discovery program.",
                community: "Hadapsar Youth Hub"
              },
              {
                name: "Vikram Reddy",
                role: "Community Volunteer, Chennai",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s",
                testimonial: "Being part of this movement and seeing the real change in our community has been the most fulfilling experience of my life.",
                community: "OMR Community Center"
              }
]

export const mockCommunities = [
  {
    id: "comm-1",
    community: "Kamwocha",
    location: { lat: 0.0, lng: 0.0 },
    country: "Uganda",
    excerpt: "Sample community overview",
    date: "2026-03-01T00:00:00Z",
    status: "active",
    thumbnail: "https://via.placeholder.com/200",
  },
];

export const messages = [
  {
    _id: "msg-1",
    name: "Jane Doe",
    isRead: false,
    isArchived: false,
    reply: { reply: "" },
    createdAt: "2026-03-01T12:00:00Z",
  },
];
            
export const patners = [
              { name: "BTM", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH7Xb_BNApPiBvR_GfckVuRLf-xl0qUF8l3w&s" },
              { name: "SIAS", logo: "https://siasintl.com/wp-content/uploads/2023/12/siasintl-logo-t.png" },
              { name: "faithlife ministries", logo: "https://res.cloudinary.com/ghost150/image/upload/v1761738140/FAITHLIFE_LOGO_z9xkpt.png" },
               
]
            
 
export const notifications =  [
  {
    "id": "notf_001",
    "type": "system",
    "title": "System Maintenance Scheduled",
    "description": "The platform will undergo scheduled maintenance on 20th February from 10:00 PM to 12:00 AM.",
    "linkTo": "/settings/system-status",
    "seen": true,
    "date": "2026-02-10T08:30:00Z"
  },
  {
    "id": "notf_002",
    "type": "visit",
    "title": "New Sponsor Visit Registered",
    "description": "A representative from BrightFuture Ltd has scheduled a visit to discuss sponsorship opportunities.",
    "linkTo": "/visits/visit_102",
    "seen": false,
    "date": "2026-02-11T10:15:00Z"
  },
  {
    "id": "notf_003",
    "type": "subscription",
    "title": "Monthly Donation Received",
    "description": "You have received a monthly subscription donation of $50 from an anonymous supporter.",
    "linkTo": "/finance/donations",
    "seen": false,
    "date": "2026-02-12T07:45:00Z"
  },
  {
    "id": "notf_004",
    "type": "system",
    "title": "Password Changed Successfully",
    "description": "Your account password was successfully updated. If this wasn’t you, please contact support immediately.",
    "linkTo": "/profile/security",
    "seen": true,
    "date": "2026-02-12T14:20:00Z"
  },
  {
    "id": "notf_005",
    "type": "visit",
    "title": "Community Outreach Event Reminder",
    "description": "Reminder: The community fundraising outreach visit is scheduled for tomorrow at 9:00 AM.",
    "linkTo": "/events/outreach-2026",
    "seen": false,
    "date": "2026-02-13T16:00:00Z"
  },
  {
    "id": "notf_006",
    "type": "subscription",
    "title": "Subscription Plan Expiring Soon",
    "description": "Your premium sponsorship visibility subscription will expire in 5 days. Renew to continue enjoying benefits.",
    "linkTo": "/billing/subscription",
    "seen": true,
    "date": "2026-02-14T09:10:00Z"
  },
  {
    "id": "notf_007",
    "type": "system",
    "title": "New Feature Released",
    "description": "We have introduced a new analytics dashboard to help track fundraising performance in real time.",
    "linkTo": "/reports/analytics",
    "seen": false,
    "date": "2026-02-15T11:35:00Z"
  },
  {
    "id": "notf_008",
    "type": "visit",
    "title": "Volunteer Site Inspection Completed",
    "description": "The site inspection for the youth sports equipment project has been completed successfully.",
    "linkTo": "/projects/sports-equipment",
    "seen": true,
    "date": "2026-02-16T06:50:00Z"
  }
]


export const staff =[
  {
    "id": "1",
    "name": "Dr.Byamukama Henry",
    "phone": "+256701234567",
    "email": "dr.byamukama.henry@example.org",
    "role": "CEO",
    "image": "https://www.measummit.com/wp-content/uploads/2025/06/Henry.png",
    "gender": "male"
  },
  {
    "id": "2",
    "name": "Kiyee Allan",
    "phone": "+256702345678",
    "email": "kiyee.allan@example.org",
    "role": "Master of Ceremony",
    "image": "https://randomuser.me/api/portraits/women/12.jpg",
    "gender": "male"
  },
  {
    "id": "3",
    "name": "Michael Kato",
    "phone": "+256703456789",
    "email": "michael.kato@example.org",
    "role": "Planner",
    "image": "https://randomuser.me/api/portraits/men/13.jpg",
    "gender": "male"
  },
  {
    "id": "4",
    "name": "Grace Atim",
    "phone": "+256704567890",
    "email": "grace.atim@example.org",
    "role": "Blogger",
    "image": "https://randomuser.me/api/portraits/women/14.jpg",
    "gender": "female"
  },
  {
    "id": "5",
    "name": "Joseph Mwangi",
    "phone": "+256705678901",
    "email": "joseph.mwangi@example.org",
    "role": "Volunteer",
    "image": "https://randomuser.me/api/portraits/men/15.jpg",
    "gender": "male"
  },
  {
    "id": "6",
    "name": "Esther Namazzi",
    "phone": "+256706789012",
    "email": "esther.namazzi@example.org",
    "role": "Volunteer",
    "image": "https://randomuser.me/api/portraits/women/16.jpg",
    "gender": "female"
  },
  {
    "id": "7",
    "name": "David Ochieng",
    "phone": "+256707890123",
    "email": "david.ochieng@example.org",
    "role": "Volunteer",
    "image": "https://randomuser.me/api/portraits/men/17.jpg",
    "gender": "male"
  },
  {
    "id": "8",
    "name": "Rebecca Achieng",
    "phone": "+256708901234",
    "email": "rebecca.achieng@example.org",
    "role": "Volunteer",
    "image": "https://randomuser.me/api/portraits/women/18.jpg",
    "gender": "female"
  },
  {
    "id": "9",
    "name": "Samuel Tumwine",
    "phone": "+256709012345",
    "email": "samuel.tumwine@example.org",
    "role": "Volunteer",
    "image": "https://randomuser.me/api/portraits/men/19.jpg",
    "gender": "male"
  },
  {
    "id": "10",
    "name": "Patricia Nakato",
    "phone": "+256710123456",
    "email": "patricia.nakato@example.org",
    "role": "Volunteer",
    "image": "https://randomuser.me/api/portraits/women/20.jpg",
    "gender": "female"
  },
  {
    "id": "11",
    "name": "Brian Ssekandi",
    "phone": "+256711234567",
    "email": "brian.ssekandi@example.org",
    "role": "Volunteer",
    "image": "https://randomuser.me/api/portraits/men/21.jpg",
    "gender": "male"
  },
  {
    "id": "12",
    "name": "Linda Nabirye",
    "phone": "+256712345678",
    "email": "linda.nabirye@example.org",
    "role": "Volunteer",
    "image": "https://randomuser.me/api/portraits/women/22.jpg",
    "gender": "female"
  },
  {
    "id": "13",
    "name": "Patrick Byaruhanga",
    "phone": "+256713456789",
    "email": "patrick.byaruhanga@example.org",
    "role": "Volunteer",
    "image": "https://randomuser.me/api/portraits/men/23.jpg",
    "gender": "male"
  },
  {
    "id": "14",
    "name": "Joyce Namutebi",
    "phone": "+256714567890",
    "email": "joyce.namutebi@example.org",
    "role": "Volunteer",
    "image": "https://randomuser.me/api/portraits/women/24.jpg",
    "gender": "female"
  },
  {
    "id": "15",
    "name": "Ronald Kisembo",
    "phone": "+256715678901",
    "email": "ronald.kisembo@example.org",
    "role": "Volunteer",
    "image": "https://randomuser.me/api/portraits/men/25.jpg",
    "gender": "male"
  },
  {
    "id": "16",
    "name": "Mercy Auma",
    "phone": "+256716789012",
    "email": "mercy.auma@example.org",
    "role": "Volunteer",
    "image": "https://randomuser.me/api/portraits/women/26.jpg",
    "gender": "female"
  }
]

export const programs = [
  {
    "id": "1",
    "program": "Technical Skills Development Program",
    "excerpt": "Equipping youth and community members with practical technical and vocational skills for employment and entrepreneurship.",
    "description": "The Technical Skills Development Program combines brick making, carpentry, welding, and other hands-on vocational trades into one comprehensive training initiative. This program was established to tackle unemployment, poverty, and the growing demand for skilled artisans within the community. Many young people lack access to formal higher education but possess the potential to thrive through practical skills training. By offering structured instruction in construction, woodworking, and metal fabrication, the program provides direct pathways to income generation and self-employment. Participants receive both technical expertise and basic business management knowledge to help them start and sustain small enterprises. The long-term impact includes job creation, improved infrastructure, reduced poverty levels, and the development of a skilled workforce capable of driving sustainable community development.",
    "thumbnail": "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
    "images": [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
      "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952"
    ]
  },
  {
    "id": "2",
    "program": "Talent Discovery & Creative Arts Development",
    "excerpt": "Identifying and nurturing talents in music, dance, drama, and creative arts.",
    "description": "The Talent Discovery & Creative Arts Development program was established to provide a positive platform for young people to express themselves and develop their natural abilities. Many talented individuals lack opportunities, mentorship, and exposure, which can lead to wasted potential. This initiative identifies gifts in music, dance, drama, poetry, and visual arts, and nurtures them through structured training, mentorship, and public showcases. By promoting creativity and self-expression, the program builds confidence, discipline, and teamwork among participants. Its long-term impact includes the development of professional artists, strengthened cultural identity, reduced youth involvement in harmful activities, and the promotion of positive messages that inspire the broader community.",
    "thumbnail": "https://i0.wp.com/awakentalentsug.com/wp-content/uploads/2024/09/IMG-20240905-WA0171.jpg?fit=1280%2C960&ssl=1",
    "images": [
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
      "https://images.unsplash.com/photo-1464375117522-1311dd6b0b81",
      "https://images.unsplash.com/photo-1520975928316-7f6d7a5f9f0d"
    ]
  },
  {
    "id": "3",
    "program": "Gospel Preaching & Evangelism Outreach",
    "excerpt": "Spreading the gospel and providing spiritual guidance to the community.",
    "description": "The Gospel Preaching & Evangelism Outreach program exists to foster spiritual growth, moral transformation, and unity within the community. In times of social challenges such as crime, substance abuse, and family breakdown, spiritual guidance plays a vital role in restoring hope and direction. Through open-air crusades, youth fellowships, discipleship training, and community prayer gatherings, this program shares messages of faith, love, and integrity. It also provides mentorship and counseling support to individuals facing personal struggles. The positive impact of this initiative includes strengthened families, improved moral standards, increased community harmony, and the nurturing of servant leaders who contribute positively to society.",
    "thumbnail": "https://images.unsplash.com/photo-1507692049790-de58290a4334",
    "images": [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2",
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba"
    ]
  },
  {
    "id": "4",
    "program": "Community Growth & Empowerment Initiative",
    "excerpt": "Promoting sustainable development and social empowerment in the community.",
    "description": "The Community Growth & Empowerment Initiative was formed to address broader social and economic challenges affecting families and vulnerable groups. Sustainable development requires more than individual skills—it demands collective action, leadership, and responsible citizenship. This program focuses on leadership training, entrepreneurship workshops, savings groups, environmental conservation campaigns, and social support networks. By encouraging collaboration and shared responsibility, it strengthens community structures and builds resilience against poverty and social instability. The long-term impact includes improved livelihoods, cleaner environments, stronger local leadership, and a united community capable of driving its own sustainable development.",
    "thumbnail": "https://qdic.org/wp-content/uploads/2025/03/e0cfd599-9784-4687-8b33-898ea7597c1c.png",
    "images": [
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
    ]
  }
]
 



