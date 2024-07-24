import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent {
  tagForm: FormGroup;
  files: File[] = [];
  tags: Tag[] = [];
  isVisible: boolean = false; // Inicialmente oculto
  isLogged: boolean = false;
  
  constructor(
    private tagService: TagService,
    private formBuilder: FormBuilder
  ) {
    this.tagForm = this.formBuilder.group({
      titleTag: [''],
      descriptionTag: [''],
    });
  }
  ngOnInit() {}
  AddTag() {
    const tag: Tag = {
      name: this.tagForm.value.titleTag,
      description: this.tagForm.value.descriptionTag,
    };
  
    this.tagService.AddTag(tag).subscribe({
      next: (data) => {
        alert('Tag agregado correctamente.');
      },
      error: (error) => {
        console.error('Error al agregar el Tag:', error);
        alert('Error al agregar la etiqueta. Por favor, inténtalo nuevamente.');
      },
    });
  } 
  LoadTags() {
    this.tagService.GetTags().subscribe((data) => this.tags.push(...data));
  }
  ShowAddTag(){
    this.isVisible = !this.isVisible;
  }
}
