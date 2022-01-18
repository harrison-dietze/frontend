import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginService(usuario: FormData): Observable<any> {
    return this.http.post<any>(
      'http://localhost/backend/AngularEndpoints.php',
      usuario
    );
  }
}
