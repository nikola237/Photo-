import React, { useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import ImageIcon from '@material-ui/icons/Image';

function TopProjectChart(props) {
  const [dataProj, setDataProj] = useState([]);
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
      text: 'Top 5 Projekata',
      fontSize: 20,
    },
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
    if (props.data.length > 0) {
      var countProjects = {};
      var countTopProjects = {};

      props.data.forEach((item) => {
        if (countProjects[item.project.projectname]) {
          countProjects[item.project.projectname] += 1;
          return;
        }
        countProjects[item.project.projectname] = 1;
      });

      for (let index = 0; index < 5; index++) {
        if (Object.keys(countProjects).length > 0) {
          var project = Object.keys(countProjects).reduce((a, b) =>
            countProjects[a] > countProjects[b] ? a : b
          );
          countTopProjects[project] = countProjects[project];
          console.log(countTopProjects);
          delete countProjects[project];
        }
      }

      var colorsProjects = [];
      var borderColorsProject = [];
      for (let prop in countTopProjects) {
        if (countTopProjects[prop] >= 2) {
          colorsProjects.push(random_rgba());
          borderColorsProject.push(
            colorsProjects[colorsProjects.length - 1].replace('0.3', '1')
          );
        }
      }

      dataProject.labels.push(...Object.keys(countTopProjects));
      dataProject.datasets[0].data = Object.values(countTopProjects);
      dataProject.datasets[0].backgroundColor = colorsProjects;
      dataProject.datasets[0].borderColor = borderColorsProject;

      setDataProj(dataProject);
    }
  }, [props.data]);

  function random_rgba() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      'rgba(' + r() * s + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.7 + ')'
    );
  }
  function downloadChart() {
    const linkSource = document.getElementById('bar').toDataURL('image/jpg');
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = 'bar' + '.png';
    downloadLink.click();
  }

  return (
    <>
      <button className="downloadButton" onClick={downloadChart}>
        <ImageIcon />
      </button>
      <HorizontalBar
        width="600"
        height="250"
        data={dataProj}
        options={optionsProject}
        id="bar"
      />
    </>
  );
}

export default TopProjectChart;
