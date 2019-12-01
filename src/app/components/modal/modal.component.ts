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
  getPdf = {
    tipoMov: "pdf",
    id_curso: ""
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
    this.getPdf.id_curso = navParams.get("id_curso");
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

  async generarPDF() {
    var integrantes = [];
    var integrante = {
      Empleado: "",
      Nombre: "",
      Correo: "",
      Departamento: "",
      Puesto: ""
    };
    console.log(this.getPdf);
    await this.serv.postData(this.getPdf).then((val: any) => {
      for (let i = 0; i <= 4; i++) {
        integrante.Empleado = val.result[i].id;
        integrante.Nombre = val.result[i].nombre;
        integrante.Correo = val.result[i].correo;
        integrante.Departamento = val.result[i].departamento;
        integrante.Puesto = val.result[i].tipo_rol;
        console.log(integrante);
        integrantes.push(integrante);
        integrante = {
          Empleado: "",
          Nombre: "",
          Correo: "",
          Departamento: "",
          Puesto: ""
        };
      }
      console.log(integrantes);
    });

    function buildTableBody(data, columns) {
      var body = [];
      body.push(columns);
      data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
          dataRow.push(row[column].toString());
        });

        body.push(dataRow);
      });
      return body;
    }

    function table(data, columns) {
      return {
        style: "tableExample",
        table: {
          headerRows: 1,
          body: buildTableBody(data, columns)
        }
      };
    }
    var dd = {
      content: [
        { text: "Tablas dinamicas", style: "header" },
        table(integrantes, [
          "Empleado",
          "Nombre",
          "Correo",
          "Departamento",
          "Puesto"
        ])
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
