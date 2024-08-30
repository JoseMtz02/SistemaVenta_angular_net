import { Component, OnInit } from '@angular/core';

import { Chart, registerables } from 'chart.js';
import { DashBoardService } from 'src/app/Services/dash-board.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  totalIngresos:string="0";
  totalVentas:string="0";
  totalProductos:string = "0";


  constructor(
    private _dashboardServicio: DashBoardService
  ) { }



  mostrarGrafico(labelGrafico:any[],dataGrafico:any[]){

    const coloresNaranja = [
      'rgba(255, 159, 64, 0.2)', // Naranja claro con opacidad
      'rgba(255, 159, 64, 0.4)', // Naranja claro con un poco más de opacidad
      'rgba(255, 159, 64, 0.6)', // Naranja claro con más opacidad
      'rgba(255, 159, 64, 0.8)', // Naranja claro con alta opacidad
      'rgba(255, 159, 64, 1)'    // Naranja sólido
    ];


    const charBarras = new Chart('chartBarras', {
      type:'bar',
      data:{
        labels:labelGrafico,
        datasets: [{
          label: "# de Ventas",
          data: dataGrafico,
          backgroundColor: coloresNaranja, // Usa los colores de la paleta para el fondo
          borderColor: coloresNaranja.map(color => color.replace('0.2', '1')), // Color de borde usando el tono más opaco
          borderWidth: 1
        }]
      },
      options:{
        maintainAspectRatio:false,
        responsive:true,
        scales:{
          y:{
            beginAtZero:true
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this._dashboardServicio.resumen().subscribe({
      next:(data)=>{
      if(data.status){
        this.totalIngresos = data.value.totalIngresos;
        this.totalVentas = data.value.totalVentas;
        this.totalProductos = data.value.totalProductos;

        const arrayData: any[] = data.value.ventasUltimaSemana;
        console.log(arrayData);

        const labelTemp = arrayData.map((value) => value.fecha);
        const dataTemp = arrayData.map((value) => value.total);

        this.mostrarGrafico(labelTemp, dataTemp);
      }
      },
      error:(e) => {}
    })

  }

}
