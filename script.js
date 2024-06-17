document.addEventListener('DOMContentLoaded', function () {
    // Fetch all locations within India
    fetchIndiaLocations();

    // Event listener for search form submission
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const jobTitle = document.getElementById('job-title').value;
        const location = document.getElementById('location').value;
        
        fetchJobs(jobTitle, location, 1);
    });

    // Event listener for filter form submission
    document.getElementById('filter-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const jobTitle = document.getElementById('job-title').value;
        const location = document.getElementById('location').value;
        const datePosted = document.getElementById('date-posted').value;
        const salaryMin = document.getElementById('salary-min').value;
        const salaryMax = document.getElementById('salary-max').value;
        const remoteJobs = document.getElementById('remote-jobs').checked;
        const sortBy = document.getElementById('sort-by').value;
        const category = document.getElementById('category').value;
        const contract = document.getElementById('contract-type').value;
        const hours = document.getElementById('hours').value;

        fetchJobs(jobTitle, location, 1, datePosted, salaryMin, salaryMax, remoteJobs, sortBy, category, contract, hours);
    });
});

async function fetchIndiaLocations() {
    const appId = '29036110';
    const appKey = '3b1d1e9624324f0a1280828a0b69e46a';
    const country = 'in'; // ISO 3166-1 alpha-2 code for India
    const url = `http://api.adzuna.com/v1/api/jobs/${country}/geodata`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayIndiaLocations(data.locations);
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
}

function displayIndiaLocations(locations) {
    const locationSelect = document.getElementById('location');
    locationSelect.innerHTML = '<option value="">Select location</option>';

    locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location.name;
        option.textContent = `${location.name} (${location.count})`;
        locationSelect.appendChild(option);
    });
}

async function fetchJobs(title, location, page, datePosted = '', salaryMin = '', salaryMax = '', remoteJobs = false, sortBy = '', category = '', contract = '', hours = '') {
    const appId = '29036110';
    const appKey = '3b1d1e9624324f0a1280828a0b69e46a';
    const country = 'in'; // ISO 3166-1 alpha-2 code for India
    let url = `http://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=${appId}&app_key=${appKey}&results_per_page=20&what=${title}&content-type=application/json`;
    
    if (location) url += `&where=${location}`;
    if (datePosted) url += `&max_days_old=${datePosted}`;
    if (salaryMin) url += `&salary_min=${salaryMin}`;
    if (salaryMax) url += `&salary_max=${salaryMax}`;
    if (remoteJobs) url += `&remote=1`;
    if (sortBy) url += `&sort_by=${sortBy}`;
    if (category) url += `&category=${category}`;
    if (contract) url += `&contract=${contract}`;
    if (hours) url += `&hours=${hours}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayJobs(data.results);
        setupPagination(data.count, title, location, datePosted, salaryMin, salaryMax, remoteJobs, sortBy, category, contract, hours);
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
}

function setupPagination(totalResults, title, location, datePosted, salaryMin, salaryMax, remoteJobs, sortBy, category, contract, hours) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const pages = Math.min(30, Math.ceil(totalResults / 20)); // Limit the maximum number of pages to 10

    for (let i = 1; i <= pages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            fetchJobs(title, location, i, datePosted, salaryMin, salaryMax, remoteJobs, sortBy, category, contract, hours);
        });
        pagination.appendChild(pageLink);
    }
}

function displayJobs(jobs) {
    const jobListings = document.getElementById('jobs-container');
    jobListings.innerHTML = '';
    
    jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');
        
        const jobTitle = document.createElement('h2');
        jobTitle.textContent = job.title;
        
        const jobCompany = document.createElement('p');
        jobCompany.textContent = `Company: ${job.company.display_name}`;
        
        const jobLocation = document.createElement('p');
        jobLocation.textContent = `Location: ${job.location.display_name}`;
        
        const jobSalary = document.createElement('p');
        jobSalary.textContent = `Salary: ${job.salary_min} - ${job.salary_max}`;
        
        const jobDescription = document.createElement('p');
        jobDescription.textContent = job.description;
        
        const jobLink = document.createElement('a');
        jobLink.href = `job_detail.html?job=${encodeURIComponent(JSON.stringify(job))}`;
        jobLink.textContent = 'View Job';
        
        jobCard.appendChild(jobTitle);
        jobCard.appendChild(jobCompany);
        jobCard.appendChild(jobLocation);
        jobCard.appendChild(jobSalary);
        jobCard.appendChild(jobDescription);
        jobCard.appendChild(jobLink);
        
        jobListings.appendChild(jobCard);
    });
}

 
async function fetchIndiaLocations() {
    const appId = '29036110';
    const appKey = '3b1d1e9624324f0a1280828a0b69e46a';
    const country = 'in'; // ISO 3166-1 alpha-2 code for India
    const url = `http://api.adzuna.com/v1/api/jobs/${country}/geodata`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayIndiaLocations(data.locations);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }
  
  function displayIndiaLocations(locations) {
    const locationSelect = document.getElementById('location');
    locationSelect.innerHTML = '<option value="">Select location</option>';
  
    locations.forEach(location => {
      const option = document.createElement('option');
      option.value = location.name;
      option.textContent = `${location.name} (${location.count})`;
      locationSelect.appendChild(option);
    });
  }