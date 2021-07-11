export type ActionButton = {
  iconClassName: string;
  handleType: "up" | "down" | "delete";
};

export interface BtnData {
  btnClassName: string;
  buttons: ActionButton[];
}

const btnData: BtnData = {
  btnClassName: "button is-primary is-small",
  buttons: [
    {
      iconClassName: "fas fa-arrow-up",
      handleType: "up",
    },
    {
      iconClassName: "fas fa-arrow-down",
      handleType: "down",
    },
    {
      iconClassName: "fas fa-times",
      handleType: "delete",
    },
  ],
};

export default btnData;
