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

  URL = "http://20.114.84.8:4005"
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

    this.wordsData.forEach(lyric => {
      labels.push(lyric.palabra);
      values.push(lyric.presicion);
    })

    let randomColors = [];
    randomColors = <Color[]> Array.from({ length: values.length }, () => this.colors);
    let result = { labels: labels, values: values, colors: { backgroundColor: this.colors, borderColor: 'transparent' }};
    return result;
  }

}
