const ProductList = ({ products, onSelect }) => {
    return (
        <div className="grid grid-cols-3 gap-6 p-6">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="border rounded-2xl shadow hover:shadow-lg transition p-4 cursor-pointer bg-white"
                    onClick={() => onSelect(product)}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-xl"
                    />
                    <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
                    <p className="text-gray-600">${product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
