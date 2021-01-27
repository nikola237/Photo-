import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

function UserDownloadTypesChart(props) {
  const [userDataPie, setUserDataPie] = useState([]);
  const optionsUserPie = {
    responsive: true,
    title: {
      display: true,
      text: 'Тип фајла',
      fontColor: 'white',
      fontSize: 20,
    },
    legend: {
      display: true,
      labels: {
        fontColor: '#ffff',
        fontSize: 20,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      titleFontSize: 20,
      bodyFontSize: 20,
    },
  };
  let userData = {
    labels: ['Слике', 'Видео', 'Аудио'],
    datasets: [
      {
        // label: 'Tip fajla',
        hoverBackgroundColor: '#959799',
        hoverBorderColor: '#959799',
        data: [],
        backgroundColor: [],
        borderWidth: 2,
      },
    ],
  };
  useEffect(() => {
    var count = {};
    props.rawDataUser.forEach((item) => {
      if (count[item.item.type]) {
        count[item.item.type] += 1;
        return;
      }
      count[item.item.type] = 1;
    });

    var colors = [];
    var borderColors = [];
    for (let prop in count) {
      if (count[prop] >= 2) {
        colors.push(random_rgba());
        borderColors.push(colors[colors.length - 1].replace('0.3', '1'));
      }
    }
    count = Object.keys(count)
      .sort()
      .reduce((r, k) => ((r[k] = count[k]), r), {});
    userData.datasets[0].backgroundColor = colors;
    userData.datasets[0].data = Object.values(count);
    userData.datasets[0].borderColor = borderColors;

    console.log(userData);
    setUserDataPie(userData);
  }, [props.rawDataUser]);
  function random_rgba() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      'rgba(' + r() * s + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.7 + ')'
    );
  }
  function downloadChart() {
    const linkSource = document
      .getElementById('doughnut')
      .toDataURL('image/jpg');
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = 'doughnut' + '.png';
    downloadLink.click();
  }
  return (
    <>
      <button onClick={downloadChart}>Преузми</button>
      <Doughnut
        data={userDataPie}
        responsive={true}
        options={optionsUserPie}
        id="doughnut"
      />
    </>
  );
}
export default UserDownloadTypesChart;
