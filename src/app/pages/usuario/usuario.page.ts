import { Component, OnInit } from "@angular/core";
import { MenuController, AlertController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { ConexionApiService } from "src/app/services/conexion-api.service";

@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.page.html",
  styleUrls: ["./usuario.page.scss"]
})
export class UsuarioPage implements OnInit {
  datos = {
    id: "",
    usuario: "",
    pass: "",
    rol: "",
    correo: "",
    telefono: "",
    tipoRol: "",
    tipoMov: ""
  };

  constructor(
    private menuCtrl: MenuController,
    private storage: Storage,
    private alertController: AlertController,
    private serv: ConexionApiService
  ) {
    this.storage.get("dataUsuarios").then((val) => {
      this.datos = val;
      console.log(this.datos);
    });
  }

  ngOnInit() {}

  toggleMenu() {
    this.menuCtrl.enable(true, "first");
    this.menuCtrl.toggle("first");
  }

  async editarValores() {
    const alert = await this.alertController.create({
      header: "Edita tus datos",
      inputs: [
        {
          name: "usuario",
          type: "text",
          value: this.datos.usuario,
          placeholder: "Usuario"
        },
        {
          name: "correo",
          type: "email",
          value: this.datos.correo,
          placeholder: "Correo"
        },
        {
          name: "telefono",
          type: "text",
          value: this.datos.telefono,
          placeholder: "Telefono"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "danger",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Aceptar",
          handler: (val) => {
            console.log(val);
            this.datos.usuario = val.usuario;
            this.datos.correo = val.correo;
            this.datos.telefono = val.telefono;
            this.storage.set("dataUsuarios", this.datos);
            this.datos.tipoMov = "actualizarUser";
            console.log(this.datos);
            this.serv.postData(this.datos);
          }
        }
      ]
    });

    await alert.present();
  }
}
