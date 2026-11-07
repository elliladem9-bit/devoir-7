import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-update-produit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-produit.component.html'
})
export class UpdateProduitComponent implements OnInit {

  currentProduit = new Produit();
  dateStr = '';   // yyyy-MM-dd pour <input type="date">

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private produitService: ProduitService) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.params['id']);
    this.produitService.consulterProduit(id).subscribe(prod => {
      this.currentProduit = prod;
      this.dateStr = prod.dateCreation
        ? new Date(prod.dateCreation).toISOString().substring(0, 10)
        : '';
    });
  }

  updateProduit(): void {
    this.currentProduit.dateCreation = (this.dateStr || null) as any;
    this.produitService.updateProduit(this.currentProduit).subscribe({
      next: () => this.router.navigate(['/produits']),
      error: (err) => console.error(err)
    });
  }
}
