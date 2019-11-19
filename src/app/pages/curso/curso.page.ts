import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConexionApiService } from 'src/app/services/conexion-api.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage implements OnInit {
param = null;
curso = {
  nombre: '',
  hora: '',
  fecha: '',
  gerente: ''
};
resp:any;
post = {
  tipoMov: 'getCurso',
  id: ''
}
  constructor(private activeRoute: ActivatedRoute, private serv: ConexionApiService) {}

  ngOnInit() {
    this.param = this.activeRoute.snapshot.paramMap.get('id');
    this.post.id = this.param;
    this.obtenerCursos();
  }

  async obtenerCursos(){
    this.resp = await this.serv.postData(this.post);
    this.curso = this.resp.result;
    console.log(this.curso);
  }

}
