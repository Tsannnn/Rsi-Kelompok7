import { Link } from 'react-router-dom';
import PopUpList from '../layout/PopUpList';
import banner from '../images/campus.jpg';
import PopUpCategory from '../layout/PopUpCategory';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken, getRoleId } from '../../../api/services/auth';




const List = () => {
  ;
  const [isPopUpListOpen, setIsPopUpListOpen] = useState(false);
  const [dataSekolah, setDataSekolah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);


  useEffect(() => {
    const handleAddSchool = async () => {
      const token = getToken();
      const role = getRoleId();
      setUserRole(role);
      if (!token || !role) {
        navigate('/signin');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/future-path/user/list-sekolah`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setDataSekolah(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    handleAddSchool();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


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

        {dataSekolah.map((sekolah) => (
          <li key={sekolah.id_sekolah} className=' justify-center border m-5 px-3 rounded-xl shadow-md'>
            <h2 className='m-1 text-xl font-semibold'>{sekolah.nama_sekolah}</h2>
            {/* {sekolah.image && <img src={sekolah.image}
              alt={sekolah.nama_sekolah}
              style={{ width: '200px', height: '200px', borderRadius: 20, padding: 5 }} />} */}
            <p className='m-2'>{sekolah.alamat_sekolah}</p>
            <button className='border m-2 rounded-xl bg-sky-500'>
              <Link to={`/schoolDetail/${sekolah.id_sekolah}`} className='m-2'>Read More</Link>
            </button>
          </li>
        ))
        }
      </ul>
    </div>
  );
};

export default List;