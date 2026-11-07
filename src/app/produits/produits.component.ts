import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent implements OnInit {

  // signal => la vue se met à jour toujours (même si zone.js pose problème)
  produits = signal<Produit[]>([]);
  erreur = signal<string>('');

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits(): void {
    this.produitService.listeProduits().subscribe({
      next: (prods) => {
        this.produits.set(prods);
        this.erreur.set('');
      },
      error: (err) => {
        console.error(err);
        this.erreur.set('Impossible de charger les produits. Vérifie que le backend tourne sur http://localhost:8080/produits/api');
      }
    });
  }

  supprimerProduit(p: Produit): void {
    if (confirm('Etes-vous sûr ?')) {
      this.produitService.supprimerProduit(p.idProduit).subscribe({
        next: () => this.chargerProduits(),
        error: (err) => console.error(err)
      });
    }
  }
}
