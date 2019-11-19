import { Component, OnInit, ViewChild } from "@angular/core";
import { ConexionApiService } from "src/app/services/conexion-api.service";
import { NgForm } from "@angular/forms";
import { NavController, IonSlides, AlertController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  @ViewChild("slidePrincipal", { static: false }) slides: IonSlides;
  DatosUsuarios: any;
  respuesta: any;
  seleccion = true;
  errorCampos = false;
  errorNumEmpl = false;

  loginUser = {
    tipoMov: "login",
    usuario: "",
    pass: ""
  };

  regUser = {
    tipoMov: "registro",
    id: "",
    usuario: "",
    pass: "",
    telefono: "",
    correo: "",
    rol: ""
  };
  constructor(
    private serv: ConexionApiService,
    private navCtrl: NavController,
    private storage: Storage,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.slides.lockSwipes(true);
  }

  async login(flogin: NgForm) {
    if (this.loginUser.usuario === "" || this.loginUser.pass === "") {
      this.errorCampos = true;
      return;
    } else {
      if (flogin.invalid) {
        return;
      }

      this.DatosUsuarios = await this.serv.postData(this.loginUser);
      console.log(this.DatosUsuarios);
      this.errorCampos = false;

      if (this.DatosUsuarios.success) {
        this.navCtrl.navigateRoot("/cursos", { animated: true });
        this.storage.set("dataUsuarios", this.DatosUsuarios.result);
      } else {
        this.presentAlert();
        console.log("No entrar");
      }
    }
  }

  //Alert
  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Ups...",
      subHeader: "Datos incorrectos.",
      message: "El usuario y/o la contraseña que ingresaste son incorrectos.",
      buttons: ["Aceptar"]
    });

    await alert.present();
  }

  async registro(fRegistro: NgForm) {
    //Validar que haya datos en los input
    if (
      this.regUser.id === "" ||
      this.regUser.usuario === "" ||
      this.regUser.telefono === "" ||
      this.regUser.correo === "" ||
      this.regUser.pass === "" ||
      this.regUser.rol === ""
    ) {
      this.errorCampos = true;
      this.errorNumEmpl = false;
      return;
    } else {
      this.errorCampos = false;
      if (this.regUser.id.length < 6) {
        this.errorNumEmpl = true;
        return;
      }
      this.errorNumEmpl = false;
    }
    if (fRegistro.invalid) {
      return;
    }
    console.log(this.regUser);
    //this.presentAlertConfirm();
    this.serv.postData(this.regUser);
    this.modal();
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.seleccion = false;
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
    this.errorCampos = false;
    this.errorNumEmpl = false;
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.seleccion = true;
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
    this.errorCampos = false;
  }

  // async presentAlertConfirm() {
  //   const alert = await this.alertController.create({
  //     header: "Aceptado",
  //     message: "<img src='../../../assets/images/img1.jpg.jpg'>",
  //     buttons: [
  //       {
  //         text: "Aceptar",
  //         handler: () => {
  //           this.mostrarLogin();
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  modal() {
    Swal.fire({
      icon: "success",
      title: "Usuario creado",
      text: "Tus datos se han guardado correctamente",
      confirmButtonColor: "#A5DC86",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.value) {
        this.mostrarLogin();
      }
    });
  }
}
