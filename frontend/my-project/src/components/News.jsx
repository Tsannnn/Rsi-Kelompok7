import React, { useEffect, useState } from 'react';
import '../index.css';
import PopUpNews from '../layout/PopUpNews';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken, getRoleId } from '../../../api/services/auth';
import banner from '../images/campus.jpg'

const News = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newsToEdit, setNewsToEdit] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newNews, setNewNews] = useState({ headline: '', content: '' });
  const [userRole, setUserRole] = useState(null);
  const fetchFAQs = async () => {
    const token = getToken();
    const role = getRoleId();
    setUserRole(role);
    if (!token || !role) {
      navigate('/signin');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/future-path/user/berita', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const fetchedNews = response.data.data;
      setNews(fetchedNews);
      localStorage.setItem('news', JSON.stringify(fetchedNews));
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      const localNews = localStorage.getItem('news');
      if (localNews) {
        setNews(JSON.parse(localNews));
      }
    }
  };



  const confirmDelete = async () => {
    if (newsToDelete) {
      try {
        const token = getToken();
        await axios.delete(`http://localhost:8080/future-path/admin/delete-berita/${newsToDelete.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setNews(news.filter((news) => news.id !== newsToDelete.id));
        // Update localStorage setelah menghapus FAQ
        localStorage.setItem('news', JSON.stringify(news.filter((news) => news.id !== newsToDelete.id)));
      } catch (error) {
        console.error("Error deleting FAQ:", error);
      }
    }
    closeDeletePopup();
  };

  const confirmEdit = async (headline, content) => {
    if (newsToEdit) {
      try {
        const token = getToken();
        await axios.patch(`http://localhost:8080/future-path/admin/update-berita/${newsToEdit.id}`,
          {
            judul_berita: headline,
            isi_berita: content
          }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const updatedNews = news.map((news) =>
          news.id === newsToEdit.id ? { ...news, judul_berita: headline, isi_berita: content } : news
        );
        setNews(updatedNews);
        // Update localStorage setelah mengedit FAQ
        localStorage.setItem('news', JSON.stringify(updatedNews));
      } catch (error) {
        console.error("Error updating FAQ:", error);
      }
    }
    closeEditPopup();
  };

  const confirmCreate = async (headline, content) => {
    try {
      const token = getToken();
      const response = await axios.post('http://localhost:8080/future-path/admin/create-berita', { judul_berita: headline, isi_berita: content }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const newNewsData = { ...response.data.data, id: response.data.data.id_berita };
      const updatedNews = [...news, newNewsData];
      setNews(updatedNews);
      // Update localStorage setelah menambahkan FAQ
      localStorage.setItem('news', JSON.stringify(updatedNews));
    } catch (error) {
      console.error("Error creating FAQ:", error);
    }
    closeCreatePopup();
  };

  const openDeletePopup = (news) => {
    setNewsToDelete(news);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setNewsToDelete(null);
  };

  const openEditPopup = (news) => {
    setNewsToEdit(news);
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
    setNewsToEdit(null);
  };

  const openCreatePopup = () => {
    setNewNews({ headline: '', content: '' });
    setShowCreatePopup(true);
  };

  const closeCreatePopup = () => {
    setShowCreatePopup(false);
  };

  useEffect(() => {
    // Ambil data dari localStorage saat komponen dimuat
    const localNews = localStorage.getItem('news');
    if (localNews) {
      setNews(JSON.parse(localNews));
    }
    fetchFAQs();
  }, []);

  return (
    <div>
      {/* Banner */}
      <div className="relative text-center text-white shadow-md">
        <img alt="University campus with buildings and trees" src={banner} className="w-full bg-bla h-96 object-cover" />
        <div className="absolute ml-5  transform bottom-10 text-left">
          <h1 className="text-6xl">News</h1>
          <p className="text-xl">Explore the latest news, events, from top universities and schools.</p>
        </div>
      </div>

      {/* Add News button */}
      {userRole == 1 && (
        <div className="flex items-center justify-center my-10 bg-[#fffafa] text-black max-w-2xl mx-auto p-4 rounded-lg border border-black cursor-pointer hover:bg-[#066699] hover:text-white transition-transform transform hover:-translate-y-1" onClick={openCreatePopup}>
          <i className="fas fa-plus-circle mr-2"></i>
          Add News
        </div>
      )}

      {/* Berita Real */}
      <div className="max-w-2xl mx-auto p-4">
        {news.map((news) => (
          <div key={news.id} className="flex items-start mb-6 border-b pb-4">
            <div className="flex-grow">
              <h2 className="text-xl font-bold">{news.judul_berita}</h2>
              <p className="text-gray-700">{news.isi_berita}</p>
              <button className="mt-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Read More</button>
            </div>
            <div className="flex flex-col items-center ml- 4">
              {userRole == 1 && (
                <div onClick={() => openEditPopup(news)} className="bg-gray-200 p-2 rounded-full mb-2 cursor-pointer hover:bg-yellow-200">
                  <FaPencilAlt />
                </div>
              )}
              {userRole == 1 && (
                <div onClick={() => openDeletePopup(news)} className="bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-red-300">
                  <FaTrash />
                </div>
              )}
            </div>
          </div>
        ))}

        {showDeletePopup && (
          <PopUpNews
            openPopUp={showDeletePopup}
            closePopUp={closeDeletePopup}
            title="Confirm Deletion"
            message={`Are you sure you want to delete FAQ: "${newsToDelete.judul_berita}"?`}
            onConfirm={confirmDelete}
            styleType="delete"
          />
        )}
        {showEditPopup && (
          <PopUpNews
            openPopUp={showEditPopup}
            closePopUp={closeEditPopup}
            title="Update FAQ"
            message={`Update the details for FAQ: "${newsToEdit.judul_berita}"`}
            onConfirm={confirmEdit}
            initialHeadline={newsToEdit.judul_berita}
            initialContent={newsToEdit.isi_berita}
            styleType="update"
          />
        )}
        {showCreatePopup && (
          <PopUpNews
            openPopUp={showCreatePopup}
            closePopUp={closeCreatePopup}
            title="Create New News"
            message="Fill in the details for the new News."
            onConfirm={confirmCreate}
            initialHeadline={newNews.headline}
            initialContent={newNews.content}
            styleType="create"
          />
        )}
      </div>
    </div>
  );
};

export default News;