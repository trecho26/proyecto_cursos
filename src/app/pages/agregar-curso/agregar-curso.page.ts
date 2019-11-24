import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ConexionApiService } from "src/app/services/conexion-api.service";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-agregar-curso",
  templateUrl: "./agregar-curso.page.html",
  styleUrls: ["./agregar-curso.page.scss"]
})
export class AgregarCursoPage implements OnInit {
  error = false;
  curso = {
    tipoMov: "agregarCurso",
    nombre: "",
    hora: "",
    fecha: "",
    gerente: ""
  };
  constructor(
    private serv: ConexionApiService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  crearCurso(fCurso: NgForm) {
    if (
      this.curso.nombre === "" ||
      this.curso.hora === "" ||
      this.curso.fecha === "" ||
      this.curso.gerente === ""
    ) {
      this.error = true;
      return;
    } else {
      if (fCurso.invalid) {
        return;
      }
      console.log(this.curso);
      this.serv.postData(this.curso);
      this.navCtrl.navigateRoot("/cursos");
    }
  }
}
