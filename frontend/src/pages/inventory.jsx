import React, { useState } from 'react';
import bg from '../assets/bg.jpg';
import Sidebar from '../components/sidebar';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';

const Inventory = () => {
  // State to manage the form inputs
  const [form, setForm] = useState({
    barcode: '',
    productName: '',
    category: '',
    unitPrice: '',
    wsmq: '',
    wsp: '',
    reorderLevel: ''
  });

  // State to manage the list of products
  const [products, setProducts] = useState([]);
  // State to manage error messages
  const [error, setError] = useState('');
  // State to track which product is being edited
  const [editingIndex, setEditingIndex] = useState(null);

  // Function to validate the form inputs
  const validateForm = () => {
    const errors = {};
    // Check if any form field is empty and add it to the errors object
    for (const key in form) {
      if (!form[key]) errors[key] = true;
    }
    return errors;
  };

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the form state with the new value
    setForm({
      ...form,
      [name]: value
    });
  };

  // Function to handle adding a new product
  const handleAddProduct = () => {
    const errors = validateForm();
    // If there are errors, set the error state and return
    if (Object.keys(errors).length > 0) {
      setError('');
      return;
    }

    // Create a new product object with the form data
    const newProduct = {
      ...form,
      currentStock: 0
    };

    // Add the new product to the products list
    setProducts([...products, newProduct]);

    // Reset the form fields
    setForm({
      barcode: '',
      productName: '',
      category: '',
      unitPrice: '',
      wsmq: '',
      wsp: '',
      reorderLevel: ''
    });

    setError('');
  };

  // Function to handle deleting a product
  const handleDeleteProduct = (index) => {
    // Create a new list of products excluding the one to be deleted
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Function to handle editing a product
  const handleEditProduct = (index) => {
    // Set the form state with the product data to be edited
    const product = products[index];
    setForm(product);
    setEditingIndex(index);
  };

  // Function to handle saving an edited product
  const handleSaveProduct = () => {
    // Update the product in the list with the edited data
    const updatedProducts = products.map((product, index) =>
      index === editingIndex ? form : product
    );

    setProducts(updatedProducts);
    resetForm();
    setEditingIndex(null);
  };

  // Function to reset the form fields and clear errors
  const resetForm = () => {
    setForm({
      barcode: '',
      productName: '',
      category: '',
      unitPrice: '',
      wsmq: '',
      wsp: '',
      reorderLevel: ''
    });
    setError('');
  };

  // Function to format numbers to two decimal places
  const formatDecimal = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? '0.00' : number.toFixed(2);
  };

  // Function to get the input border class based on validation
  const getInputBorderClass = (field) => {
    const errors = validateForm();
    return errors[field] ? 'border-red-500 border-2 placeholder:text-red-500' : 'border-black';
  };

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-10/12 h-full'>
        <div className='w-full h-20 bg-white flex items-center justify-between px-10 drop-shadow-xl z-10'>
          <h1 className='text-2xl text-darkp font-medium tracking-tighter'>Inventory</h1>
        </div>
        <div className='h-4/5 w-full p-10 pb-0 flex flex-col gap-5'>
          <div className='w-full h-fit flex justify-between gap-2'>
            <div className='flex gap-2'>
              <button className='py-2 px-4 h-fit bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>All</button>
              <button className='py-2 px-4 h-fit bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>No Stock</button>
              <button className='py-2 px-4 h-fit bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Low Stock</button>
            </div>
            <input
              type="text"
              className='bg-white h-fit px-4 py-2 text-darkp text-md font-light outline-none w-4/12 rounded-xl border border-darkp placeholder:text-darkp2'
              placeholder="search for products"
            />
          </div>
          <div className='w-full h-full rounded-2xl flex flex-col justify-between items-center gap-5'>
            <div className='h-4/5 w-full flex flex-col rounded-b-2xl drop-shadow-2xl overflow-y-scroll hide-scrollbar'>
              <div className='h-14 bg-darkp opacity-80 rounded-t-2xl text-white text-sm flex justify-between items-center px-10'>
                <h1 className='w-2/12 text-center'>Barcode #</h1>
                <h1 className='w-2/12 text-center'>Product Name</h1>
                <h1 className='w-2/12 text-center'>Category</h1>
                <h1 className='w-2/12 text-center'>Current Stock</h1>
                <h1 className='w-2/12 text-center'>Unit Price</h1>
                <h1 className='w-2/12 text-center'>WSMQ</h1>
                <h1 className='w-2/12 text-center'>WSP</h1>
                <h1 className='w-2/12 text-center'>Actions</h1>
              </div>
              <div className='h-full w-full bg-white rounded-b-2xl drop-shadow-2xl overflow-y-auto'>
                {products.map((product, index) => (
                  <div key={index} className='w-full text-darkp text-center flex items-center justify-between px-10 py-2 border-b border-gray-200'>
                    <h1 className='w-2/12'>{product.barcode}</h1>
                    <h1 className='w-2/12'>{product.productName}</h1>
                    <h1 className='w-2/12'>{product.category}</h1>
                    <h1 className='w-2/12'>{product.currentStock}</h1>
                    <h1 className='w-2/12'>{formatDecimal(product.unitPrice)}</h1>
                    <h1 className='w-2/12'>{product.wsmq}</h1>
                    <h1 className='w-2/12'>{formatDecimal(product.wsp)}</h1>
                    <h1 className='w-2/12 flex gap-5 justify-center'>
                      <button onClick={() => handleEditProduct(index)}><img src={edit} className='w-5' /></button>
                      <button onClick={() => handleDeleteProduct(index)}><img src={del} className='w-6' /></button>
                    </h1>
                  </div>
                ))}
              </div>
            </div>
            <div className='w-full h-3/6 bg-darkp opacity-80 rounded-2xl drop-shadow-2xl px-10 py-3'>
              <div className='h-full flex gap-5'>
                <div className='w-full h-full flex flex-col justify-between'>
                  <div className='flex flex-col gap-1'>
                    <label className='text-white font-bold'>Barcode #</label>
                    <input
                      type="text"
                      name="barcode"
                      value={form.barcode}
                      onChange={handleInputChange}
                      className={`bg-white px-5 py-3 border ${getInputBorderClass('barcode')} outline-none text-xs rounded-lg`}
                      placeholder="enter barcode (required)"
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label className='text-white font-bold'>Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      value={form.productName}
                      onChange={handleInputChange}
                      className={`bg-white px-5 py-3 border ${getInputBorderClass('productName')} outline-none text-xs rounded-lg`}
                      placeholder="enter product name (required)"
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label className='text-white font-bold'>Category</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleInputChange}
                      className={`bg-white px-5 py-3 border ${getInputBorderClass('category')} outline-none text-xs rounded-lg`}
                    >
                      <option></option>
                      <option>Miscellaneous</option>
                      <option>Stationery & Office Supplies</option>
                      <option>Tobacco & Smoking Accessories</option>
                      <option>Household Items</option>
                      <option>Health & Beauty</option>
                      <option>Frozen Foods</option>
                      <option>Dairy & Refrigerated Items</option>
                      <option>Grocery Items</option>
                      <option>Snacks</option>
                      <option>Beverages</option>
                    </select>
                  </div>
                </div>
                <div className='w-full flex flex-col justify-between'>
                  <div className='flex flex-col gap-1'>
                    <label className='text-white font-bold'>Unit Price</label>
                    <input
                      type="number"
                      name="unitPrice"
                      value={form.unitPrice}
                      onChange={handleInputChange}
                      className={`bg-white px-5 py-3 border ${getInputBorderClass('unitPrice')} outline-none text-xs rounded-lg`}
                      placeholder="enter unit price (required)"
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label className='text-white font-bold'>Wholesale Minimum Quantity (WSMQ)</label>
                    <input
                      type="number"
                      name="wsmq"
                      value={form.wsmq}
                      onChange={handleInputChange}
                      className={`bg-white px-5 py-3 border ${getInputBorderClass('wsmq')} outline-none text-xs rounded-lg`}
                      placeholder="enter WSMQ (required)"
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label className='text-white font-bold'>Wholesale Price (WSP)</label>
                    <input
                      type="number"
                      name="wsp"
                      value={form.wsp}
                      onChange={handleInputChange}
                      className={`bg-white px-5 py-3 border ${getInputBorderClass('wsp')} outline-none text-xs rounded-lg`}
                      placeholder="enter WSP (required)"
                    />
                  </div>
                </div>
                <div className='w-full flex flex-col justify-between'>
                  <div className='flex flex-col gap-1'>
                    <label className='text-white font-bold'>Reorder Level</label>
                    <input
                      type="number"
                      name="reorderLevel"
                      value={form.reorderLevel}
                      onChange={handleInputChange}
                      className={`bg-white px-5 py-3 border ${getInputBorderClass('reorderLevel')} outline-none text-xs rounded-lg`}
                      placeholder="enter reorder level (required)"
                    />
                  </div>
                  <div className='w-full flex items-end justify-end'>
                    <button
                      onClick={handleSaveProduct}
                      className={`w-4/12 py-2 px-4 bg-white text-sm border border-black rounded-xl text-black hover:bg-green-500 hover:border-white hover:text-white button ${editingIndex === null ? 'hidden' : ''}`}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleAddProduct}
                      className={`w-4/12 py-2 px-4 bg-white text-sm border border-black rounded-xl text-black hover:bg-green-500 hover:border-white hover:text-white button ${editingIndex !== null ? 'hidden' : ''}`}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
