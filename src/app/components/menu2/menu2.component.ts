import { Component, OnInit } from "@angular/core";
import { NavController, MenuController } from "@ionic/angular";

@Component({
  selector: "app-menu2",
  templateUrl: "./menu2.component.html",
  styleUrls: ["./menu2.component.scss"]
})
export class Menu2Component implements OnInit {
  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {}

  verPerfil() {
    this.navCtrl.navigateRoot("/usuario", { animated: true });
    this.menuCtrl.close("user");
  }
}
