import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  static getToken(): string {
    return localStorage.getItem(environment.tokenName)
      ? JSON.parse(localStorage[environment.tokenName]).token
      : '';
  }

  static async fireConfirmSwal() {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
  }

  static async fireSwal(message: string, isSuccess = true) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: isSuccess ? 'success' : 'error',
      title: message,
    });
  }
}
