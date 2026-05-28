import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const products = [
  {
    id: 1,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/moisturizer.jpg",
    name: "Hydrating Facial Moisturizer",
    rating: { stars: 4.7, count: 200 },
    priceCents: 25000,
    category: "Beauty & Personal Care",
    subCategory: "Skincare",
    keywords: ["moisturizer", "hydration", "skincare", "beauty"],
    description: "Deeply nourishes and hydrates your skin for a radiant look."
  },

  {
    id: 2,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/shampoo.jpg",
    name: "Anti-Dandruff Shampoo",
    rating: { stars: 4.5, count: 85 },
    priceCents: 35000,
    category: "Beauty & Personal Care",
    subCategory: "Hair Care",
    keywords: ["shampoo", "hair care", "anti-dandruff", "cleanse"],
    description: "Effectively removes dandruff and keeps your scalp healthy."
  },

  {
    id: 3,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/foundation.jpg",
    name: "Matte Liquid Foundation",
    rating: { stars: 4.6, count: 98 },
    priceCents: 34000,
    category: "Beauty & Personal Care",
    subCategory: "Makeup",
    keywords: ["foundation", "makeup", "beauty", "matte"],
    description: "Long-lasting matte finish foundation with smooth coverage."
  },

  {
    id: 4,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/perfume.jpg",
    name: "Eau de Parfum - Floral Scent",
    rating: { stars: 4.8, count: 160 },
    priceCents: 65000,
    category: "Beauty & Personal Care",
    subCategory: "Fragrances",
    keywords: ["perfume", "fragrance", "scent", "floral"],
    description: "Luxury floral fragrance with a refreshing and elegant aroma."
  },

  {
    id: 5,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/shaving-kit.jpg",
    name: "Men's Shaving Kit",
    rating: { stars: 4.4, count: 70 },
    priceCents: 28000,
    category: "Beauty & Personal Care",
    subCategory: "Grooming",
    keywords: ["shaving kit", "grooming", "men", "razor"],
    description: "Complete shaving kit for a smooth and comfortable shave."
  },

  {
    id: 6,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/body-wash.jpg",
    name: "Nourishing Body Wash",
    rating: { stars: 4.7, count: 140 },
    priceCents: 21000,
    category: "Beauty & Personal Care",
    subCategory: "Bath & Body",
    keywords: ["body wash", "bath", "care", "nourishing"],
    description: "Gentle body wash that keeps your skin soft and refreshed."
  },

  {
    id: 7,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/nail-polish.jpg",
    name: "Glossy Nail Polish",
    rating: { stars: 4.5, count: 65 },
    priceCents: 12000,
    category: "Beauty & Personal Care",
    subCategory: "Nail Care",
    keywords: ["nail polish", "beauty", "glossy", "nails"],
    description: "Glossy nail polish with vibrant color and long-lasting shine."
  },

  {
    id: 8,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/conditioner.jpg",
    name: "Moisturizing Conditioner",
    rating: { stars: 4.6, count: 110 },
    priceCents: 42000,
    category: "Beauty & Personal Care",
    subCategory: "Hair Care",
    keywords: ["conditioner", "hair care", "smooth", "hydration"],
    description: "Moisturizing conditioner for silky smooth and healthy hair."
  },

  {
    id: 9,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/razor.jpg",
    name: "Triple Blade Razor",
    rating: { stars: 4.3, count: 55 },
    priceCents: 45000,
    category: "Beauty & Personal Care",
    subCategory: "Men's Grooming",
    keywords: ["razor", "shaving", "grooming", "men"],
    description: "Triple blade razor designed for a clean and smooth shave."
  },

  {
    id: 10,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/vitamin-supplement.jpg",
    name: "Vitamin C Supplement",
    rating: { stars: 4.7, count: 200 },
    priceCents: 42000,
    category: "Health & Wellness",
    subCategory: "Supplements",
    keywords: ["vitamin c", "health", "supplement", "wellness"],
    description: "Vitamin C tablets that help boost immunity and energy."
  },

  {
    id: 11,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/wireless-headphones.jpg",
    name: "Wireless Bluetooth Headphones",
    rating: { stars: 4.7, count: 230 },
    priceCents: 120000,
    category: "Electronics",
    subCategory: "Audio",
    keywords: ["headphones", "bluetooth", "music", "audio"],
    description: "Premium wireless headphones with powerful bass and comfort."
  },

  {
    id: 12,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/smartphone.jpg",
    name: "Smartphone - 128GB",
    rating: { stars: 4.6, count: 320 },
    priceCents: 3700000,
    category: "Electronics",
    subCategory: "Mobile Phones",
    keywords: ["smartphone", "mobile", "android", "gadgets"],
    description: "Modern smartphone with fast performance and 128GB storage."
  },

  {
    id: 13,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/4k-tv.jpg",
    name: "55-Inch 4K Ultra HD TV",
    rating: { stars: 4.8, count: 190 },
    priceCents: 4500000,
    category: "Electronics",
    subCategory: "Televisions",
    keywords: ["tv", "4k", "ultra hd", "electronics"],
    description: "Enjoy crystal-clear entertainment with a stunning 4K display."
  },

  {
    id: 14,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/laptop.jpg",
    name: "Gaming Laptop - 16GB RAM",
    rating: { stars: 4.9, count: 210 },
    priceCents: 8300000,
    category: "Electronics",
    subCategory: "Computers",
    keywords: ["gaming laptop", "laptop", "computer", "electronics"],
    description: "Powerful gaming laptop built for speed and multitasking."
  },

  {
    id: 15,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/smartwatch.jpg",
    name: "Smartwatch Fitness Tracker",
    rating: { stars: 4.5, count: 130 },
    priceCents: 180000,
    category: "Electronics",
    subCategory: "Wearables",
    keywords: ["smartwatch", "fitness", "tracker", "wearable"],
    description: "Track fitness, calls, and notifications with this smartwatch."
  },

  {
    id: 16,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/tablet.jpg",
    name: "10-Inch Android Tablet",
    rating: { stars: 4.3, count: 95 },
    priceCents: 2800000,
    category: "Electronics",
    subCategory: "Tablets",
    keywords: ["tablet", "android", "screen", "gadgets"],
    description: "Portable tablet ideal for watching, studying, and browsing."
  },

  {
    id: 17,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/bluetooth-speaker.jpg",
    name: "Portable Bluetooth Speaker",
    rating: { stars: 4.7, count: 180 },
    priceCents: 350000,
    category: "Electronics",
    subCategory: "Audio",
    keywords: ["speaker", "bluetooth", "music", "portable"],
    description: "Portable speaker with deep bass and clear sound quality."
  },

  {
    id: 18,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/dslr-camera.jpg",
    name: "DSLR Camera - 24MP",
    rating: { stars: 4.8, count: 115 },
    priceCents: 9800000,
    category: "Electronics",
    subCategory: "Cameras",
    keywords: ["camera", "dslr", "photography", "electronics"],
    description: "Professional DSLR camera perfect for photography lovers."
  },

  {
    id: 19,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/usb-drive.jpg",
    name: "USB Drive - 64GB",
    rating: { stars: 4.2, count: 75 },
    priceCents: 160000,
    category: "Electronics",
    subCategory: "Storage",
    keywords: ["usb", "storage", "pendrive", "electronics"],
    description: "Compact and fast USB drive with 64GB storage capacity."
  },

  {
    id: 20,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/action-camera.jpg",
    name: "4K Action Camera",
    rating: { stars: 4.6, count: 90 },
    priceCents: 6000000,
    category: "Electronics",
    subCategory: "Cameras",
    keywords: ["action camera", "4k", "video", "gadgets"],
    description: "Capture adventures and sports moments in ultra HD quality."
  },

  {
    id: 21,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/denim-jacket.jpg",
    name: "Men's Denim Jacket",
    rating: { stars: 4.5, count: 150 },
    priceCents: 55000,
    category: "Fashion",
    subCategory: "Men's Clothing",
    keywords: ["jacket", "denim", "fashion", "clothing"],
    description: "Stylish denim jacket perfect for casual everyday wear."
  },

  {
    id: 22,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/maxi-dress.jpg",
    name: "Women's Floral Maxi Dress",
    rating: { stars: 4.8, count: 95 },
    priceCents: 69000,
    category: "Fashion",
    subCategory: "Women's Clothing",
    keywords: ["dress", "fashion", "women", "floral"],
    description: "Elegant floral dress designed for comfort and beauty."
  },

  {
    id: 23,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/sneakers.jpg",
    name: "Unisex Casual Sneakers",
    rating: { stars: 4.7, count: 210 },
    priceCents: 250000,
    category: "Fashion",
    subCategory: "Footwear",
    keywords: ["sneakers", "shoes", "casual", "fashion"],
    description: "Comfortable casual sneakers for daily wear and walking."
  },

  {
    id: 24,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/leather-bag.jpg",
    name: "Leather Tote Bag",
    rating: { stars: 4.6, count: 130 },
    priceCents: 130000,
    category: "Fashion",
    subCategory: "Accessories",
    keywords: ["bag", "leather", "fashion", "accessories"],
    description: "Premium leather tote bag with stylish spacious design."
  },

  {
    id: 25,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/sunglasses.jpg",
    name: "Polarized Sunglasses",
    rating: { stars: 4.4, count: 90 },
    priceCents: 57000,
    category: "Fashion",
    subCategory: "Accessories",
    keywords: ["sunglasses", "polarized", "fashion", "style"],
    description: "Trendy polarized sunglasses with UV eye protection."
  },

  {
    id: 26,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/formal-shirt.jpg",
    name: "Men's Formal Shirt",
    rating: { stars: 4.3, count: 85 },
    priceCents: 48000,
    category: "Fashion",
    subCategory: "Men's Clothing",
    keywords: ["shirt", "formal", "men", "fashion"],
    description: "Formal shirt crafted for office and special occasions."
  },

  {
    id: 27,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/heels.jpg",
    name: "Women's High Heels",
    rating: { stars: 4.6, count: 105 },
    priceCents: 85000,
    category: "Fashion",
    subCategory: "Footwear",
    keywords: ["heels", "women", "shoes", "fashion"],
    description: "Elegant high heels that enhance your party look."
  },

  {
    id: 28,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/t-shirt.jpg",
    name: "Graphic Print T-Shirt",
    rating: { stars: 4.5, count: 200 },
    priceCents: 26000,
    category: "Fashion",
    subCategory: "Men's Clothing",
    keywords: ["tshirt", "graphic", "casual", "fashion"],
    description: "Soft cotton t-shirt with trendy graphic print design."
  },

  {
    id: 29,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/handbag.jpg",
    name: "Women's Designer Handbag",
    rating: { stars: 4.9, count: 150 },
    priceCents: 65000,
    category: "Fashion",
    subCategory: "Accessories",
    keywords: ["handbag", "designer", "fashion", "women"],
    description: "Luxury designer handbag with premium stylish finishing."
  },

  {
    id: 30,
    image: "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/images/products/slippers.jpg",
    name: "Comfortable Flip-Flops",
    rating: { stars: 4.2, count: 70 },
    priceCents: 25000,
    category: "Fashion",
    subCategory: "Footwear",
    keywords: ["flipflops", "slippers", "casual", "footwear"],
    description: "Lightweight and comfortable flip-flops for daily use."
  }
]

