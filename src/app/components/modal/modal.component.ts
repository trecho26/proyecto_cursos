import { Component, OnInit, Input } from "@angular/core";
import { ModalController, NavParams, Platform } from "@ionic/angular";
import { ConexionApiService } from "src/app/services/conexion-api.service";

import pdfMake from "pdfmake/build/pdfMake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { File } from "@ionic-native/file/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  pdfObject = null;
  constructor(
    public modalCtrl: ModalController,
    public serv: ConexionApiService,
    public navParams: NavParams,
    private plt: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) {
    this.getInscritos.id = navParams.get("id_curso");
  }

  ngOnInit() {
    this.serv.postData(this.getInscritos).then((val: any) => {
      this.inscritos = val.result;
      console.log(this.inscritos);
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  generarPDF() {
    let integrantes = [
      [
        { text: "Número de empleado", style: "tableHeader" },
        { text: "Nombre", style: "tableHeader" },
        { text: "Puesto", style: "tableHeader" },
        { text: "Correo", style: "tableHeader" }
      ],
      ["000001", "Hector Alfonso", "Auxiliar", "hector@gmail.com"],
      ["000002", "Jose Perez", "Supervisor", "jose@gmail.com"],
      ["000003", "Juan Pedro", "Gerente", "juan@gmail.com"],
      ["000004", "Jose Carlos", "Asistente", "josecarlos@gmail.com"],
      ["000005", "Paola Ruiz", "Auxiliar", "paola@gmail.com"]
    ];

    var dd = {
      content: [
        { text: "Tables", style: "header" },
        "Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.",
        {
          text:
            "A simple table (no headers, no width specified, no spans, no styling)",
          style: "subheader"
        },
        "The following table has nothing more than a body array",
        {
          style: "tableExample",

          table: {
            body: integrantes
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          alignment: "center"
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black"
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
    };

    this.pdfObject = pdfMake.createPdf(dd);

    if (this.plt.is("cordova")) {
      this.pdfObject.getBuffer((buffer) => {
        var utf8 = new Uint8Array(buffer);
        var binaryArray = utf8.buffer;
        var blob = new Blob([binaryArray], { type: "application/pdf" });

        this.file
          .writeFile(
            this.file.dataDirectory,
            `asistencia_${this.nombre}.pdf`,
            blob,
            { replace: true }
          )
          .then((fileEntry) => {
            this.fileOpener.open(
              this.file.dataDirectory + `asistencia_${this.nombre}.pdf`,
              "application/pdf"
            );
          });
      });
    } else {
      this.pdfObject.download();
    }
  }
}
