const form = document.querySelector('.form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const passowrd = document.querySelector('#passowrd');
const passwordCheck = document.querySelector('#password-check');

function showSuccess(input, msg) {
  msg = msg || 'Looks good!';
  input.className = 'form-control is-valid';
  input.nextElementSibling.className = 'valid-feedback';
  input.nextElementSibling.textContent = msg;
}

function showError(input, msg) {
  input.className = 'form-control is-invalid';
  input.nextElementSibling.className = 'invalid-feedback';
  input.nextElementSibling.textContent = msg;
}

function getFieldName(input) {
  return input.id[0].toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      let msg = `${getFieldName(input)} is required`;
      showError(input, msg);
    }
  })
}

function checkLength(input, min, max) {
  console.log(input, min, max);
  if (input.value.trim().length < min) {
    let msg = `${getFieldName(input)} must be at least ${min} characters`;
    showError(input, msg);
  } else if (input.value.trim().length > max) {
    let msg = `${getFieldName(input)} must be less than ${max} characters`;
    showError(input, msg);
  } else {
    console.log(input.value.trim(), min, max);
    showSuccess(input);
  }
}

function checkEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // from chatGPT
  //   ^: Asserts the start of the string.
  // [^\s@]+: Matches one or more characters that are not whitespace (\s) or the @ symbol.
  // @: Matches the literal @ symbol.
  // [^\s@]+: Matches one or more characters that are not whitespace or @, representing the domain part of the email.
  // \.: Matches the literal dot (.) that separates the domain and the top-level domain.
  // [^\s@]+: Matches one or more characters that are not whitespace or @, representing the top-level domain.
  // $: Asserts the end of the string.

  if (emailRegex.test(input.value)) {
    showSuccess(input);
  } else {
    let msg = `${getFieldName(input)} is not valid`;
    showError(input, msg);
  }
}

function checkPasswordMatch(password, password2) {
  if (password.value === password2.value && password.value) {
    showSuccess(passwordCheck);
  } else {
    let msg = `Password do not match`;
    showError(passwordCheck, msg);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, password, passwordCheck]);
  checkLength(username, 3, 6);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, passwordCheck);
})