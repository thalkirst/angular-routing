import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../service/event.service';
import { Event} from '../model/event';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  event: Event = new Event();

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>
        this.eventService.get(parseInt(params.id)).subscribe(
          event => {
            this.event = event || new Event();
          }
        )
    );
  }

  onFormSubmit(): void {
    this.eventService.update(this.event);
    alert(`Event (${this.event.name}) has been updated in the database.`)
    this.router.navigateByUrl('');
  }
  
}
