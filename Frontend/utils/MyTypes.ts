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
  image: string | null;
}

export type userDataRegisterType = {
  firstName: string | null;
  lastName: string | null;
  password: string | null;
  email: string | null;
  phone: string | null;
  age: string | null;
}

export type userDataLoginType = {
  email: string | null;
  password: string | null;
}

export type HistoryDataType = {
  recipeName: string | null;
  ingredients: string[] | null;
  instructions: string[] | null;
  macros: string[] | null;
  createdAt: string | null;
  stars: number | null;
  refId: string | null;
};