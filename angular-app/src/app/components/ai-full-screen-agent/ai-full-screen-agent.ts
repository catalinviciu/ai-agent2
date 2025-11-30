import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  LucideAngularModule,
  ArrowLeft, Loader2, ChevronRight, Sparkles, Check, ThumbsUp, ThumbsDown
} from 'lucide-angular';
import { FormPreview, FormData } from '../form-preview/form-preview';
import { MOCK_FORM_DATA } from '../../data/mockFormData';

type Step = 'initial' | 'method-selection' | 'ai-questions' | 'upload' | 'generating' | 'preview' | 'publishing' | 'success';

interface Message {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-ai-full-screen-agent',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    LucideAngularModule,
    FormPreview
  ],
  templateUrl: './ai-full-screen-agent.html',
  styleUrl: './ai-full-screen-agent.css',
})
export class AiFullScreenAgent implements OnInit, AfterViewChecked {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  @ViewChild('messagesEnd') messagesEndRef!: ElementRef;

  step: Step = 'initial';
  messages: Message[] = [];
  isTyping = false;

  // Interview State
  interviewStep: 0 | 1 | 2 = 0;
  answers = {
    vehicleModel: '',
    detailLevel: null as 'basic' | 'detailed' | null,
    includeMaintenance: null as boolean | null
  };

  // Preview State
  layoutMode: 'defects' | 'all' = 'defects';

  mockFormData: FormData = MOCK_FORM_DATA as FormData;

  readonly ArrowLeft = ArrowLeft;
  readonly Loader2 = Loader2;
  readonly ChevronRight = ChevronRight;
  readonly Sparkles = Sparkles;
  readonly Check = Check;
  readonly ThumbsUp = ThumbsUp;
  readonly ThumbsDown = ThumbsDown;

  suggestedCategories = ['Passenger car', 'Bus', 'Truck', 'Trailer', 'Excavator', 'Backhoe', 'Crane', 'Forklift', 'Loader', 'Tanker truck', 'Refrigerated truck/trailer', 'Hazmat vehicle', 'Flatbed trailer'];

  ngOnInit() {
    // Initial greeting logic handled in ngOnChanges or setter if isOpen changes, 
    // but since isOpen is an input, we might need to detect change. 
    // However, usually the component is destroyed/created or hidden. 
    // If it's *ngIf in parent, ngOnInit runs when it appears.
    // If it's [hidden] or class toggle, we need ngOnChanges.
    // React code uses `if (!isOpen) return null`, implying it's conditionally rendered or returns null.
    // In Angular parent `app.component` likely uses `@if (isAgentOpen)`.
    // So ngOnInit is fine.

    if (this.messages.length === 0) {
      setTimeout(() => {
        this.addMessage('ai', "Hi! I'm your DVIR setup assistant. I'll help you create quickly an inspection form for your fleet.");
        setTimeout(() => {
          this.addMessage('ai', "I can create a form for a specific vehicle model or for a category of vehicles. Enter the vehicle model or select from the suggested categories.");
          this.step = 'ai-questions';
        }, 800);
      }, 500);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messagesEndRef?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch (err) { }
  }

  addMessage(type: 'ai' | 'user', content: string) {
    this.messages.push({ id: Date.now().toString(), type, content, timestamp: new Date() });
  }

  handleManualVehicleSubmit() {
    if (this.answers.vehicleModel.trim()) {
      this.addMessage('user', this.answers.vehicleModel);
      setTimeout(() => {
        this.addMessage('ai', `Perfect! Now, how detailed do you want me to create your inspection form?`);
        this.interviewStep = 1;
      }, 500);
    }
  }

  handleVehicleSelect(type: string) {
    this.answers.vehicleModel = type;
    this.addMessage('user', type);
    setTimeout(() => {
      this.addMessage('ai', `Perfect! Now, how detailed do you want me to create your inspection form?`);
      this.interviewStep = 1;
    }, 500);
  }

  handleDetailSelect(level: 'basic' | 'detailed') {
    this.answers.detailLevel = level;
    this.addMessage('user', level === 'basic' ? 'Minimum compliance' : 'Extended compliance');
    setTimeout(() => {
      this.isTyping = true;
      setTimeout(() => {
        this.isTyping = false;
        this.addMessage('ai', `Do you want me to include inspection items to check vehicle maintenance, to monitor wear and tear?\nLike oil levels, brake pads usage, etc.`);
        this.interviewStep = 2;
      }, 800);
    }, 500);
  }

  handleMaintenanceSelect(include: boolean) {
    this.answers.includeMaintenance = include;
    this.addMessage('user', include ? 'Yes, I want my inspection to check also maintanance items' : 'No, I\'m fine');
    setTimeout(() => {
      this.isTyping = true;
      setTimeout(() => {
        this.isTyping = false;
        this.addMessage('ai', "I have all the information I need. Generating your form now!");
        this.step = 'generating';
        setTimeout(() => {
          this.step = 'preview';
        }, 3000); // Simulate generation time
      }, 1000);
    }, 500);
  }

  handlePublish() {
    this.step = 'publishing';
    setTimeout(() => {
      this.step = 'success';
    }, 2000); // Simulate publishing time
  }

  onCloseClick() {
    this.close.emit();
  }

  setStep(step: Step) {
    this.step = step;
  }

  setLayoutMode(mode: 'defects' | 'all') {
    this.layoutMode = mode;
  }
}
