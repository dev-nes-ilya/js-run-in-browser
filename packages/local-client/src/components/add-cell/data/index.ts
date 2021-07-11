export type ActionButton = {
  cellType: "code" | "text";
};

export interface BtnData {
  buttons: ActionButton[];
}

const addCellData: BtnData = {
  buttons: [
    {
      cellType: "code",
    },
    {
      cellType: "text",
    },
  ],
};

export default addCellData;
