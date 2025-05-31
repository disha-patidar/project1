const sampleListing = [
  {
    title: "Modern 1BR Apartment in Downtown",
    description: "A stylish apartment near Times Square perfect for couples or solo travelers.",
    location: "New York, NY",
    price: 14500,
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1663089331117-b4176fef4c9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8MSUyMGJyJTIwYXBhcnRtZW50fGVufDB8fDB8fHww"
    },
    country: "USA"
  },
  {
    title: "Luxury Beachfront Villa with Pool",
    description: "Stunning oceanfront villa in Tulum with a private pool and daily housekeeping.",
    location: "Tulum, Quintana Roo",
    price: 38500,
    image: {
      filename: "listingimage",
      url: "https://media.istockphoto.com/id/1492313721/photo/modern-luxury-villa-with-private-pool-at-night.webp?a=1&b=1&s=612x612&w=0&k=20&c=ljtci8-dINRiKqAfnXVFlFou4DI9vTHm4IXPZH617IA="
    },
    country: "Mexico"
  },
  {
    title: "Secluded Mountain Cabin",
    description: "A peaceful cabin retreat in the Blue Ridge Mountains with a hot tub and fireplace.",
    location: "Asheville, NC",
    price: 21000,
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533843352806-bd4132ebbf86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW91bnRhaW4lMjBjYWJpbnxlbnwwfHwwfHx8MA%3D%3D"
    },
    country: "USA"
  },
  {
    title: "Stylish Loft Room in Berlin",
    description: "A cozy private room in a modern loft with great metro access and amenities.",
    location: "Berlin",
    price: 75000,
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1619989652700-9984844cb0ea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    country: "Germany"
  },
  {
    title: "Magical Treehouse in the Forest",
    description: "Stay in a handcrafted treehouse surrounded by jungle—perfect for a romantic getaway.",
    location: "Ubud, Bali",
    price: 160000,
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1604004218771-05c55db4f9f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJlZWhvdXNlfGVufDB8fDB8fHww"
    },
    country: "Indonesia"
  },
  {
    title: "Lakeview Cottage Getaway",
    description: "Relax in a cozy lakeside cottage with a fire pit and private dock.",
    location: "Lake Tahoe, CA",
    price: 19500,
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1708659790808-8cd34b52ec78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrZXZpZXclMjBjb3R0YWdlfGVufDB8fDB8fHww"
    },
    country: "USA"
  },
  {
    title: "Countryside Farm Stay",
    description: "Experience rural charm with fresh eggs, local produce, and open fields.",
    location: "Tuscany",
    price: 12000,
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1679984743122-82e0f372e748?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybSUyMHN0YXl8ZW58MHx8MHx8fDA%3D"
    },
    country: "Italy"
  },
  {
    title: "Bohemian Bungalow",
    description: "Colorful bungalow with garden views, hammock, and open-air shower.",
    location: "Canggu, Bali",
    price: 11500,
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587420341890-05dae8e64f6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9oZW1pYW4lMjBidW5nbG93fGVufDB8fDB8fHww"
    },
    country: "Indonesia"
  },
  {
    title: "Tokyo High-Rise with Skyline View",
    description: "Modern apartment on the 22nd floor with views of Shinjuku skyline.",
    location: "Tokyo",
    price: 180,
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9reW8lMjBza3lsaW5lfGVufDB8fDB8fHww"
    },
    country: "Japan"
  },
  {
    title: "Penthouse with Rooftop Pool",
    description: "Luxury penthouse with private rooftop pool and bar in the heart of Bangkok.",
    location: "Bangkok",
    price: 290,
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1724980715475-f6ead604713f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVudGhvdXNlJTIwd2l0aCUyMHJvb2Z0b3AlMjBwb29sfGVufDB8fDB8fHww"
    },
    country: "Thailand"
  }
];
module.exports={ data: sampleListing };


/*<ul>
<% for(let listing of allListings){ %>
<li><a href="/listings/<%= listing._id %>"><%= listing.title %></a></li>
<% } %>
</ul>
</body>*/