import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/User/Create_User';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private userService : UserService, private toastrService : CustomToastrService, spinner : NgxSpinnerService) {
    super(spinner)
   }

frm : FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname : ["", [Validators.required,
                     Validators.maxLength(50),
                    Validators.minLength(3)]],
      userName : ["", [Validators.required,
                          Validators.maxLength(50),
                          Validators.minLength(3)]],
      email : ["", [Validators.required,
                     Validators.maxLength(250),
                     Validators.email]],
      password : ["",
      [
        Validators.required
      ]],
      passwordConfirm : ["",
      [
        Validators.required
      ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value;
        let passwordConfirm = group.get("passwordConfirm").value;
        return password === passwordConfirm ? null : { notSame: true };
      }
    })
  }


  //bu şekilde fonksiyon başına get koyarak component şeklinde bu fonksiyonu çağırabiliriz. html tarafında.
  get component() {
    return this.frm.controls;
  }


  submitted : boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;

    // var c = this.component
    
    debugger;

    if (this.frm.invalid)
      return;

    const result : Create_User  = await this.userService.create(user);

    if (result.succeeded)
    {
      this.toastrService.message(result.message, "Kullanıcı kaydı başarılı.", {
        messageType : ToastrMessageType.Success,
        position : ToastrPosition.BottomRight
      });
    }else{
      this.toastrService.message(result.message, "Kullanıcı kaydı yapılırken hata oluştu.", {
        messageType : ToastrMessageType.Error,
        position : ToastrPosition.BottomRight
      });
    }
  }
}
