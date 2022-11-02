import { MatDialogRef } from "@angular/material/dialog";

//burada ki Dialog (T) dir generic olyor.
export class BaseDialog<Diaolog> {
    constructor(public dialogRef : MatDialogRef<Diaolog>){

    }

    close(){
        this.dialogRef.close();
    }


}
