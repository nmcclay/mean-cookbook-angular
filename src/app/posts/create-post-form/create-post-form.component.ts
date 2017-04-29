import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.scss']
})
export class CreatePostFormComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content, {backdrop: "static", size: "lg"});
  }

  ngOnInit() {
  }

}
