import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  //private url = 'http://190.146.64.16/quickturn';
  private url = environment.END_POINT_ROOT;
  private headers;
  private options;
  public url_servidor = this.url + "/wsupload";

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    this.options = { headers: this.headers };
  }
  // public postFile(imagenParaSubir: File){

  // 	const formData = new FormData(); 
  //   formData.append('imagenPropia', imagenParaSubir, imagenParaSubir.name); 
  //   console.log(this.url_servidor ,formData);

  // 	return this.http.post(this.url_servidor, formData);

  // }

  public postFile(imagenParaSubir: File) {


    let data = {
      SessionID: 0,
      Zipped: 0,
      PartIndex: 0,
      DataStore: null,
      SerializerType: "json",
      Filename: imagenParaSubir.name,
      Directory: "temp",
      IDAccount: 0,
      Function: "upload"
    }

    const formData = new FormData();
    formData.append('FileUpload', imagenParaSubir, JSON.stringify(data));
    console.log(data);

    return this.http.post(this.url_servidor, formData, this.headers);

  }


  public getUrlFiles(ContextMedia, Media) {
    let url = "";

    if (ContextMedia && Media) {
      url = this.url + "/filedownload?ContextMedia@=" + ContextMedia + "@@Media@=" + Media;
    }

    return url;
  }
  public getPreviewFiles(ContextMedia, Media) {
    let url = "";

    if (ContextMedia && Media) {
      url = this.url + "/filedownload?ContextMedia@=" + ContextMedia + "@@Media@=" + Media;
    }

    if (url != "")
      if (Media.includes("jpg") || Media.includes("png") || Media.includes("jpeg")) {
        url = "<img src='" + url + "'>";
      } else {
        url = "<a href='" + url + "' target='_blank'></a>";
      }

    return url;
  }
}
