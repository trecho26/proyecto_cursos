import { Component, OnInit } from "@angular/core";
import { ConexionApiService } from "src/app/services/conexion-api.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-cursos-impartir",
  templateUrl: "./cursos-impartir.page.html",
  styleUrls: ["./cursos-impartir.page.scss"]
})
export class CursosImpartirPage implements OnInit {
  getCursos = {
    tipoMov: "cursosImpartir",
    id: ""
  };
  cursos = [];

  constructor(private serv: ConexionApiService, private storage: Storage) {}

  ngOnInit() {
    //Obtener el id del gerente por el storage
    this.storage.get("dataUsuarios").then((val) => {
      this.getCursos.id = val.id;
      console.log(this.getCursos);
      //Mandar la peticion a la API
      this.serv.postData(this.getCursos).then((val) => {
        this.cursos = val.result;
        console.log(this.cursos);
      });
    });
  }
}
