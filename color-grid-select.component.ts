
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'app-color-grid-select',
  templateUrl: './color-grid-select.component.html',
  styleUrls: ['./color-grid-select.component.css']
})
export class ColorGridSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @Input() colors: string[] = [];
  @ViewChild('gridContainer') gridContainer: ElementRef;

  selectedColor: string;
  onChange: any = () => {};
  onTouch: any = () => {};
  disabled: boolean = false;
  keyManager: FocusKeyManager<any>;

  constructor() { }

  ngOnInit() {
    if (this.colors.length > 0) {
      this.selectedColor = this.colors[0];
      this.onChange(this.selectedColor);
      this.onTouch();
    }
  }

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager(this.gridContainer.nativeElement).withWrap();
  }

  selectColor(color: string) {
    if (!this.disabled) {
      this.selectedColor = color;
      this.onChange(this.selectedColor);
      this.onTouch();
    }
  }

  setValue(value: any) {
    if (value !== undefined && value !== null) {
      this.selectedColor = value;
    }
  }

  OnChanged(event: any) {
    this.onChange = fn;
  }

  OnTouched(event: any) {
    this.onTouch = fn;
  }

  setDisabled(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleKey(event: KeyboardEvent) {
    if (this.keyManager) {
      this.keyManager.onKeydown(event);
    }
  }
}
