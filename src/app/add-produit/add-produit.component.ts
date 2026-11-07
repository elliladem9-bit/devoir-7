import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-produit.component.html'
})
export class AddProduitComponent {

  newProduit = new Produit();

  constructor(private produitService: ProduitService, private router: Router) {
    // date du jour par défaut (format yyyy-MM-dd attendu par le backend)
    this.newProduit.dateCreation = new Date().toISOString().substring(0, 10) as any;
  }

  addProduit(): void {
    // on n'envoie PAS d'id : MySQL le génère (AUTO_INCREMENT / IDENTITY)
    delete (this.newProduit as any).idProduit;

    this.produitService.ajouterProduit(this.newProduit).subscribe({
      next: () => this.router.navigate(['/produits']),
      error: (err) => console.error(err)
    });
  }
}
