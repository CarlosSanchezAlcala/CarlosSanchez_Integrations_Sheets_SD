import {Component, OnInit} from '@angular/core';
import {GoogleSheetService} from "../../services/google-sheet.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.scss']
})
export class ListDataComponent implements OnInit {

  dataGoogleSheet: any = [];
  searchResults: any[] = [];
  searchDNI: string = '';
  searchTimeout: any;
  flagActive: any[] = [];
  isSearching: boolean = false;

  constructor(private googleSheetService: GoogleSheetService,
              private router: Router) {
  }

  ngOnInit() {
    this.findActive();
  }

  findAll() {
    this.googleSheetService.listDataSheet().subscribe((res: any) => {
      console.log(res);
      this.dataGoogleSheet = res;
    })
  }

  findActive() {
    this.googleSheetService.listDataSheet().subscribe((res: any) => {
      this.dataGoogleSheet = res;
      this.flagActive = this.dataGoogleSheet.filter((item: { FLAG: string; }) => item.FLAG === 'A');
      console.log('flagAData:', this.flagActive);
    });
  }

  searchByDni() {
    this.isSearching = true;
    if (this.searchDNI) {
      this.searchTimeout = setTimeout(() => {
        this.searchResults = this.dataGoogleSheet.filter((item: { DNI: string; }) => item.DNI === this.searchDNI);
        this.isSearching = false;
      }, 1500);
    } else {
      this.isSearching = false;
      this.searchResults = [];
    }
  }

  deleteLogical(index: number) {
    const dataIndex = this.dataGoogleSheet.indexOf(this.flagActive[index]);
    if (dataIndex !== -1) {
      const dataItem = this.dataGoogleSheet[dataIndex];
      this.googleSheetService.deleteLogical(index).subscribe(
        (response) => {
          console.log('El estado se ha actualizado con éxito: ', response);
        },
        (error) => {
          console.error('Error o problemas al actualizar el estado: ', error);
        }
      )
    }

  }
}
