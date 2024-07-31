import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { TokenService } from 'src/app/services/jwt.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent {
  @Output() filterEvent = new EventEmitter<Tag[]>();
  tags: Tag[] = [];
  selectedTags: Tag[] = [];
  isLogged: boolean = false;
  @ViewChild('searchModal') searchModal: any;
  constructor(
    private tagService: TagService,
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    this.loadTags();
    this.isLogged = this.tokenService.getToken() ? true : false;
  }

  // Metodos

  loadTags() {
    this.tagService.GetTags().subscribe((data) => this.tags.push(...data));
  }
  
  deleteTag(id?: number) {
    if (id != undefined) {
      this.tagService
        .DeleteTag(id)
        .subscribe(
          (data) => (this.tags = this.tags.filter((tag) => tag.id !== id))
        );
    }
  }

  onFilterClick() {
    this.filterEvent.emit(this.selectedTags); 
  }

  selectTag(tag: Tag) {
    const existingIndex = this.selectedTags.findIndex((selectedTag) => selectedTag.id === tag.id);
    if (existingIndex !== -1) {
      // El tag ya está seleccionado; lo eliminamos
      this.selectedTags.splice(existingIndex, 1);
    } else {
      // El tag no está seleccionado; lo agregamos
      this.selectedTags.push(tag);
    }
  }
}
