import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';

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

    form: any;
    renderList = [];

    constructor(private fb: FormBuilder) { }

    get movieList() : FormGroup {
        return this.form.get("movieList") as FormGroup
    }

    // Handle check and uncheck Select All
    selectAll() {
        this.form.get("selectAll").valueChanges.subscribe((val: boolean) => {
            if (val === true) {
                //console.log(Object.values(this.movieList.controls))
                Object.values(this.movieList.controls).map(val=>val.setValue(true));
                this.renderList = Object.keys(this.movieList.controls);
            } else {
                Object.values(this.movieList.controls).map(val=>val.setValue(false));
                this.renderList = [];
            }
        })
    }

    // Handle movieList select and display
    onClick() {
        this.itemList.map(list => {
            this.form.get("movieList").get(list)
                .valueChanges.subscribe(val => {
                    if (val === true) {
                        this.renderList.push(list);
                        // If all movieList are selected, check Select All
                        if (this.renderList.length === this.itemList.length) {
                            this.form.controls.selectAll.setValue(true, {emitEvent:false});
                        } 
                    } else {
                        this.renderList.splice(this.renderList.indexOf(list), 1);
                        this.form.controls.selectAll.setValue(false, {emitEvent:false});
                    }
                });
        })
    }

    // Handle Clear All event
    clearAll(e: any) {
       this.form.reset();
    }

    ngOnInit() {
        this.form = this.fb.group({
            selectAll: false,
            movieList: this.fb.group(
                this.itemList.reduce((acc, cur) => {
                    acc[cur] = false;
                    return acc;
                }, {})
            ),
        });
        this.movieList;
        this.selectAll();
        this.onClick();
    }
}
