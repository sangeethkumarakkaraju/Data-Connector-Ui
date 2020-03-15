import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatIconModule, MatDialogModule, MatExpansionModule, MatStepperModule, MatAutocompleteModule, MatGridListModule, MatSelectModule, MatCheckboxModule, MatTooltipModule, MatMenuModule } from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  exports: [
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule


  ]
})
export class MaterialModule { }
