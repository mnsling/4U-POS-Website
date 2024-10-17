import React, { useState, useEffect } from 'react';
import bg from '../assets/bg.jpg';
import Sidebar from '../components/sidebar';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';
import axios from 'axios';

const suppliers = () => {

  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState({
    supplierId: '',
    supplierName: '',
    cellphoneNumber: '',
    telephoneNumber: '',
    email: '',
    pointPerson: '',
  });

  useEffect(() => {``
    fetchSuppliers();
  }, []);

  const [showConfirmButton, setShowConfirmButton] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSupplier(prevSupplier => {
      const updatedSupplier = {
        ...prevSupplier,
        [name]: value,
      };
      // Log updated product here
      console.log('Updated supplier:', updatedSupplier);
      return updatedSupplier;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/supplier/', {
      supplierName: supplier.supplierName,
      cellphoneNumber: supplier.cellphoneNumber,
      telephoneNumber: supplier.telephoneNumber,
      email: supplier.email,
      pointPerson: supplier.pointPerson,
    })
      .then(response => {
        console.log('Supplier created:', response.data);
        setSupplier({
            supplierId: '',
            supplierName: '',
            cellphoneNumber: '',
            telephoneNumber: '',
            email: '',
            pointPerson: '',
        })
        fetchSuppliers();
      })
      .catch(error => {
        console.error('Error creating supplier:', error.response.data);
      });
  };

  const handleDelete = (supplierId) => {
    axios.delete(`http://127.0.0.1:8000/supplier/${supplierId}/`)
      .then(response => {
        console.log('Supplier deleted:', response.data);
        fetchSuppliers();
      })
      .catch(error => {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
      });
  };

  const [upSupplierId, setUpSupplierId] = useState([]);

  const handleUpdatePass = (upSupplier) => {
    setSupplier({
        supplierName: upSupplier.supplierName,
        cellphoneNumber: upSupplier.cellphoneNumber,
        telephoneNumber: upSupplier.telephoneNumber,
        email: upSupplier.email,
        pointPerson: upSupplier.pointPerson,
    })
    setUpSupplierId(upSupplier.id)
    setShowConfirmButton(false)
    console.log(supplier)
    console.log(upSupplierId)
  };

  const handleUpdate = () => {
    // Send POST request
    axios.put(`http://127.0.0.1:8000/supplier/${upSupplierId}/`, {
      supplierName: supplier.supplierName,
      cellphoneNumber: supplier.cellphoneNumber,
      telephoneNumber: supplier.telephoneNumber,
      email: supplier.email,
      pointPerson: supplier.pointPerson,
    })
      .then(response => {
        console.log('Supplier created:', response.data);
        setSupplier({
            supplierId: '',
            supplierName: '',
            cellphoneNumber: '',
            telephoneNumber: '',
            email: '',
            pointPerson: '',
        })
        setShowConfirmButton(true)
        setUpSupplierId();
        fetchSuppliers();
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  const fetchSuppliers = () => {
    axios.get('http://127.0.0.1:8000/supplier/')
      .then(response => {
        setSuppliers(response.data);
        console.log(response.data); // Log the updated product list
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Suppliers</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-end'>
            <input
              type="text"
              className='bg-white px-[1vw] py-[0.8vh] text-darkp text-[0.8vw] font-light outline-none w-4/12 rounded-xl border border-darkp placeholder:text-darkp2'
              placeholder="search for supplier"
            />
          </div>
          <div className='w-full h-[52vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[16%] text-[0.7vw] leading-tight text-center'>Name</h1>
              <h1 className='w-[16%] text-[0.7vw] leading-tight text-center'>Cellphone #</h1>
              <h1 className='w-[16%] text-[0.7vw] text-center'>Telephone #</h1>
              <h1 className='w-[16%] text-[0.7vw] leading-tight text-center'>Email</h1>
              <h1 className='w-[16%] text-[0.7vw] leading-tight text-center'>Point Person</h1>
              <h1 className='w-[16%] text-[0.7vw] leading-tight text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              <div className='h-[9%] flex flex-col items-center justify-between'>
              {suppliers.map(supplier => {
                  return (
                    <div key={supplier.id} className='w-full border-b border-darkp text-darkp text-center flex items-center justify-between px-10 py-2'>
                      <h1 className='w-[16%] text-[0.8vw]'>{supplier.supplierName}</h1>
                      <h1 className='w-[16%] text-[0.8vw]'>{supplier.cellphoneNumber}</h1>
                      <h1 className='w-[16%] text-[0.8vw]'>{supplier.telephoneNumber}</h1>
                      <h1 className='w-[16%] text-[0.8vw]'>{supplier.email}</h1>
                      <h1 className='w-[16%] text-[0.8vw]'>{supplier.pointPerson}</h1>
                      <h1 className='w-[16%] flex gap-[1vw] justify-center'>
                        <button onClick={() => handleUpdatePass(supplier)}><img src={edit} alt="Edit" className='w-[1.5vw]' /></button>
                        <button onClick={() => handleDelete(supplier.id)}><img src={del} alt="Delete" className='w-[1.5vw]' /></button>
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='w-full h-[22vh] bg-darkp opacity-80 flex items-center justify-center rounded-2xl px-[1vw] py-[1vh] drop-shadow'>
            <div className='h-fit flex gap-5 justify-between'>
              <div className='w-[25vw] flex flex-col gap-5'>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Supplier Name</label>
                  <input
                    type="text"
                    name="supplierName"
                    value={supplier.supplierName}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter supplier name*"
                  />
                </div>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Cellphone #</label>
                  <input
                    type="text"
                    name="cellphoneNumber"
                    value={supplier.cellphoneNumber}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter cellphone no.*"
                  />
                </div>
              </div>
              <div className='w-[25vw] flex flex-col gap-5'>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Telephone #</label>
                  <input
                    type="text"
                    name="telephoneNumber"
                    value={supplier.telephoneNumber}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter telephone no.*"
                  />
                </div>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={supplier.email}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter email address*"
                  />
                </div>
              </div>
              <div className='w-[25vw] flex flex-col justify-between'>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Point Person</label>
                  <input
                    type="text"
                    name="pointPerson"
                    value={supplier.pointPerson}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter point person*"
                  />
                </div>
                <div className='w-full flex items-end justify-end'>
                  {showConfirmButton ? (
                    <button onClick={handleSubmit} className='w-[48%] px-[1vw] py-[1vh] bg-white text-[0.7vw] border border-black rounded-xl text-black hover:bg-green-500 hover:border-white hover:text-white button'>
                      Confirm
                    </button>
                  ) : (
                    <button onClick={handleUpdate}
                      className='w-[48%] px-[1vw] py-[1vh] bg-white text-[1vw] border border-black rounded-xl text-black hover:bg-green-500 hover:border-white hover:text-white button'
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default suppliers;