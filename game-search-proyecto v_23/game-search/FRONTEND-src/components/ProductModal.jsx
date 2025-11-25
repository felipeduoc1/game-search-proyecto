import { useCart } from "../context/CartContext";

const ProductModal = ({ product, onClose }) => {
    const { addToCart } = useCart();

    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3 p-4 shadow-lg position-relative" style={{ maxWidth: "600px", width: "90%" }}>
                <button
                    onClick={onClose}
                    className="btn-close position-absolute top-0 end-0 m-3"
                ></button>

                <img
                    src={product.image}
                    alt={product.name}
                    className="img-fluid rounded mb-3"
                />

                <h2 className="fw-bold">{product.name}</h2>
                <p className="text-muted">{product.description}</p>
                <h4 className="mt-3">${product.price}</h4>

                <button
                    onClick={() => {
                        addToCart(product);
                        onClose();
                    }}
                    className="btn btn-success w-100 mt-3"
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default ProductModal;

