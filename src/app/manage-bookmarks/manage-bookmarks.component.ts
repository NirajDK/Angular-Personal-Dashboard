import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';

@Component({
  selector: 'app-manage-bookmarks',
  templateUrl: './manage-bookmarks.component.html',
  styleUrls: ['./manage-bookmarks.component.scss']
})
export class ManageBookmarksComponent implements OnInit {

  bookmarks!: Bookmark[]

  constructor(
    private bookmarkSevice: BookmarkService
  ) { }

  ngOnInit(): void {
    this.bookmarks = this.bookmarkSevice.getbookmarks()
  }

}
