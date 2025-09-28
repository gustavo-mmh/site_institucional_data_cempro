import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy {
  currentYear = new Date().getFullYear();
  newsletterEmail = '';
  showBackToTop = false;

  private destroy$ = new Subject<void>();

  constructor() { }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  navigateToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  get companyInfo() {
    return {
      name: 'DATA CEMPRO',
      description: 'Soluções inovadoras em tecnologia e gestão de dados para impulsionar seu negócio.',
      address: 'Canoas, Rio Grande do Sul, Brasil',
      phone: '+55 (51) 9999-9999',
      email: 'contato@datacempro.com.br',
      social: {
        linkedin: '#',
        facebook: '#',
        instagram: '#',
        twitter: '#'
      }
    };
  }

  get navigationLinks() {
    return [
      { label: 'Início', route: '/home' },
      { label: 'Quem Somos', route: '/quem-somos' },
      { label: 'Produtos', route: '/produtos' },
      { label: 'Serviços', route: '/servicos' },
      { label: 'Contato', route: '/contato' }
    ];
  }

  get serviceLinks() {
    return [
      { label: 'Gestão de Dados', url: '#' },
      { label: 'Análise de Performance', url: '#' },
      { label: 'Consultoria Tech', url: '#' },
      { label: 'Suporte Técnico', url: '#' },
      { label: 'Treinamentos', url: '#' }
    ];
  }

  get legalLinks() {
    return [
      { label: 'Política de Privacidade', url: '#' },
      { label: 'Termos de Uso', url: '#' },
      { label: 'Cookies', url: '#' }
    ];
  }
}