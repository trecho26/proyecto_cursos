import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ConexionApiService } from "src/app/services/conexion-api.service";
import { NavController, MenuController } from "@ionic/angular";

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
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.obtenerStorage().then(() => {
        if (this.datos.rol === "1") {
        }
      });
      this.obtenerCursos();
    }, 1500);
  }

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

  menu() {
    this.menuCtrl.enable(true, "user");
    this.menuCtrl.open("user");
  }
}
