import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LucideAngularModule, Check, X, Camera } from 'lucide-angular';

export interface FormItem {
  Name: string;
  Comment: string;
  RequireValue: boolean;
  ValueType: string;
  Tags: string[];
  Position: number;
}

export interface FormData {
  Name: string;
  Comment: string;
  templateItems: FormItem[];
}

@Component({
  selector: 'app-form-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    LucideAngularModule
  ],
  templateUrl: './form-preview.html',
  styleUrl: './form-preview.css',
})
export class FormPreview implements OnChanges {
  @Input() data!: FormData;
  @Input() layoutMode: 'defects' | 'all' = 'defects';

  groupedItems: { category: string; items: FormItem[] }[] = [];

  readonly Check = Check;
  readonly X = X;
  readonly Camera = Camera;

  // Local state for items (simulating the MobileItemCard state)
  // key: Position, value: { checked: boolean, status: 'pass' | 'fail' | null }
  itemStates: Record<number, { checked: boolean; status: 'pass' | 'fail' | null }> = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.groupItems();
    }
  }

  private groupItems() {
    const groups: Record<string, FormItem[]> = {};
    const categoryOrder = [
      "Walkaround Photos",
      "Lighting",
      "Exterior",
      "Tires",
      "Engine Compartment",
      "Maintenance",
      "Steering",
      "Braking",
      "Interior"
    ];

    this.data.templateItems.forEach(item => {
      const tag = item.Tags[0] || "Other";
      if (!groups[tag]) {
        groups[tag] = [];
      }
      groups[tag].push(item);
    });

    this.groupedItems = Object.entries(groups)
      .sort(([a], [b]) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);

        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.localeCompare(b);
      })
      .map(([category, items]) => ({ category, items }));
  }

  hasPhoto(items: FormItem[]): boolean {
    return items.some(item => item.ValueType === 'PHOTO');
  }

  toggleChecked(position: number) {
    if (!this.itemStates[position]) {
      this.itemStates[position] = { checked: false, status: null };
    }
    this.itemStates[position].checked = !this.itemStates[position].checked;
  }

  setStatus(position: number, status: 'pass' | 'fail') {
    if (!this.itemStates[position]) {
      this.itemStates[position] = { checked: false, status: null };
    }
    this.itemStates[position].status = status;
  }

  getItemState(position: number) {
    return this.itemStates[position] || { checked: false, status: null };
  }
}
