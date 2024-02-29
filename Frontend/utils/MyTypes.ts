export type userDataForm = {
    IngredientsData: string | null;
    AllergiesData: string | null;
    CuisineTypeData: string | null;
    RegimeData: string | null;
    ToolsData: string | null;
    TimeData: number[] | null;
    LevelData: string | null;
    NumberOfPlatesData: number[] | null;
    MealTypeData: string | null;
};

export type aiResponseForm = {
  recipeName: string | null;
  ingredients: string[] | null;
  instructions: string [] | null;
  totalCalories: string[] | null;
}

export type userDataRegisterType = {
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  email: string | null;
  phone: string | null;
  age: number | null;
}

export type userDataLoginType = {
  email: string | null;
  password: string | null;
}