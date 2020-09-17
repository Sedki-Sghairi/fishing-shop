const client = contentful.createClient({
	// This is the space ID. A space is like a project folder in Contentful terms
	space: 'ehcucw4rvpb9',
	// This is the access token for this space. Normally you get both ID and the token in the Contentful web app
	accessToken: '_gH1FoTb1mc6hQVpWeenis816TFAWKQWq9Dkx2H3P1s'
});

const cartBtn = document.getElementById('cart-btn');
const hero = document.getElementById('hero');
// const logo = document.getElementById('logo');
const txt = document.getElementById('txt-total');
const outlet = document.getElementById('outlet');
const latest = document.getElementById('latest');
const wear = document.getElementById('wear');
const surfcasting = document.getElementById('surfcasting');
const spinning = document.getElementById('spinning');
const anglaise = document.getElementById('anglaise');
const closeCartBtn = document.getElementById('caloseCartBtn');
const cartDOM = document.getElementById('cart');
const cartOverlay = document.getElementById('cartOverlay');
const clearBtn = document.getElementById('clear-btn');
const cartContent = document.querySelector('.cart-content');
const cartItems = document.querySelector('.cart-items');
const toggle = document.getElementById('navicon');
const navBar = document.getElementById('navbar');
const links = document.querySelector('.links');
// // get client-width
// function dw_getWindowDims() {
// 	var doc = document,
// 		w = window;
// 	var docEl = doc.compatMode && doc.compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;

// 	var width = docEl.clientWidth;
// 	var height = docEl.clientHeight;

// 	// mobile zoomed in?
// 	if (w.innerWidth && width > w.innerWidth) {
// 		width = w.innerWidth;
// 		height = w.innerHeight;
// 	}

// 	return { width: width, height: height };
// }
// var foo = dw_getWindowDims();

toggle.addEventListener('click', function() {
	navBar.classList.toggle('show');
});

let cart = [];
let buttonsDOM = [];

// getting the products
class Products {
	async getProducts() {
		try {
			let contentful = await client.getEntries({
				content_type: 'barberousse'
			});
			// let result = await fetch('products.json');
			// let data = await result.json();
			// let products = data.items;
			let products = contentful.items;
			products = products.map((item) => {
				const { title, category, price } = item.fields;
				const { id } = item.sys;
				const image = item.fields.image.fields.file.url;
				return { title, category, price, id, image };
			});
			return products;
		} catch (error) {
			console.log(error);
		}
	}
}
// display products
class UI {
	displayProducts(products) {
		let result1 = '';
		let result2 = '';
		let result3 = '';
		let result4 = '';
		let result5 = '';
		let result6 = '';
		products.forEach((product) => {
			if (product.category === 'spinning') {
				result5 += ` <article class="products">
			<div class="img-container">
				<img src=${product.image} alt="a product" class="product-img">
				<button class="bag-btn" data-id=${product.id}>
					<i class="fas fa-shopping-cart">add to cart</i>
				</button>
			</div>
			<h3>${product.title}</h3>
			<h4>${product.price} TND</h4>
		</article>`;
			} else if (product.category === 'wear') {
				result2 += ` <article class="products">
			<div class="img-container">
				<img src=${product.image} alt="a product" class="product-img">
				<button class="bag-btn" data-id=${product.id}>
					<i class="fas fa-shopping-cart">add to cart</i>
				</button>
			</div>
			<h3>${product.title}</h3>
			<h4>${product.price} TND</h4>
		</article>`;
			} else if (product.category === 'anglaise') {
				result3 += ` <article class="products">
			<div class="img-container">
				<img src=${product.image} alt="a product" class="product-img">
				<button class="bag-btn" data-id=${product.id}>
					<i class="fas fa-shopping-cart">add to cart</i>
				</button>
			</div>
			<h3>${product.title}</h3>
			<h4>${product.price} TND</h4>
		</article>`;
			} else if (product.category === 'outlet') {
				result4 += ` <article class="products">
			<div class="img-container">
				<img src=${product.image} alt="a product" class="product-img">
				<button class="bag-btn" data-id=${product.id}>
					<i class="fas fa-shopping-cart">add to cart</i>
				</button>
			</div>
			<h3>${product.title}</h3>
			<h4>${product.price} TND</h4>
		</article>`;
			} else if (product.category === 'surfcasting') {
				result6 += ` <article class="products">
			<div class="img-container">
				<img src=${product.image} alt="a product" class="product-img">
				<button class="bag-btn" data-id=${product.id}>
					<i class="fas fa-shopping-cart">add to cart</i>
				</button>
			</div>
			<h3>${product.title}</h3>
			<h4>${product.price} TND</h4>
		</article>`;
			} else {
				result1 += ` <article class="products">
			<div class="img-container">
				<img src=${product.image} alt="a product" class="product-img">
				<button class="bag-btn" data-id=${product.id}>
					<i class="fas fa-shopping-cart">add to cart</i>
				</button>
			</div>
			<h3>${product.title}</h3>
			<h4>${product.price} TND</h4>
		</article>`;
			}
			latest.innerHTML = result1;
			spinning.innerHTML = result5;
			wear.innerHTML = result2;
			anglaise.innerHTML = result3;
			outlet.innerHTML = result4;
			surfcasting.innerHTML = result6;
		});
	}
	getBagButtons() {
		const buttons = [ ...document.querySelectorAll('.bag-btn') ];
		// cuz we won't be able to use .find on nodelist
		buttonsDOM = buttons;
		buttons.forEach((button) => {
			let inCart = cart.find((item) => item.id === button.dataset.id);

			if (inCart) {
				button.disabled = true;
				button.innerText = 'In Cart';
			}
			button.addEventListener('click', (e) => {
				e.target.innerText = 'In Cart';
				e.target.parentElement.disabled = true;
				let cartItem = { ...Storage.getProduct(button.dataset.id), amount: 1 };
				cart = [ ...cart, cartItem ];
				Storage.saveCart(cart);
				this.setCartValue(cart);
				this.addCartItem(cartItem);
			});
		});
	}
	setCartValue(cart) {
		let tempTotal = 0;
		let itemsTotal = 0;
		cart.map((item) => {
			tempTotal += item.price * item.amount;
			itemsTotal += item.amount;
		});

		cartItems.innerText = itemsTotal;
		if (itemsTotal == 0) {
			txt.innerHTML = 'your cart is empty';
			clearBtn.classList.add('hide');
		} else {
			clearBtn.classList.remove('hide');
			txt.innerHTML = `your total: <span class="cart-total" id="cart-total">${parseFloat(
				tempTotal.toFixed(2)
			)}</span> TND`;
		}
	}
	addCartItem(item) {
		const div = document.createElement('div');
		div.classList.add('cart-item');
		div.innerHTML = ` <img src=${item.image} alt="product">
	  <div>
		 <h4>${item.title}</h4>
		 <h5>${item.price} TND</h5>
		 <span class="remove-item" data-id =${item.id}><i class="fas fa-trash-alt"></i></span>
	  </div>
	  <div>
		  <i class="fas fa-chevron-up" data-id =${item.id}></i>
		  <p class="item-amount">${item.amount}</p>
		  <i class="fas fa-chevron-down" data-id =${item.id}></i>`;

		cartContent.appendChild(div);
	}
	showCart() {
		cartOverlay.classList.add('transparentBcg');
		cartDOM.classList.add('showCart');
		hero.classList.add('curtain');
	}
	hideCart() {
		cartOverlay.classList.remove('transparentBcg');
		cartDOM.classList.remove('showCart');
		hero.classList.remove('curtain');
	}
	setUpApp() {
		cart = Storage.getCart();
		this.setCartValue(cart);
		this.populateCart(cart);
		closeCartBtn.addEventListener('click', this.hideCart);
		this.cartLogic();
	}

