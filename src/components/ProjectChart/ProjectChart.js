import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import GetAppIcon from '@material-ui/icons/GetApp';
import ImageIcon from '@material-ui/icons/Image';

function ProjectChart({ data, startDate, endDate }) {
  const [dataProj, setDataProj] = useState({});
  const [csvCount, setCsvCount] = useState({});
  const optionsProject = {
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      titleFontSize: 20,
      bodyFontSize: 20,
    },
    legend: {
      display: false,
      labels: {
        fontColor: '#ffff',
        fontSize: 25,
      },
    },
    title: {
      display: true,
      fontColor: 'white',
      text: 'Projekti',
      fontSize: 20,
    },
    scales: {
      xAxes: [
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
      yAxes: [
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
  };
  let dataProject = {
    labels: [],
    datasets: [
      {
        hoverBackgroundColor: '#959799',
        hoverBorderColor: '#959799',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    if (data.length > 0) {
      var countProjects = {};
      data.forEach((item) => {
        // if (item.isactive) {
          countProjects[item.projectname] = item.statsCount
        // }
      });

      var colorsProjects = [];
      var borderColorsProject = [];
      for (let prop in countProjects) {
          colorsProjects.push(random_rgba());
          borderColorsProject.push(
            colorsProjects[colorsProjects.length - 1].replace('0.3', '1')
          );
      }

      dataProject.labels.push(...Object.keys(countProjects));
      dataProject.datasets[0].data = Object.values(countProjects);
      dataProject.datasets[0].backgroundColor = colorsProjects;
      dataProject.datasets[0].borderColor = borderColorsProject;

      setDataProj(dataProject);
      setCsvCount(countProjects);
    }
  }, [data]);

  function random_rgba() {
 
    return (
      "hsla(" + Math.random() * 360 + ", 100%, 75%,0.7)"
    );
  }
  
  function downloadChart() {
    const linkSource = document.getElementById('bar').toDataURL('image/jpg');
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = 'Projekti' + '.png';
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
      '\n\n Naziv Projekta, Broj Preuzimanja\n' +
      dwCsv;

    var encodedUri = encodeURI(csv);
    var link = document.createElement('a');
    link.setAttribute(
      'href',
      'data:text/csv;charset=utf-8,\uFEFF' + encodedUri
    );
    link.setAttribute('download', 'Projekti.csv');
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
      <Bar
        data={dataProj}
        options={optionsProject}
        id="bar"
      />
    </>
  );
}

export default ProjectChart;
