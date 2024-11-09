import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaTrash, FaPencilAlt } from 'react-icons/fa';
import '../index.css';
import PopUp from '../layout/Popup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const FAQ = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [faqToEdit, setFaqToEdit] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    try {
      const response = await axios.get('http://localhost:8080/future-path/user/faq', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setFaqs(response.data.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };


  const confirmDelete = async () => {
    if (faqToDelete) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8080/future-path/admin/delete-faq/${faqToDelete.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFaqs(faqs.filter((faq) => faq.id !== faqToDelete.id));
      } catch (error) {
        console.error("Error deleting FAQ:", error);
      }
    }
    closeDeletePopup();
  };

  const confirmEdit = async (question, answer) => {
    if (faqToEdit) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Jika token tidak ada, arahkan ke halaman login
          navigate('/signin'); // Pastikan Anda mengimpor useNavigate dari react-router-dom
          return;
        }
        await axios.patch(`http://localhost:8080/future-path/admin/update-faq/${faqToEdit.id}`,
          { judul_faq: question, isi_faq: answer }, {
          headers: {
            'Authorization': `Bearer ${token}` // Sertakan token dalam header
          }
        }
        );
        setFaqs(faqs.map((faq) =>
          faq.id === faqToEdit.id ? { ...faq, judul_faq: question, isi_faq: answer } : faq
        ));
      } catch (error) {
        console.error("Error updating FAQ:", error);
      }
    }
    closeEditPopup();
  };

  const confirmCreate = async (question, answer) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/future-path/admin/create-faq', {
        judul_faq: question,
        isi_faq: answer
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.response;
      setFaqs([...faqs, { ...response.data.data, id: response.data.data.id_faq }]); // Sesuaikan dengan struktur data yang diterima
    } catch (error) {
      console.error("Error creating FAQ:", error);
    }
    closeCreatePopup();
  };

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const openDeletePopup = (faq) => {
    setFaqToDelete(faq);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setFaqToDelete(null);
  };

  const openEditPopup = (faq) => {
    setFaqToEdit(faq);
    setShowEditPopup(true);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
    setFaqToEdit(null);
  };


  const openCreatePopup = () => {
    setNewFaq({ question: '', answer: '' });
    setShowCreatePopup(true);
  };

  const closeCreatePopup = () => {
    setShowCreatePopup(false);
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 p-5">
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold text-sky-600">Frequently Asked Questions</h1>
        <button onClick={openCreatePopup} className="mt-10 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-500">
          Tambah FAQ
        </button>
      </div>

      {faqs.map((faq, index) => (
        <div key={faq.id} className="bg-white shadow-md rounded mb-2">
          <div
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleAnswer(index)}
          >
            <h2 className="text-lg font-semibold text-sky-600">{faq.judul_faq}</h2>
            <FaChevronDown className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} />
          </div>
          {activeIndex === index && (
            <div className="p-4 border-t border-gray-200">
              <p>{faq.isi_faq}</p>
              <div className="flex justify-end mt-2">
                <button onClick={() => openDeletePopup(faq)} className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-400">
                  <FaTrash />
                </button>
                <button onClick={() => openEditPopup(faq)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-400">
                  <FaPencilAlt />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {showDeletePopup && (
        <PopUp
          openPopUp={showDeletePopup}
          closePopUp={closeDeletePopup}
          title="Confirm Deletion"
          message={`Are you sure you want to delete FAQ: "${faqToDelete.judul_faq}"?`}
          onConfirm={confirmDelete}
          styleType="delete"
        />
      )}
      {showEditPopup && (
        <PopUp
          openPopUp={showEditPopup}
          closePopUp={closeEditPopup}
          title="Update FAQ"
          message={`Update the details for FAQ: "${faqToEdit.judul_faq}"`}
          onConfirm={confirmEdit}
          initialQuestion={faqToEdit.judul_faq}
          initialAnswer={faqToEdit.isi_faq}
          styleType="update"
        />
      )}
      {showCreatePopup && (
        <PopUp
          openPopUp={showCreatePopup}
          closePopUp={closeCreatePopup}
          title="Create New FAQ"
          message="Fill in the details for the new FAQ."
          onConfirm={confirmCreate}
          initialQuestion={newFaq.question}
          initialAnswer={newFaq.answer}
          styleType="create"
        />
      )}
    </div>
  );
};

export default FAQ;