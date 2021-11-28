import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
    itemList = [
        'Changjinhu (2021)',
        'Dune (2021)',
        'Shang-Chi and the Legend of the Ten Rings (2021)',
        'Free Guy (2021)',
        'The Many Saints of Newark (2021)',
        'Finch (2021)',
        'Candyman (2021)',
        'No Time to Die (2021)',
        'Halloween Kills (2021)',
    ];

    checkAll = false;
    //isAllChecked = false;
    isChecked = false;
    renderList = [];

    selectAll(e: any) {
        this.checkAll = !this.checkAll;
        //this.isAllChecked = true;
        this.isChecked = true;

        for (let movie of this.itemList) {
            if (this.renderList.indexOf(movie) < 0) {
                this.renderList.push(movie);
            }
        }

        if (this.checkAll === false) {
            this.isChecked = false;
            this.renderList = [];
        }
    }

    // Handle movieList select and display
    onClick(e: any) {
        if (e.target.checked) {
            e.target.isChecked = true;
            if (this.renderList.indexOf(e.target.id) < 0) {
                this.renderList.push(e.target.id);
            }
        } else {
            e.target.isChecked = false;
            //this.isAllChecked = false;
            let index = this.renderList.indexOf(e.target.id);
            this.renderList = this.renderList
                .slice(0, index)
                .concat(this.renderList.slice(index + 1));
        }

        // If all movieList are selected, check Select All
        if (this.renderList.length === this.itemList.length) {
            //document.querySelector(selectAll).checked = true;
            this.checkAll = true;
            // else uncheck Select All
        } else {
            //document.querySelector(selectAll).checked = false;
            this.checkAll = false;
        }
    }

    // Handle Clear All event
    clearAll(e: any) {
        this.checkAll = false;
        this.isChecked = false;
        this.renderList = [];
    }

    constructor() { }

    ngOnInit(): void {
    }

}
