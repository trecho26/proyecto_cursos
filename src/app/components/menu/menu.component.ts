import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { MenuController, NavController } from "@ionic/angular";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  datos: any;
  constructor(
    private menuCtrl: MenuController,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  cursos() {
    this.storage.get("dataUsuarios").then((val) => {
      if (val.rol === "1") {
        this.navCtrl.navigateRoot("/gerencia");
      } else {
        this.navCtrl.navigateRoot("/cursos");
      }
    });

    this.menuCtrl.close("first");
  }
}
