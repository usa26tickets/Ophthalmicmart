import { createContext, useContext, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, Route, Switch, useLocation, useParams } from "wouter";
import { Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { articles, discountSlugs, featuredSlugs, formatPrice, products, type Product } from "../data/catalog";

type CartLine = { slug: string; quantity: number };
type CartContextValue = { cart: CartLine[]; add: (slug: string, quantity?: number) => void; setQuantity: (slug: string, quantity: number) => void; remove: (slug: string) => void; count: number };
const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "ophthalmicmart-cart-v1";
const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;
const productFor = (slug: string) => products.find((product) => product.slug === slug);

function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart context is unavailable");
  return context;
}

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) as CartLine[] : [];
    } catch { return []; }
  });
  useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }, [cart]);
  const add = (slug: string, quantity = 1) => setCart((current) => {
    const line = current.find((item) => item.slug === slug);
    return line ? current.map((item) => item.slug === slug ? { ...item, quantity: item.quantity + quantity } : item) : [...current, { slug, quantity }];
  });
  const setQuantity = (slug: string, quantity: number) => setCart((current) => quantity <= 0 ? current.filter((item) => item.slug !== slug) : current.map((item) => item.slug === slug ? { ...item, quantity } : item));
  const remove = (slug: string) => setCart((current) => current.filter((item) => item.slug !== slug));
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  return <CartContext.Provider value={{ cart, add, setQuantity, remove, count }}>{children}</CartContext.Provider>;
}

function Header() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/shop/?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setMenuOpen(false);
  };
  const nav = [
    { href: "/", text: "Home" }, { href: "/about-us/", text: "About Us" },
    { href: "/blog/", text: "Blog" }, { href: "/about-us/#office", text: "Contact" },
    { href: "/shop/", text: "Shop" },
  ];
  return (
    <header className="site-header" data-testid="header-main">
      <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} data-testid="button-mobile-menu">
        {menuOpen ? <X /> : <Menu />}
      </button>
      <Link href="/" className="wordmark" data-testid="link-wordmark">ophthalmicmart</Link>
      <nav className="main-nav" aria-label="Main navigation">
        {nav.map((item) => <Link key={item.text} href={item.href} data-testid={`link-nav-${item.text.toLowerCase().replaceAll(" ", "-")}`}>{item.text}</Link>)}
      </nav>
      <div className="header-spacer" />
      {searchOpen && <form className="search-form" onSubmit={submitSearch} data-testid="form-header-search">
        <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" aria-label="Search products" data-testid="input-product-search" />
        <button type="submit" aria-label="Submit search" data-testid="button-submit-search"><Search /></button>
      </form>}
      <div className="header-tools">
        {!searchOpen && <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(true)} data-testid="button-open-search"><Search /></button>}
        <Link href="/cart/" className="icon-button" aria-label={`Cart, ${count} items`} data-testid="link-cart">
          <ShoppingCart /><span className="cart-count" data-testid="text-cart-count">{count}</span>
        </Link>
      <button className="icon-button" aria-label="Contact Ophthalmicmart" onClick={() => navigate("/about-us/#office")} data-testid="button-account"><UserRound /></button>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">
        {nav.map((item) => <Link key={item.text} href={item.href} onClick={() => setMenuOpen(false)} data-testid={`mobile-link-${item.text.toLowerCase().replaceAll(" ", "-")}`}>{item.text}</Link>)}
        <form className="search-form" onSubmit={submitSearch}>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" aria-label="Search products" data-testid="mobile-input-search" />
          <button type="submit" aria-label="Submit search"><Search /></button>
        </form>
      </nav>}
    </header>
  );
}

