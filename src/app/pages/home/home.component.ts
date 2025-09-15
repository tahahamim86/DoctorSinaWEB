import { Component, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import {ProfileService} from "../../services/profile.service";
import {AuthServiceService} from "../../services/auth-service.service"; // Import fromEvent

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private arrowElements: HTMLElement[] = [];
  private sidebarBtn: HTMLElement | null = null;
  private sidebar: HTMLElement | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(private renderer: Renderer2, private router:Router,private profileService: ProfileService,private authService:AuthServiceService) {}
  @Output() toggleSideBarForMe: EventEmitter<any>= new EventEmitter();
toggleSideBar(){
this.toggleSideBarForMe.emit();
setTimeout(()=>{ window.dispatchEvent( new Event('resize'));},3000);
}
color: string = 'black';
isDarkMode: boolean = false;
darkmode() {
  if (this.isDarkMode) {
    this.color = 'black';
  } else {
    this.color = '#778C7B';
  }
  this.isDarkMode = !this.isDarkMode;
}
istext =false;
  ngOnInit(): void {
    // Select arrow elements and sidebar button
    this.arrowElements = Array.from(document.querySelectorAll(".arrow")) as HTMLElement[];
    this.sidebarBtn = document.querySelector(".bxs-caret-left-circle");
    this.sidebar = document.querySelector(".sidebar");

    // Add event listeners for arrows
    this.arrowElements.forEach(arrow => {
      const arrowClick$ = fromEvent(arrow, 'click').subscribe((event: Event) => {
        this.toggleMenu(event);

      });
      this.subscriptions.add(arrowClick$);
      this.loadUserProfile();
    });

    // Add event listener for sidebar button
    if (this.sidebarBtn) {
      const sidebarClick$ = fromEvent(this.sidebarBtn, 'click').subscribe(() => {
        this.toggleSidebar(); this.istext=!this.istext;
      });
      this.subscriptions.add(sidebarClick$);
    }
  }

  toggleMenu(event: Event): void {
    const target = event.target as HTMLElement;
    const arrowParent = target.parentElement?.parentElement;
    if (arrowParent) {
      arrowParent.classList.toggle("showMenu");
    }
  }

  toggleSidebar(): void {
    if (this.sidebar) {
      this.sidebar.classList.toggle("close");
    }
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.unsubscribe();
  }

showModal = false;

openTokenPopup(event: MouseEvent): void {
  event.preventDefault();
  this.showModal = true;
}
  public loggedIn: boolean = false;

  logout(event: MouseEvent): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigateByUrl('/login');
    console.log("User logged out successfully");
  }

  isDiagnosisOpen: boolean = false;

    toggleDiagnosisSubMenu() {
        this.isDiagnosisOpen = !this.isDiagnosisOpen;
    }
  profileName=""
  profileImage:any;
  loadUserProfile(): void {
    this.profileService.getProfile().subscribe(
      (profile) => {
        if (profile && profile.fullName) {
          this.profileName = profile.fullName;
        }
        if (profile && profile.image) {
          this.profileImage = 'data:image/png;base64,' + profile.image;
        }
      },
      (error) => {
        console.error('Error loading profile in header:', error);
        // Optionally handle the error, e.g., display a default name
      }
    );
  }

}
