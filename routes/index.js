// routes/index.js
const express = require('express');
const router = express.Router();

// Bio information - you would replace this with actual content
const bioData = {
  name: "Deivid Ribeiro",
  title: "Data Scientist",
  bio: "Results-driven astrophysicist with 3+ years of postdoctoral research experience and a Ph.D. in astrophysics from Columbia University. Proficient in advanced software development (C++, Python) with 10+ years of experience and a proven track record of managing large-scale software projects. Extensive expertise in hardware systems, including optical alignment and telescope systems. Skilled in leadership, project management, and mentoring, with a history of leading cross-disciplinary teams."
};

// Home page
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Deivid Ribeiro | Data Scientist',
    bioData 
  });
});

// About page
router.get('/work', (req, res) => {
  res.render('work', { 
    title: 'Work Experience | Deivid Ribeiro',
    bioData 
  });
});

// Research page
router.get('/research', (req, res) => {
  res.render('research', { 
    title: 'Research | Deivid Ribeiro',
    bioData 
  });
});

// CV page
router.get('/cv', (req, res) => {
  res.render('cv', { 
    title: 'CV | Deivid Ribeiro',
    bioData 
  });
});

// Projects page
router.get('/projects', (req, res) => {
  const projects = [
    {
      title: "My Growing Baby",
      description: "I completed a project tracking my child's eating and sleeping habits, revealing compelling insights. This experience deepened my understanding of his needs and promoted healthier family habits.",
      image: "/images/sleep_map.png",
      githubLink: "https://github.com/deividribeiro/baby_growth_tracking/blob/main/mybaby.ipynb"
    },
    {
      title: "Nutrition Check",
      description: "I started this cool project to track what I was eating and see what nutrients I might be missing. The results were pretty surprising and motivated me to add a power meal to my daily routine. It’s made a real difference in my nutrition and overall vibe! ",
      image: "/images/nutrients_log.png",
      githubLink: "https://github.com/deividribeiro/nutrient_tracking/blob/main/cronometer.ipynb"
    },
    {
      title: "Groundhog Camera",
      description: "In an exciting personal project, I set out to film the groundhogs on my property to observe their behavior. I built a Raspberry Pi camera and configured a home NAS to create a seamless monitoring system. By tuning the video capture to save only when motion is detected, I collected data, which I organized into training and signal files for a video detection machine learning. This endeavor not only deepened my understanding of the local wildlife but also honed my technical skills in data collection and analysis.",
      image: "/images/Screenshot 2025-03-17 at 17.45.57.png",
      githubLink: "https://github.com/deividribeiro/nutrient_tracking/blob/main/cronometer.ipynb"
    },
    {
      title: "Articles Read",
      description: "In my recent project, I delved into my reading habits using the Pocket app to analyze how frequently I engage with articles. By examining reading times, I uncovered key trends regarding my reading frequency and overall patterns that emerged over the years. Notably, graduate school significantly influenced my reading habits over the past 11 years, shaping both the quantity and quality of my article consumption. This exploration has provided valuable insights into my evolving relationship with reading.",
      image: "/images/daily_articles_map_full.png",
      githubLink: "https://github.com/deividribeiro/reading_with_pocket/blob/main/Pocket.ipynb"
    },
//    {
//      title: "VTS Scheduler",
//      description: "I worked on a project aimed at developing an observation scheduler for VERITAS. This initiative addresses the intricacies of managing 30-minute observation runs, during which significant changes in the night sky can occur, while also balancing multiple competing science priorities. The scheduling challenge is intensified by the presence of pre-scheduled runs and the need to accommodate unforeseen astronomical events, such as supernovae. Our goal is to create a reliable scheduling framework that facilitates efficient parsing, editing, and recomputation, ultimately optimizing the utilization of observational time and resources.",
//      image: "/images/search-icon.svg",
//      githubLink: "https://github.com/VERITAS-Observatory/VTSScheduler.git"
//    },
  ];

  res.render('projects', {
    title: 'Projects - Deivid Ribeiro',
    bioData,
    projects: projects
  });

});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact | Deivid Ribeiro',
    bioData 
  });
});

// Search functionality (basic implementation)
router.post('/search', (req, res) => {
  const searchQuery = req.body.query;
  // Implement actual search logic here
  res.render('search-results', {
    title: 'Search Results | Deivid Ribeiro',
    bioData,
    searchQuery
  });
});

module.exports = router;

