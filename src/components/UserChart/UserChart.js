import React, { useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import GetAppIcon from '@material-ui/icons/GetApp';
import ImageIcon from '@material-ui/icons/Image';


function UserChart({ data, startDate, endDate }) {
  const [dataUsr, setDataUsr] = useState({});
  const [csvCount, setCsvCount] = useState({});

  const optionsUsers = {
    scales: {
      yAxes: [
        {
          gridLines: {
            color: '#ffff',
          },
          ticks: {
            fontColor: '#ffff',
            fontSize: 20,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: '#ffff',
          },
          ticks: {
            fontColor: '#ffff',
            stepSize: 1,
            beginAtZero: true,
          },
        },
      ],
    },
    title: {
      display: true,
      fontColor: 'white',
      text: 'Korisnici',
      fontSize: 20,
    },

    legend: {
      display: false,
      labels: {
        fontColor: '#ffff',
        fontSize: 20,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      titleFontSize: 20,
      bodyFontSize: 20,
    },
  };

  let dataUsers = {
    labels: [],
    datasets: [
      {
        hoverBackgroundColor: '#959799',
        hoverBorderColor: '#959799',
        data: [],
        backgroundColor: [],
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    if (data.length > 0) {
      var count = {};
      data.forEach((item) => {
        count[item.username] = item.statsCount
      });

      var colors = [];
      var borderColors = [];
      for (let prop in count) {
          colors.push(random_rgba());
          borderColors.push(colors[colors.length - 1].replace('0.3', '1'));
      }

      dataUsers.datasets[0].backgroundColor = colors;
      dataUsers.labels.push(...Object.keys(count));
      dataUsers.datasets[0].data = Object.values(count);
      dataUsers.datasets[0].borderColor = borderColors;

      setDataUsr(dataUsers);
      setCsvCount(count);
    }
  }, [data]);
  
  function random_rgba() {

    return (
      "hsla(" + Math.random() * 360 + ", 100%, 75%, 0.7)"
    );
  }
  function downloadChart() {
    const linkSource = document.getElementById('test').toDataURL('image/jpg');
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = 'Korisnici' + '.png';
    downloadLink.click();
  }

  function downloadCsv() {
    var dwCsv = JSON.stringify(csvCount)
      .replaceAll('"', '')
      .replace('{', '')
      .replace('}', '')
      .replaceAll(',', '\n')
      .replaceAll(':', ',');

    var csv =
      'sep=,\n Datum Pocetka, Datum Zavrsetka\n' +
      startDate +
      ',' +
      endDate +
      '\n\n Korisnicko Ime, Broj Preuzimanja\n' +
      dwCsv;

    var encodedUri = encodeURI(csv);
    var link = document.createElement('a');
    link.setAttribute(
      'href',
      'data:text/csv;charset=utf-8,\uFEFF' + encodedUri
    );
    link.setAttribute('download', 'Korisnici.csv');
    link.click();
  }
  return (
    <>
      <button className="downloadButton" onClick={downloadChart}>
        <ImageIcon />
      </button>
      <button className="downloadButton_csv" onClick={downloadCsv}>
        <GetAppIcon />
      </button>
      <HorizontalBar
        id="test"
        data={dataUsr}
        options={optionsUsers}
      />
    </>
  );
}

export default UserChart;
