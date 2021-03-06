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
    nombre: "",
    departamento: "",
    usuario: "",
    pass: "",
    telefono: "",
    correo: "",
    rol: ""
  };

  validationReg = {
    tipoMov: "checkUser",
    id: "",
    usuario: "",
    correo: ""
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
        if (this.DatosUsuarios.result.rol === "1") {
          console.log("Es gerente");
          this.navCtrl.navigateRoot("/gerencia", { animated: true });
        } else {
          this.navCtrl.navigateRoot("/cursos", { animated: true });
        }
        this.storage.set("dataUsuarios", this.DatosUsuarios.result);
      } else {
        this.presentAlert();
        console.log("No entrar");
      }
    }
  }

  //Alert login
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

    //Validar que los datos no existan
    this.validarRegistroUsuario().then((data) => {
      let mensaje: string;
      let datos: any = data;
      if (datos.success) {
        mensaje = datos.result;
        this.presentAlertReg(mensaje);
      } else {
        console.log("Usuario registrado");
        this.serv.postData(this.regUser);
        this.modal();
      }
    });
  }

  async presentAlertReg(pMensaje) {
    const alert = await this.alertController.create({
      header: "Ups...",
      subHeader: "No se ha podido registrar este usuario",
      message: `El ${pMensaje} ya existe`,
      buttons: ["Aceptar"]
    });

    await alert.present();
  }

  validarRegistroUsuario() {
    return this.serv.postData(this.validationReg);
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
