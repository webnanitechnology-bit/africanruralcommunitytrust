// donate.js
document.addEventListener('DOMContentLoaded', function () {
  // set dynamic year
  document.getElementById('year').textContent = new Date().getFullYear();

  const form = document.getElementById('donationForm');
  const alertBox = document.getElementById('donationAlert');
  const submitBtn = document.getElementById('donateSubmit');
  const amountInput = document.getElementById('amount');
  const presetBtns = Array.from(document.querySelectorAll('.preset-amt'));

  // preset amount buttons behavior
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // toggle active
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // set amount input
      amountInput.value = btn.textContent.trim();
      amountInput.dispatchEvent(new Event('input'));
    });
  });

  // simple client-side validation function
  function validateForm() {
    let ok = true;
    // required fields
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');

    [fullname, email, amountInput].forEach(el => {
      el.classList.remove('is-invalid');
    });

    if (!fullname.value.trim()) {
      fullname.classList.add('is-invalid'); ok = false;
    }

    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      email.classList.add('is-invalid'); ok = false;
    }

    const amt = parseFloat(amountInput.value);
    if (isNaN(amt) || amt <= 0) {
      amountInput.classList.add('is-invalid'); ok = false;
    }

    return ok;
  }

  // show alert helper
  function showAlert(message, type = 'success') {
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    alertBox.classList.remove('d-none');
    if (type === 'success') setTimeout(() => alertBox.classList.add('d-none'), 6000);
  }

  // submit handler (AJAX)
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alertBox.classList.add('d-none');

    if (!validateForm()) {
      showAlert('Please fill in all required fields correctly.', 'danger');
      return;
    }

    // prepare form data
    const data = new FormData(form);

    // disable UI
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

    fetch('send_donation.php', {
      method: 'POST',
      body: data
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          showAlert(json.message || 'Thank you — your donation notification was sent.', 'success');
          form.reset();
          presetBtns.forEach(b => b.classList.remove('active'));
        } else {
          showAlert(json.message || 'Failed to send — please try again later.', 'danger');
        }
      })
      .catch(err => {
        console.error(err);
        showAlert('An unexpected error occurred. Try again later.', 'danger');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Notify & Send';
      });
  });
});
