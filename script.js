const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

window.addEventListener('load', () => {
  setTimeout(() => {
    $('#preloader').classList.add('hidden');
  }, 1500);
});

const profileImgContainer = $('#profileImgContainer');
const profileModal = $('#profileModal');
const modalClose = $('.modal-close');

profileImgContainer.addEventListener('click', () => {
  profileModal.classList.add('show');
});

modalClose.addEventListener('click', () => {
  profileModal.classList.remove('show');
});

profileModal.addEventListener('click', (e) => {
  if (e.target === profileModal) {
    profileModal.classList.remove('show');
  }
});

let isHuman = false;
let mouseMoved = false;

document.addEventListener('mousemove', () => {
  mouseMoved = true;
  isHuman = true;
});

document.addEventListener('touchstart', () => {
  isHuman = true;
});

const verifyUser = async () => {
  try {
    const token = await grecaptcha.execute('6LfHmjArAAAAANenZJAgCH9td5FhHz2Zpui1w0X3', { action: 'homepage' });
    const response = await fetch('https://mybackend-z75n.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    const result = await response.json();
    if (result.success && result.score >= 0.5) {
      isHuman = true;
      loadContent();
    } else {
      showBotWarning();
    }
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    showBotWarning();
  }
};

const showBotWarning = () => {
  const warning = document.createElement('div');
  warning.className = 'fixed inset-0 bg-red-900/95 flex items-center justify-center z-10000';
  warning.innerHTML = `
    <div class="text-center p-6 bg-gray-800 rounded-lg">
      <h2 class="text-2xl font-bold text-red-300 mb-4">Access Denied</h2>
      <p class="text-gray-300">This site is protected from automated scraping. Please contact <a href="mailto:felixidowu48@gmail.com" class="underline text-indigo-400">felixidowu48@gmail.com</a> for access.</p>
    </div>
  `;
  document.body.appendChild(warning);
};

const loadContent = async () => {
  if (!isHuman || $('#honeypot').value.trim()) {
    showBotWarning();
    return;
  }

  const sections = {
    skills: [
      { icon: 'fas fa-database', color: 'indigo-400', title: 'Data Analysis', desc: 'Python, SQL, R, Pandas, NumPy' },
      { icon: 'fas fa-chart-line', color: 'purple-400', title: 'Visualization', desc: 'Tableau, Power BI, Matplotlib, Seaborn' },
      { icon: 'fas fa-lightbulb', color: 'pink-400', title: 'Business Intelligence', desc: 'KPIs, Dashboards, Reporting' },
      { icon: 'fas fa-server', color: 'blue-400', title: 'Databases', desc: 'PostgreSQL, MySQL, MongoDB' },
      { icon: 'fas fa-calculator', color: 'green-400', title: 'Statistics', desc: 'Statistical Analysis, Hypothesis Testing, Regression' },
      { icon: 'fas fa-users', color: 'yellow-400', title: 'Soft Skills', desc: 'Communication, Problem-Solving, Team Collaboration' },
      { icon: 'fas fa-laptop-code', color: 'orange-400', title: 'Programming', desc: 'Python, R, SQL' },
      { icon: 'fas fa-brain', color: 'teal-400', title: 'Machine Learning', desc: 'Scikit-learn, TensorFlow, Predictive Modeling' },
      { icon: 'fas fa-spider', color: 'red-400', title: 'Data Extraction', desc: 'Beautiful Soup, Scrapy, Selenium' }
    ],
    projects: [
      { icon: 'fas fa-home', gradient: 'from-blue-500/20 to-green-500/20', color: 'blue-400', title: 'Real Estate Price Prediction', tag: 'Machine Learning', tagColor: 'blue', desc: 'Machine learning model to predict property prices based on location, size, and market trends.', links: { project: '#', github: '#', live: '#' } },
      { icon: 'fas fa-heartbeat', gradient: 'from-pink-500/20 to-red-500/20', color: 'pink-400', title: 'Health Care Analytics', tag: 'SQL', tagColor: 'pink', desc: 'Interactive dashboard analyzing patient data to optimize hospital resource allocation.', links: { project: './healthcare.html', github: '#', live: '#' } },
      { icon: 'fas fa-user-times', gradient: 'from-purple-500/20 to-pink-500/20', color: 'purple-400', title: 'Employee Attrition', tag: 'Python', tagColor: 'purple', desc: 'Predictive model to identify factors contributing to employee turnover, improving retention strategies.', links: { project: '#', github: '#', live: '#' } },
      { icon: 'fas fa-chart-pie', gradient: 'from-indigo-500/20 to-purple-500/20', color: 'indigo-400', title: 'Sales Analysis', tag: 'Power BI', tagColor: 'indigo', desc: 'Interactive dashboard analyzing sales performance across regions and product categories.', links: { project: '#', github: '#', live: '#' } }
    ],
    experience: [
      { period: '2021 - Present', role: 'Senior Data Analyst', company: 'TechSolutions Inc.', color: 'indigo', desc: 'Led a team of analysts to deliver data-driven insights, developing predictive models that improved customer retention by 15%.', skills: ['Python', 'Tableau', 'SQL', 'Machine Learning'] },
      { period: '2018 - 2021', role: 'Data Analyst', company: 'Global Retail Corp', color: 'purple', desc: 'Built data visualization dashboards, reducing reporting time by 40%, and conducted market basket analysis to boost cross-selling revenue by 12%.', skills: ['Power BI', 'R', 'Excel', 'Data Mining'] },
      { period: '2016 - 2018', role: 'Junior Data Analyst', company: 'Financial Insights Ltd', color: 'pink', desc: 'Automated reporting systems, saving 20 hours weekly, and developed customer segmentation models to improve marketing ROI by 18%.', skills: ['SQL', 'Python', 'Data Cleaning', 'ETL'] }
    ],
    certifications: [
      { icon: 'fas fa-certificate', color: 'indigo-400', title: 'Google Data Analytics Certification', desc: 'Comprehensive training in data analysis, including data cleaning, visualization, and insights generation using SQL and Tableau.', link: 'https://drive.google.com/file/d/1AOfnzKIl31urTXEaN93ZbMx9FPXwvPb6/view?usp=drivesdk' },
      { icon: 'fas fa-certificate', color: 'purple-400', title: 'Meta Data Analytics Certification', desc: 'Advanced data analytics techniques, focusing on social media data and business metrics to drive strategic decisions.', link: 'https://drive.google.com/file/d/1AWNB6lY3h0wLNOMMlBOn-FYBtK5HGq1z/view?usp=drivesdk' },
      { icon: 'fas fa-certificate', color: 'pink-400', title: 'Google Business Intelligence', desc: 'Specialized in designing and implementing business intelligence solutions, including dashboards and KPIs.', link: 'https://drive.google.com/file/d/1AQ9UuZ02sHePAy05MnEv9wrkstnvw0WY/view?usp=drivesdk' },
      { icon: 'fas fa-certificate', color: 'blue-400', title: 'IBM Data Analytics Certification', desc: 'Expertise in data science and analytics with hands-on experience in Python, SQL, and predictive modeling.', link: 'https://www.coursera.org/account/accomplishments/verify/YOUR_CERTIFICATE_ID' }
    ]
  };

  const skillsGrid = $('#skillsGrid');
  sections.skills.forEach((skill, i) => {
    const card = document.createElement('div');
    card.className = 'x-card card-hover animate-reveal-from-bottom';
    card.style.animationDelay = `${(i + 1) * 100}ms`;
    card.innerHTML = `
      <div class="text-${skill.color} mb-4 text-3xl sm:text-4xl skill-icon">
        <i class="${skill.icon}"></i>
      </div>
      <h3 class="font-bold text-base sm:text-lg mb-2">${skill.title}</h3>
      <p class="text-gray-400 text-sm">${skill.desc}</p>
    `;
    skillsGrid.appendChild(card);
  });

  const projectsGrid = $('#projectsGrid');
  sections.projects.forEach((project, i) => {
    const card = document.createElement('div');
    card.className = 'x-card card-hover animate-reveal-from-bottom';
    card.style.animationDelay = `${(i + 1) * 100}ms`;
    card.innerHTML = `
      <div class="h-48 bg-gradient-to-r ${project.gradient} flex items-center justify-center">
        <i class="${project.icon} text-6xl text-${project.color}"></i>
      </div>
      <div class="p-6">
        <div class="flex justify-between items-start mb-3">
          <h3 class="font-bold text-xl">${project.title}</h3>
          <span class="text-xs px-2 py-1 bg-${project.tagColor}-900/50 text-${project.tagColor}-300 rounded-full">${project.tag}</span>
        </div>
        <p class="text-gray-400 mb-4">${project.desc}</p>
        <div class="flex justify-between items-center">
          <a href="${project.links.project}" class="text-${project.tagColor}-400 hover:text-${project.tagColor}-300 text-sm font-medium flex items-center gap-1">
            View Project <i class="fas fa-arrow-right text-xs"></i>
          </a>
          <div class="flex gap-2">
            <a href="${project.links.github}" class="text-gray-500 hover:text-gray-300" aria-label="GitHub repository for ${project.title}">
              <i class="fab fa-github"></i>
            </a>
            <a href="${project.links.live}" class="text-gray-500 hover:text-gray-300" aria-label="Live ${project.title} project">
              <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    projectsGrid.appendChild(card);
  });

  const experienceTimeline = $('#experienceTimeline');
  sections.experience.forEach((exp, i) => {
    const item = document.createElement('div');
    item.className = 'relative';
    item.innerHTML = `
      <div class="absolute left-4 md:left-1/2 w-4 h-4 bg-${exp.color}-600 rounded-full transform md:-translate-x-1/2 -translate-y-1/2 top-6 md:top-1/2 z-10 animate-pulse-marker" aria-label="Timeline marker for ${exp.role} role"></div>
      <div class="flex flex-col md:flex-row md:justify-between gap-6 md:gap-8 pl-12 md:pl-0 animate-fade-in-right" style="animation-delay: ${(i + 1) * 100}ms">
        <div class="md:w-1/2 md:text-right md:pr-8">
          <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-${exp.color}-900/50 text-${exp.color}-300 mb-2">${exp.period}</span>
          <h3 class="text-xl font-bold">${exp.role}</h3>
          <p class="text-${exp.color}-400">${exp.company}</p>
        </div>
        <div class="md:w-1/2 md:pl-8">
          <div class="x-card card-hover p-6">
            <p class="text-gray-300 mb-4">${exp.desc}</p>
            <div class="flex flex-wrap gap-2">
              ${exp.skills.map(skill => `<span class="text-xs px-2 py-1 bg-gray-700 rounded-full">${skill}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    experienceTimeline.appendChild(item);
  });

  const certificationsGrid = $('#certificationsGrid');
  sections.certifications.forEach((cert, i) => {
    const card = document.createElement('div');
    card.className = 'x-card card-hover animate-reveal-from-bottom';
    card.style.animationDelay = `${(i + 1) * 100}ms`;
    card.innerHTML = `
      <div class="text-${cert.color} mb-4 text-4xl">
        <i class="${cert.icon}"></i>
      </div>
      <h3 class="font-bold text-lg mb-2">${cert.title}</h3>
      <p class="text-gray-400 text-sm mb-4">${cert.desc}</p>
      <a href="${cert.link}" target="_blank" class="text-${cert.color} hover:text-${cert.color}-300 text-sm font-medium flex items-center gap-1" aria-label="Verify ${cert.title}">
        Verify Certificate <i class="fas fa-external-link-alt text-xs"></i>
      </a>
    `;
    certificationsGrid.appendChild(card);
  });

  $$('.obfuscated-section').forEach(section => {
    section.classList.add('visible');
  });
};

setTimeout(verifyUser, 1000);

const toggleMenu = () => {
  $('#mobileMenu').classList.toggle('hidden');
  $('#line1').classList.toggle('rotate-45');
  $('#line1').classList.toggle('translate-y-2');
  $('#line2').classList.toggle('opacity-0');
  $('#line3').classList.toggle('-rotate-45');
  $('#line3').classList.toggle('-translate-y-2');
};

$('#hamburger').addEventListener('click', toggleMenu);
$$('#mobileMenu a').forEach(link => link.addEventListener('click', toggleMenu));

let ticking = false;
const updateProgress = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      $('#progress').style.width = (scrollPosition / scrollHeight) * 100 + '%';
      ticking = false;
    });
    ticking = true;
  }
};

window.addEventListener('scroll', updateProgress);

const toggleToTop = () => {
  $('#toTop').style.display = window.scrollY > 300 ? 'flex' : 'none';
};

window.addEventListener('scroll', toggleToTop);
$('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const texts = ["Data Analyst.", "Visualization Expert.", "Data Storyteller", "BI Specialist", "Python Dev."];
let count = 0, index = 0, isDeleting = false, isEnd = false;

const type = () => {
  const current = texts[count];
  $('#typed').textContent = current.substring(0, isDeleting ? index - 1 : index + 1);
  index = isDeleting ? index - 1 : index + 1;

  if (!isDeleting && index === current.length) {
    isEnd = true;
    isDeleting = true;
    setTimeout(type, 1500);
  } else if (isDeleting && index === 0) {
    isDeleting = false;
    count = (count + 1) % texts.length;
    setTimeout(type, 500);
  } else {
    const speed = isDeleting ? 50 : isEnd ? 100 : 150;
    setTimeout(type, speed);
  }
  isEnd = false;
};

setTimeout(type, 1000);

const validateForm = async (e) => {
  e.preventDefault();
  const form = $('#contactForm');
  const submitButton = $('#submitButton');
  const buttonText = $('#buttonText');
  const loadingSpinner = $('#loadingSpinner');
  const successIcon = $('#successIcon');
  const formMessage = $('#formMessage');
  let isValid = true;

  formMessage.classList.add('hidden');
  formMessage.className = 'hidden p-4 rounded-lg text-sm';

  const fields = [
    { id: 'name', error: 'name-error', validate: (value) => !!value },
    { id: 'email', error: 'email-error', validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) },
    { id: 'message', error: 'message-error', validate: (value) => !!value }
  ];

  fields.forEach(field => {
    const input = $(`#${field.id}`);
    const error = $(`#${field.error}`);
    const value = input.value.trim();
    if (!value || (field.validate && !field.validate(value))) {
      error.classList.remove('hidden');
      input.classList.add('border-red-500');
      isValid = false;
    } else {
      error.classList.add('hidden');
      input.classList.remove('border-red-500');
    }
  });

  if ($('#honeypot').value.trim()) {
    formMessage.textContent = 'Bot detected. Please try again.';
    formMessage.classList.add('bg-red-900', 'text-red-300');
    formMessage.classList.remove('hidden');
    return;
  }

  let recaptchaToken;
  try {
    recaptchaToken = await grecaptcha.execute('6LfHmjArAAAAANenZJAgCH9td5FhHz2Zpui1w0X3', { action: 'submit_form' });
  } catch (error) {
    formMessage.textContent = 'reCAPTCHA verification failed. Please try again.';
    formMessage.classList.add('bg-red-900', 'text-red-300');
    formMessage.classList.remove('hidden');
    return;
  }

  if (!isValid) return;

  submitButton.disabled = true;
  buttonText.textContent = 'Sending...';
  loadingSpinner.classList.remove('hidden');
  successIcon.classList.add('hidden');

  try {
    const response = await fetch('https://backend-m0xb.onrender.com/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: $('#name').value.trim(),
        email: $('#email').value.trim(),
        message: $('#message').value.trim(),
        recaptchaToken
      })
    });

    const result = await response.json();

    if (response.ok) {
      formMessage.textContent = 'Message sent successfully!';
      formMessage.classList.add('bg-green-900', 'text-green-300');
      loadingSpinner.classList.add('hidden');
      successIcon.classList.remove('hidden');
      gsap.fromTo(successIcon, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      form.reset();
      $('#message-counter').textContent = '0/500';
      setTimeout(() => {
        buttonText.textContent = 'Send Message';
        successIcon.classList.add('hidden');
      }, 2000);
    } else {
      throw new Error(result.message || 'Failed to send message.');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    formMessage.textContent = error.message || 'Failed to send message. Please try again.';
    formMessage.classList.add('bg-red-900', 'text-red-300');
    formMessage.classList.remove('hidden');
  } finally {
    submitButton.disabled = false;
    buttonText.textContent = 'Send Message';
    loadingSpinner.classList.add('hidden');
  }
};

$('#contactForm').addEventListener('submit', validateForm);

$('#message').addEventListener('input', () => {
  const length = $('#message').value.length;
  $('#message-counter').textContent = `${length}/500`;
});

$('#year').textContent = new Date().getFullYear();