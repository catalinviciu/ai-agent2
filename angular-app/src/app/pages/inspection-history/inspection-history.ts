import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  LucideAngularModule,
  MapPin, Calendar, FileText, Play, Video, Map, AlertTriangle, BarChart2, Wrench, Bell, HelpCircle, Sparkles, ArrowRight
} from 'lucide-angular';

@Component({
  selector: 'app-inspection-history',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    LucideAngularModule
  ],
  templateUrl: './inspection-history.html',
  styleUrl: './inspection-history.css',
})
export class InspectionHistory {
  @Output() setupClick = new EventEmitter<void>();

  readonly MapPin = MapPin;
  readonly Calendar = Calendar;
  readonly FileText = FileText;
  readonly Play = Play;
  readonly Video = Video;
  readonly Map = Map;
  readonly AlertTriangle = AlertTriangle;
  readonly BarChart2 = BarChart2;
  readonly Wrench = Wrench;
  readonly Bell = Bell;
  readonly HelpCircle = HelpCircle;
  readonly Sparkles = Sparkles;
  readonly ArrowRight = ArrowRight;

  navItems = [
    { icon: MapPin, label: "Live map" },
    { icon: Calendar, label: "Scheduler" },
    { icon: FileText, label: "Reports" },
    { icon: Play, label: "Replay" },
    { icon: Video, label: "Video" },
    { icon: Map, label: "Places" },
    { icon: AlertTriangle, label: "Alerts" },
    { icon: BarChart2, label: "Dashboard" },
    { icon: Wrench, label: "Maintenance", active: true },
  ];

  sidebarItems = [
    "Inspection forms",
    "Reminders",
    "History",
    "Manage Service Plan",
    "Fuel Purchases"
  ];

  onSetup() {
    this.setupClick.emit();
  }
}
