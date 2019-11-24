import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConexionApiService } from "src/app/services/conexion-api.service";
import { DatePipe } from "@angular/common";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-curso",
  templateUrl: "./curso.page.html",
  styleUrls: ["./curso.page.scss"]
})
export class CursoPage implements OnInit {
  param = null;
  curso = {
    nombre: "",
    hora: "",
    fecha: "",
    gerente: ""
  };
  resp: any;
  post = {
    tipoMov: "getCurso",
    id: ""
  };
  constructor(
    private activeRoute: ActivatedRoute,
    private serv: ConexionApiService,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {
    this.param = this.activeRoute.snapshot.paramMap.get("id");
    this.post.id = this.param;
    this.obtenerCursos();
  }

  async obtenerCursos() {
    this.resp = await this.serv.postData(this.post);
    console.log(this.resp);
    this.curso = this.resp.result;
    console.log(this.curso);
  }
}
