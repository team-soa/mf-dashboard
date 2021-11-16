import { Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import Artista from '../clases/artista';
import Cancion from '../clases/cancion';
import Palabras from '../clases/palabras';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  public colors = ['#FEBE0B', '#FB5708', '#1AD39F', '#FE006F', '#A30057', '#FF3233'];

  public artistsData: Artista[] = [
    {
      "_id": '',
      "nombre":"ed Sheeran",
      "reproducciones": 34
    },
    {
      "_id": '',
      "nombre":"shakira",
      "reproducciones": 84
    },
  ];
  public songsData: Cancion[] = [
    {
      _id: '',
      nombre: 'Lover',
      reproducciones: 30
    },
    {
      _id: '',
      nombre: 'Ronan',
      reproducciones: 27
    },
    {
      _id: '',
      nombre: 'Reputation',
      reproducciones: 29
    },
    {
      _id: '',
      nombre: 'All too well',
      reproducciones: 45
    },
  ];
  public wordsData: Palabras[] = [
    {
      _id: '',
      palabra: "round",
      presicion: 60
    },
    {
      _id: '',
      palabra: "ever",
      presicion: 50
    },
    {
      _id: '',
      palabra: "mind",
      presicion: 90
    },
    {
      _id: '',
      palabra: "crazy",
      presicion: 80
    },
    {
      _id: '',
      palabra: "soul",
      presicion: 60
    },
    {
      _id: '',
      palabra: "happen",
      presicion: 20
    },
  ];

  constructor() { }

  getArtistsReady() {
    let labels: (string | undefined)[] = [];
    let tmpValues: (number | null | undefined | number[])[] = [];
    let values: typeof tmpValues[] = [];
    this.artistsData.forEach(artista => {
      tmpValues.push(artista.reproducciones)

      if (tmpValues.length >= 5) {
        values.push(tmpValues);
        tmpValues = [];
      }
      labels.push(artista.nombre);
    })
    values.push(tmpValues);

    console.log(values);
    return { "labels": labels, "values": values };
  }

  getSongsReady() {
    let labels: (string | undefined)[] = [];
    let chartData: (number | null | undefined | number[])[] = [];
    let randomColor = '';
    this.songsData.forEach(song => {
      labels.push(song.nombre);
      chartData.push(song.reproducciones);
    })
    let tmp: ChartDataSets[] = [];
    randomColor =  this.colors[Math.floor(Math.random() * 3)];
    tmp.push({ data: chartData, label: "Reproducciones", backgroundColor: randomColor, hoverBackgroundColor : '#0EA900' });
    let result = { labels: labels, values: tmp };     
    return result;
  }

  getWordsReady() {
    let labels: (string | undefined)[] = [];
    let values: (number | null | undefined | number[])[] = [];

    this.wordsData.forEach(lyric => {
      labels.push(lyric.palabra);
      values.push(lyric.presicion);
    })

    let result = { labels: labels, values: values };
    return result;
  }

}
