import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class DocumentServiceService {
  documentUploadUrl = "https://localhost:7113/api/Documents/upload";
  showDocumentUrl = "https://localhost:7113/api/Documents/";
  showDocumnebtIdUrl="https://localhost:7113/api/Documents";
  constructor(private http: HttpClient) {}

  public uploadDocument(data: any) {
    return this.http.post(this.documentUploadUrl, data);
  }
  public GetuploadDocument(data:any)
  {
    return this.http.get(this.showDocumnebtIdUrl+"/"+data, { responseType: 'arraybuffer' })
  }
}
