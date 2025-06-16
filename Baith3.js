document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const fullNameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const dobInput = document.querySelector("#dob");
  const genderInputs = document.querySelectorAll("input[name='gender']");
  const courseSelect = document.querySelector("#course");
  const registrationTable = document.querySelector("table tbody");

  function validateForm() {
    let isValid = true;

    if (!fullNameInput.value.trim()) {
      showError(fullNameInput, "Họ và tên không hợp lệ.");
      isValid = false;
    } else {
      hideError(fullNameInput);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, "Email không hợp lệ.");
      isValid = false;
    } else {
      hideError(emailInput);
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phoneInput.value.trim())) {
      showError(phoneInput, "Số điện thoại không hợp lệ.");
      isValid = false;
    } else {
      hideError(phoneInput);
    }

    if (!dobInput.value.trim()) {
      showError(dobInput, "Ngày sinh không hợp lệ.");
      isValid = false;
    } else {
      hideError(dobInput);
    }

    let genderSelected = false;
    genderInputs.forEach((input) => {
      if (input.checked) genderSelected = true;
    });
    if (!genderSelected) {
      showError(genderInputs[0].closest(".gender"), "Giới tính không được để trống.");
      isValid = false;
    } else {
      hideError(genderInputs[0].closest(".gender"));
    }

    if (!courseSelect.value) {
      showError(courseSelect, "Khóa học không được để trống.");
      isValid = false;
    } else {
      hideError(courseSelect);
    }

    return isValid;
  }

  function showError(input, message) {
  let errorElement = input.nextElementSibling; 
  if (!errorElement || !errorElement.classList.contains("error-message")) {
    errorElement = document.createElement("span");
    errorElement.className = "error-message";
    errorElement.style.color = "red";
    errorElement.style.display = "block"; 
    input.parentNode.insertBefore(errorElement, input.nextSibling); 
  }
  errorElement.textContent = message;
}

  function hideError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
      const course = courseSelect.options[courseSelect.selectedIndex].text;
      const existingCourses = Array.from(
        registrationTable.querySelectorAll("tr td:nth-child(2)")
      ).map((td) => td.textContent);

      if (existingCourses.includes(course)) {
        alert("Khóa học này đã được đăng ký trước đó.");
        return;
      }

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${registrationTable.children.length + 1}</td>
        <td>${course}</td>
        <td>Nguyễn Văn A</td>
        <td><span class="cancel";cursor: pointer;">Hủy đăng ký</span></td>
      `;
      registrationTable.appendChild(row);

      form.reset();
    }
  });

  registrationTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("cancel")) {
      e.target.closest("tr").remove();

      Array.from(registrationTable.children).forEach((row, index) => {
        row.querySelector("td:first-child").textContent = index + 1;
      });
    }
  });
});
