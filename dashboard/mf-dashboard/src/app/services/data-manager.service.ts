import { Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Colors, Label, SingleDataSet } from 'ng2-charts';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import Artista from '../clases/artista';
import Cancion from '../clases/cancion';
import Palabras from '../clases/palabras';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  URL = "http://20.189.25.216:4005"
  constructor(private http: HttpClient, private cookieService: CookieService) {
  }
  public colors = ['#FEBE0B', '#FB5708', '#1AD39F', '#FE006F', '#A30057', '#FF3233'];

  public obtenerListaArtistas(): Observable<Artista[]>{
    let options = {
      headers: new HttpHeaders().set('Authorization', 'bearer ' + this.cookieService.get("token"))
    };
    return this.http.get<Artista[]>(this.URL + '/artistas', options);
  }

  public obtenerListaCanciones(): Observable<Cancion[]>{
    let options = {
      headers: new HttpHeaders().set('Authorization', 'bearer ' + this.cookieService.get("token"))
    };
    return this.http.get<Cancion[]>(this.URL + '/canciones', options);
  }

  public obtenerListaPalabras(): Observable<Palabras[]>{
    let options = {
      headers: new HttpHeaders().set('Authorization', 'bearer ' + this.cookieService.get("token"))
    };
    return this.http.get<Palabras[]>(this.URL + '/palabras', options);
  }



  public artistsData: Artista[] = [ ];
  public songsData: Cancion[] = [  ];
  public wordsData: Palabras[] = [  ];


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
    return { "labels": labels, "values": values, colors: { backgroundColor: this.colors, borderColor: 'transparent' }};
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
    let restingWords: { value: number | number[] | null | undefined; label: string | undefined; }[] = [];
    let restingWordsLabels: (string | undefined)[] = [];

    this.wordsData.forEach(lyric => {
      labels.push(lyric.palabra);
      values.push(lyric.presicion);
    })

    let randomColors: string[] = [];
    let cont = 0;
    values.forEach(value => {
      randomColors.push(this.colors[cont]);
      if (cont >= this.colors.length -1)
      {
        cont = 0
      } else {
        cont = cont + 1;
      }
    })
    console.log(randomColors);
    // randomColors = <Color[]> Array.from({ length: values.length }, () => this.colors);
    if (values.length > 15) {
      let cont = 0;
      values.forEach(value => {
        restingWords.push({
          value: value,
          label: labels[cont]
        })
        cont=cont+1
      })
      restingWordsLabels = labels.slice(16);
      values = values.slice(0,16)
      labels = labels.slice(0,16)
    };
    let result = {
      labels: labels,
      values: values,
      colors: { backgroundColor: randomColors, borderColor: 'transparent' },
      restOfWords :restingWords.slice(16)
    };
    return result;
  }

}
