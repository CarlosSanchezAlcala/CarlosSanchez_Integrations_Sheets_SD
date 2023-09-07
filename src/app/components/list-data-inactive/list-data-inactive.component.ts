import {Component, OnInit} from '@angular/core';
import {GoogleSheetService} from "../../services/google-sheet.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-data-inactive',
  templateUrl: './list-data-inactive.component.html',
  styleUrls: ['./list-data-inactive.component.scss']
})
export class ListDataInactiveComponent implements OnInit {

  dataGoogleSheet: any = [];
  searchResults: any[] = [];
  searchDNI: string = '';
  searchTimeout: any;
  flagInactive: any[] = [];
  isSearching: boolean = false;

  constructor(private googleSheetService: GoogleSheetService,
              private router: Router) {
  }

  ngOnInit() {
    this.findInactive();
  }

  findAll() {
    this.googleSheetService.listDataSheet().subscribe((res: any) => {
      console.log(res);
      this.dataGoogleSheet = res;
    })
  }

  findInactive() {
    this.googleSheetService.listDataSheet().subscribe((res: any) => {
      this.dataGoogleSheet = res;
      this.flagInactive = this.dataGoogleSheet.filter((item: { FLAG: string }) => item.FLAG === 'I');
      console.log('flagIData', this.flagInactive)
    })
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

  navigateToActive() {
    this.router.navigate(['app-list-data'])
  }

  reactivateLogical(index: number) {
    if (index >= 0 && index < this.flagInactive.length) {
      const dataItem = this.flagInactive[index];
      const dataIndex = this.dataGoogleSheet.indexOf(dataItem);
      if (dataIndex !== -1) {
        this.googleSheetService.reactivateLogical(dataIndex).subscribe(
          (response) => {
            console.log('El estado se ha actualizado con éxito: ', response);
            this.flagInactive.splice(index, 1);
          },
          (error) => {
            console.log('Error o problemas al actualizar el estado: ', error);
          }
        )
      }
    }
  }

}