function Footer() {
  return <footer className="site-footer" data-testid="footer-main">
    <div className="socials" aria-label="Social links">
      <a href="https://web.facebook.com/Ophthalmicmart/" aria-label="Facebook" data-testid="link-social-facebook">f</a>
      <a href="http://ophthalmicmart" aria-label="Instagram" data-testid="link-social-instagram">◎</a>
      <a href="http://ophthalmicmart" aria-label="YouTube" data-testid="link-social-youtube">▶</a>
      <a href="http://ophthalmicmart" aria-label="Google Plus" data-testid="link-social-google">G</a>
    </div>
    <div className="copyright" data-testid="text-copyright">©2026 Ophthalmicmart - Offers Ophthalmic Instruments for ophthalmology practice or clinic</div>
    <div className="footer-links"><a href="https://www.ophthalmicmart.com/terms/">Terms</a><a href="https://www.ophthalmicmart.com/privacy-policy/">Privacy Policy</a><a href="https://www.ophthalmicmart.com/warranty/">Warranty</a></div>
  </footer>;
}

function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return <article className="product-card" data-testid={`card-product-${product.slug}`}>
    {product.was && <span className="sale-tag">Sale!</span>}
    <Link href={`/product/${product.slug}/`} className="product-image" aria-label={`View ${product.name}`} data-testid={`link-product-image-${product.slug}`}>
      <img src={asset(product.image)} alt={product.name} loading="eager" data-testid={`img-product-${product.slug}`} />
    </Link>
    <div className="product-info">
      <Link href={`/product/${product.slug}/`} className="product-name" data-testid={`link-product-name-${product.slug}`}>{product.name}</Link>
      <div className="price-line" data-testid={`text-price-${product.slug}`}>{product.was && <del>{formatPrice(product.was)}</del>}{formatPrice(product.price)}</div>
      <button className="quick-add" onClick={() => add(product.slug)} data-testid={`button-add-${product.slug}`}>Add to cart</button>
    </div>
  </article>;
}

function ProductGrid({ list }: { list: Product[] }) {
  if (!list.length) return <div className="empty-cart" data-testid="status-no-products"><h2>No products found</h2><p>Try another product search.</p></div>;
  return <div className="product-grid" data-testid="grid-products">{list.map((item) => <ProductCard key={item.slug} product={item} />)}</div>;
}

function HomePage() {
  const featured = featuredSlugs.map(productFor).filter((product): product is Product => Boolean(product));
  const sale = discountSlugs.map(productFor).filter((product): product is Product => Boolean(product));
  return <>
    <div className="hero" data-testid="hero-banner"><img src={asset("ophthalmicmart-new-banner.jpg")} alt="Ophthalmicmart distributes ophthalmic equipment for over 25 years" data-testid="img-home-banner" /></div>
    <main className="content-width">
      <section className="intro-block" data-testid="section-home-intro">
        <span className="eyebrow">Ophthalmicmart</span>
        <h1>Optometry Equipment for sale</h1>
        <p className="intro-copy">Find Excellent deals on Ophthalmicmart in Ophthalmology and Optometry Equipment. For the professional who needs quality, Ophthalmicmart Is here for you. We sell only top of the lineup, high-quality ophthalmic equipment which can help save you money by lasting for years and years. While buying used Optometry Equipment, make sure that you’re working with a reputable company and you understand what you are getting.</p>
      </section>
      <section className="products-section" data-testid="section-featured-products">
        <div className="section-head"><h2>Featured Products</h2><Link className="text-link" href="/shop/">View all products</Link></div>
        <ProductGrid list={featured} />
      </section>
    </main>
    <section className="news-section" data-testid="section-home-news">
      <div className="content-width">
        <div className="section-head"><h2>Get Latest Ophthalmic Instruments Article and Products News</h2><Link className="text-link" href="/blog/">View all articles</Link></div>
        <div className="news-grid">{articles.map((article, index) => <Link href="/blog/" className="news-card" key={article.title} data-testid={`link-article-home-${index + 1}`}>
          <img src={asset(article.image)} alt={article.title} loading="eager" />
          <time>{article.date}</time><h3>{article.title}</h3>
        </Link>)}</div>
      </div>
    </section>
    <section className="content-width discount-section" data-testid="section-discount-products">
      <div className="discount-title">DISCOUNT OPHTHALMIC EQUIPMENT</div>
      <ProductGrid list={sale.slice(0, 4)} />
    </section>
    <section className="content-width about-teaser" data-testid="section-about-teaser">
      <h2>About Ophthalmicmart</h2>
      <div><p>Do you wish to make your eyecare practice a success? Have you been looking for a reliable source for your Ophthalmic Instruments at discounted rates? Search no more as you can get the finest Ophthalmic Instruments alongside service and support from Ophthalmicmart.</p><Link className="text-link" href="/about-us/">READ OUR STORY</Link></div>
    </section>
  </>;
}

function ShopPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("popularity");
  const [page, setPage] = useState(1);
  const searched = useMemo(() => products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase().trim())), [query]);
  const sorted = useMemo(() => {
    const list = [...searched];
    if (sort === "price") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "latest") list.reverse();
    return list;
  }, [searched, sort]);
  const pageSize = 8;
  const pages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);
  const onSearch = (value: string) => { setQuery(value); setPage(1); };
  return <main className="content-width shop-content" data-testid="page-shop">
    <header className="page-head"><h1>Shop</h1><p>Find Excellent Deals in Optometry Equipment</p></header>
    <div className="shop-controls">
      <label htmlFor="shop-search">Search products</label>
      <input id="shop-search" type="search" value={query} onChange={(event) => onSearch(event.target.value)} placeholder="Search products…" aria-label="Search products" data-testid="input-shop-search" />
      <span data-testid="text-results-count">Showing {visible.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, sorted.length)} of {sorted.length} results</span>
      <select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }} aria-label="Sort products" data-testid="select-sort-products">
        <option value="popularity">Sort by popularity</option><option value="rating">Sort by average rating</option>
        <option value="latest">Sort by latest</option><option value="price">Sort by price: low to high</option><option value="price-desc">Sort by price: high to low</option>
      </select>
    </div>
    <ProductGrid list={visible} />
    {pages > 1 && <nav className="pagination" aria-label="Product pages" data-testid="pagination-shop">{Array.from({ length: pages }, (_, index) => index + 1).map((number) => <button key={number} className={page === number ? "active" : ""} onClick={() => { setPage(number); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label={`Page ${number}`} data-testid={`button-page-${number}`}>{number}</button>)}</nav>}
  </main>;
}

function QuantityControl({ value, onChange, label }: { value: number; onChange: (value: number) => void; label: string }) {
  return <div className="quantity" aria-label={label}>
    <button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(1, value - 1))} data-testid={`button-quantity-minus-${label}`}>−</button>
    <input type="number" min="1" value={value} onChange={(event) => onChange(Math.max(1, Number(event.target.value) || 1))} aria-label="Quantity" data-testid={`input-quantity-${label}`} />
    <button type="button" aria-label="Increase quantity" onClick={() => onChange(value + 1)} data-testid={`button-quantity-plus-${label}`}>+</button>
  </div>;
}

function ProductPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const product = productFor(slug);
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  if (!product) return <main className="content-width content-page"><h1>Product not found</h1><Link className="text-link" href="/shop/">Return to shop</Link></main>;
  return <main className="content-width detail-wrap" data-testid={`page-product-${product.slug}`}>
    <div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/shop/">Shop</Link> / {product.name}</div>
    <section className="product-detail">
      <div className="detail-photo"><img src={asset(product.image)} alt={product.name} data-testid={`img-detail-${product.slug}`} /></div>
      <div className="detail-copy">
        <h1>{product.name}</h1>
        <div className="detail-price" data-testid={`text-detail-price-${product.slug}`}>{product.was && <del>{formatPrice(product.was)}</del>}{formatPrice(product.price)}</div>
        <p>{product.name}</p>
        <div className="availability">Availability: <strong>Please inquire</strong></div>
        <div className="purchase-row">
          <QuantityControl label={`product-${product.slug}`} value={quantity} onChange={setQuantity} />
          <button className="primary-button" onClick={() => { add(product.slug, quantity); setAdded(true); }} data-testid={`button-detail-add-${product.slug}`}>Add to cart</button>
        </div>
        {added && <p className="added-note" role="status" data-testid="status-product-added">Added to cart. <Link href="/cart/">View cart</Link></p>}
        <p className="breadcrumbs">For information about this listing, call <a href="tel:+65216127122">+65 21 612 7122</a>.</p>
      </div>
    </section>
  </main>;
}

