import {Component, OnInit} from '@angular/core';
import {GoogleSheetService} from "../../services/google-sheet.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-data-inactive',
  templateUrl: './list-data-inactive.component.html',
  styleUrls: ['./list-data-inactive.component.scss']
})
export class ListDataInactiveComponent implements OnInit{

  dataGoogleSheet: any = [];
  searchResults: any[] = [];
  searchDNI: string = '';
  searchTimeout: any;
  flagInactive: any[] = [];

  constructor(private googleSheetService: GoogleSheetService,
              private router: Router) {
  }

  ngOnInit() {
    this.findInactive();
  }

  findInactive() {
    this.googleSheetService.listDataSheet().subscribe((res: any) => {
      console.log(res);
      this.dataGoogleSheet = res;
      this.flagInactive = this.dataGoogleSheet.filter((item: { FLAG: string }) => item.FLAG === 'I');
      console.log('flagIData', this.flagInactive)
    })
  }

}
