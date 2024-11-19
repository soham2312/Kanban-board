import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from './components/Header';
import Dashboard from './components/KanbanBoard';
import './App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);


  const [selectedGrouping, setSelectedGrouping] = useState(
    localStorage.getItem('selectedGrouping') || 'status'
  );
  const [selectedOrdering, setSelectedOrdering] = useState(
    localStorage.getItem('selectedOrdering') || 'users'
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  async function fetchApi() {
    await axios
      .get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => {
    fetchApi();
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedGrouping', selectedGrouping);
  }, [selectedGrouping]);

  useEffect(() => {
    localStorage.setItem('selectedOrdering', selectedOrdering);
  }, [selectedOrdering]);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        <Navbar
          selectedGrouping={selectedGrouping}
          setSelectedGrouping={setSelectedGrouping}
          selectedOrdering={selectedOrdering}
          setSelectedOrdering={setSelectedOrdering}
          users={users}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          dropdownRef={dropdownRef}
        />
        <Dashboard
          users={users}
          tickets={tickets}
          selectedGrouping={selectedGrouping}
          selectedOrdering={selectedOrdering}
        />
      </div>
    </div>
  );
}

export default App;
