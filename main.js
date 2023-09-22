let profileIcon = document.querySelector(".bi-person");
let profileDropdown = document.querySelector(".profile-dropdown");
let products = document.querySelector(".products");
let arrowDown = document.querySelector(".bi-caret-down-fill");
let categories = document.querySelector(".categories");
let allOptions = document.querySelectorAll(".categories p");
let mainOption = document.querySelector(".main-option");
let myLoading = document.querySelector(".my-loading");

let globalProducts = null;

allOptions.forEach((eachOption) => {
  eachOption.addEventListener("click", () => {
    console.log(eachOption.textContent);
    mainOption.textContent = eachOption.textContent;
    categories.classList.remove("active");
    if (eachOption.textContent.toLowerCase() === "all") {
      updateUI(globalProducts);
    } else {
      let filteredProducts = globalProducts.filter(
        (eachProduct) =>
          eachProduct.category === eachOption.textContent.toLocaleLowerCase()
      );
      updateUI(filteredProducts);
    }
  });
});

arrowDown.addEventListener("click", () => {
  categories.classList.toggle("active");
  arrowDown.classList.toggle("active");
});

profileIcon.addEventListener("click", () => {
  //   if (profileDropdown.classList.contains("active")) {
  //     profileDropdown.classList.remove("active");
  //   } else {
  //     profileDropdown.classList.add("active");
  //   }
  profileDropdown.classList.toggle("active");
});

let getData = async () => {
  let res = await fetch("https://fakestoreapi.com/products");
  let allProducts = await res.json();
  console.log(allProducts);
  globalProducts = allProducts;
  updateUI(allProducts);
  myLoading.classList.add("d-none");
};
setTimeout(() => {
  getData();
}, 3000);

function updateUI(array) {
  let productsJSX = array.map((product) => {
    return `<div class="shadow">
    <img class="" src="${product.image}" />
        <p class="fs-2">${product.title.slice(0, 15)}...</p>
        <p>${product.description.slice(0, 30)}...</p>
        <p>$${product.price}</p>
        <p>${Math.floor(product.rating.rate)}</p>
        <button class="btn bg-dark text-white w-100">Add to Cart</button>
       </div>`;
  });
  products.innerHTML = productsJSX.join("");
}

// Asynchronous programming
//interacting with APIs or making an API call
//API -Application programming interface
// url that return data is referred to as endpoint
//json-javascript object notation

// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

// let getData = async () => {
//   let response = await fetch("https://jsonplaceholder.typicode.com/todos");
//   let data = await response.json();
//   console.log(data);

//   let wrapped = data.map((datum) => {
//     return `<div>
//     <p>${datum.title}</p>
//     <p>This item has an id of:${datum.id}</p>
//     </div>`;
//   });
//   console.log(wrapped);
//   products.innerHTML = wrapped.join("")
// };
// getData();
