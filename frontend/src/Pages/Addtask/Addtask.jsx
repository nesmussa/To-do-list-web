import React, { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Addtask.css';

function Addtask() {
  // State to manage form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '', // Assuming deadline is stored as a string like "YYYY-MM-DD"
  });

  // Hook for navigation (e.g., redirecting after creation)
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (Add action)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission and page reload

    console.log('Submitting new task:', formData);

    try {
      // Get the API URL from environment variables
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
           throw new Error("VITE_API_URL is not defined in your environment.");
      }
      const baseUrl = apiUrl.startsWith('http://') || apiUrl.startsWith('https://') ? apiUrl : `http://${apiUrl}`;


      // Use axios.post to send the new task data
      const response = await axios.post(`${baseUrl}/crud`, formData); // Use axios.post

      const result = response.data; // axios puts the response body in .data
      console.log('Task added successfully:', result);

      // Redirect the user back to the home page after successful creation
      navigate('/'); // Navigate to the home route

    } catch (error) {
      console.error('Error adding task:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };


  return (
    <div className='addtask'>
      <div className='addtask_contener'>
        {/* Add onSubmit handler to the form */}
        <form onSubmit={handleSubmit}>
          <h2>Add new Task</h2>

          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title} // Bind value to state
            onChange={handleInputChange} // Handle changes
            required // Make title required
          />

          <label htmlFor='description'>Description:</label>
          <textarea
            id='description'
            name='description'
            rows={4}
            value={formData.description} // Bind value to state
            onChange={handleInputChange} // Handle changes
          ></textarea>

          <label htmlFor='deadline'>Deadline:</label>
          <input
            type='date'
            id='deadline'
            name='deadline'
            value={formData.deadline} // Bind value to state
            onChange={handleInputChange} // Handle changes
          />

          <button type='submit'>
            Add Task <FontAwesomeIcon icon={faPlus} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addtask;