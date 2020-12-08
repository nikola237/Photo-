import React, { useState, useEffect } from 'react';
//api
import api from '../../api/api';

export default function Download(pathShort, filename) {
  const [name, setName] = useState(null);
  const getActiveProjects = async () => {
    const response = await api.get('/projects');
    console.log(response, 'ovo je response');

    setName({ type: 'PROJECTS', payload: response.data.rows });
  };
  console.log(name, 'iz downloada');

  useEffect(() => {
    getActiveProjects();
  }, []);
  return <div></div>;
}

// const novi = active.map((el) => Object.assign({ ...el, checked: false }));
// setName(novi);
