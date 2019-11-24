import { Component, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
  datos: any;
  constructor(private menuCtrl: MenuController) {}

  ngOnInit() {}

  cursos() {
    this.menuCtrl.close("first");
  }
}
