import { Component, OnInit } from "@angular/core";
import { ConexionApiService } from "src/app/services/conexion-api.service";
import { NavController, PopoverController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { PopinfoComponent } from "src/app/components/popinfo/popinfo.component";

@Component({
  selector: "app-gerencia",
  templateUrl: "./gerencia.page.html",
  styleUrls: ["./gerencia.page.scss"]
})
export class GerenciaPage implements OnInit {
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
    private popoverCtrl: PopoverController
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

  async obtenerUsuario(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopinfoComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
    //this.navCtrl.navigateRoot("/usuario", { animated: true });
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

  agregarCurso() {
    console.log("Agregar curso");
    this.navCtrl.navigateForward("/agregar-curso", { animated: true });
  }
}
