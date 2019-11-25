import { Component, OnInit, Input } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { ConexionApiService } from "src/app/services/conexion-api.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  @Input() nombre: string;
  getInscritos = {
    tipoMov: "obtenerAsistencia",
    id: ""
  };
  inscritos: any;
  constructor(
    public modalCtrl: ModalController,
    public serv: ConexionApiService,
    public navParams: NavParams
  ) {
    this.getInscritos.id = navParams.get("id_curso");
  }

  ngOnInit() {
    this.serv.postData(this.getInscritos).then((val) => {
      this.inscritos = val.result;
      console.log(this.inscritos);
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
