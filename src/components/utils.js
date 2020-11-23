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

// const [file] = selectedFile;
// console.log(file, 'ovo je file');
// fd.append('item', file);
// fd.append('tags', 'usb, stick, proba');
// fd.append('title', 'TEST1');
// const response = await uploadApi.post('/item/add', fd, {
//   onUploadProgress: (ProgressEvent) => {
//     setProgress(
//       Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
//     );
//   },
// });

// console.log(fd, 'ovo je el');
// fd.append('item', el.item);
// fd.append('tags', el.tags);
// fd.append('title', el.title);
// console.log(fd[index], 'ovo je fd');
// const response = await uploadApi.post('/item/add', fd[index]);
// console.log(response, 'ovo je response!!!');
