import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './Home.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import faTrashCan if you prefer a trash icon for delete
import { faPlus, faSquarePen, faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons'; // Added faTrashCan

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
          throw new Error("VITE_API_URL is not defined in your environment.");
        }
        const baseUrl = apiUrl.startsWith('http://') || apiUrl.startsWith('https://') ? apiUrl : `http://${apiUrl}`;

        const response = await axios.get(`${baseUrl}/crud`);

        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array means this runs once on mount

  // --- New function to handle task deletion ---
  const handleDeleteTask = async (taskId) => {
    // Optional: Ask for confirmation before deleting
    // if (!window.confirm(`Are you sure you want to delete task ${taskId}?`)) {
    //   return; // Stop if user cancels
    // }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        throw new Error("VITE_API_URL is not defined in your environment.");
      }
      const baseUrl = apiUrl.startsWith('http://') || apiUrl.startsWith('https://') ? apiUrl : `http://${apiUrl}`;

      // Send DELETE request to the backend
      const response = await axios.delete(`${baseUrl}/crud/${taskId}`);

      // Check if deletion was successful (backend might return status 200, 204, etc.)
      if (response.status === 200 || response.status === 204) {
        console.log(`Task with ID ${taskId} deleted successfully.`);

        // --- Optimistically update the UI: remove the deleted task from state ---
        setTasks(tasks.filter(task => task.id !== taskId));

      } else {
        // Handle cases where the DELETE request was successful but maybe the backend indicated an issue
        console.error(`Deletion of task ${taskId} failed, but request was received.`, response);
        // You might want to re-fetch tasks here or show an error message
      }

    } catch (error) {
      console.error(`Error deleting task ${taskId}:`, error);
      // Handle error (e.g., show an error message to the user)
      setError(new Error(`Failed to delete task ${taskId}.`)); // Set error state for display
    }
  };


  if (loading) {
    return <div className='hom'>Loading tasks...</div>;
  }

  if (error) {
    return <div className='hom' style={{ color: 'red' }}>Error loading tasks: {error.message}</div>;
  }


  return (
    <div className='hom'>
      <div className='home_contener'>
        <div className='add_butun'>
          <Link to='/addtask'>
            Add <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
        <div className='tasklist'>
          {tasks.map((task) => (
            <div className='eachtask' key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <h6>Deadline: {task.deadline ? new Date(task.deadline).toDateString() : 'No deadline'}</h6>
              <span>
                <Link to={`/update/${task.id}`}>
                  <FontAwesomeIcon icon={faSquarePen} /> Update
                </Link>
                {/* --- Changed Link to a button for the delete action --- */}
                {/* --- Added onClick handler to call handleDeleteTask --- */}
                <button
                  className="delete-button" // Add a class for specific styling
                  onClick={() => handleDeleteTask(task.id)} // Call handler with task.id
                >
                  <FontAwesomeIcon icon={faCircleCheck} /> done {/* Changed icon to trash */}
                   {/* Or keep faCircleCheck if you prefer: <FontAwesomeIcon icon={faCircleCheck} /> Done */}
                </button>
              </span>
            </div>
          ))}
          {tasks.length === 0 && !loading && !error && <p>No tasks found. Click "Add" to create one!</p>}
        </div>
      </div>
    </div>
  );
}

export default Home;