function CartPage() {
  const { cart, setQuantity, remove } = useCart();
  const lines = cart.map((line) => ({ ...line, product: productFor(line.slug) })).filter((line): line is CartLine & { product: Product } => Boolean(line.product));
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  return <main className="content-width cart-page" data-testid="page-cart">
    <header className="page-head"><h1>Cart</h1></header>
    {!lines.length ? <section className="empty-cart" data-testid="empty-cart"><h2>Your cart is currently empty.</h2><p>Browse our ophthalmic equipment and add items to your cart.</p><Link className="primary-button" href="/shop/">Return to shop</Link></section> :
      <div className="cart-layout">
        <section aria-label="Cart items" data-testid="list-cart-items">
          {lines.map((line) => <article className="cart-row" key={line.slug} data-testid={`row-cart-${line.slug}`}>
            <img className="cart-thumb" src={asset(line.product.image)} alt={line.product.name} />
            <div><Link href={`/product/${line.slug}/`} className="cart-item-title">{line.product.name}</Link><div className="cart-item-price">{formatPrice(line.product.price)} each</div>
              <div className="cart-row-actions"><QuantityControl label={`cart-${line.slug}`} value={line.quantity} onChange={(quantity) => setQuantity(line.slug, quantity)} /><button className="remove-button" onClick={() => remove(line.slug)} data-testid={`button-remove-${line.slug}`}>Remove</button></div>
            </div>
            <div className="line-total" data-testid={`text-line-total-${line.slug}`}>{formatPrice(line.product.price * line.quantity)}</div>
          </article>)}
        </section>
        <aside className="summary-box" data-testid="cart-summary">
          <h2>Cart totals</h2><div className="subtotal-row"><span>Subtotal</span><strong data-testid="text-cart-subtotal">{formatPrice(subtotal)}</strong></div>
          <div className="checkout-alert" role="status" data-testid="status-payment-not-connected">Checkout and payment are not connected on this storefront. Contact Ophthalmicmart to inquire about your order.</div>
          <a className="primary-button" href="tel:+65216127122" data-testid="link-inquire-order">Call +65 21 612 7122 to inquire</a>
        </aside>
      </div>}
  </main>;
}

function AboutPage() {
  return <main className="content-width content-page" data-testid="page-about">
    <h1>About Ophthalmicmart</h1>
    <p className="about-intro">Do you wish to make your eyecare practice a success? Have you been looking for a reliable source for your Ophthalmic Instruments at discounted rates? Search no more as you can get the finest Ophthalmic Instruments alongside service and support from Ophthalmicmart.</p>
    <div className="about-sections">
      <section className="about-section"><h2>Why Us?</h2><ul>
        <li>Our devoted team members are readily available to assist you.</li>
        <li>We’re aware of the relevance of eye care and what it means to the general wellbeing.</li>
        <li>Our sales strategy revolves around the quick time shipping and delivery of your ordered products at affordable prices.</li>
        <li>Our ophthalmic products and optometric supplies all offer flexible solutions for your practice, and there are no hassles with returns.</li>
        <li>We’re committed to providing our clients and associates with maximum value for their money without compromising their satisfaction.</li>
      </ul><p>Contact us today for your high-tech Ophthalmic Instruments, and you’ll be glad you did.</p></section>
      <section className="about-section"><h2>Our Commitment</h2><h3>Our Goal</h3><p>To deliver the best Ophthalmic Instruments for ophthalmology practice or clinic to optometrists</p></section>
      <section className="about-section"><h2>Our Services</h2><p>With lots of experience in the ophthalmic industry, we strive to revamp the industry with our vast selection of branded and certified products. We are in constant search of emerging user-friendly technologies and manufacturers of optometric products so that the optometrists out there can give their patients efficient eye care service. From hand-held tools, diagnostic instruments, dispensing equipment, finishing equipment, and to spare parts, Ophthalmicmart has got your needs covered at affordable prices. We also give you details on the care instructions and all our Ophthalmic Instruments, and technical support comes with a 100% guarantee as our services can be trusted. You can rely on Ophthalmicmart to meet your ophthalmic, and optical supply needs as we do all we can to offer the best assistance to you. Being a leading source of fine precision Ophthalmic Instruments and ophthalmic products, we have a broad range of products and also provide various maintenance services to keep all of your instruments in good working order.</p></section>
      <section className="about-section"><h2>The Products</h2><p>Our products include all Ophthalmic Instruments from Autorefractors, Keratometers, Slit Lamps, Phoropters, Retinal Cameras, Automatic Lensmeters, Retinoscopes, Tonometers, Chart Projectors, Tonopens, CORNEAL TOPOGRAPHERS, OPHTHALMIC ULTRASOUND, REFRACTION SYSTEMS and many more. Our sales don’t stop there as we have Ophthalmic Furniture from Model Examination Chairs, Instrumentation Table, Refraction Units, and Stretchers and lots more. if you have any specific Ophthalmic Instruments want to purchase, just contact our sales at sales[at]ophthalmicmart.com</p><Link className="text-link" href="/shop/">Shop Ophthalmic Equipment</Link></section>
      <section className="about-section" id="office"><h2>The Office</h2><div className="contact-card">#11-00 7 Marina View, Asia Square Tower 1<br />Central Business District, Singapore 018960<br /><a href="tel:+65216127122">+65 21 612 7122</a><br /><a href="mailto:sales@ophthalmicmart.com">sales[at]ophthalmicmart.com</a></div></section>
    </div>
  </main>;
}

