(() => {
  const body = document.body;
  const root = body.dataset.root || ".";
  const page = body.dataset.page || "home";
  const url = (file) => `${root}/${file}`.replace(/^\.\/\.\//, "./");
  const asset = (file) => url(`assets/${file}`);
  const esc = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const products = [
    {id:"crispy-chili-oil",name:"Crispy Chili Oil",price:12,category:"sauce",image:"products/chili-oil.png",description:"Deliciously fiery and surprisingly versatile. Bold aromatic chilies get a savory boost from garlic and shallots, while a hint of soy sauce adds a delightful umami depth."},
    {id:"wild-yuzu-garlic-rub",name:"Wild Yuzu Garlic Rub",price:25,category:"seasoning",image:"products/yuzu-rub.png",description:"A vibrant blend of tangy yuzu and bold garlic. Your ticket to zesting up any dish."},
    {id:"very-good-spice-rub",name:"Very Good Spice Rub",price:25,category:"seasoning",image:"products/very-good-rub.png",soldOut:true,description:"Rich and savory with a hint of smoky spice."},
    {id:"umami-chili-salt",name:"Umami Chili Salt",price:17,category:"seasoning",image:"products/umami-salt.png",description:"Savory umami goodness with a spicy chili kick."},
    {id:"pina-picante-hot-sauce",name:"Pina Picante Hot Sauce",price:12,compare:20,category:"sauce",image:"products/pina-picante.png",description:"The saucy lovechild of tropical pineapple sweetness and sizzling chili heat."},
    {id:"herby-italo-crumb-blend",name:"Herby Italo Crumb Blend",price:25,category:"seasoning",image:"products/herby-crumb.png",description:"Herby, crunchy, and ready to add a little extra joy to dinner."},
    {id:"ghost-pepper-chili-salt",name:"Ghost Pepper Chili Salt",price:17,category:"seasoning",image:"products/ghost-pepper-salt.png",description:"A fiery blend of ghost pepper and salt for a flavor explosion."},
    {id:"everything-bagel",name:"Everything Bagel",price:15,category:"seasoning",image:"products/everything-bagel.png",description:"Crisp garlic, nutty sesame, poppy seeds, and fragrant onion."},
    {id:"el-diablo-hot-sauce",name:"El Diablo Hot Sauce",price:12,category:"sauce",image:"products/el-diablo.png",description:"An extra-hot kick for tacos, grilled meats, and anything that needs heat."},
    {id:"crispy-chili-oil-extra-spicy",name:"Crispy Chili Oil Extra Spicy",price:12,category:"sauce",image:"products/chili-oil-extra.png",description:"All the crunch and umami of our original chili oil, with an extra fiery finish."},
    {id:"olive-oil-mellow",name:"Cold Pressed Extra Virgin Olive Oil - Mellow",price:20,category:"oil",image:"olive-oil.png",description:"A smooth, mellow single-origin extra virgin olive oil."},
    {id:"olive-oil-bold",name:"Cold Pressed Extra Virgin Olive Oil - Bold Finishing Oil",price:20,category:"oil",image:"products/olive-oil-bold.png",description:"A bold finishing oil made from Picual olives."}
  ];
  const productById = Object.fromEntries(products.map((item) => [item.id, item]));
  const recipeData = [
    {id:"roasted-vegetable-quinoa-salad",title:"Roasted Vegetable and Quinoa Salad with Bold Finishing Oil",image:"recipes/roasted-vegetable-quinoa.jpg",time:"40 minutes",serves:"4 serves",tag:"Vegetarian",intro:"A hearty salad of tender roasted vegetables, fluffy quinoa, and a zesty dressing that shows off our Bold Finishing Oil.",ingredients:["1 cup quinoa","2 cups water or vegetable broth","1 red bell pepper, diced","1 yellow bell pepper, diced","1 zucchini, diced","1 red onion, diced","1 cup cherry tomatoes, halved","3 tbsp Bold Finishing Oil, divided","1 tsp dried oregano","1 tsp dried thyme","1/4 cup fresh parsley","2 tbsp lemon juice","1 tbsp balsamic vinegar","Mixed greens for serving"],steps:["Rinse the quinoa, then simmer with water or broth for 15 minutes. Rest for 5 minutes and fluff with a fork.","Heat the oven to 200°C. Toss peppers, zucchini, onion, and tomatoes with 2 tablespoons oil, salt, pepper, oregano, and thyme.","Roast for 20–25 minutes until tender and lightly caramelized.","Whisk the remaining oil with lemon juice and balsamic vinegar. Toss with the quinoa, vegetables, parsley, and feta if using.","Serve warm or at room temperature over mixed greens, finished with another drizzle of Bold Finishing Oil."]},
    {id:"crispy-chili-oil-noodles",title:"Crispy Chili Oil Noodles",image:"recipes/crispy-chili-noodles.png",time:"30 minutes",serves:"4 serves",tag:"Nut free",intro:"A quick bowl of tender noodles, fresh vegetables, and a tangy-sweet sauce with a big kick of crispy chili oil.",ingredients:["225g noodles (udon, ramen, or rice noodles)","2 tbsp Crispy Chili Oil","2 tbsp soy sauce","1 tbsp rice vinegar","1 tbsp sesame oil","1 tbsp honey or maple syrup","2 cloves garlic, minced","1 tsp grated ginger","1/2 cup green onions","1/2 cup shredded carrots","1/2 cup sliced bell pepper","Fresh cilantro and lime to serve"],steps:["Cook noodles according to the package instructions. Drain and set aside.","Whisk chili oil, soy sauce, rice vinegar, sesame oil, honey, garlic, and ginger together.","Combine noodles with green onions, carrots, and bell pepper. Pour over the sauce and toss until everything is coated.","Serve in bowls with cilantro, sesame seeds, and lime wedges."]},
    {id:"pina-picante-grilled-shrimp-skewers",title:"Piña Picante Grilled Shrimp Skewers",image:"recipes/pina-shrimp.png",time:"25 minutes",serves:"4 serves",tag:"Gluten free",intro:"Sweet pineapple and a bright hit of Piña Picante bring a sunny, smoky edge to juicy grilled shrimp.",ingredients:["500g large shrimp, peeled and deveined","1/2 cup pineapple, cut into chunks","2 tbsp Piña Picante Hot Sauce","1 tbsp olive oil","1 lime, juiced","1 clove garlic, minced","1/2 tsp smoked paprika","Salt and black pepper","Fresh cilantro and lime wedges"],steps:["Soak wooden skewers in water for 20 minutes. Whisk hot sauce, olive oil, lime, garlic, paprika, salt, and pepper.","Toss the shrimp and pineapple in the marinade and leave for 10 minutes.","Thread shrimp and pineapple onto skewers. Grill over medium-high heat for 2–3 minutes per side.","Finish with fresh cilantro and lime. Serve with extra Piña Picante on the side."]},
    {id:"pulled-pork-tacos",title:"Pulled Pork Tacos",image:"home-food.png",time:"35 minutes",serves:"4 serves",tag:"New recipe",intro:"Spice up your life with these party-pleasing pulled-pork tacos, finished with crunchy toppings and a lively hit of hot sauce.",ingredients:["450g cooked pulled pork","8 small corn tortillas","3 tbsp El Diablo Hot Sauce","1/2 cup shredded cabbage","1/2 cup diced tomatoes","1/4 cup pickled red onion","1/4 cup chopped cilantro","1 avocado, sliced","1 lime","Salt to taste"],steps:["Warm the pulled pork in a pan with El Diablo Hot Sauce and a splash of water until glossy and hot.","Toast tortillas in a dry skillet until warm and lightly charred.","Fill each tortilla with pulled pork, cabbage, tomato, pickled onion, avocado, and cilantro.","Finish with fresh lime, a little more hot sauce, and serve right away."]}
  ];
  const recipeById = Object.fromEntries(recipeData.map((item) => [item.id, item]));

  const icon = (name) => {
    const paths = {
      menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
      search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
      bag:'<path d="M4 8h16l-1.2 13H5.2L4 8Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',
      close:'<path d="m6 6 12 12M18 6 6 18"/>',
      arrow:'<path d="M5 12h14M13 5l7 7-7 7"/>',
      plus:'<path d="M12 5v14M5 12h14"/>',
      minus:'<path d="M5 12h14"/>',
      check:'<path d="m5 12 4 4L19 6"/>'
    };
    return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.arrow}</svg>`;
  };
  const money = (value) => `$${Number(value).toFixed(2)}`;
  const navLinks = [
    ["Shop", "catalog.html"], ["Restaurant", "restaurant.html"], ["Recipes", "recipes/index.html"], ["About", "about.html"]
  ];
  const menuLinks = navLinks.map(([label, file]) => `<a href="${url(file)}">${label}</a>`).join("");
  const logo = `<img src="${asset("brand/logo.svg")}" alt="Hella Goods" width="148" height="58">`;
  const headerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <button class="icon-button menu-trigger" data-open="nav" aria-label="Open menu">${icon("menu")}</button>
        <nav class="desktop-nav" aria-label="Main navigation">${menuLinks}</nav>
        <a class="header-logo" href="${url("index.html")}" aria-label="Hella Goods home">${logo}</a>
        <div class="header-actions">
          <button class="icon-button" data-open="search" aria-label="Search">${icon("search")}</button>
          <button class="icon-button cart-trigger" data-open="cart" aria-label="Open cart">${icon("bag")}<span class="cart-count" data-cart-count>0</span></button>
          <a class="button button-yellow header-shop" href="${url("catalog.html")}">Shop</a>
        </div>
      </div>
    </header>`;
  const footerHTML = `
    <footer class="site-footer">
      <div class="footer-note">This is a demo store. Hella Goods packaging design by James Karanikos.</div>
      <div class="footer-main">
        <a href="${url("index.html")}" class="footer-logo">${logo}</a>
        <div class="footer-links"><span class="footer-label">Explore</span>${menuLinks}</div>
        <div class="footer-links"><span class="footer-label">Help</span><a href="${url("shipping.html")}">Shipping</a><a href="${url("returns.html")}">Returns</a><a href="${url("contact.html")}">Contact</a></div>
        <div class="footer-signup"><span class="footer-label">Get the good stuff</span><p>Receive special offers and first look at new products.</p><form class="newsletter-form"><label class="visually-hidden" for="footer-email">Email address</label><input id="footer-email" type="email" placeholder="Email address" required><button type="submit" aria-label="Subscribe">Join ${icon("arrow")}</button><span class="form-message" aria-live="polite"></span></form></div>
      </div>
      <div class="footer-bottom"><span>© ${new Date().getFullYear()} Hella Goods</span><span>Good food. Good mood.</span><div class="footer-social"><a href="https://instagram.com/shopify" target="_blank" rel="noreferrer">Instagram</a><a href="https://youtube.com/user/shopify" target="_blank" rel="noreferrer">YouTube</a></div></div>
    </footer>`;

  const productCard = (product, options = {}) => {
    const badge = product.soldOut ? '<span class="product-badge sold-badge">Sold out</span>' : product.compare ? '<span class="product-badge">On sale</span>' : "";
    return `<article class="product-card ${options.compact ? "compact" : ""}" data-product-card data-category="${product.category}">
      ${badge}<a class="product-image" href="${url("product.html")}" aria-label="View ${esc(product.name)}"><img src="${asset(product.image)}" alt="${esc(product.name)}" loading="lazy"></a>
      <div class="product-info"><div><a class="product-title" href="${url("product.html")}">${esc(product.name)}</a><p class="product-price">${product.compare ? `<del>${money(product.compare)}</del> ` : ""}${money(product.price)} <span>AUD</span></p></div>
      <button class="quick-add" data-add="${product.id}" ${product.soldOut ? "disabled" : ""}>${product.soldOut ? "Sold out" : "Add to cart"}</button></div>
    </article>`;
  };
  const productRail = (list) => `<div class="product-rail" data-product-rail>${list.map((p) => productCard(p, {compact:true})).join("")}</div>`;
  const benefits = ["Low salt", "No bad stuff", "Organic", "Non-GMO", "No fake stuff", "Low carb"];
  const benefitStrip = `<section class="benefit-strip" aria-label="Our ingredients">${benefits.map((text, i) => `<div class="benefit-item"><span class="benefit-mark">${["✳","✦","✳","◈","✦","✳"][i]}</span><span>${text}</span></div>`).join("")}</section>`;
  const reviews = [
    {name:"Auguste Gusteau",text:"This hot sauce is the perfect blend of heat and flavor. It's become a kitchen staple, enhancing every dish without overpowering it. Highly recommend to all spice lovers!"},
    {name:"Lucy, Pasta Queen",text:"Discovering this brand's pantry items has been a game-changer. The variety and quality are unmatched, making it easy to create delicious meals."},
    {name:"Carmy Berzatto",text:"This brand has transformed my culinary experience! The pantry essentials and hot sauces are top-notch, adding robust flavors to my dishes."}
  ];
  const recipeHref = (recipe) => url(`recipes/${recipe.id}.html`);

  function homePage() {
    return `
      <section class="hero">
        <div class="hero-copy"><span class="hero-kicker">Everyday pantry goods</span><h1><span>HELLA</span><span>GOODS</span></h1></div>
        <div class="hero-frame"><img class="hero-products" src="${asset("hero.png")}" alt="Hella Goods pantry collection" fetchpriority="high"><span class="hero-frame-line"></span></div>
        <img class="hero-pepper hero-pepper-green" src="${asset("brand/green-burst.png")}" alt="" aria-hidden="true">
        <img class="hero-pepper hero-pepper-red" src="${asset("brand/hot-stuff.png")}" alt="" aria-hidden="true">
        <div class="hero-sticker sticker-flavour"><span>Full of<br>flavour</span></div>
        <div class="hero-sticker sticker-hot"><span>Hot stuff!</span></div>
        <a href="${url("catalog.html")}" class="hero-shop button button-yellow">Shop now ${icon("arrow")}</a>
      </section>
      <section class="brand-line"><p>Everyday pantry goods<br>for the everyday chef.</p><span class="brand-line-scribble">Fresh, bold &amp; full of flavour</span></section>
      ${benefitStrip}
      <section class="section goods-section" id="our-goods"><div class="section-head"><div><p class="eyebrow">A little something for the pantry</p><h2>Our Goods</h2><p class="section-sub">You'll be cooking like Carmy in no time.</p></div><div class="rail-controls"><button class="round-control" data-scroll-rail="-1" aria-label="Previous products">←</button><button class="round-control" data-scroll-rail="1" aria-label="Next products">→</button></div></div>${productRail(products.slice(0,4))}<a class="text-link" href="${url("catalog.html")}">View all goods ${icon("arrow")}</a></section>
      <section class="home-made"><div class="home-made-copy"><p class="eyebrow">The good stuff starts here</p><h2>Home<br><span>Made!</span></h2><p>Big flavour is always on the menu.</p><a class="button button-black" href="${url("catalog.html")}">Find your flavour ${icon("arrow")}</a></div><img src="${asset("products/chili-oil.png")}" alt="Crispy Chili Oil jar" loading="lazy"><span class="scribble-stamp">Cook<br>bold</span></section>
      <section class="review-section"><div class="review-side"><p class="eyebrow">Kind words, hot takes</p><h2>Word on<br>the street</h2><div class="stars" aria-label="Five stars">★★★★★</div></div><div class="review-quote"><blockquote data-review-text>“${reviews[0].text}”</blockquote><p class="review-author" data-review-author>${reviews[0].name}</p><div class="review-controls"><button class="round-control" data-review-step="-1" aria-label="Previous review">←</button><span class="review-index"><b data-review-current>01</b> / 03</span><button class="round-control" data-review-step="1" aria-label="Next review">→</button></div></div></section>
      <section class="section collection-section"><div class="collection-head"><div><p class="eyebrow">A good thing for every dish</p><h2>Pick your pleasure</h2></div><div class="category-tabs" role="tablist" aria-label="Shop by category"><button class="active" role="tab" aria-selected="true" data-home-tab="sauce">Hot sauces</button><button role="tab" aria-selected="false" data-home-tab="seasoning">Spices &amp; Rubs</button><button role="tab" aria-selected="false" data-home-tab="oil">Oils</button></div></div><div class="home-tab-products">${productRail(products.filter((p) => p.category === "sauce").slice(0,3))}</div></section>
      <section class="stack-section"><p class="eyebrow">A little more than good</p><h2>How we<br>stack up</h2><div class="stack-table"><div class="stack-row stack-top"><span></span><strong>Hella Goods</strong><strong>Other hot sauces</strong></div>${["Certified B Corp","Locally sourced ingredients","Out of control flavours","Will make you a better chef"].map((item) => `<div class="stack-row"><span>${item}</span><span class="stack-check">${icon("check")}</span><span class="stack-dash">—</span></div>`).join("")}</div><p class="scroll-hint">← Swipe to compare →</p></section>
      <section class="monthly-section"><div class="monthly-image"><span class="monthly-sticker">Product<br>of the month</span><img src="${asset("products/chili-oil.png")}" alt="Crispy Chili Oil" loading="lazy"></div><div class="monthly-copy"><p class="eyebrow">The crunch heard round the kitchen</p><h2>Product of<br>the month</h2><h3>Crispy Chili Oil</h3><p>Deliciously fiery and surprisingly versatile. Bold aromatic chilies, garlic and shallots meet a touch of soy for the perfect balance of heat and crunch.</p><p class="monthly-price">$12.00 <small>AUD</small></p><a class="button button-black" href="${url("product.html")}">Meet your new staple ${icon("arrow")}</a></div></section>
      <section class="dining-section"><div class="dining-image"><img src="${asset("home-food.png")}" alt="Street food served fresh" loading="lazy"><span class="dining-sticker">Let us<br>cook!</span></div><div class="dining-copy"><p class="eyebrow">From the pantry to the pavement</p><h2>Hella Good<br>Dining</h2><p>Quality street food in quality cities.</p><a class="button button-yellow" href="${url("restaurant.html")}">Our restaurants ${icon("arrow")}</a></div></section>
      <section class="recipe-feature"><div class="recipe-feature-photo"><img src="${asset("home-food.png")}" alt="Pulled pork tacos with lime" loading="lazy"><span class="recipe-new">New recipe!</span></div><div class="recipe-feature-copy"><p class="eyebrow">A delicious reason to gather</p><h2>Pulled pork<br>tacos</h2><p>Spice up your life with these party-pleasing pulled-pork tacos.</p><a class="button button-black" href="${recipeHref(recipeData[3])}">View recipe ${icon("arrow")}</a></div></section>
      <section class="section more-recipes"><div class="section-head"><div><p class="eyebrow">Fresh off the stove</p><h2>More recipes</h2></div><a class="text-link" href="${url("recipes/index.html")}">All recipes ${icon("arrow")}</a></div><div class="recipe-grid">${recipeData.slice(0,3).map((recipe) => `<a class="recipe-card" href="${recipeHref(recipe)}"><div class="recipe-image"><img src="${asset(recipe.image)}" alt="${esc(recipe.title)}" loading="lazy"><span class="recipe-arrow">↗</span></div><span class="recipe-meta">${esc(recipe.time)} · ${esc(recipe.tag)}</span><h3>${esc(recipe.title)}</h3></a>`).join("")}</div></section>
      <section class="olive-section"><div class="olive-copy"><p class="eyebrow">The secret sauce</p><h2>100% Extra<br>Virgin Olive Oil</h2><p>Made from Picual olives, grown in Jaén, Spain and picked at peak ripeness. Bold in flavour, easy in the kitchen.</p><div class="olive-features"><span>Single origin</span><span>Cold pressed</span><span>Peak season harvest</span><span>Low-waste packaging</span></div><a class="button button-yellow" href="${url("catalog.html")}">Explore the oils ${icon("arrow")}</a></div><div class="olive-photo"><img src="${asset("olive-oil.png")}" alt="Hella Goods mellow olive oil" loading="lazy"><span class="olive-orbit">The secret<br>sauce</span></div></section>
      <section class="section merch-section"><div class="section-head"><div><p class="eyebrow">Fresh fits for fresh food</p><h2>Hella Good Merch</h2><p class="section-sub">Look fresh, cook fresh.</p></div><a class="text-link" href="${url("catalog.html")}">Shop everything ${icon("arrow")}</a></div><div class="merch-grid">${[["Hella Good Hat","products/hella-hat.png"],["Hella Good Tee","products/hella-tee.jpg"],["Hella Good Tee","products/hella-tee-green.png"]].map(([name,image],i)=>`<a class="merch-card" href="${url("catalog.html")}"><div class="merch-image"><img src="${asset(image)}" alt="${name}" loading="lazy">${i===2?'<span class="product-badge sold-badge">Sold out</span>':''}</div><span>${name}</span><small>$40.00 AUD</small></a>`).join("")}</div></section>
      <section class="newsletter-section"><div><p class="eyebrow">Stay in the loop</p><h2>Sign up to our<br>newsletter</h2></div><div><p>Receive special offers and first look at new products.</p><form class="newsletter-form"><label class="visually-hidden" for="home-email">Email address</label><input id="home-email" type="email" placeholder="Email address" required><button type="submit">Subscribe ${icon("arrow")}</button><span class="form-message" aria-live="polite"></span></form></div></section>`;
  }

  function catalogPage() {
    return `<section class="page-hero catalog-hero"><p class="eyebrow">A pantry full of good ideas</p><h1>Goods</h1><p>All flavour, no filler.</p><div class="catalog-marquee">GOOD THINGS FOR GOOD FOOD · GOOD THINGS FOR GOOD FOOD · </div></section>
      <section class="catalog-content"><div class="catalog-toolbar"><div class="catalog-categories" role="tablist" aria-label="Product categories"><button class="active" data-catalog-filter="all">All goods</button><button data-catalog-filter="sauce">Hot sauces</button><button data-catalog-filter="seasoning">Spices &amp; Rubs</button><button data-catalog-filter="oil">Oils</button></div><div class="catalog-tools"><span><b data-product-count>12</b> products</span><label class="sort-label">Sort <select data-sort-products aria-label="Sort products"><option value="featured">Featured</option><option value="name">Alphabetically, A–Z</option><option value="price-low">Price, low to high</option><option value="price-high">Price, high to low</option></select></label></div></div><div class="catalog-grid" data-catalog-grid>${products.map((p)=>productCard(p)).join("")}</div><div class="catalog-footnote"><span>Good food starts with good stuff.</span><span>12 / 12</span></div></section>`;
  }

  function productPage() {
    const p = productById["crispy-chili-oil"];
    return `<section class="product-detail"><div class="product-gallery"><div class="product-main-image"><img src="${asset(p.image)}" alt="Crispy Chili Oil" fetchpriority="high"></div><div class="product-thumb-row"><img src="${asset(p.image)}" alt="Crispy Chili Oil jar"><img src="${asset("products/chili-oil-extra.png")}" alt="Crispy Chili Oil package detail"></div></div><div class="product-details"><p class="breadcrumbs"><a href="${url("index.html")}">Home</a> / <a href="${url("catalog.html")}">Goods</a> / Crispy Chili Oil</p><p class="eyebrow">A kitchen staple</p><h1>Crispy Chili Oil</h1><p class="product-detail-price">$12.00 <small>AUD</small></p><p>${esc(p.description)} This chili oil will elevate everything from stir-fries to noodles, and even make a spicy dip.</p><div class="heat-meter"><span>Sweet <b>●●○○○</b></span><span>Salty <b>●●●○○</b></span><span>Sour <b>○○○○○</b></span><span>Bitter <b>○○○○○</b></span><span>Umami <b>●●●●○</b></span></div><div class="detail-actions"><div class="quantity-stepper"><button data-detail-qty="-1" aria-label="Decrease quantity">−</button><span data-detail-qty-value>1</span><button data-detail-qty="1" aria-label="Increase quantity">+</button></div><button class="button button-black add-detail" data-add="crispy-chili-oil">Add to cart · $12.00</button></div><div class="detail-tabs" role="tablist"><button class="active" data-detail-tab="ingredients">Ingredients</button><button data-detail-tab="shipping">Shipping</button><button data-detail-tab="wholesale">Wholesale</button></div><div class="detail-tab-panel" data-detail-panel> Dried chili peppers, garlic, onion, sesame oil, soy sauce, sugar, salt, spices.</div><div class="product-perks"><span>Low salt</span><span>No bad stuff</span><span>Organic</span><span>Non-GMO</span><span>Probiotic</span></div></div></section>
      <section class="crunch-section"><div class="crunch-image"><img src="${asset("products/chili-oil-extra.png")}" alt="A jar of crunchy chili oil" loading="lazy"></div><div><p class="eyebrow">A little goes a long way</p><h2>Crunchy!<br>Spicy!<br>Good!</h2><p>A must-have for everything from stir-fries to noodles, and even as a spicy dip.</p></div></section>
      <section class="ingredients-section"><div><p class="eyebrow">What's inside</p><h2>Ingredients<br>&amp; nutrition</h2><p>Dried chili peppers, garlic, onion, sesame oil, soy sauce, sugar, salt, spices.</p></div><div class="nutrition-table"><h3>Nutritional information</h3><div><span></span><b>Per serving</b><b>Per 100g</b></div>${[["Protein","13g","26g"],["Total Carbohydrate","36g","72g"],["Dietary Fiber","11g","52g"],["Sugars","6g","11g"],["Total Fat","1g","2g"]].map(row=>`<div><span>${row[0]}</span><span>${row[1]}</span><span>${row[2]}</span></div>`).join("")}</div></section>
      <section class="review-section product-reviews"><div class="review-side"><p class="eyebrow">Five star flavour</p><h2>Word on<br>the street</h2><div class="stars">★★★★★</div></div><div class="review-quote"><blockquote>“This hot sauce is the perfect blend of heat and flavor. It's become a kitchen staple, enhancing every dish without overpowering it. Highly recommend to all spice lovers!”</blockquote><p class="review-author">Auguste Gusteau</p></div></section>`;
  }

  const foodMenu = [
    ["From the grill",[["Charred Ribeye Steak","$28","12 oz ribeye, garlic butter, rosemary, charred onions"],["BBQ Chicken Skewers","$16","Marinated chicken thighs, bell peppers, red onions, BBQ glaze"],["Grilled Pork Belly Tacos","$22","Crispy pork belly, pickled onions, cilantro, chipotle aioli"],["Spicy Lamb Chops","$18","Lamb chops, chili rub, mint yogurt, grilled lemon"]]],
    ["From the smoker",[["Smoked Brisket","$32","Texas-style smoked brisket, BBQ sauce, pickles, white bread"],["Pulled Pork Sandwich","$18","Smoked pulled pork, coleslaw, pickles, brioche bun"],["Smoked Turkey Leg","$24","Smoked turkey leg, honey glaze, smoked paprika rub"],["Burnt Ends","$10","Smoked beef burnt ends, sweet and spicy BBQ sauce"],["Smoked Sausage Platter","$32","Assorted smoked sausages, mustard, sauerkraut, pickles"],["BBQ Smoked Wings","$18","Smoked chicken wings, BBQ rub, blue cheese dip, celery sticks"]]]
  ];
  const drinkMenu = [
    ["Beers on tap",[["Hella Good Lager","$8","Lager, USA"],["Hella Good Pale Ale","$8","Pale Ale, USA"],["Sierra Nevada Pale Ale","$10","Pale Ale, USA"],["Bone Shifter Hazy","$10","Hazy Pale Ale, Australia"]]],
    ["Cocktails",[["Smoky Margarita","$20","Mezcal, lime juice, agave syrup, smoked salt rim"],["Old Fashioned BBQ","$22","Bourbon, BBQ bitters, smoked simple syrup, orange peel"],["Smoked Maple Bourbon Sour","$18","Bourbon, smoked maple syrup, lemon, egg white, cherry"],["Grilled Pineapple Mojito","$22","White rum, grilled pineapple, mint, lime, soda water"],["Smoked Cherry Cola","$16","Whiskey, smoked cherry syrup, cola, fresh cherries"],["Spiced Rum Punch","$22","Dark rum, pineapple juice, lime, spiced syrup, nutmeg"]]]
  ];
  const menuGroups = (groups) => groups.map(([title, items])=>`<section class="menu-group"><h3>${title}</h3><div>${items.map(([name,price,desc])=>`<article class="menu-item"><div><h4>${name}</h4><p>${desc}</p></div><b>${price}</b></article>`).join("")}</div></section>`).join("");
  function restaurantPage() {
    return `<section class="page-hero restaurant-hero"><p class="eyebrow">Quality street food in quality cities</p><h1>Hella Good<br>Dining</h1><p>Big flavour. Good people. Pull up a chair.</p><a href="#locations" class="button button-yellow">Find a table ${icon("arrow")}</a></section><section class="restaurant-menu"><div class="section-head"><div><p class="eyebrow">Eat well, stay awhile</p><h2>The Menu</h2></div><div class="menu-switch" role="tablist"><button class="active" data-menu-tab="food">Food</button><button data-menu-tab="drinks">Drinks</button></div></div><div data-menu-content>${menuGroups(foodMenu)}</div></section><section class="locations-section" id="locations"><p class="eyebrow">Come on in</p><h2>Find us in<br>good company.</h2><div class="locations-grid"><article><span>01</span><h3>CDMX, Mexico</h3><p>Thu–Sun, 12pm till late<br>Nápoles 55-71, Juárez, Cuauhtémoc</p><a href="https://maps.google.com/?q=Napoles+55+Juarez+Mexico+City" target="_blank" rel="noreferrer">Get directions ${icon("arrow")}</a></article><article><span>02</span><h3>NYC, USA</h3><p>Thu–Sun, 12pm till late<br>47 W 13th St, New York</p><a href="https://maps.google.com/?q=47+W+13th+St+New+York" target="_blank" rel="noreferrer">Get directions ${icon("arrow")}</a></article><article><span>03</span><h3>Tokyo, Japan</h3><p>Thu–Sun, 12pm till late<br>1 Chome-8-21 Jingumae, Shibuya City</p><a href="https://maps.google.com/?q=1+Chome+8-21+Jingumae+Tokyo" target="_blank" rel="noreferrer">Get directions ${icon("arrow")}</a></article></div></section>`;
  }

  function recipesPage() {
    return `<section class="page-hero recipes-hero"><p class="eyebrow">Good things are cooking</p><h1>Recipes</h1><p>From quick bites to slow Sunday dinners.</p></section><section class="recipe-index"><div class="recipe-index-grid">${recipeData.map((recipe,i)=>`<a class="recipe-card recipe-index-card" href="${recipeHref(recipe)}"><div class="recipe-image"><img src="${asset(recipe.image)}" alt="${esc(recipe.title)}" loading="lazy"><span class="recipe-arrow">↗</span></div><span class="recipe-meta">${String(i+1).padStart(2,"0")} / ${esc(recipe.time)} · ${esc(recipe.tag)}</span><h2>${esc(recipe.title)}</h2><p>${esc(recipe.intro)}</p></a>`).join("")}</div></section>`;
  }
  function recipeArticlePage() {
    const recipe = recipeById[page.replace("recipe-", "")] || recipeData[0];
    return `<section class="recipe-article"><p class="breadcrumbs"><a href="${url("index.html")}">Home</a> / <a href="${url("recipes/index.html")}">Recipes</a> / ${esc(recipe.title)}</p><div class="article-heading"><p class="eyebrow">The good stuff</p><h1>${esc(recipe.title)}</h1><div class="article-meta"><span>${esc(recipe.serves)}</span><span>${esc(recipe.time)}</span><span>${esc(recipe.tag)}</span></div></div><div class="article-hero-image"><img src="${asset(recipe.image)}" alt="${esc(recipe.title)}" fetchpriority="high"></div><div class="article-body"><div class="article-intro"><p>${esc(recipe.intro)}</p><p>Made with Hella Goods, made for sharing.</p></div><div class="article-columns"><section><p class="eyebrow">Gather these</p><h2>Ingredients</h2><ul>${recipe.ingredients.map((item)=>`<li>${esc(item)}</li>`).join("")}</ul></section><section><p class="eyebrow">Let's get cooking</p><h2>Instructions</h2><ol>${recipe.steps.map((item)=>`<li>${esc(item)}</li>`).join("")}</ol></section></div></div><a href="${url("recipes/index.html")}" class="text-link back-link">← All recipes</a></section>`;
  }
  function aboutPage() {
    return `<section class="page-hero about-hero"><p class="eyebrow">Big flavour, good people</p><h1>Our Story</h1><p>We specialize in crafting bold spices, tantalizing hot sauces, and gourmet seasonings that elevate every dish.</p></section><section class="about-story"><div class="about-photo"><img src="${asset("about.jpg")}" alt="A table of bold, fresh food" fetchpriority="high"></div><div class="about-copy"><p class="eyebrow">A little bit of Hella</p><h2>Made for<br>the flavour seekers.</h2><p>Hella Goods was born from a love for big, bold flavors. What started in a small kitchen with a few spice blends has grown into a full line of products, each crafted with care and precision.</p><p>From our Crispy Chili Oil to our signature El Diablo Hot Sauce, we're all about delivering unforgettable taste experiences.</p><a class="button button-black" href="${url("catalog.html")}">Shop our goods ${icon("arrow")}</a></div></section>`;
  }
  function policyPage(title, copy) {
    return `<section class="policy-page"><p class="breadcrumbs"><a href="${url("index.html")}">Home</a> / ${title}</p><p class="eyebrow">Hella Goods</p><h1>${title}</h1>${copy}</section>`;
  }
  function contactPage() {
    return policyPage("Contact", `<p class="policy-lede">Got a question, a recipe idea, or a very good story? We'd love to hear it.</p><form class="contact-form"><label>Name<input name="name" required></label><label>Email<input name="email" type="email" required></label><label>Phone number<input name="phone" type="tel"></label><label>Message<textarea name="message" rows="5" required></textarea></label><button class="button button-black" type="submit">Send message ${icon("arrow")}</button><span class="form-message" aria-live="polite"></span></form>`);
  }
  function getPage() {
    if (page === "home") return homePage();
    if (page === "catalog") return catalogPage();
    if (page === "product") return productPage();
    if (page === "restaurant") return restaurantPage();
    if (page === "recipes") return recipesPage();
    if (page.startsWith("recipe-")) return recipeArticlePage();
    if (page === "about") return aboutPage();
    if (page === "shipping") return policyPage("Shipping", "<p class=\"policy-lede\">We deliver Australia wide. Free shipping for all orders over 100 AUD.</p><p>Orders dispatch within 24 hours. You will receive a confirmation when your order is on its way.</p>");
    if (page === "returns") return policyPage("Returns", "<p class=\"policy-lede\">You have 30 calendar days to return an item from the date you received it.</p><p>To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging, with the receipt or proof of purchase.</p><p>Once we receive your item, we will inspect it and notify you of the status of your refund. If approved, we will initiate a refund to your original method of payment.</p>");
    if (page === "contact") return contactPage();
    return homePage();
  }

  document.querySelector("#site-header").innerHTML = headerHTML;
  document.querySelector("#page-content").innerHTML = getPage();
  document.querySelector("#site-footer").innerHTML = footerHTML;
  document.body.insertAdjacentHTML("beforeend", `<div class="drawer-backdrop" data-close-drawer></div><aside class="drawer" id="site-drawer" aria-modal="true" role="dialog" aria-hidden="true"><div class="drawer-head"><span data-drawer-title></span><button class="icon-button" data-close-drawer aria-label="Close">${icon("close")}</button></div><div class="drawer-content" data-drawer-content></div></aside><div class="toast" role="status" aria-live="polite"></div>`);
  document.title = `${page.startsWith("recipe-") ? recipeById[page.replace("recipe-", "")]?.title || "Recipes" : ({home:"Hella Goods",catalog:"Goods",product:"Crispy Chili Oil",restaurant:"Restaurant",recipes:"Recipes",about:"About",shipping:"Shipping",returns:"Returns",contact:"Contact"}[page] || "Hella Goods")} — Hella Goods`;

  const drawer = document.querySelector("#site-drawer");
  const drawerBackdrop = document.querySelector(".drawer-backdrop");
  const drawerTitle = drawer.querySelector("[data-drawer-title]");
  const drawerContent = drawer.querySelector("[data-drawer-content]");
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem("hellaGoodsCart") || "{}"); } catch { cart = {}; }
  let detailQty = 1;
  let toastTimer;
  function announce(message) {
    const toast = document.querySelector(".toast");
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 2600);
  }
  function saveCart() { localStorage.setItem("hellaGoodsCart", JSON.stringify(cart)); updateCartCount(); }
  function totalItems() { return Object.values(cart).reduce((sum, qty) => sum + Number(qty || 0), 0); }
  function updateCartCount() { document.querySelectorAll("[data-cart-count]").forEach((el) => { el.textContent = totalItems(); el.classList.toggle("has-items", totalItems() > 0); }); }
  function openDrawer(type) {
    drawer.dataset.type = type;
    drawerTitle.textContent = type === "nav" ? "Menu" : type === "search" ? "Search our site" : `Your cart · ${totalItems()} ${totalItems() === 1 ? "item" : "items"}`;
    drawer.classList.add("open"); drawerBackdrop.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); document.body.classList.add("drawer-open");
    if (type === "nav") renderNavDrawer();
    if (type === "search") renderSearchDrawer();
    if (type === "cart") renderCartDrawer();
    drawer.querySelector("[data-close-drawer]")?.focus();
  }
  function closeDrawer() { drawer.classList.remove("open"); drawerBackdrop.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); document.body.classList.remove("drawer-open"); }
  function renderNavDrawer() {
    drawerContent.innerHTML = `<nav class="drawer-nav">${menuLinks}</nav><div class="drawer-feature"><span class="eyebrow">In the pantry</span>${products.slice(0,5).map((p)=>`<a href="${url("product.html")}"><img src="${asset(p.image)}" alt=""><span>${esc(p.name)}</span></a>`).join("")}<a class="button button-yellow" href="${url("catalog.html")}">View all goods ${icon("arrow")}</a></div>`;
  }
  function renderSearchDrawer(query = "") {
    const q = query.trim().toLowerCase();
    const results = products.filter((p) => !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    drawerContent.innerHTML = `<label class="search-field"><span class="visually-hidden">Search our goods</span><input type="search" placeholder="What are you craving?" value="${esc(query)}" data-search-input>${icon("search")}</label><p class="search-count">${q ? `${results.length} results` : "Popular in the pantry"}</p><div class="search-results">${results.slice(0,8).map((p)=>`<a href="${url("product.html")}"><img src="${asset(p.image)}" alt=""><span>${esc(p.name)}</span><b>${money(p.price)}</b></a>`).join("") || "<p>No matches yet. Try a different flavour.</p>"}</div>`;
    const input = drawerContent.querySelector("[data-search-input]");
    input.addEventListener("input", (event) => { const value = event.target.value; const position = value.length; renderSearchDrawer(value); const next = drawerContent.querySelector("[data-search-input]"); next.focus(); next.setSelectionRange(position,position); });
    input.focus();
  }
  function renderCartDrawer() {
    const valid = Object.entries(cart).filter(([id,qty]) => productById[id] && qty > 0);
    const subtotal = valid.reduce((sum,[id,qty]) => sum + productById[id].price * qty, 0);
    drawerTitle.textContent = `Your cart · ${totalItems()} ${totalItems() === 1 ? "item" : "items"}`;
    if (!valid.length) {
      drawerContent.innerHTML = `<div class="empty-cart"><span class="empty-bag">${icon("bag")}</span><p>Your cart is currently empty.</p><a class="button button-black" href="${url("catalog.html")}">Find something good ${icon("arrow")}</a></div>`;
      return;
    }
    drawerContent.innerHTML = `<div class="cart-lines">${valid.map(([id,qty])=>{const p=productById[id];return `<article class="cart-line"><a href="${url("product.html")}"><img src="${asset(p.image)}" alt="${esc(p.name)}"></a><div class="cart-line-info"><a href="${url("product.html")}">${esc(p.name)}</a><b>${money(p.price)} AUD</b><div class="cart-line-controls"><button data-cart-change="-1" data-cart-id="${id}" aria-label="Decrease ${esc(p.name)}">−</button><span>${qty}</span><button data-cart-change="1" data-cart-id="${id}" aria-label="Increase ${esc(p.name)}">+</button><button class="remove-item" data-cart-remove="${id}">Remove</button></div></div></article>`}).join("")}</div><div class="cart-summary"><div><span>Subtotal</span><strong>${money(subtotal)} AUD</strong></div><p>Shipping and discounts calculated at checkout.</p><button class="button button-black checkout-button" data-checkout>Checkout ${icon("arrow")}</button></div>`;
  }
  function addToCart(id, quantity = 1) {
    const p = productById[id];
    if (!p || p.soldOut) return;
    cart[id] = (cart[id] || 0) + quantity;
    saveCart();
    announce(`${p.name} added to your cart`);
    if (drawer.classList.contains("open") && drawer.dataset.type === "cart") renderCartDrawer();
  }
  updateCartCount();
  document.addEventListener("click", (event) => {
    const open = event.target.closest("[data-open]");
    if (open) { openDrawer(open.dataset.open); return; }
    if (event.target.closest("[data-close-drawer]") || event.target === drawerBackdrop) { closeDrawer(); return; }
    const add = event.target.closest("[data-add]");
    if (add) { event.preventDefault(); addToCart(add.dataset.add, add.classList.contains("add-detail") ? detailQty : 1); return; }
    const change = event.target.closest("[data-cart-change]");
    if (change) { const id=change.dataset.cartId; cart[id]=Math.max(0,(cart[id]||0)+Number(change.dataset.cartChange)); if(!cart[id]) delete cart[id]; saveCart(); renderCartDrawer(); return; }
    const remove = event.target.closest("[data-cart-remove]");
    if (remove) { delete cart[remove.dataset.cartRemove]; saveCart(); renderCartDrawer(); return; }
    if (event.target.closest("[data-checkout]")) { announce("Checkout is a demo and no order was placed."); return; }
    const catTab = event.target.closest("[data-home-tab]");
    if (catTab) { document.querySelectorAll("[data-home-tab]").forEach((el)=>{el.classList.toggle("active",el===catTab);el.setAttribute("aria-selected",el===catTab?"true":"false")});document.querySelector(".home-tab-products").innerHTML=productRail(products.filter((p)=>p.category===catTab.dataset.homeTab).slice(0,4)); return; }
    const catalogTab = event.target.closest("[data-catalog-filter]");
    if (catalogTab) { document.querySelectorAll("[data-catalog-filter]").forEach((el)=>el.classList.toggle("active",el===catalogTab)); filterCatalog(catalogTab.dataset.catalogFilter); return; }
    const menuTab = event.target.closest("[data-menu-tab]");
    if (menuTab) { document.querySelectorAll("[data-menu-tab]").forEach((el)=>el.classList.toggle("active",el===menuTab)); document.querySelector("[data-menu-content]").innerHTML=menuGroups(menuTab.dataset.menuTab==="food"?foodMenu:drinkMenu); return; }
    const detailTab = event.target.closest("[data-detail-tab]");
    if (detailTab) { document.querySelectorAll("[data-detail-tab]").forEach((el)=>el.classList.toggle("active",el===detailTab)); const tab=detailTab.dataset.detailTab;document.querySelector("[data-detail-panel]").textContent=tab==="ingredients"?"Dried chili peppers, garlic, onion, sesame oil, soy sauce, sugar, salt, spices.":tab==="shipping"?"Dispatches within 24 hours of ordering! Free shipping for orders over 100 AUD.":"Looking to stock your shelves or running a restaurant? Get in touch."; return; }
    const qty = event.target.closest("[data-detail-qty]");
    if (qty) { detailQty=Math.max(1,detailQty+Number(qty.dataset.detailQty));document.querySelector("[data-detail-qty-value]").textContent=detailQty;return; }
    const step = event.target.closest("[data-review-step]");
    if (step) { window.reviewIndex=((window.reviewIndex||0)+Number(step.dataset.reviewStep)+reviews.length)%reviews.length;document.querySelector("[data-review-text]").textContent=`“${reviews[window.reviewIndex].text}”`;document.querySelector("[data-review-author]").textContent=reviews[window.reviewIndex].name;document.querySelector("[data-review-current]").textContent=String(window.reviewIndex+1).padStart(2,"0");return; }
    const rail = event.target.closest("[data-scroll-rail]");
    if (rail) { document.querySelector("[data-product-rail]")?.scrollBy({left:Number(rail.dataset.scrollRail)*340,behavior:"smooth"});return; }
  });
  document.addEventListener("change",(event)=>{if(event.target.matches("[data-sort-products]")){sortCatalog(event.target.value);}});
  document.addEventListener("keydown",(event)=>{if(event.key==="Escape")closeDrawer();});
  document.addEventListener("submit",(event)=>{
    if(event.target.matches(".newsletter-form")){event.preventDefault();const message=event.target.querySelector(".form-message");if(message)message.textContent="You're on the list. Talk soon!";event.target.reset();return;}
    if(event.target.matches(".contact-form")){event.preventDefault();const message=event.target.querySelector(".form-message");message.textContent="Thanks for reaching out. Your demo message is ready!";event.target.reset();}
  });
  function filterCatalog(category) {
    const cards=[...document.querySelectorAll("[data-catalog-grid] [data-product-card]")];let count=0;
    cards.forEach((card)=>{const show=category==="all"||card.dataset.category===category;card.hidden=!show;if(show)count++;});
    document.querySelector("[data-product-count]").textContent=count;
  }
  function sortCatalog(value) {
    const grid=document.querySelector("[data-catalog-grid]");if(!grid)return;
    const cards=[...grid.querySelectorAll("[data-product-card]")];
    cards.sort((a,b)=>{const pa=productById[a.querySelector("[data-add]")?.dataset.add || products.find(p=>a.querySelector(`a.product-title`)?.textContent===p.name)?.id];const pb=productById[b.querySelector("[data-add]")?.dataset.add || products.find(p=>b.querySelector(`a.product-title`)?.textContent===p.name)?.id];if(!pa||!pb)return 0;if(value==="name")return pa.name.localeCompare(pb.name);if(value==="price-low")return pa.price-pb.price;if(value==="price-high")return pb.price-pa.price;return products.indexOf(pa)-products.indexOf(pb);});
    cards.forEach((card)=>grid.append(card));
  }
})();
