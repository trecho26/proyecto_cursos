import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConexionApiService } from "src/app/services/conexion-api.service";
import { Storage } from "@ionic/storage";
import { ToastController } from "@ionic/angular";

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
  asistencia = {};
  constructor(
    private activeRoute: ActivatedRoute,
    private serv: ConexionApiService,
    private storage: Storage,
    private toastCtrl: ToastController
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

  async agregarInscripcion() {
    await this.storage.get("dataUsuarios").then((data) => {
      this.asistencia = {
        tipoMov: "asistencia",
        id: data.id,
        id_curso: this.post.id
      };
    });
    console.log(this.asistencia);
    let bandera = await this.serv.postData(this.asistencia);
    console.log(bandera);
    this.presentToast(bandera);
  }

  async presentToast(pMensaje) {
    console.log(pMensaje);
    if (pMensaje.success) {
      const toast = await this.toastCtrl.create({
        message: `Se guardó tu asistencia para el curso: ${this.curso.nombre}`,
        duration: 2000
      });
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message: pMensaje.result,
        duration: 2000
      });
      toast.present();
    }
  }
}
