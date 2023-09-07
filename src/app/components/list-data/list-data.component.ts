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

  navigateToInactive() {
    this.router.navigate(['app-list-data-inactive']);
  }

  deleteLogical(index: number) {
    if (index >= 0 && index < this.flagActive.length) {
      const dataItem = this.flagActive[index];
      const dataIndex = this.dataGoogleSheet.indexOf(dataItem);
      if (dataIndex !== -1) {
        this.googleSheetService.deleteLogical(dataIndex).subscribe(
          (response) => {
            console.log('El estado se ha actualizado con éxito: ', response);
            this.flagActive.splice(index, 1);
          },
          (error) => {
            console.error('Error o problemas al actualizar el estado: ', error);
          }
        );
      }
    }
  }
}
