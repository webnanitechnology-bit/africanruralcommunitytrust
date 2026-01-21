// Multi-step wizard + validation + AJAX submit
(() => {
  const form = document.getElementById('volunteerForm');
  const steps = Array.from(document.querySelectorAll('.wizard-step'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const progress = document.getElementById('wizardProgress');
  const alertBox = document.getElementById('formAlert');

  let currentStep = 0;

  // Show step by index
  function showStep(index) {
    steps.forEach((s, i) => {
      s.classList.toggle('d-none', i !== index);
      if (i === index) {
        s.style.opacity = '1';
        s.style.transform = 'translateY(0)';
      } else {
        s.style.opacity = '0';
        s.style.transform = 'translateY(10px)';
      }
    });

    prevBtn.disabled = index === 0;
    nextBtn.classList.toggle('d-none', index === steps.length - 1);
    submitBtn.classList.toggle('d-none', index !== steps.length - 1);

    const percent = Math.round(((index + 1) / steps.length) * 100);
    progress.style.width = percent + '%';
  }

  // Basic per-step validity check (client-side)
  function stepIsValid(index) {
    const requiredFields = steps[index].querySelectorAll('[required]');
    let ok = true;
    requiredFields.forEach(f => {
      if (!f.value.trim()) {
        f.classList.add('is-invalid');
        ok = false;
      } else {
        f.classList.remove('is-invalid');
      }
      if (f.type === 'email' && f.value.trim()) {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim());
        if (!validEmail) { f.classList.add('is-invalid'); ok = false; }
      }
    });
    return ok;
  }

  // Move next
  nextBtn.addEventListener('click', () => {
    if (!stepIsValid(currentStep)) {
      flashAlert('Please fill all required fields on this step.', 'danger');
      return;
    }
    currentStep = Math.min(currentStep + 1, steps.length - 1);
    showStep(currentStep);
  });

  // Move prev
  prevBtn.addEventListener('click', () => {
    currentStep = Math.max(currentStep - 1, 0);
    showStep(currentStep);
  });

  // Form submit (AJAX)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate last step
    if (!stepIsValid(currentStep)) {
      flashAlert('Please fill all required fields before submitting.', 'danger');
      return;
    }

    // gather form data
    const data = new FormData(form);

    // show loading state
    nextBtn.disabled = true;
    prevBtn.disabled = true;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

    fetch('send_volunteer.php', {
      method: 'POST',
      body: data
    })
    .then(r => r.json())
    .then(resp => {
      if (resp.success) {
        flashAlert(resp.message || 'Thank you — your form has been sent.', 'success');
        // reset form
        form.reset();
        // reset wizard
        currentStep = 0;
        showStep(currentStep);
        // hide next/submit adjustments
        nextBtn.disabled = false;
      } else {
        flashAlert(resp.message || 'Failed to send. Please try again later.', 'danger');
      }
    })
    .catch(err => {
      console.error(err);
      flashAlert('An unexpected error occurred. Try again later.', 'danger');
    })
    .finally(() => {
      nextBtn.disabled = false;
      prevBtn.disabled = currentStep === 0;
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Submit';
    });
  });

  // show initial step
  showStep(currentStep);

  // helper to display alerts inside modal
  function flashAlert(message, type = 'success') {
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    alertBox.classList.remove('d-none');
    // auto-hide after 6s for success
    if (type === 'success') {
      setTimeout(() => alertBox.classList.add('d-none'), 6000);
    }
  }

  // remove invalid state on input
  document.querySelectorAll('#volunteerForm input, #volunteerForm select, #volunteerForm textarea').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('is-invalid'));
  });

})();
