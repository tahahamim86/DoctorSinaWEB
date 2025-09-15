import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData = [
    { key: 'fullName', label: 'Full Name', value: '', type: 'text' },
    { key: 'birthday', label: 'Date of Birth', value: '', type: 'date' },
    { key: 'placeBirth', label: 'Place of Birth', value: '', type: 'text' },
    { key: 'identityMatricule', label: 'Matricule', value: '', type: 'text' },
    { key: 'codeNam', label: 'Code Nom', value: '', type: 'text' },
    { key: 'contacttype', label: 'Contact Type', value: '', type: 'text' },
    { key: 'contactInfo', label: 'Contact Info', value: '', type: 'email' },
    { key: 'martialstatus', label: 'Marital Status', value: '', type: 'text' },
    { key: 'description_martialstatus', label: 'Description', value: '', type: 'text' },
    { key: 'nationality', label: 'Nationality', value: '', type: 'text' },
    { key: 'gender', label: 'Gender', value: '', type: 'text' }
  ];

  profileExists = false;
  profileImage: string = '/assets/images/avatar.png';
  age: number | null = null;
  selectedFile: File | null = null;

  constructor(
    private profileService: ProfileService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (profile) => {
        if (profile) {
          this.profileExists = true;
          this.profileData.forEach(item => item.value = profile[item.key] || '');
          this.profileImage = profile.image ? 'data:image/png;base64,' + profile.image : this.profileImage;
          this.calculateAge();
        }
      },
      error: (err) => console.error('Error loading profile:', err)
    });
  }

  calculateAge(): void {
    const birthdayString = this.profileData.find(item => item.key === 'birthday')?.value;
    if (birthdayString) {
      const birthday = new Date(birthdayString);
      const today = new Date();
      let age = today.getFullYear() - birthday.getFullYear();
      const monthDiff = today.getMonth() - birthday.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) age--;
      this.age = age;
    } else this.age = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const maxSizeMB = 4; // Maximum file size in MB
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file) {
      if (file.size > maxSizeBytes) {
        alert(`File size exceeds ${maxSizeMB} MB. Please select a smaller file.`);
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => this.profileImage = e.target.result;
      reader.readAsDataURL(file);
    }
  }


  createProfile(): void {
    const email = this.authService.getUserId();
    if (!email) return;

    // Explicitly type payload as any
    const payload: any = this.profileData.reduce((obj: any, item) => {
      obj[item.key] = item.value;
      return obj;
    }, {});

    payload['email'] = email; // Now TS knows this is valid

    this.profileService.createProfile(payload, this.selectedFile).subscribe({
      next: (profile) => {
        this.profileExists = true;
        this.loadProfile();
        alert('Profile created successfully!');
      },
      error: (err) => console.error(err)
    });
  }


  updateProfile(): void {
    const payload = this.profileData.reduce((obj, item) => ({ ...obj, [item.key]: item.value }), {});
    this.profileService.updateProfile(payload, this.selectedFile).subscribe({
      next: (profile) => this.loadProfile(),
      error: (err) => console.error(err)
    });
  }

  deleteProfile(): void {
    this.profileService.deleteProfile().subscribe({
      next: () => {
        this.profileExists = false;
        this.profileData.forEach(item => item.value = '');
        this.profileImage = '/assets/images/avatar.png';
      },
      error: (err) => console.error(err)
    });
  }
}
