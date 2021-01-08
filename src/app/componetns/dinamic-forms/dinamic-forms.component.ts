import { Component, DoCheck, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dinamic-forms',
  templateUrl: './dinamic-forms.component.html',
  styleUrls: ['./dinamic-forms.component.css']
})
export class DinamicFormsComponent implements OnInit, DoCheck {
  @ViewChild("element") element: ElementRef;
  formArray: any;
  registrationForm!: FormGroup;
  @ViewChild('formdynamic') formDynamic: ElementRef;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }
  ngDoCheck(): void {
  }

  ngOnInit(): void {

    this.registrationForm = this.fb.group({});

    this.http.get('assets/metadata/userForm.json').subscribe(data => {
        this.formArray = data;
        console.log(this.formArray);
        this.createFormControl();
      });


  }

  ngAfterViewInit() {
    this.renderer.addClass(this.element.nativeElement, "claseNueva");
    // ElementRef: { nativeElement: <input> }
    console.log(this.formDynamic);

    // Access the input object or DOM node
    console.dir(this.formDynamic.nativeElement);

  /*  this.formDynamic.nativeElement.querySelectorAll('input').forEach((item: any) => {
      this.renderer.listen(item, 'click', (event: any) => {
        
      });
    });
*/

/*

  this.http.get('assets/metadata/userForm.json').subscribe(data => {
    this.formArray = data;
    this.formArray.forEach((element: any) => {
      const selectInput = this.formDynamic.nativeElement.querySelector('#'+element.ID);
      console.log(selectInput);
      console.log(element);
      this.renderer.listen(selectInput, element.event, (event: any) => {
        console.log("event");
          this.onChangeMethod(event);
      }); 
    });
  }); 
*/

/*
this.formDynamic.nativeElement.querySelectorAll('input').forEach(( item: any ) => {
                    this.renderer.listen(item, 'click', (event: any) => {
                      console.log("event");
                      this.onChangeMethod(event);
                    });
                });
*/

this.addListeners();
  }


  createFormControl() {
    this.formArray.forEach((element: any) => {
      this.registrationForm.addControl(
        element.ID, element.Required ? new FormControl(
          element.Value || '', { validators: Validators.required}
          ): new FormControl(element.Value || ''))
    });


  }

  addListeners(){
    this.http.get('assets/metadata/userForm.json').subscribe(data => {
      this.formArray = data;
      this.formArray.forEach((element: any) => {
        const selectInput = this.formDynamic.nativeElement.querySelector('#'+element.ID);
        console.log(selectInput);
        console.log(element);
        this.renderer.listen(selectInput, element.event, (event: any) => {
          console.log("event");
            this.onChangeMethod(event);
        }); 
      });
    }); 
  }

  getFormControl(selectedId){
    this.elRef.nativeElement.select("#"+selectedId);
  }

  save() {
    console.log(this.registrationForm.controls);
    
  }


  onChangeMethod($event){
      console.log($event);
      console.log("onchange");
  }

}
