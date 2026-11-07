import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Produit } from '../model/produit.model';

@Injectable({ providedIn: 'root' })
export class ProduitService {

  // Backend Spring Boot (context-path=/produits + @RequestMapping("/api"))
  apiURL: string = 'http://localhost:8080/produits/api';

  constructor(private http: HttpClient) {}

  listeProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiURL);
  }

  ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiURL, prod);
  }

  supprimerProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }

  consulterProduit(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiURL}/${id}`);
  }

  updateProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.apiURL, prod);
  }
}
