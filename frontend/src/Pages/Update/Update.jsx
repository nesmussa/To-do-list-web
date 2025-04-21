import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './Update.css';

function Update() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
     const fetchTask = async () => {
       try {
         setLoading(true);
         const apiUrl = import.meta.env.VITE_API_URL;
         if (!apiUrl) {
              throw new Error("VITE_API_URL is not defined in your environment.");
         }
         const baseUrl = apiUrl.startsWith('http://') || apiUrl.startsWith('https://') ? apiUrl : `http://${apiUrl}`;

         const response = await axios.get(`${baseUrl}/crud/${taskId}`);
         const data = response.data;

         if (data.deadline) {
             data.deadline = data.deadline.split('T')[0];
         } else {
            data.deadline = '';
         }

         setTask(data);
         setLoading(false);

       } catch (error) {
         setError(error);
         setLoading(false);
         console.error('Error fetching task:', error);

         if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
             console.log(`Task with ID ${taskId} not found.`);
         }
       }
     };

     if (taskId) {
        fetchTask();
     } else {
         console.error("No Task ID provided for update.");
     }
   }, [taskId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Updating task:', task);

    try {
       const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
             throw new Error("VITE_API_URL is not defined in your environment.");
        }
       const baseUrl = apiUrl.startsWith('http://') || apiUrl.startsWith('https://') ? apiUrl : `http://${apiUrl}`;

       const response = await axios.patch(`${baseUrl}/crud/${taskId}`, task);

       const result = response.data;
       console.log('Task updated successfully:', result);

       navigate('/');

    } catch (error) {
       console.error('Error updating task:', error);
    }
  };

   if (loading) {
     return (
       <div className='update-task-page'>
         <div className='update-task-container'>Loading task...</div>
       </div>
     );
   }

   if (error) {
     return (
       <div className='update-task-page'>
         <div className='update-task-container' style={{ color: 'red' }}>
           Error loading task: {error.message}
         </div>
       </div>
     );
   }

  return (
     <div className='update-task-page'>
       <div className='update-task-container'>
         <form onSubmit={handleSubmit}>
           <h2>Update Task {taskId}</h2>

           <label htmlFor='update-title'>Title:</label>
           <input
             type='text'
             id='update-title'
             name='title'
             value={task.title}
             onChange={handleInputChange}
             required
           />

           <label htmlFor='update-description'>Description:</label>
           <textarea
             id='update-description'
             name='description'
             rows={4}
             value={task.description}
             onChange={handleInputChange}
           ></textarea>

           <label htmlFor='update-deadline'>Deadline:</label>
           <input
             type='date'
             id='update-deadline'
             name='deadline'
             value={task.deadline}
             onChange={handleInputChange}
           />

           <button type='submit'>
             Update Task <FontAwesomeIcon icon={faCircleCheck} />
           </button>
         </form>
       </div>
     </div>
   );
}

export default Update;