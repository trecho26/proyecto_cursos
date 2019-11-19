import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ConexionApiService } from "src/app/services/conexion-api.service";
import { NavController } from "@ionic/angular";
import { JsonPipe } from "@angular/common";

@Component({
  selector: "app-cursos",
  templateUrl: "./cursos.page.html",
  styleUrls: ["./cursos.page.scss"]
})
export class CursosPage implements OnInit {
  cursos = [];
  cursoParam: any;
  id: any;
  resp: any;
  datos = {
    usuario: "",
    pass: "",
    rol: ""
  };
  post = {
    tipoMov: "cursos"
  };
  constructor(
    private storage: Storage,
    private serv: ConexionApiService,
    private navCtrl: NavController
  ) {
    this.obtenerCursos();
    this.obtenerStorage();
  }

  ngOnInit() {}

  async obtenerStorage() {
    await this.storage.get("dataUsuarios").then((val) => {
      this.datos = val;
    });
    console.log(this.datos);
  }

  async obtenerCursos() {
    this.resp = await this.serv.postData(this.post);
    this.cursos = this.resp.result;
    console.log(this.cursos);
  }

  obtenerCurso(id: any) {
    this.navCtrl.navigateForward(["/curso", id]);
  }
}
