document.addEventListener("DOMContentLoaded", () => {

  const projectsData = [
    {
      title: "The Raising Star Initiative",
      image: "images/sports/team1 (4).jpg",
      description: "Discovering talents through sports.",
      story: "What began as a simple dream has now become a powerful reality. AFRUCOT, through the MAXGABB Foundation, has successfully launched a community football league for the youth of Dansoman-Glefe in the Ablekuma West Municipality of the Greater Accra Region. This initiative was born out of a strong desire to create positive opportunities for young people and to harness the immense, often untapped, sporting talent within the community.<p>The league has provided a structured platform for youth to engage in sports, build discipline, teamwork, and confidence, while also staying positively engaged. Through regular matches and organized activities, young players are discovering their abilities and gaining exposure that can shape their future in sports and beyond. The initiative stands as a clear demonstration of how sports can be a tool for development, unity, and hope.<p>Today, what once existed only as a vision has become a living example of community transformation. The success of the Dansoman-Glefe community football league reaffirms AFRUCOT and MAXGABB Foundation’s commitment to youth development and sets the stage for future collaborations with NGOs, government bodies, and private institutions to expand impact and create lasting change."
    },
    {
      title: "Cultivating Hope",
      image: "images/farms/Pineapples-harvest.jpg",
      description: "Building Sustainable Futures Through Agriculture and Community",
      story: "What started as a vision rooted in self-reliance has steadily grown into a meaningful reality for the foundation. Through the generosity of a founding pioneer, the organization has been granted temporary use of a 16.28-acre parcel of land, with full rights to cultivate it for farming activities that directly support the foundation’s operations. Guided by the belief that charity begins at home, this initiative has strengthened internal sustainability while laying a strong foundation for long-term impact.<p>In addition, the foundation is in advanced negotiations to acquire approximately 50 acres of farmland at Breman Anhwiam in the Asin District. This land, offered by a relative of another pioneering founder, is already productive, with 15 acres of cocoa successfully harvested in 2024, alongside other crop varieties. Once legal agreements are finalized, the foundation will fully develop and manage the land using sustainable and scientific farming methods, ensuring food security, income generation, and community empowerment.<p>Beyond Ghana, the foundation’s impact is expanding into The Gambia, where a plot of land has been earmarked for reclamation and productive reuse in the village of Brufu."
    },
    {
      title: "A Step Toward Health and Hope",
      image: "images/Sliders/health-care.jpg",
      description: "Laying the Foundation for Quality Healthcare at Afrangwa",
      story: "With determination and a clear sense of purpose, the organization has begun its operations—though at a slow and careful pace—in Afrangwa, near Saltpond in the Central Region of Ghana, by establishing a Health Screening Centre to serve the local community. This initiative marks a significant milestone in addressing the basic health needs of residents who often face challenges accessing timely and affordable healthcare services.<p>The Health Screening Centre has been set up to provide essential medical checks, early detection of health conditions, and health awareness support for the community. Even in its early stages, the centre represents hope, reassurance, and a commitment to improving overall well-being. It stands as a practical response to the community’s needs and a testament to the organization’s belief that sustainable development begins with good health."
    }
  ];

  const container = document.getElementById("projectsContainer");

  projectsData.forEach((project, index) => {
    const col = document.createElement("div");
    col.className = "col-lg-4";

    col.innerHTML = `
      <div class="project-card" data-index="${index}">
        <img src="${project.image}" alt="${project.title}">
        <div class="card-body">
          <h4>${project.title}</h4>
          <p>${project.description}</p>

          <div class="expandable">
            <h6>Success Stories</h6>
            <p>${project.story}</p>
          </div>

          <button class="btn btn-brand toggle-btn mt-3">Read More</button>
        </div>
      </div>
    `;

    container.appendChild(col);
  });

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("toggle-btn")) {
      const card = e.target.closest(".project-card");
      const isExpanded = card.classList.contains("expanded");

      card.classList.toggle("expanded");
      e.target.textContent = isExpanded ? "Read More" : "Read Less";
    }
  });

});
