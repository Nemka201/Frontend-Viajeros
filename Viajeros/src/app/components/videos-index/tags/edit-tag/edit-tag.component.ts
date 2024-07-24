import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent {
  isVisible: boolean = false; // Inicialmente oculto
  tagForm: FormGroup;
  files: File[] = [];
  @Input() tag: any;
  constructor(
    private tagService: TagService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {
    this.tagForm = this.formBuilder.group({
      nameUpdateTag: [''],
      descriptionUpdateTag: [''],
    });
  }
  ngOnInit() {
    if (this.tag) {
      this.tagForm.patchValue({
        id: this.tag.id,
        nameUpdateTag: this.tag.name,
        descriptionUpdateTag: this.tag.description,
      });
    }
  }
  

  async UpdateTag() {
    const updatedTag: Tag = {
      id: this.tag.id,
      name: this.tagForm.value.nameUpdateTag,
      description: this.tagForm.value.descriptionUpdateTag
    };
    try {
      this.tagService.UpdateTag(this.tag.id, updatedTag).subscribe((data) => {
        alert('Programa agregado correctamente.');
      });
    } catch (error) {
      console.error('Error al subir el programa:', error);
    }
  }
  ShowUpdateTag(){
    this.isVisible = !this.isVisible;
  }
}
