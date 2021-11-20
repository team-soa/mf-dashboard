import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet, SingleDataSet, ThemeService } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { DataManagerService } from './services/data-manager.service';
import { CookieService } from 'ngx-cookie-service';
import Artista from './clases/artista';
import Cancion from './clases/cancion';
import Palabras from './clases/palabras';


@Component({
  selector: 'mf-dashboard',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mf-dashboard';


  constructor(private dataManager: DataManagerService, private themeService: ThemeService,
    private cookie: CookieService) { }


  // Doughnut - artistas reproducidos
  public doughnutChartLabels: Label[] = ['Crazy', 'Lost', 'Love'];
  public doughnutChartData: MultiDataSet = [
    [350, 460, 20],
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public roundColors :Color[]=[]
  // Bar - canciones reproducidas
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // PolarArea - scores de palabras
  public polarAreaChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: SingleDataSet = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;
  public polarColors: Color[]=[];
  public polarAreaChartType: ChartType = 'polarArea';
  

  async ngOnInit() {

    this.dataManager.artistsData = await this.dataManager.obtenerListaArtistas().toPromise()
    this.dataManager.songsData = await this.dataManager.obtenerListaCanciones().toPromise()
    this.dataManager.wordsData = await this.dataManager.obtenerListaPalabras().toPromise()


    let artists = this.dataManager.getArtistsReady();
    let songs = this.dataManager.getSongsReady();
    let words = this.dataManager.getWordsReady();
    this.doughnutChartLabels = <Label[]>artists.labels;
    this.doughnutChartData = <MultiDataSet>artists.values;
    this.roundColors = <Color[]>[artists.colors];
    
    this.barChartData = songs.values;
    this.barChartLabels = <Label[]>songs.labels;
    
    this.polarAreaChartLabels = <Label[]>words.labels;
    this.polarAreaChartData = words.values;
    this.polarColors = <Color[]> [words.colors];
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public barChartOptions: ChartOptions = {
    legend: {
      labels: { fontColor: 'white' }
    },
    title: {
      text: "CANCIONES MÁS REPRODUCIDAS",
      fontColor: "white",
      display: true,
      fullWidth: true,
      fontSize: 25
    },
    scales: {
      xAxes: [ {
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' }
      } ],
      yAxes: [ {
        ticks: { fontColor: 'white' },
        gridLines: { color: 'rgba(255,255,255,0.1)' }
      } ]
    },
  };

  public polarOptions: ChartOptions = {
    legend: {
      labels: { fontColor: 'white' }
    },
    title: {
      text: "PRECICIÓN DE PALABRAS",
      fontColor: "white",
      display: true,
      fullWidth: true,
      fontSize: 25
    },
    tooltips: {
      enabled: true,
      backgroundColor: 'white',
      bodyFontColor: 'black'
    },
    scale: {
      display: true,
      gridLines: {
        display: true,
        circular: true,
        color: '#A30057',
        lineWidth: 0.5
      }
    },
    elements: {
      line: {
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 20
      }
    },   
  };

  public roundOptions: ChartOptions = {
    legend: {
      labels: { fontColor: 'white' }
    },
    title: {
      text: "ARTISTAS MÁS ESCUCHADOS",
      fontColor: "white",
      display: true,
      fullWidth: true,
      fontSize: 25
    },
    tooltips: {
      enabled: true,
      backgroundColor: 'white',
      bodyFontColor: 'black'
    },
    
  };

}
