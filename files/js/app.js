document.addEventListener("DOMContentLoaded", main);

function main() {
  const previousVersions = {};
  document.getElementById("logout").addEventListener("click", logout);

  document
    .querySelectorAll(".edit-product")
    .forEach((btn) => btn.addEventListener("click", editProduct));
  document
    .querySelectorAll(".delete-product")
    .forEach((btn) => btn.addEventListener("click", deleteProduct));
  document
    .querySelectorAll(".save-edit-product")
    .forEach((btn) => btn.addEventListener("click", saveEditProduct));
  document
    .querySelectorAll(".cancel-edit")
    .forEach((btn) => btn.addEventListener("click", cancelEditProduct));
  document.querySelector("#add-product").addEventListener("click", addProduct);
  document.querySelector("#clear").addEventListener("click", clear);

  function editProduct(/** @type { MouseEvent } */ e) {
    // On récupère les ifnormations du produit en cours d'édition
    const productId = e.target.getAttribute("data-product-id");
    const title = document.querySelector(`#product-${productId} .title`);
    const description = document.querySelector(
      `#product-${productId} .description`
    );

    // On sauvegarde les anciennes valeurs
    previousVersions[productId] = {
      title: title.textContent,
      description: description.textContent,
    };

    // On démarre l'édition
    title.innerHTML = `<input type="text" class="title-product" value="${previousVersions[productId].title}"/>`;
    description.innerHTML = `<input type="text" class="description-product" value="${previousVersions[productId].description}"/>`;

    // On affiche les boutons pour l'édition
    document
      .querySelectorAll(`#product-${productId} td button`)
      .forEach((btn) => {
        if (btn.classList.contains("hide")) {
          btn.classList.remove("hide");
        } else {
          btn.classList.add("hide");
        }
      });
  }

  function deleteProduct(/** @type { MouseEvent } */ e) {
    const productId = e.target.getAttribute("data-product-id");

    delete previousVersions[productId];

    apiClient.destroy(`/api/shopify/products/${productId}`).then((res) => {
      if (res.error) {
        alert("Cannot delete product.");
        return;
      }
      window.location.reload();
    });
  }

  function saveEditProduct(/** @type { MouseEvent } */ e) {
    const productId = e.target.getAttribute("data-product-id");
    const title = document.querySelector(
      `#product-${productId} td.title input.title-product`
    ).value;
    const description = document.querySelector(
      `#product-${productId} td.description input.description-product`
    ).value;
    
    apiClient
      .update(`/api/shopify/products/${productId}`, {
        body: { title, description },
      })
      .then((res) => {
        if (res.error) {
          alert("Cannot edit product.");
          return;
        }
        window.location.reload();
      });
  }

  function cancelEditProduct(/** @type { MouseEvent } */ e) {
    const productId = e.target.getAttribute("data-product-id");
    const title = document.querySelector(`#product-${productId} .title`);
    const description = document.querySelector(
      `#product-${productId} .description`
    );

    title.innerHTML = `${previousVersions[productId].title}`;
    description.innerHTML = `${previousVersions[productId].description}`;

    document
      .querySelectorAll(`#product-${productId} td button`)
      .forEach((btn) => {
        if (btn.classList.contains("hide")) {
          btn.classList.remove("hide");
        } else {
          btn.classList.add("hide");
        }
      });
  }

  function addProduct(/** @type { MouseEvent } */ e) {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    apiClient
      .store(`/api/shopify/products`, {
        body: { title, description },
      })
      .then((res) => {
        if (res.error) {
          alert("Cannot store new product.");
          return;
        }
        window.location.reload();
      });
  }

  function clear() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  }

  function logout() {
    apiClient
      .store("/api/auth/logout")
      .then(() => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.pathname = "/not-auth";
      })
      .catch((error) => {
        alert("Cannot log out. An error ocurred.");
      });
  }
}
