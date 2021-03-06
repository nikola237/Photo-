import api from '../api/api';

export const handleDownloadItem = async (pathShort, filename, value) => {
  console.log('usao u download');

  const response = await api.get(`/items/download/${pathShort}/${value}`, {
    responseType: 'blob',
  });

  const data = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');

  link.href = data;
  link.setAttribute('download', `${filename}`);

  link.click();
  link.remove();
};
