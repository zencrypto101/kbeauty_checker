import React, { useState, useEffect, useRef } from 'react'; // useRef 추가
import { Link } from 'react-router-dom';
import './AdminPage.css'; // AdminPage 전용 CSS 파일

function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // 메시지 상태 추가

  const formSectionRef = useRef(null); // 폼 섹션에 대한 ref 생성

  const correctPassword = '0711'; // 비밀번호 설정

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password. Please try again.');
      setPassword(''); // 비밀번호 필드 초기화
    }
  };

  // 기존 AdminPage 로직 (비밀번호 인증 후 실행)
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    olive_young_status: '',
    hwahae_ranking: '',
    sales_data: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [bulkData, setBulkData] = useState('');

  useEffect(() => {
    if (isAuthenticated) { // 인증된 경우에만 제품을 가져옴
      fetchProducts();
    }
  }, [isAuthenticated]); // isAuthenticated가 변경될 때마다 실행

  // 메시지 표시 후 자동으로 사라지게 하는 useEffect
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000); // 3초 후에 메시지 사라짐
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    setNewProduct({
      name: '',
      image: '',
      olive_young_status: '',
      hwahae_ranking: '',
      sales_data: '',
    });
    fetchProducts();
    setMessage('제품이 추가되었습니다!'); // 메시지 설정
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setNewProduct(product); // Populate form with product data for editing
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 스크롤 이동
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    await fetch(`/api/products/${editingProduct.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // 'application' -> 'application/json' 수정
      },
      body: JSON.stringify(newProduct),
    });
    setEditingProduct(null);
    setNewProduct({
      name: '',
      image: '',
      olive_young_status: '',
      hwahae_ranking: '',
      sales_data: '',
    });
    fetchProducts();
    setMessage('제품이 수정되었습니다!'); // 메시지 설정
  };

  const handleDeleteProduct = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    fetchProducts();
    setMessage('제품이 삭제되었습니다!'); // 삭제 메시지도 추가
  };

  const handleBulkUpload = async () => {
    try {
      const parsedData = JSON.parse(bulkData);
      if (Array.isArray(parsedData)) {
        for (const item of parsedData) {
          await fetch('/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          });
        }
        setMessage('대량 업로드가 성공적으로 완료되었습니다!'); // 대량 업로드 메시지 추가
        setBulkData('');
        fetchProducts();
      } else {
        alert('Invalid JSON format. Please provide an array of product objects.');
      }
    } catch (error) {
      alert('Error parsing JSON or uploading data.' + error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <header className="admin-header">
          <h1>Admin Panel - Login</h1>
          <nav>
            <Link to="/" className="home-button">Go to Home Page</Link>
          </nav>
        </header>
        <main className="admin-main">
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <p>Enter password to access Admin Panel:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <nav>
          <Link to="/" className="home-button">Go to Home Page</Link>
        </nav>
      </header>
      <main className="admin-main">
        {message && <div className="success-message">{message}</div>} {/* 메시지 표시 */}
        <section className="product-form-section" ref={formSectionRef}> {/* ref 연결 */}
          <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="olive_young_status"
              placeholder="Olive Young Status"
              value={newProduct.olive_young_status}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="hwahae_ranking"
              placeholder="Hwahae Ranking"
              value={newProduct.hwahae_ranking}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="sales_data"
              placeholder="Sales Data"
              value={newProduct.sales_data}
              onChange={handleInputChange}
            />
            <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
            {editingProduct && <button type="button" onClick={() => setEditingProduct(null)}>Cancel Edit</button>}
          </form>
        </section>

        <section className="bulk-upload-section">
          <h2>Bulk Upload Products (JSON Array)</h2>
          <textarea
            placeholder="Paste JSON array of products here..."
            value={bulkData}
            onChange={(e) => setBulkData(e.target.value)}
            rows="10"
            cols="50"
          ></textarea>
          <button onClick={handleBulkUpload}>Upload Bulk Data</button>
        </section>

        <section className="product-list-section">
          <h2>Existing Products</h2>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <span>{product.name}</span>
                <div>
                  <button onClick={() => handleEditClick(product)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminPage;