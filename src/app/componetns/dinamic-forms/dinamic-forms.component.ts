import { Component, DoCheck, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dinamic-forms',
  templateUrl: './dinamic-forms.component.html',
  styleUrls: ['./dinamic-forms.component.css']
})
export class DinamicFormsComponent implements OnInit {
  @ViewChild("element") element: ElementRef;
  formArray: any;
  registrationForm!: FormGroup;
  @ViewChild('formdynamic') formDynamic: ElementRef;

  constructor(
    private _fb: FormBuilder,
    private _http: HttpClient,
    private _renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.registrationForm = this._fb.group({});
  }


  ngAfterViewInit() {
    this.createFormControl();   
    this.addListeners();
  }
 
  createFormControl(): void {
    this._http.get('assets/metadata/userForm.json').subscribe(data => {
      this.formArray = data;
      console.log(this.formArray);
      this.formArray.forEach((element: any) => {
        this.registrationForm.addControl(
          element.ID, element.Required ? new FormControl(
            element.Value || '', { validators: Validators.required }
          ) : new FormControl(element.Value || ''))
      });
    });

  }

  addListeners() : void {
    this._http.get('assets/metadata/userForm.json').subscribe(data => {
    this.formArray = data;
    this.formArray.forEach((element: any) => {
      var selectInput = this._renderer.selectRootElement('#' + element.ID);
      this._renderer.listen(selectInput, element.event, () => { console.log('focus'); });
    });
  }); 
  }

  save() {
    console.log(this.registrationForm.controls);  
  }

  eventMethod($event){
      console.log($event);
  }
}
