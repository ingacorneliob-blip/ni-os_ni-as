'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, Facebook, Ghost, Baby, MessageCircle, X, Settings, Plus, Trash2, AlertCircle } from 'lucide-react'
import { getProducts, createProduct, deleteProduct } from '@/lib/actions'

export default function Home() {
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState({ gender: 'all', category: 'all', size: 'all' });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showAdmin, setShowAdmin] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        loadProducts()
    }, [])

    async function loadProducts() {
        setIsLoading(true)
        setError(null)
        try {
            // Add a safety timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const data = await getProducts()
            clearTimeout(timeoutId);

            if (data) {
                setProducts(data)
            } else {
                setError('No se pudieron cargar los productos.')
            }
        } catch (err) {
            console.error('Error loading products:', err)
            setError('Error de conexión con el catálogo.')
        } finally {
            setIsLoading(false)
        }
    }

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const genderMatch = filter.gender === 'all' || p.gender === filter.gender;
            const categoryMatch = filter.category === 'all' || p.category === filter.category;
            const sizeMatch = filter.size === 'all' || p.sizes.includes(filter.size);
            return genderMatch && categoryMatch && sizeMatch;
        });
    }, [filter, products]);

    const handleWhatsApp = (product) => {
        const message = `Hola! Estoy interesado en el producto: ${product.title} (${product.price}). ¿Tienen disponibilidad?`;
        window.open(`https://wa.me/51943657599?text=${encodeURIComponent(message)}`, '_blank');
    };

    async function handleAdminSubmit(e) {
        e.preventDefault()
        setIsSubmitting(true)
        const formData = new FormData(e.target)
        const res = await createProduct(formData)
        if (res.success) {
            e.target.reset()
            loadProducts()
        } else {
            alert('Error al crear producto')
        }
        setIsSubmitting(false)
    }

    async function handleDelete(id) {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            const res = await deleteProduct(id)
            if (res.success) {
                loadProducts()
            }
        }
    }

    return (
        <div className="app-container">
            {/* Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
            >
                <div className="logo" style={{ cursor: 'pointer' }}>
                    <Baby size={28} />
                    TinyTrends
                </div>
                <div className="social-links">
                    <a href="#"><Facebook size={20} /></a>
                    <a href="#"><Instagram size={20} /></a>
                    <a href="#"><Ghost size={20} /></a>
                </div>
            </motion.nav>

            {/* Hero Section */}
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
            <section id="productos" style={{ paddingBottom: '50px' }}>
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

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '5rem' }}>
                        <div className="loader" style={{ margin: '0 auto 20px' }}></div>
                        <p style={{ color: '#888' }}>Cargando catálogo mágico...</p>
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '5rem', color: '#ff4d4d' }}>
                        <AlertCircle size={48} style={{ margin: '0 auto 20px' }} />
                        <p>{error}</p>
                        <button onClick={loadProducts} style={{ marginTop: '15px', background: 'none', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }}>Reintentar</button>
                    </div>
                ) : (
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
                                        <img src={product.imageUrl} alt={product.title} />
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
                            <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#888' }}>
                                No se encontraron productos con estos filtros.
                            </p>
                        )}
                    </motion.div>
                )}
            </section>

            {/* Hidden Admin Section */}
            <AnimatePresence>
                {showAdmin && (
                    <motion.section
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{
                            background: '#fff',
                            padding: '2rem',
                            margin: '20px auto',
                            maxWidth: '900px',
                            borderRadius: '20px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                            position: 'relative',
                            zIndex: 100
                        }}
                    >
                        <button
                            onClick={() => setShowAdmin(false)}
                            style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: '#f0f0f0', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}
                        >
                            <X size={16} />
                        </button>
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#444' }}>Gestión Restringida</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
                            {/* Discrete Form */}
                            <form onSubmit={handleAdminSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input name="title" required className="mini-input" placeholder="Nombre" />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    <input name="price" required className="mini-input" placeholder="Precio ($)" />
                                    <select name="gender" required className="mini-input">
                                        <option value="niño">Niño</option>
                                        <option value="niña">Niña</option>
                                        <option value="unisex">Unisex</option>
                                    </select>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    <select name="category" required className="mini-input">
                                        <option value="superior">Superior</option>
                                        <option value="inferior">Inferior</option>
                                        <option value="vestidos">Vestidos</option>
                                    </select>
                                    <input name="sizes" required className="mini-input" placeholder="Tallas (2,4)" />
                                </div>
                                <input name="imageUrl" required className="mini-input" placeholder="URL Imagen" />
                                <textarea name="description" rows="2" className="mini-input" placeholder="Descripción corta..."></textarea>
                                <button disabled={isSubmitting} type="submit" className="mini-btn">
                                    {isSubmitting ? '...' : '+ Guardar'}
                                </button>
                            </form>

                            {/* Discrete List */}
                            <div style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '5px' }}>
                                {products.map(product => (
                                    <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', borderBottom: '1px solid #eee' }}>
                                        <img src={product.imageUrl} style={{ width: '35px', height: '35px', borderRadius: '5px', objectFit: 'cover' }} alt="" />
                                        <span style={{ fontSize: '0.8rem', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</span>
                                        <button onClick={() => handleDelete(product.id)} style={{ color: '#ccc', border: 'none', background: 'none', cursor: 'pointer' }}>
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <style jsx>{`
              .mini-input { width: 100%; padding: 8px 12px; border: 1px solid #eee; border-radius: 8px; font-size: 0.85rem; background: #fafafa; }
              .mini-btn { background: #333; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 600; }
              .mini-btn:hover { background: #000; }
            `}</style>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Modal Detalle Product */}
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
                                <img src={selectedProduct.imageUrl} alt={selectedProduct.title} style={{ width: '100%', borderRadius: '12px' }} />
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

            <footer style={{ marginTop: 'auto', borderTop: 'none' }}>
                <div className="footer-content">
                    <h2>TinyTrends</h2>
                    <p>Vistiendo el futuro con alegría.</p>
                    <div className="footer-socials" style={{ marginBottom: '15px' }}>
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><Ghost size={20} /></a>
                    </div>
                    <p style={{ opacity: 0.6, fontSize: '0.75rem' }}>&copy; 2026 TinyTrends Store. Todos los derechos reservados.</p>

                    {/* Subtle Admin Trigger */}
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                        <button
                            onClick={() => setShowAdmin(!showAdmin)}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '10px',
                                cursor: 'pointer',
                                opacity: 0.2, // Very transparent
                                transition: 'opacity 0.3s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.5'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.2'}
                            title="Configuración"
                        >
                            <Settings size={14} color="#888" />
                        </button>
                    </div>
                </div>
            </footer>

        </div>
    )
}
