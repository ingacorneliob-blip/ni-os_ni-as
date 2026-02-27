import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Facebook, Ghost, Baby, MessageCircle, X } from 'lucide-react'

const products = [
  {
    id: 1,
    title: "Camisa de Lino Celeste",
    category: "superior",
    gender: "niño",
    price: "$29.99",
    image: "/prod1.png",
    sizes: ["2", "4", "6"],
    description: "Camisa de lino premium, fresca y elegante. Ideal para ocasiones especiales o un look casual refinado."
  },
  {
    id: 2,
    title: "Vestido Floral de Verano",
    category: "vestidos",
    gender: "niña",
    price: "$34.99",
    image: "/prod2.png",
    sizes: ["4", "6", "8"],
    description: "Hermoso vestido con estampado floral vibrante. Tela suave y transpirable para máxima comodidad."
  },
  {
    id: 3,
    title: "Hoodie Amarillo Unisex",
    category: "superior",
    gender: "unisex",
    price: "$39.99",
    image: "/prod3.png",
    sizes: ["2", "4", "6", "8"],
    description: "Polerón con capucha de algodón orgánico. Diseño moderno y minimalista que combina con todo."
  },
  {
    id: 4,
    title: "Pantalón Denim Clásico",
    category: "inferior",
    gender: "niño",
    price: "$25.00",
    image: "/prod1.png",
    sizes: ["4", "6", "8"],
    description: "Jeans resistentes y flexibles diseñados para el juego diario. Ajuste cómodo y duradero."
  },
  {
    id: 5,
    title: "Falda de Tul Rosa",
    category: "inferior",
    gender: "niña",
    price: "$22.50",
    image: "/prod2.png",
    sizes: ["2", "4", "6"],
    description: "Falda de tul suave con forro de algodón. Perfecta para pequeñas bailarinas y momentos mágicos."
  },
  {
    id: 6,
    title: "Camiseta Básica Algodón",
    category: "superior",
    gender: "unisex",
    price: "$15.00",
    image: "/prod3.png",
    sizes: ["2", "4", "6", "8"],
    description: "Esencial de armario. Algodón 100% hipoalergénico en colores vibrantes que no destiñen."
  }
];

function App() {
  const [filter, setFilter] = useState({ gender: 'all', category: 'all', size: 'all' });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const genderMatch = filter.gender === 'all' || p.gender === filter.gender;
      const categoryMatch = filter.category === 'all' || p.category === filter.category;
      const sizeMatch = filter.size === 'all' || p.sizes.includes(filter.size);
      return genderMatch && categoryMatch && sizeMatch;
    });
  }, [filter]);

  const handleWhatsApp = (product) => {
    const message = `Hola! Estoy interesado en el producto: ${product.title} (${product.price}). ¿Tienen disponibilidad?`;
    window.open(`https://wa.me/51943657599?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="logo">
          <Baby size={28} />
          TinyTrends
        </div>
        <div className="social-links">
          <a href="#"><Facebook size={20} /></a>
          <a href="#"><Instagram size={20} /></a>
          <a href="#"><Ghost size={20} /></a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Moda con Magia para los más Pequeños</h1>
          <p>Descubre nuestra colección exclusiva diseñada para la comodidad y el estilo de tus niños y niñas. Calidad premium que les encanta.</p>
          <a href="#productos" className="btn-whatsapp" style={{ background: 'var(--primary)', marginTop: 0 }}>
            Explorar Colección
          </a>
        </motion.div>
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/hero.png" alt="Niños con ropa moderna" />
        </motion.div>
      </section>

      {/* Products Section */}
      <section id="productos" style={{ paddingBottom: '100px' }}>
        <div className="filter-section">
          {['gender', 'category', 'size'].map((key) => (
            <div className="filter-group" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <select
                value={filter[key]}
                onChange={(e) => setFilter({ ...filter, [key]: e.target.value })}
              >
                <option value="all">Todos/as</option>
                {key === 'gender' && (
                  <>
                    <option value="niño">Niño</option>
                    <option value="niña">Niña</option>
                    <option value="unisex">Unisex</option>
                  </>
                )}
                {key === 'category' && (
                  <>
                    <option value="superior">Superior</option>
                    <option value="inferior">Inferior</option>
                    <option value="vestidos">Vestidos</option>
                  </>
                )}
                {key === 'size' && (
                  <>
                    <option value="2">Talla 2</option>
                    <option value="4">Talla 4</option>
                    <option value="6">Talla 6</option>
                    <option value="8">Talla 8</option>
                  </>
                )}
              </select>
            </div>
          ))}
        </div>

        <motion.div layout className="products-grid">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map(product => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="product-card"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="product-img">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info">
                  <div className="product-category">{product.gender} | {product.category}</div>
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-price">{product.price}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredProducts.length === 0 && (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem' }}>
              No se encontraron productos con estos filtros.
            </p>
          )}
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target.className === 'modal-overlay' && setSelectedProduct(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <X className="close-modal" onClick={() => setSelectedProduct(null)} />
              <div className="modal-img">
                <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: '100%', borderRadius: '12px' }} />
              </div>
              <div className="modal-details">
                <h2>{selectedProduct.title}</h2>
                <span className="product-category">{selectedProduct.gender} | {selectedProduct.category}</span>
                <p style={{ margin: '20px 0', color: 'var(--text-muted)' }}>{selectedProduct.description}</p>
                <div className="product-price" style={{ fontSize: '2rem' }}>{selectedProduct.price}</div>
                <p style={{ marginTop: '20px' }}><strong>Tallas disponibles:</strong> {selectedProduct.sizes.join(', ')}</p>
                <button onClick={() => handleWhatsApp(selectedProduct)} className="btn-whatsapp" style={{ border: 'none', width: '100%', cursor: 'pointer' }}>
                  <MessageCircle size={20} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                  Pedir por WhatsApp
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer style={{ marginTop: 'auto' }}>
        <div className="footer-content">
          <h2>TinyTrends</h2>
          <p>Vistiendo el futuro con alegría.</p>
          <div className="footer-socials">
            <a href="#"><Facebook /></a>
            <a href="#"><Instagram /></a>
            <a href="#"><Ghost /></a>
          </div>
          <p>&copy; 2024 TinyTrends Store. Todos los derechos reservados.</p>
          <p>Contáctanos: +51 943 657 599</p>
        </div>
      </footer>
    </div>
  )
}

export default App
