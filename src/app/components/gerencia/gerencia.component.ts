import { Component, OnInit } from "@angular/core";
import { ConexionApiService } from "src/app/services/conexion-api.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-gerencia",
  templateUrl: "./gerencia.component.html",
  styleUrls: ["./gerencia.component.scss"]
})
export class GerenciaComponent implements OnInit {
  cursos = [];
  cursoParam: any;
  id: any;
  resp: any;
  loading = true;
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
  ) {}

  ngOnInit() {}

  obtenerUsuario() {
    this.navCtrl.navigateRoot("/usuario", { animated: true });
  }

  async obtenerStorage() {
    await this.storage.get("dataUsuarios").then((val) => {
      this.datos = val;
    });
    console.log(this.datos);
    this.loading = false;
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
