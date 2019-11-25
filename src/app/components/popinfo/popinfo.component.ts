import { Component, OnInit } from "@angular/core";
import { NavController, PopoverController } from "@ionic/angular";

@Component({
  selector: "app-popinfo",
  templateUrl: "./popinfo.component.html",
  styleUrls: ["./popinfo.component.scss"]
})
export class PopinfoComponent implements OnInit {
  constructor(
    private navCtrl: NavController,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {}

  onClick(opcion: string) {
    switch (opcion) {
      case "perfil":
        this.navCtrl.navigateRoot("/usuario", { animated: true });
        break;
      case "cursos":
        this.navCtrl.navigateForward("/cursos-impartir", { animated: true });
        break;
      default:
        this.navCtrl.navigateRoot("/", { animated: true });
        break;
    }
    this.popoverCtrl.dismiss();
  }
}
