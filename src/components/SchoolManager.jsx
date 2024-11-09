// components/SchoolManager.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PopUpList from '../layout/PopUpList';


const SchoolManager = () => {
  const [schools, setSchools] = useState([]);
  const [isPopUpListOpen, setIsPopUpListOpen] = useState(false);

  const handleAddSchool = (name, address, fullInfo, image) => {
    const newSchool = {
      id: schools.length + 1,
      name,
      address,
      fullInfo,
      image,
    };
    setSchools([...schools, newSchool]);
    setIsPopUpListOpen(false); // Close PopUpList after adding
  };


  return (
    <div>
      <div className='flex justify-center'>
      <h1 className='text-sky-600 font-semibold m-10 text-5xl'>
        List
      </h1>
      </div>
      <button onClick={() => setIsPopUpListOpen(true)} className='border shadow-xl rounded-xl p-2 m-5'>Tambah Sekolah</button>
      <PopUpList
        openPopUpList={isPopUpListOpen}
        closePopUpList={() => setIsPopUpListOpen(false)}
        title="Tambah Sekolah"
        message="Silakan masukkan informasi sekolah baru."
        onConfirm={handleAddSchool}
        styleType="create"
      />
      <ul className='flex m-3 w-[1500px]'>
        {schools.map(school => (
          <li key={school.id} className=' justify-center border m-5 px-3 rounded-xl shadow-md'>
            <h2 className='m-1 text-xl font-semibold'>{school.name}</h2>
            {school.image && <img src={school.image} alt={school.name} style={{ width: '200px', height: '200px', borderRadius: 20, padding: 5 }} />}
            <p className='m-2'>{school.address}</p>
            <button className='border m-2 rounded-xl bg-sky-500'>
              <Link to={`/schoolDetail/${school.id}`} className='m-2'>Read More</Link>            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolManager;