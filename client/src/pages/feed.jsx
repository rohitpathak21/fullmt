import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

// Set up Axios instance with credentials globally (optional)
axios.defaults.withCredentials = true;

const Feed = () => {
  const { getRole } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = getRole();
        const url = role === 'student'
          ? 'http://localhost:8800/api/teacher/teachers'
          : 'http://localhost:8800/api/teacher/users';

        // Fetch data with credentials
        const response = await axios.get(url, { withCredentials: true });

        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [getRole]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {data.length > 0 ? (
        data.map((item, index) => (
          <Card key={index} item={item} role={getRole()} />
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

const Card = ({ item, role }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-xl font-bold">{item.fullname}</h2>
      <p>Age: {item.age}</p>
      <p>Gender: {item.gender}</p>
      {role === 'student' ? (
        <>
          <p>Qualification: {item.qualification}</p>
          <p>Subject: {item.subject}</p>
        </>
      ) : (
        <>
          <p>Class: {item.class}</p>
          <p>School: {item.school}</p>
          <p>Preference: {item.preference}</p>
        </>
      )}
      <p>Area: {item.area}</p>
      <p>City: {item.city}</p>
    </div>
  );
};

export default Feed;