function BlogPage() {
  const [category, setCategory] = useState("All");
  const [article, setArticle] = useState<(typeof articles)[number] | null>(null);
  const categories = ["All", ...Array.from(new Set(articles.map((item) => item.category)))];
  const visible = category === "All" ? articles : articles.filter((item) => item.category === category);
  return <main className="content-width content-page" data-testid="page-blog">
    <header className="page-head"><h1>{article?.title ?? "Ophthalmic Blog"}</h1><p>Get Latest Ophthalmic Instruments Article and Products News</p></header>
    {article ? <section data-testid="article-detail"><img src={asset(article.image)} alt={article.title} style={{ width: "min(100%, 760px)", marginBottom: 20 }} /><p className="eyebrow">{article.date}</p><button className="text-link" onClick={() => setArticle(null)} data-testid="button-back-articles">Back to articles</button></section> :
      <div className="blog-layout"><section className="blog-list" data-testid="list-blog-articles">{visible.map((item, index) => <article key={item.title} className="blog-card" data-testid={`card-article-${index + 1}`}>
        <img src={asset(item.image)} alt={item.title} loading="lazy" /><time>{item.date}</time><h2>{item.title}</h2><button onClick={() => setArticle(item)} data-testid={`button-read-article-${index + 1}`}>Read more</button>
      </article>)}</section>
        <aside className="blog-sidebar"><h3>Article categories</h3>{categories.map((item) => <button className={category === item ? "selected" : ""} onClick={() => setCategory(item)} key={item} data-testid={`button-category-${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</button>)}<h3 style={{ marginTop: 30 }}>Recent articles</h3>{articles.map((item, index) => <button key={item.title} onClick={() => setArticle(item)} data-testid={`button-recent-article-${index + 1}`}>{item.title}</button>)}</aside>
      </div>}
  </main>;
}

function RoutedPages() {
  return <Switch>
    <Route path="/" component={HomePage} />
    <Route path="/shop/" component={ShopPage} />
    <Route path="/product/:slug/" component={ProductPage} />
    <Route path="/about-us/" component={AboutPage} />
    <Route path="/blog/" component={BlogPage} />
    <Route path="/cart/" component={CartPage} />
    <Route><main className="content-width content-page"><h1>Page not found</h1><Link className="text-link" href="/">Return home</Link></main></Route>
  </Switch>;
}

export default function Storefront() {
  return <CartProvider><Header /><RoutedPages /><Footer /></CartProvider>;
}
