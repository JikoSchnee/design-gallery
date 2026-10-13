(() => {
  const rows = window.NATURE_CATALOG || [];
  const aliases = {
    "birds-poster": "Tragons Poster",
    "plant-poster": "Cyrlanthus Poster",
    "eggs-poster": "Eggs Poster",
    "gift-card": "Gift Card"
  };
  const products = Object.fromEntries(rows.map(row => {
    const [id, file, price, compareAt, sold] = row;
    const name = aliases[id] || id.split("-").map(part => part[0].toUpperCase() + part.slice(1)).join(" ");
    const folder = id === "gift-card" ? "files" : "products";
    return [id, {
      id, name, price, compareAt, available: !sold,
      image: "assets/nature/" + folder + "/" + file,
      from: id !== "plant-poster" && id !== "eggs-poster"
    }];
  }));
  products["trogon-hodgsonii-large"] = {
    ...products["trogon-hodgsonii"], id: "trogon-hodgsonii-large",
    name: "Trogon Hodgsonii · 50x70 cm", price: 180, from: false
  };
  products["trogon-hodgsonii-small"] = {
    ...products["trogon-hodgsonii"], id: "trogon-hodgsonii-small",
    name: "Trogon Hodgsonii · 30x40 cm", price: 90, from: false,
    image: "assets/nature/products/Unsaved_scene_41.png"
  };
  const money = value => "$" + value.toFixed(2);
  const icon = name => '<i class="fc fc-' + name + '" aria-hidden="true"></i>';
  const cartKey = "nature-demo-cart-v1";
  let cart = readCart();
  let active = null;
  let lastFocus = null;
  let quickId = null;
  let toastTimer = null;

  function readCart() {
    try {
      const old = { "birds-print": "birds-poster", "plant-print": "plant-poster", "eggs-print": "eggs-poster" };
      const saved = JSON.parse(localStorage.getItem(cartKey) || "[]");
      if (!Array.isArray(saved)) return [];
      return saved.map(item => ({
        id: old[item.id] || item.id,
        quantity: Math.min(99, Math.max(0, Number(item.quantity) || 0))
      })).filter(item => item.quantity && products[item.id] && products[item.id].available);
    } catch { return []; }
  }
  function saveCart() {
    try { localStorage.setItem(cartKey, JSON.stringify(cart)); } catch { /* Keep the in-memory cart usable. */ }
    renderCart();
  }
  function renderShell() {
    document.querySelector("#site-header").innerHTML = [
      '<header class="site-header"><div class="header-top">',
      '<button class="header-menu" type="button" data-open="menu" aria-label="Open menu">', icon("hamburguer"), '</button>',
      '<a class="header-logo" href="index.html" aria-label="Nature home"><img src="assets/nature/files/logo-1.png" alt="Nature"></a>',
      '<div class="header-actions"><button class="locale-button" type="button" data-open="locale" aria-label="Language and currency"><img src="assets/nature/svg/accordion-symbol.svg" alt=""><span>⌄</span></button>',
      '<button class="account-button" type="button" data-toast="Account sign-in is not connected in this local demo" aria-label="Sign in">', icon("user"), '</button>',
      '<button type="button" data-open="search" aria-label="Search">', icon("search"), '</button>',
      '<button class="cart-button" type="button" data-open="cart" aria-label="Your cart">', icon("cart"), '<span class="cart-badge" data-cart-count></span></button></div></div>',
      '<nav class="header-nav" aria-label="Collections"><a href="catalog.html?collection=birds"><span>Birds</span></a><a href="catalog.html?collection=fishes"><span>Fishes</span></a><a href="catalog.html?collection=flowers"><span>Flowers</span></a><a href="catalog.html?collection=plants"><span>Plants</span></a><a href="catalog.html?collection=anatomy"><span>On Sale</span></a></nav></header>'
    ].join("");
    document.querySelector("#site-footer").innerHTML = [
      '<footer class="site-footer"><div class="footer-grid">',
      '<section><h2>Quick links</h2><ul><li><a href="index.html#site-footer">About Us</a></li><li><a href="catalog.html">Catalog</a></li><li><a href="index.html#collections">Collections</a></li><li><a href="index.html#news">News</a></li></ul></section>',
      '<section><h2>Contact us</h2><p>1360 Lombard Street<br>San Francisco, CA 94109<br><a href="mailto:support@company.com">support@company.com</a></p></section>',
      '<section><h2>About us</h2><p>Our products bring together the finest materials and stunning design to create something very special. We believe in creating unique products that everyone can enjoy.</p></section>',
      '<section><h2>Connect with us</h2><div class="social-links"><a href="#site-footer" aria-label="Facebook">', icon("facebook"), '</a><a href="#site-footer" aria-label="Twitter">', icon("twitter"), '</a><a href="#site-footer" aria-label="Pinterest">', icon("pinterest"), '</a><a href="#site-footer" aria-label="Instagram">', icon("instagram"), '</a></div></section>',
      '</div><div class="footer-bottom"><span>© Copyright ', String(new Date().getFullYear()), ', <a href="index.html">Nature</a>. Powered by Shopify</span>',
      '<div><button type="button" data-open="locale"><img src="assets/nature/svg/accordion-symbol.svg" alt=""> English ⌄</button><button type="button" data-open="locale">United States (USD $) ⌄</button></div></div></footer>'
    ].join("");
    document.querySelector("#site-overlays").innerHTML = [
      '<div class="scrim" data-scrim hidden></div>',
      '<aside class="drawer menu-drawer" data-overlay="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>',
      '<div class="drawer-header"><h2>Menu</h2><button class="close-overlay" type="button" data-close aria-label="Close menu">', icon("close"), '</button></div>',
      '<nav class="menu-links"><a href="index.html">Home</a><details><summary>Collections +</summary><a href="catalog.html">All collections</a><a href="catalog.html?collection=birds">Birds</a><a href="catalog.html?collection=fishes">Fishes</a><a href="catalog.html?collection=flowers">Flowers</a><a href="catalog.html?collection=plants">Plants</a><a href="catalog.html?collection=octopuses">Octopuses</a><a href="catalog.html?collection=anatomy">On Sale</a></details><a href="index.html#news">Blog</a><a href="index.html#site-footer">About Us</a><a href="mailto:support@company.com">Contact</a><a href="#" data-open="newsletter-popup">Sign up and save</a></nav></aside>',
      '<aside class="drawer cart-drawer" data-overlay="cart" role="dialog" aria-modal="true" aria-label="Your cart" hidden>',
      '<div class="drawer-header"><h2>Your cart <span data-cart-title-count></span></h2><button class="close-overlay" type="button" data-close aria-label="Close cart">', icon("close"), '</button></div>',
      '<div class="cart-items" data-cart-items></div><div class="cart-empty" data-cart-empty>Your cart is empty</div>',
      '<div class="cart-footer" data-cart-footer hidden><div class="cart-subtotal"><span>Subtotal</span><strong data-cart-subtotal>$0.00</strong></div><button class="checkout-button" type="button" data-checkout>Check out</button><small class="demo-note">Demo checkout · no payment will be taken</small></div></aside>',
      '<section class="search-overlay" data-overlay="search" role="dialog" aria-modal="true" aria-label="Search" hidden><div class="search-top"><h2>Search</h2><button class="close-overlay" type="button" data-close aria-label="Close search">', icon("close"), '</button></div><label class="sr-only" for="search-input">Search our store</label><input id="search-input" type="search" placeholder="Search our store" data-search-input autocomplete="off"><div class="search-results" data-search-results></div></section>',
      '<section class="quick-overlay" data-overlay="quick" role="dialog" aria-modal="true" aria-label="Quick view" hidden><button class="close-overlay" type="button" data-close aria-label="Close quick view">', icon("close"), '</button><div class="quick-layout"><img data-quick-image alt=""><div class="quick-copy"><h2 data-quick-name></h2><p class="quick-price" data-quick-price></p><p>A study from the Nature collection of natural history art.</p><button class="quick-add" type="button" data-quick-add>Add to cart</button><a class="quick-detail-link" href="product.html">View product details</a><p>Free Shipping and Returns above $100!</p></div></div></section>',
      '<section class="newsletter-overlay" data-overlay="newsletter-popup" role="dialog" aria-modal="true" aria-label="Sign up and save" hidden><button class="close-overlay" type="button" data-close aria-label="Close newsletter">', icon("close"), '</button><img src="assets/nature/files/1024px-Haeckel_Actiniae.jpg" alt=""><div class="popover-copy"><h2>Sign up and save</h2><p>Subscribe today and get 10% off your first purchase.</p><form class="popover-form" data-newsletter-form><label class="sr-only" for="popup-email">Your email</label><input id="popup-email" type="email" placeholder="Your email" required><button type="submit">Subscribe</button><small data-form-message aria-live="polite"></small></form></div></section>',
      '<section class="locale-overlay" data-overlay="locale" role="dialog" aria-modal="true" aria-label="Language and currency" hidden><button class="close-overlay" type="button" data-close aria-label="Close">', icon("close"), '</button><h2>Language</h2><p>English</p><h2>Country/region</h2><p>United States (USD $)</p></section>',
      '<div class="toast" data-toast-box role="status" aria-live="polite"></div>'
    ].join("");
  }
  function productCard(product, catalog) {
    const label = (product.compareAt ? "<s>" + money(product.compareAt) + "</s> " : "") + (product.from ? "From " : "") + money(product.price);
    const badge = !product.available ? '<span class="product-badge">Sold<br>out</span>' : product.compareAt ? '<span class="product-badge">Sale</span>' : "";
    return '<article class="' + (catalog ? "catalog-card" : "product-card") + '"><a class="product-image-button" href="product.html" aria-label="View ' + product.name + ' details"><img src="' + product.image + '" alt="' + product.name + '" loading="lazy"><span class="product-name">' + product.name + '</span></a>' + badge + '<button class="product-quick-button" type="button" data-quick="' + product.id + '">Quick view</button><a class="product-caption" href="product.html" aria-label="View ' + product.name + ' details"><span class="' + (catalog ? "catalog-price" : "product-price") + '">' + label + '</span></a></article>';
  }
  function renderProducts() {
    if (document.body.dataset.page === "home") {
      document.querySelector("[data-featured-grid]").innerHTML = ["birds-poster", "plant-poster", "eggs-poster"].map(id => productCard(products[id], false)).join("");
      return;
    }
    if (document.body.dataset.page === "product") {
      document.querySelector("[data-related-grid]").innerHTML = ["trogon-atricollis", "trogon-citreolus", "trogon-ardens", "birds-poster"].map(id => productCard(products[id], true)).join("");
      return;
    }
    const params = new URLSearchParams(location.search);
    const collection = params.get("collection");
    const collections = window.NATURE_COLLECTIONS || {};
    const selected = Object.hasOwn(collections, collection) ? collection : null;
    const labels = { birds: "Birds", fishes: "Fishes", flowers: "Flowers", plants: "Plants", octopuses: "Octopuses", anatomy: "On Sale" };
    const ids = selected ? collections[selected] : rows.map(row => row[0]);
    const pageCount = Math.ceil(ids.length / 12);
    const askedPage = Number(params.get("page") || 1);
    const page = Number.isInteger(askedPage) && askedPage >= 1 && askedPage <= pageCount ? askedPage : 1;
    const title = selected ? labels[selected] : "Products";
    document.querySelector(".catalog-main h1").textContent = title;
    document.querySelector(".catalog-products").setAttribute("aria-label", title);
    document.querySelector("[data-catalog-grid]").innerHTML = ids.slice((page - 1) * 12, page * 12).map(id => productCard(products[id], true)).join("");
    document.title = title + (page > 1 ? " – Page " + page : "") + " – Nature";
    document.querySelectorAll('.header-nav a, .collection-tabs a, .menu-links details a').forEach(link => {
      if (selected && new URL(link.href).searchParams.get("collection") === selected) link.setAttribute("aria-current", "page");
    });
    let links = "";
    const href = n => "catalog.html" + (selected ? "?collection=" + selected + "&page=" + n : "?page=" + n);
    if (pageCount > 1) {
      links = page > 1 ? '<a href="' + href(page - 1) + '" aria-label="Previous page">←</a>' : "";
      for (let n = 1; n <= pageCount; n++) links += n === page ? '<span class="current" aria-current="page">' + n + '</span>' : '<a href="' + href(n) + '">' + n + '</a>';
      links += page < pageCount ? '<a href="' + href(page + 1) + '" aria-label="Next page">→</a>' : "";
    }
    document.querySelector("[data-pagination]").innerHTML = links;
    document.querySelector("[data-pagination]").hidden = pageCount < 2;
  }
  function renderCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + products[item.id].price * item.quantity, 0);
    document.querySelectorAll("[data-cart-count]").forEach(el => { el.textContent = count || ""; });
    document.querySelector("[data-cart-title-count]").textContent = count ? "(" + count + ")" : "";
    document.querySelector("[data-cart-empty]").hidden = count > 0;
    document.querySelector("[data-cart-footer]").hidden = !count;
    document.querySelector("[data-cart-subtotal]").textContent = money(total);
    document.querySelector("[data-cart-items]").innerHTML = cart.map(item => {
      const p = products[item.id];
      return '<article class="cart-line"><img src="' + p.image + '" alt=""><div><h3>' + p.name + '</h3><p>' + money(p.price) + '</p><div class="qty"><button type="button" data-cart-action="minus" data-id="' + p.id + '" aria-label="Decrease ' + p.name + '">−</button><span>' + item.quantity + '</span><button type="button" data-cart-action="plus" data-id="' + p.id + '" aria-label="Increase ' + p.name + '">+</button></div></div><button class="remove" type="button" data-cart-action="remove" data-id="' + p.id + '">Remove</button></article>';
    }).join("");
  }
  function openOverlay(name, trigger) {
    closeOverlay(false);
    active = document.querySelector('[data-overlay="' + name + '"]');
    if (!active) return;
    lastFocus = trigger || document.activeElement;
    active.hidden = false;
    document.querySelector("[data-scrim]").hidden = false;
    document.body.classList.add("overlay-open");
    const target = active.querySelector("input") || active.querySelector("[data-close]");
    if (target) target.focus();
  }
  function closeOverlay(returnFocus = true) {
    if (!active) return;
    active.hidden = true;
    document.querySelector("[data-scrim]").hidden = true;
    document.body.classList.remove("overlay-open");
    active = null;
    if (returnFocus && lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function quickView(id, trigger) {
    const p = products[id];
    if (!p) return;
    quickId = id;
    const image = document.querySelector("[data-quick-image]");
    image.src = p.image;
    image.alt = p.name;
    document.querySelector("[data-quick-name]").textContent = p.name;
    document.querySelector("[data-quick-price]").textContent = (p.from ? "From " : "") + money(p.price);
    const add = document.querySelector("[data-quick-add]");
    add.disabled = !p.available;
    add.textContent = p.available ? "Add to cart" : "Sold out";
    openOverlay("quick", trigger);
  }
  function addToCart(id) {
    if (!products[id] || !products[id].available) return;
    const item = cart.find(entry => entry.id === id);
    if (item) item.quantity = Math.min(99, item.quantity + 1);
    else cart.push({ id, quantity: 1 });
    saveCart();
    closeOverlay();
    openOverlay("cart");
  }
  function renderSearch(query) {
    const node = document.querySelector("[data-search-results]");
    const q = query.trim().toLowerCase();
    if (!q) { node.innerHTML = "<p>Search our store by product name.</p>"; return; }
    const matches = rows.map(row => products[row[0]]).filter(p => p.name.toLowerCase().includes(q)).slice(0, 12);
    node.innerHTML = matches.length ? matches.map(p => '<button class="search-result" type="button" data-quick="' + p.id + '"><img src="' + p.image + '" alt=""><span>' + p.name + '<small>' + (p.from ? "From " : "") + money(p.price) + '</small></span></button>').join("") : "<p>No products found.</p>";
  }
  function showToast(message) {
    const node = document.querySelector("[data-toast-box]");
    node.textContent = message;
    node.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove("visible"), 3000);
  }
  function selectedProductVariant() {
    return document.querySelector('input[name="size"]:checked')?.value === "small" ? "small" : "large";
  }
  function updateProductVariant(size) {
    const small = size === "small";
    document.querySelector("[data-product-price]").textContent = money(small ? 90 : 180);
    document.querySelector("[data-product-size-label]").textContent = small ? "30x40 cm" : "50x70 cm";
    document.querySelector("[data-product-image]").src = "assets/nature/products/" + (small ? "Unsaved_scene_41.png" : "Unsaved_scene_16_005e303c-c860-4fd1-913e-bca17c0e3ce4.png");
    document.querySelectorAll("[data-gallery-thumb]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.galleryThumb === size)));
  }
  renderShell();
  renderProducts();
  renderCart();
  renderSearch("");
  const updateScroll = () => {
    const mobile = innerWidth <= 620;
    const medium = !mobile && innerWidth <= 960;
    const expanded = mobile ? 110 : medium ? 145 : document.body.dataset.page === "product" ? 172 : 202;
    const compact = mobile ? 70 : 80;
    const progress = Math.min(1, Math.max(0, scrollY / (mobile ? 110 : 160)));
    const header = document.querySelector(".site-header");
    header.style.setProperty("--header-height", expanded - (expanded - compact) * progress + "px");
    header.style.setProperty("--header-top-height", (mobile ? 110 : medium ? 90 : 80) - (mobile ? 40 : medium ? 10 : 0) * progress + "px");
    header.style.setProperty("--logo-width", (mobile ? 176 : medium ? 145 : 180) - (mobile ? 76 : medium ? 45 : 80) * progress + "px");
    header.style.setProperty("--nav-height", (mobile ? 0 : medium ? 55 : document.body.dataset.page === "product" ? 92 : 122) * (1 - progress) + "px");
    header.style.setProperty("--nav-opacity", String(1 - progress));
    header.style.setProperty("--header-opacity", String(progress));
    header.style.setProperty("--header-top", Math.max(0, (document.querySelector(".announcement")?.offsetHeight || 0) - scrollY) + "px");
    document.body.classList.toggle("scrolled", progress >= 1);
  };
  updateScroll();
  addEventListener("scroll", updateScroll, { passive: true });
  addEventListener("resize", updateScroll);
  document.addEventListener("click", event => {
    const open = event.target.closest("[data-open]");
    if (open) { event.preventDefault(); openOverlay(open.dataset.open, open); return; }
    if (event.target.closest("[data-close]") || event.target.matches("[data-scrim]")) { closeOverlay(); return; }
    const quick = event.target.closest("[data-quick]");
    if (quick) { quickView(quick.dataset.quick, quick); return; }
    if (event.target.closest("[data-quick-add]")) { addToCart(quickId); return; }
    const thumb = event.target.closest("[data-gallery-thumb]");
    if (thumb) {
      if (thumb.dataset.galleryThumb === "original") {
        document.querySelector("[data-product-image]").src = "assets/nature/products/7717921700_75f22a3a7b_o_d.jpeg";
        document.querySelectorAll("[data-gallery-thumb]").forEach(button => button.setAttribute("aria-pressed", String(button === thumb)));
      } else {
        document.querySelector('input[name="size"][value="' + thumb.dataset.galleryThumb + '"]').checked = true;
        updateProductVariant(thumb.dataset.galleryThumb);
      }
      return;
    }
    const zoom = event.target.closest("[data-gallery-zoom]");
    if (zoom) {
      const dialog = document.querySelector("[data-product-lightbox]");
      dialog.querySelector("img").src = zoom.querySelector("img").src;
      dialog.showModal();
      return;
    }
    if (event.target.closest("[data-gallery-close]")) { document.querySelector("[data-product-lightbox]").close(); return; }
    if (event.target.matches("[data-product-lightbox]")) { event.target.close(); return; }
    if (event.target.closest("[data-product-buy]")) { addToCart("trogon-hodgsonii-" + selectedProductVariant()); return; }
    if (event.target.closest("[data-share-product]")) {
      if (navigator.share) navigator.share({ title: "Trogon Hodgsonii – Nature", url: location.href }).catch(() => {});
      else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(() => showToast("Product link copied")).catch(() => showToast("Share this product using the address bar."));
      else showToast("Share this product using the address bar.");
      return;
    }
    const action = event.target.closest("[data-cart-action]");
    if (action) {
      const item = cart.find(entry => entry.id === action.dataset.id);
      if (!item) return;
      if (action.dataset.cartAction === "plus") item.quantity = Math.min(99, item.quantity + 1);
      if (action.dataset.cartAction === "minus") item.quantity--;
      if (action.dataset.cartAction === "remove") item.quantity = 0;
      cart = cart.filter(entry => entry.quantity > 0);
      saveCart();
      return;
    }
    const toast = event.target.closest("[data-toast]");
    if (toast) { showToast(toast.dataset.toast); return; }
    if (event.target.closest("[data-checkout]")) showToast("Checkout is not connected in this local demo.");
  });
  document.addEventListener("input", event => {
    if (event.target.matches("[data-search-input]")) renderSearch(event.target.value);
  });
  document.addEventListener("submit", event => {
    if (event.target.matches("[data-product-form]")) {
      event.preventDefault();
      addToCart("trogon-hodgsonii-" + selectedProductVariant());
      return;
    }
    const form = event.target.closest("[data-newsletter-form]");
    if (!form) return;
    event.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (!input.checkValidity()) { input.reportValidity(); return; }
    form.querySelector("[data-form-message]").textContent = "Thank you for subscribing!";
    form.reset();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeOverlay();
    if (event.key !== "Tab" || !active) return;
    const focusables = [...active.querySelectorAll("button:not([disabled]),a[href],input:not([disabled]),summary")].filter(el => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  if (document.body.dataset.page === "product") {
    document.querySelectorAll('input[name="size"]').forEach(input => input.addEventListener("change", () => updateProductVariant(input.value)));
    updateProductVariant(selectedProductVariant());
  }
})();
