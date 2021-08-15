// You are creating the "shopping cart experience" for a Online Marketplace.
// You have the list of the available books from the current API:
// https://striveschool-api.herokuapp.com/books
// What you have to do is:
// 0) Get all the products from the API using a fetch
// 1) Display the list of items available on the page using template literals `` and .forEach
// 2) Add a "add to cart button"
// 3) When the button is pressed, change the style of the item and add it to another list
// 4) Add "skip" button next to each item
// 5) When pressed, the button should remove from the page the item not interesting from the user
// 6) Add a "search bar". When the user types more than 3 chars, you should filter the content of the page to show only the items with a matching name (hint: use .filter method)
// 7) Allow the user to delete items from the cart list

// [EXTRA]
// 8) Add a "clean cart" button, to clean the whole list.
// 9) Create a second "detail page" for the product. When the user clicks on a product name, the app should redirect him to the secondary page, passing the ASIN in query string
// 10) In page "detail" show some details of the selected product (https://striveschool-api.herokuapp.com/books/1940026091 to fetch the details of a specific book)

window.onload = () => {
  fetching();
};

const url = `https://striveschool-api.herokuapp.com/books`;

let booksdata = [];
let asindata = [];

const fetching = () => {
  fetch(url)
    .then((response) => response.json())
    .then((books) => {
      booksdata = books;
      displaybooks(books);
    });
};

let cartArray = []
const AddtoCart = (e) => {
  let p = e.target.parentNode;
  console.log(p);
  p.classList.add("bg-info");
  e.target.innerHTML = `<span class="badge badge-pill badge-warning">Added Succesfully!!</span>`
  let cartCount = document.querySelector("#cart");

  cartCount.innerText = parseInt(cartCount.innerText) + 1;
  let ele = e.target.closest(".card-body").children[0].innerText
  let img = e.target.closest(".card").children[0].src
  let price = e.target.closest(".card-body").children[2].innerText
  let cartobj = {}
  
  cartobj["title"]= ele
  cartobj["img"] = img
  cartobj["price"] = price
   cartArray.push(cartobj)
  cartobj={}
  console.log(cartArray)
};



const removFromCart=(e)=>{
  cartArray.pop()
  console.log(cartArray)
  if(cartArray.length === 0){
    let alert = document.querySelector('.alert')
    alert.innerHTML = `<div class="alert alert-danger" role="alert">
    Sorry! Your Cart is Empty...refresh Page to shop
  </div>`
  }
    let removecard = e.target.parentNode.parentNode
    removecard.remove()
    let cartCount = document.querySelector("#cart");
    cartCount.innerText = parseInt(cartCount.innerText) - 1;
    cartPrice()
  }

  function cartPrice(){
    let prices = document.querySelectorAll('.prices')
    let newprices = []
    for(i=0;i<prices.length;i++){
      newprices.push(`${prices[i].innerText}`)
    }
    let news = newprices.map(ele => ele.split('')
    .slice(1,ele.length-1))
    .map(ele=> ele.join(''))
    .map(ele=> parseFloat(ele))
    .reduce((acc,cv) => acc+cv , 0)
    console.log(news)
   let displayprice = document.querySelector(".cartPrice ")
   displayprice.innerHTML = ''
   displayprice.innerHTML += ` <button type="button" class="btn btn-success">
   Cart Value is : <span class="badge badge-light">${news}</span>
   <span class="sr-only">unread messages</span>
 </button>`
  
  }

function displayCart(){

  if(cartArray.length === 0){
    let alert = document.querySelector('.alert')
    alert.innerHTML = `<div class="alert alert-danger" role="alert">
    Sorry! Your Cart is Empty...refresh Page to shop
  </div>`
  }
 
  let remove = document.querySelectorAll('.remove')
  remove[0].innerHTML = ''
  remove[1].innerHTML = ''
  let row = document.querySelector(".booksContainer .row")
  row.innerHTML = ''
  cartArray.forEach(ele => {
        let card = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mt-2 mb-2">
        <div class=" card shadow" style="border: 1px solid gray">
        <img src=${ele.img} class="card-img-top img-fluid" alt='....' style='height:20rem; object-fit: cover'>
        <div class=" card-body">
                <p class="card-title text-ellipsis title"><b>${ele.title}</b></p>
            
                <p class="card-text prices">${ele.price}</p>
             <button onclick="removFromCart(event)" class="btn btn-danger mb-2 remove">Remove</button>
                 </br>
                
              </div>
              </div>
        </div>`
        row.innerHTML+=card
  })

  cartPrice()
}



const displaybooks = (booksdata) => {
  let row = document.querySelector(".booksContainer .row");
  row.innerHTML = "";
  console.log(booksdata);
  booksdata.forEach((element) => {
    asindata.push(element.price);
    row.innerHTML += `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mt-2 mb-2">
        <div class=" card shadow" style="border: 1px solid gray">
        <img src=${element.img} class="card-img-top img-fluid" alt='....' style='height:20rem; object-fit: cover'>
        <div class=" card-body">
                <p class="card-title text-ellipsis title"><b>${element.title}</b></p>
                <p class="card-text"><b>${element.category}</b></p>
                <p class="card-text price"><b>€${element.price}</b></p>
             <button onclick='AddtoCart(event)' class="add-cart btn btn-success mb-2" data-toggle="popover" 
             title="Card Added Successfully" data-container="body" data-content="Click on Cart to see the Added BookList">Add to Cart</button>
                 </br>
                <button class="skip btn btn-info ">Skip</button>
              </div>
              </div>
        </div>`;
  });

  let totalprice = asindata.reduce((acc, curr) => acc + curr);
  console.log(totalprice);
};

const handleSearch = (query) => {
  console.log(query);
  let filteredbooks = booksdata.filter((books) =>
    books.title.toLowerCase().includes(query)
  );
  displaybooks(filteredbooks);
  if (!query) {
    displaybooks(booksdata);
  }
};

const handlesecondsearch = (e) => {
  let field = e.target.value;
  let filteredbooks = booksdata.filter((books) =>
    books.title.toLowerCase().includes(field)
  );
  displaybooks(filteredbooks);
  if (!field) {
    displaybooks(booksdata);
  }
};