	populateCart(cart) {
		cart.forEach((item) => {
			this.addCartItem(item);
		});
	}
	clearCart() {
		let cartItems = cart.map((item) => item.id);
		cartItems.forEach((id) => this.removeItem(id));
		while (cartContent.children.length > 0) {
			cartContent.removeChild(cartContent.children[0]);
		}
		this.hideCart();
	}
	cartLogic() {
		clearBtn.addEventListener('click', () => {
			this.clearCart();
		});
		cartContent.addEventListener('click', (e) => {
			if (e.target.classList.contains('fa-trash-alt')) {
				let removeItem = e.target;
				let id = removeItem.parentElement.dataset.id;
				cartContent.removeChild(removeItem.parentElement.parentElement.parentElement);
				this.removeItem(id);
			} else if (e.target.classList.contains('fa-chevron-up')) {
				let addUp = e.target;
				let id = addUp.dataset.id;
				let tempItem = cart.find((item) => item.id === id);
				tempItem.amount += 1;
				Storage.saveCart(cart);
				this.setCartValue(cart);
				addUp.nextElementSibling.innerText = tempItem.amount;
			} else if (e.target.classList.contains('fa-chevron-down')) {
				let addDown = e.target;
				let id = addDown.dataset.id;
				let tempItem = cart.find((item) => item.id === id);
				tempItem.amount -= 1;
				if (tempItem.amount > 0) {
					addDown.previousElementSibling.innerText = tempItem.amount;
					Storage.saveCart(cart);
					this.setCartValue(cart);
				} else {
					cartContent.removeChild(addDown.parentElement.parentElement);
					this.removeItem(id);
				}
			}
		});
	}
	removeItem(id) {
		cart = cart.filter((item) => item.id !== id);
		this.setCartValue(cart);
		Storage.saveCart(cart);
		let button = this.getSingleButton(id);

		button.disabled = false;
		button.innerHTML = `<i class="fas fa-shopping-cart">add to cart</i>`;
	}
	getSingleButton(id) {
		return buttonsDOM.find((button) => button.dataset.id === id);
	}
}
// local storage
class Storage {
	static saveProducts(products) {
		localStorage.setItem('products', JSON.stringify(products));
	}
	static getProduct(id) {
		let products = JSON.parse(localStorage.getItem('products'));
		return products.find((product) => product.id === id);
	}
	static saveCart(cart) {
		localStorage.setItem('cart', JSON.stringify(cart));
	}
	static getCart() {
		return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
	}
}
document.addEventListener('DOMContentLoaded', () => {
	const ui = new UI();
	const products = new Products();
	// get all products
	products
		.getProducts()
		.then((products) => {
			ui.displayProducts(products);
			Storage.saveProducts(products);
		})
		.then(() => {
			ui.getBagButtons();
		});
	ui.setUpApp();
});
cartBtn.addEventListener('click', function() {
	let ui = new UI();
	ui.showCart();
});
