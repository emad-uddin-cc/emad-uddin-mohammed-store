import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Category = 'Electronics' | 'Home' | 'Garden' | 'Clothing' | 'Books' | 'Sports';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  category: Category;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly storeName = 'Emad Uddin Mohammed Store';
  readonly categories: Array<Category | 'All Products'> = [
    'All Products',
    'Electronics',
    'Home',
    'Garden',
    'Clothing',
    'Books',
    'Sports',
  ];
  readonly selectedCategory = signal<Category | 'All Products'>('All Products');
  readonly searchTerm = signal('');
  readonly cartCount = signal(0);

  readonly products: Product[] = [
    {
      id: 'P001',
      name: 'Wireless Headphones',
      description: 'Immersive sound with all-day comfort.',
      price: 79.99,
      imageUrl:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      inStock: true,
      category: 'Electronics',
    },
    {
      id: 'P002',
      name: 'Smart Desk Lamp',
      description: 'Warm, adjustable light for focused work.',
      price: 42.5,
      imageUrl:
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
      inStock: true,
      category: 'Home',
    },
    {
      id: 'P003',
      name: 'Ceramic Planter',
      description: 'A modern home for your favourite greenery.',
      price: 24.0,
      imageUrl:
        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80',
      inStock: true,
      category: 'Garden',
    },
    {
      id: 'P004',
      name: 'Everyday Hoodie',
      description: 'Soft cotton blend with a relaxed fit.',
      price: 58.0,
      imageUrl:
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',
      inStock: true,
      category: 'Clothing',
    },
    {
      id: 'P005',
      name: 'The Creative Mind',
      description: 'A thoughtful guide to building better ideas.',
      price: 19.95,
      imageUrl:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80',
      inStock: false,
      category: 'Books',
    },
    {
      id: 'P006',
      name: 'Training Yoga Mat',
      description: 'Non-slip cushioning for every practice.',
      price: 36.0,
      imageUrl:
        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=80',
      inStock: true,
      category: 'Sports',
    },
    {
      id: 'P007',
      name: 'Portable Speaker',
      description: 'Big sound in a compact, take-anywhere design.',
      price: 65.0,
      imageUrl:
        'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80',
      inStock: true,
      category: 'Electronics',
    },
    {
      id: 'P008',
      name: 'Woven Throw',
      description: 'Textured comfort for slow evenings at home.',
      price: 48.0,
      imageUrl:
        'https://images.unsplash.com/photo-1580301762395-21ce84d1f1c2?auto=format&fit=crop&w=900&q=80',
      inStock: true,
      category: 'Home',
    },
    {
      id: 'P009',
      name: 'Garden Tool Set',
      description: 'Three essential tools for planting and pruning.',
      price: 31.5,
      imageUrl:
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80',
      inStock: false,
      category: 'Garden',
    },
    {
      id: 'P010',
      name: 'Classic Canvas Tote',
      description: 'A durable everyday bag with a clean silhouette.',
      price: 28.0,
      imageUrl:
        'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80',
      inStock: true,
      category: 'Clothing',
    },
    {
      id: 'P011',
      name: 'The Weekend Cookbook',
      description: 'Simple seasonal recipes made for sharing.',
      price: 27.0,
      imageUrl:
        'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80',
      inStock: true,
      category: 'Books',
    },
    {
      id: 'P012',
      name: 'Stainless Water Bottle',
      description: 'Insulated hydration for the gym and beyond.',
      price: 22.0,
      imageUrl:
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
      inStock: true,
      category: 'Sports',
    },
  ];

  readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const term = this.searchTerm().trim().toLowerCase();
    return this.products.filter(
      (product) =>
        (category === 'All Products' || product.category === category) &&
        (!term ||
          `${product.name} ${product.description} ${product.category}`
            .toLowerCase()
            .includes(term)),
    );
  });

  selectCategory(category: Category | 'All Products'): void {
    this.selectedCategory.set(category);
  }

  categoryCount(category: Category): number {
    return this.products.filter((product) => product.category === category).length;
  }

  updateSearch(term: string): void {
    this.searchTerm.set(term);
  }

  addToCart(): void {
    this.cartCount.update((count) => count + 1);
  }
}
