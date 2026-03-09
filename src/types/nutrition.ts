export type MealCategory = 'desayuno' | 'almuerzo' | 'cena' | 'snacks';

export interface Macros {
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
}

export interface Meal {
  name: string;
  category: MealCategory;
  macros: Macros;
  timing: string;
  ingredients: string[];
  instructions: string[];
}
