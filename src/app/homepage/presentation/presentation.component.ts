import { Component } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({ opacity: 0, transform: 'translateX(-100px)' }))
      ])
    ])
  ]
})
export class PresentationComponent {
  slides = [
    {
      title: 'Where AI Meets Telemedicine for Better Lives',
      text: 'DoctorSina is a smart medical platform powered by artificial intelligence, designed to revolutionize digital healthcare by delivering reliable, secure, and intelligent telemedicine services.',
      image: 'assets/img/hero_illustration.png'
    },
   {
      title: 'Doctor Sina - The intelligent virtual doctor app',
      text: 'DoctorSina is a smart medical platform powered by artificial intelligence, designed to revolutionize digital healthcare by delivering reliable, secure, and intelligent telemedicine services..',
      image: 'assets/img/slide5.jpg'
    },    {
      title: 'Doctor Sina - The intelligent virtual doctor app',
      text: 'DoctorSina is a smart medical platform powered by artificial intelligence, designed to revolutionize digital healthcare by delivering reliable, secure, and intelligent telemedicine services..',
      image: 'assets/img/slide6.jpg'
    },
  ];

  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }
}
