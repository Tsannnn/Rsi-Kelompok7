import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PopUpList from '../layout/PopUpList';
import PopUpCategory from '../layout/PopUpCategory';
import banner from '../images/campus.jpg';



const Swasta = () => {
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
    setIsPopUpListOpen(false);
  };


  return (
    <div>
      <div className="relative text-center text-white shadow-md">
        <img alt="University campus with buildings and trees" src={banner} className="w-full bg-bla h-96 object-cover" />
        <div className="absolute ml-5  transform bottom-10 text-left">
          <h1 className="text-6xl">Pilihan</h1>
          <p className="text-xl">Temukan sekolah atau universitas favoritmu, dan temukan informasi lengkapnya!</p>
        </div>
      </div>

      <button onClick={() => setIsPopUpListOpen(true)} className='border rounded-xl p-2 m-5'>Tambah Sekolah</button>
      <PopUpList
        openPopUpList={isPopUpListOpen}
        closePopUpList={() => setIsPopUpListOpen(false)}
        title="Tambah Sekolah"
        message="Silakan masukkan informasi sekolah baru."
        onConfirm={handleAddSchool}
        styleType="create"
      />
      <div className='flex justify-end'>
        <div class="w-56 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            Negeri/Swasta
          </label>
          <div class="relative">
            <PopUpCategory />
          </div>
        </div>

      </div>
      <ul className='flex m-3 w-[1500px]'>

        {schools.map(school => (
          <li key={school.id} className=' justify-center border m-5 px-3 rounded-xl shadow-md'>
            <h2 className='m-1 text-xl font-semibold'>{school.name}</h2>
            {school.image && <img src={school.image} alt={school.name} style={{ width: '200px', height: '200px', borderRadius: 20, padding: 5 }} />}
            <p className='m-2'>{school.address}</p>
            <button className='border m-2 rounded-xl bg-sky-500'>
              <Link to={`/schoolDetail/${school.id}`} className='m-2'>Read More</Link>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Swasta;