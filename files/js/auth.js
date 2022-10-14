document.addEventListener("DOMContentLoaded", main);

function main() {
  verifyToken();

  document
    .querySelector("input[type='submit']")
    .addEventListener("click", login);
}

function verifyToken() {
  apiClient
    .read("/api/auth/verify")
    .then(res => {
      if (!res.error) {
        const keys = Object.keys(res.result);
        keys.forEach(k => localStorage.setItem(k, res.result[k]));
        window.location.pathname = "/client";
        return;
      }
    });
}

function login(/** @type { MouseEvent } */ e) {
  e.preventDefault();
  const [username, password] = ["#username", "#password"].map(
    (selector) => document.querySelector(selector).value
  );
  apiClient
    .store("/api/auth/login", { body: { username, password } })
    .then((res) => {
      if (res.error) {
        alert(res.error.message);
        return;
      }
      const keys = Object.keys(res.result);
      keys.forEach(k => localStorage.setItem(k, res.result[k]));
      window.location.pathname = "/client";
    })
    .catch((err) => {
      alert("Something is wrong when logging in.");
    });
}
