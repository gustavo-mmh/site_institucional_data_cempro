import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { interval, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-quem-somos',
  standalone : true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './quem-somos.component.html',
  styleUrls: ['./quem-somos.component.scss']
})
export class QuemSomosComponent {
  imagePath = 'assets/quem-somos/quemsomos.png';
  onImageError(event: any): void {
    const img = event.target as HTMLImageElement;


    // Definir imagem placeholder baseada no tipo
    if (img.classList.contains('hero-image')) {
      img.src = 'assets/images/placeholder-hero.jpg';
    } else if (img.classList.contains('about-img')) {
      img.src = 'assets/images/placeholder-about.jpg';
    } else if (img.parentElement?.classList.contains('member-image')) {
      img.src = 'assets/images/placeholder-team.jpg';
    } else {
      // Placeholder genérico
      img.src = 'assets/images/placeholder.jpg';
    }

    // Se ainda assim não carregar, criar um placeholder SVG
    img.onerror = () => {
      this.createSvgPlaceholder(img);
    };
  }
  private createSvgPlaceholder(img: HTMLImageElement): void {
    const width = img.offsetWidth || 400;
    const height = img.offsetHeight || 300;

    const svgPlaceholder = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <g fill="#d0d0d0" text-anchor="middle" dominant-baseline="middle">
          <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="18">Imagem</text>
          <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="14">não encontrada</text>
        </g>
      </svg>
    `;

    img.src = 'data:image/svg+xml;base64,' + btoa(svgPlaceholder);
  }


}