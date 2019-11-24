import { Component, OnInit } from "@angular/core";
import { NavController, PopoverController } from "@ionic/angular";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private navCtrl: NavController,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {}

  async obtenerUsuario(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopinfoComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
    //this.navCtrl.navigateRoot("/usuario", { animated: true });
  }
}
