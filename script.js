function addExperience() {
  const div = document.createElement('div');
  div.className = 'exp-entry';
  div.innerHTML = `
    <input type="text" placeholder="Job Title" class="jobTitle" required />
    <input type="text" placeholder="Company Name" class="company" required />
    <input type="text" placeholder="Duration" class="duration" required />
    <textarea placeholder="Job Responsibilities" class="jobDetails" rows="3" required></textarea>
  `;
  document.getElementById('experienceSection').appendChild(div);
}

function addEducation() {
  const div = document.createElement('div');
  div.className = 'edu-entry';
  div.innerHTML = `
    <input type="text" placeholder="Degree" class="degree" required />
    <input type="text" placeholder="Institution" class="institution" required />
    <input type="text" placeholder="Duration" class="eduDuration" required />
    <input type="text" placeholder="Grade (e.g. 3.8 GPA or 85%)" class="grade" required />
  `;
  document.getElementById('educationSection').appendChild(div);
}

function addProject() {
  const div = document.createElement('div');
  div.className = 'project-entry';
  div.innerHTML = `
    <input type="text" placeholder="Project Title" class="projectTitle" required />
    <textarea placeholder="Project Description" class="projectDesc" rows="3" required></textarea>
    <input type="text" placeholder="Project Link (optional)" class="projectLink" />
  `;
  document.getElementById('projectSection').appendChild(div);
}

document.getElementById('resumeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const title = document.getElementById('title').value;
  const profile = document.getElementById('profile').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const skills = document.getElementById('skills').value;
  const languages = document.getElementById('languages').value;

  const expEntries = document.querySelectorAll('.exp-entry');
  let expHTML = '';
  expEntries.forEach(entry => {
    const jobTitle = entry.querySelector('.jobTitle').value;
    const company = entry.querySelector('.company').value;
    const duration = entry.querySelector('.duration').value;
    const jobDetails = entry.querySelector('.jobDetails').value;
    expHTML += `<h4>${jobTitle} <span style="float:right; color:#555;">${duration}</span></h4><p>${company}</p><p>${jobDetails}</p>`;
  });

  const eduEntries = document.querySelectorAll('.edu-entry');
  let eduHTML = '';
  eduEntries.forEach(entry => {
    const degree = entry.querySelector('.degree').value;
    const institution = entry.querySelector('.institution').value;
    const eduDuration = entry.querySelector('.eduDuration').value;
    const grade = entry.querySelector('.grade').value;
    eduHTML += `<h4>${degree} <span style="float:right; color:#555;">${eduDuration}</span></h4><p>${institution}</p><p><strong>Grade:</strong> ${grade}</p>`;
  });

  const projectEntries = document.querySelectorAll('.project-entry');
  let projectHTML = '';
  projectEntries.forEach(entry => {
    const title = entry.querySelector('.projectTitle').value;
    const desc = entry.querySelector('.projectDesc').value;
    const link = entry.querySelector('.projectLink').value;
    projectHTML += `<h4>${title}</h4><p>${desc}</p>${link ? `<p>🔗 <a href="${link}" target="_blank">${link}</a></p>` : ''}`;
  });

  const imageInput = document.getElementById('profileImage');
  let imageSrc = '';

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(event) {
      imageSrc = event.target.result;
      renderResume(imageSrc);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    renderResume('');
  }

  function renderResume(imgSrc) {
    const resumeHTML = `
      <div id="resumeContainer" style="display: flex; border: 1px solid #ccc;">
        <div style="width: 35%; background: #2e3a59; color: white; padding: 20px; text-align: center;">
          ${imgSrc ? `<img src="${imgSrc}" class="profile-img" alt="Profile Image" />` : ''}
          <h2>${fullName}</h2>
          <h4>${title}</h4>
          <p>📧 ${email}</p>
          <p>📞 ${phone}</p>
          <p>📍 ${address}</p>
          <h4>Skills</h4>
          <p>${skills.replace(/,/g, '<br>')}</p>
          <h4>Languages</h4>
          <p>${languages.replace(/,/g, '<br>')}</p>
        </div>
        <div style="width: 65%; padding: 20px;">
          <h3>Profile</h3>
          <p>${profile}</p>
          <h3>Work Experience</h3>
          ${expHTML}
          <h3>Education</h3>
          ${eduHTML}
          <h3>Projects</h3>
          ${projectHTML}
        </div>
      </div>
    `;
    const output = document.getElementById('resumeOutput');
    output.innerHTML = resumeHTML;
    output.style.display = 'block';
  }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
  const resume = document.getElementById('resumeOutput');
  if (resume.style.display === 'block') {
    html2pdf().from(resume).save('resume.pdf');
  } else {
    alert('Please generate your resume first.');
  }
});
