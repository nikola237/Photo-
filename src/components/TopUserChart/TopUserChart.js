import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ImageIcon from '@material-ui/icons/Image';

function TopUserChart({ data }) {
  const [dataUsr, setDataUsr] = useState({});

  const optionsUsers = {
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
    title: {
      display: true,
      fontColor: 'white',
      text: 'Top 5 Korisnika',
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
        borderColor: [],
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    if (data.length > 0) {
      var count = {};
      var countTop = {};
      var countProjects = {};
      data.forEach((item) => {
      if(item.user != null){
        if (count[item.user.username]) {
          count[item.user.username] += 1;
          return;
        }
        count[item.user.username] = 1;
      }
      // }else{
      //   alert('Greska: postoji null korisnik')
      // }
      });

      data.forEach((item) => {
        if (countProjects[item.project.projectname]) {
          countProjects[item.project.projectname] += 1;
          return;
        }
        countProjects[item.project.projectname] = 1;
      });
      for (let index = 0; index < 5; index++) {
        if (Object.keys(count).length > 0) {
          var user = Object.keys(count).reduce((a, b) =>
            count[a] > count[b] ? a : b
          );
          countTop[user] = count[user];
          delete count[user];
        }
      }

      var colors = [];
      var borderColors = [];
      for (let prop in countTop) {
        // if (countTop[prop] >= 2) {
          colors.push(random_rgba());
          borderColors.push(colors[colors.length - 1].replace('0.3', '1'));
        // }
      }

      dataUsers.datasets[0].backgroundColor = colors;
      dataUsers.labels.push(...Object.keys(countTop));
      dataUsers.datasets[0].data = Object.values(countTop);
      dataUsers.datasets[0].borderColor = borderColors;

      setDataUsr(dataUsers);
    }
  }, [data]);

  function random_rgba() {
    // var o = Math.round,
    //   r = Math.random,
    //   s = 255;
    return (
      "hsla(" + Math.random() * 360 + ", 100%, 75%,0.7)"
      // 'rgba(' + r() * s + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.7 + ')'
    );
  }
  function downloadChart() {
    const linkSource = document.getElementById('test').toDataURL('image/jpg');
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = linkSource;
    downloadLink.target = '_self';
    downloadLink.download = 'test' + '.png';
    downloadLink.click();
  }

  return (
    <>
      <button className="downloadButton" onClick={downloadChart}>
        <ImageIcon />
      </button>
      <Bar
        id="test"
        data={dataUsr}
        options={optionsUsers}
      />
    </>
  );
}

export default TopUserChart;
