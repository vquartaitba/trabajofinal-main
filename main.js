let shopItemsData = [
  {
    id: "1",
    name: "Casual Shirt",
    price: 1500,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/slide02.jpg",
  },
  {
    id: "2",
    name: "Office Shirt",
    price: 1500,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/slide02.jpg",
  },
  {
    id: "3",
    name: "T Shirt",
    price: 1500,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/slide02.jpg",
  },
  {
    id: "4",
    name: "T Shirt",
    price: 1500,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/slide02.jpg",
  },
  {
    id: "5",
    name: "Card title",
    price: 1500,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/slide02.jpg",
  },
  {
    id: "6",
    name: "Card title",
    price: 1500,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/slide02.jpg",
  },
];

let shop = document.getElementById("shop");

let basket =  [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      return `
      <div class="container">
      <div class="col">
      <div class="row">
    	<div id=product-id-${id} class="card card-border" style="width: 18rem;">
        <img width="220" src=${img} alt="" class="card-img-top">
        <div class="card-body">
          <h3 class="card-title">${name}</h3>
          <p class="card-text">${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price} </h2>
            <div class="buttons">
            <i onclick="decrement(${id})" class="bi bi-dash-square"></i>
			<div id=${id} class="quantity">0</div>
			<i onclick="increment(${id})" class="bi bi-plus-square"></i>
          </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    `;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }


 let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};  