import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GoogleSheetDatas} from "../models/Google-Sheets.model";

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetService {

  urlConection: string = 'https://sheet.best/api/sheets/4251df14-3aa8-4211-a4c8-a525e99bc7de';

  constructor(private http: HttpClient) {
  }

  listDataSheet() {
    return this.http.get(this.urlConection);
  }

  deleteLogical(index: number): Observable<any> {
    const updateUrl = `${this.urlConection}/${index}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({ FLAG: 'I' });

    return this.http.patch(updateUrl, body, { headers });
  }

  reactivateLogical(index: number): Observable<any> {
    const updateUrl = `${this.urlConection}/${index}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({ FLAG: 'A' });

    return this.http.patch(updateUrl, body, { headers });
  }

}