const Home = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // Not logged in
      try {
        const response = await axios.get("http://localhost:5000/cart", {
          headers: { Authorization: token }
        });
        if (response.data && response.data.items) {
          setCart(response.data.items);
        }
      } catch (e) {
        console.error("Error fetching cart from DB:", e);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart.");
      navigate("/");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/cart/add", {
        productId: product.id,
        name: product.name,
        priceCents: product.priceCents,
        category: product.category,
        image: product.image,
        description: product.description
      }, {
        headers: { Authorization: token }
      });
      
      if (response.data && response.data.items) {
        setCart(response.data.items);
        alert(`${product.name} added to cart`);
      }
    } catch (e) {
      console.error("Error adding to cart DB:", e);
      alert("Not add to cart. Please try again.");
    }
  };

  const getCartTotalCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <main className="home-page">
      <header className="home-navbar">
        <div className="store-brand">ShopHub</div>

        <div className="navbar-search">
          <input type="search" placeholder="Search products..." />
          <button type="button">Search</button>
        </div>

        <div className="navbar-actions">
          <button 
            type="button" 
            className="nav-link logout-btn"
            onClick={() => navigate("/logout")}
            style={{ cursor: "pointer", border: "none", background: "transparent" }}
          >
            Logout
          </button>
          <div 
            className="cart-badge"
            onClick={() => navigate("/cart")}
            style={{ cursor: "pointer" }}
          >
            🛒<span>{getCartTotalCount()}</span>
          </div>
        </div>
      </header>

      <section className="home-hero">
        {/* <div><img src="https://www.shutterstock.com/image-vector/mega-sale-vector-banner-abstract-260nw-2695409101.jpg" alt="Advertizement" /></div> */}
      </section>


    <section className="product-section">
    <div className="section-header">
        <h2>Featured student picks</h2>

        <button type="button" className="view-all-button">
        View all products
        </button>
    </div>

    <div className="product-grid">

        {products.map((product) => (

        <article key={product.id} className="product-card">

            <div className="product-media">

            <div className="product-image">
                <img
                src={product.image}
                alt={product.name}
                />
            </div>

            <div className="product-badge">
                ⭐ {product.rating.stars}
            </div>

            </div>

            <div className="product-content">

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <div className="product-footer">

                <span className="product-price">
                ₹{product.priceCents / 100}
                </span>

                <button
                type="button"
                className="add-button"
                onClick={() => addToCart(product)}
                >
                Add to cart
                </button>

            </div>

            </div>

        </article>

        ))}

    </div>
    </section>


    </main>
  );
};

export default Home;