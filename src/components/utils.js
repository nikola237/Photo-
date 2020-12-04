import api from '../api/api';

export const handleDownloadItem = async (pathShort, filename) => {
  //   console.log('usao u download');
  console.log('usao u download');
  const response = await api.get(`/items/download/${pathShort}`, {
    responseType: 'blob',
  });
  const data = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');

  link.href = data;
  link.setAttribute('download', `${filename}`);

  link.click();
  link.remove();
};

export const removeItem = (id) => {
  console.log('usao');
};
