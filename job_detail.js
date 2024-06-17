document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const jobData = JSON.parse(params.get('job'));

    document.getElementById('job-title').textContent = jobData.title;
    document.getElementById('job-company').textContent = `Company: ${jobData.company.display_name}`;
    document.getElementById('job-location').textContent = `Location: ${jobData.location.display_name}`;
    document.getElementById('job-salary').textContent = `Salary: ${jobData.salary_min} - ${jobData.salary_max}`;
    document.getElementById('job-description').textContent = jobData.description;

    // Apply button functionality
    const applyButton = document.getElementById('apply-button');
    applyButton.addEventListener('click', function () {
        // Assuming jobData has a redirect_url property for applying
        if (jobData.redirect_url) {
            // Open the redirect_url in a new tab/window
            window.open(jobData.redirect_url, '_blank');
        } else {
            alert('Apply link not available for this job.');
        }
    });
});
