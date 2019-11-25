import { Component, OnInit, ViewChild } from "@angular/core";
import { ConexionApiService } from "src/app/services/conexion-api.service";
import { Storage } from "@ionic/storage";
import { ModalController, IonList } from "@ionic/angular";
import { ModalComponent } from "src/app/components/modal/modal.component";

@Component({
  selector: "app-cursos-impartir",
  templateUrl: "./cursos-impartir.page.html",
  styleUrls: ["./cursos-impartir.page.scss"]
})
export class CursosImpartirPage implements OnInit {
  @ViewChild("lista") lista: IonList;
  getCursos = {
    tipoMov: "cursosImpartir",
    id: ""
  };
  cursos = [];
  modalInfo = {
    nombre: "",
    id_curso: ""
  };

  constructor(
    public serv: ConexionApiService,
    public storage: Storage,
    public modalCtrl: ModalController
  ) {
    //Obtener el id del gerente por el storage
    this.storage.get("dataUsuarios").then((val) => {
      this.getCursos.id = val.id;
      console.log(this.getCursos);
      //Mandar la peticion a la API
      this.serv.postData(this.getCursos).then((val) => {
        this.cursos = val.result;
        console.log(this.cursos);
        this.modalInfo = val.result;
      });
    });
  }

  ngOnInit() {}

  async presentModal(i) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        nombre: this.modalInfo[i].nombre,
        id_curso: this.modalInfo[i].id_cursos
      }
    });
    console.log(this.modalInfo[i].id_cursos);
    this.lista.closeSlidingItems();
    return await modal.present();
  }
}
