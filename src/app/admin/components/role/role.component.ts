import {Component, OnInit, ViewChild} from '@angular/core';
import {ListComponent} from "./list/list.component";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(ListComponent) listComponents : ListComponent //burada hedef listcompo olduğunu emin olmamız gerekli

  createdRole(createRole : string) {
    this.listComponents.getRoles();
  }

}
