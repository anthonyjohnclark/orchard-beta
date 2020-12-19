import React from "react";
import classes from "./ButtonList.module.css";

interface IProps {
  requestSort: (id: number, primaryKey: string, secondaryKey:string, tertiaryKey:string, direction:string) => void; 
  setButtonActive: (buttonKey: number) => void;
  activeSort: { buttonKey: number };
}

const buttonList = [
  {
    id: 1,
    name: "Active",
    primaryKey: "productActive",
    secondaryKey: "onSale",
    tertiaryKey: "organic",
    direction: "normal",
  },
  {
    id: 2,
    name: "Active OG",
    primaryKey: "productActive",
    secondaryKey: "organic",
    tertiaryKey: "onSale",
    direction: "normal",
  },
  {
    id: 3,
    name: "Active CV",
    primaryKey: "productActive",
    secondaryKey: "organic",
    tertiaryKey: "onSale",
    direction: "reverse2",
  },
  {
    id: 4,
    name: "On Sale Active",
    primaryKey: "productActive",
    secondaryKey: "onSale",
    tertiaryKey: "organic",
    direction: "normal",
  },
  {
    id: 5,
    name: "On Sale Organic",
    primaryKey: "organic",
    secondaryKey: "onSale",
    tertiaryKey: "productActive",
    direction: "normal",
  },
  {
    id: 6,
    name: "On Sale CV",
    primaryKey: "organic",
    secondaryKey: "onSale",
    tertiaryKey: "productActive",
    direction: "reverse1",
  },

  {
    id: 7,
    name: "On Sale Inactive",
    primaryKey: "productActive",
    secondaryKey: "onSale",
    tertiaryKey: "organic",
    direction: "reverse1",
  },
  {
    id: 8,
    name: "Inactive CV",
    primaryKey: "productActive",
    secondaryKey: "organic",
    tertiaryKey: "onSale",
    direction: "reverse1and2",
  },
  {
    id: 9,
    name: "Inactive OG",
    primaryKey: "productActive",
    secondaryKey: "organic",
    tertiaryKey: "onSale",
    direction: "reverse2",
  },
  {
    id: 10,
    name: "Inactive",
    primaryKey: "productActive",
    secondaryKey: "onSale",
    tertiaryKey: "organic",
    direction: "reverse1",
  },
];

const ButtonList: React.FC<IProps> = ({activeSort, requestSort, setButtonActive}) => (
  <ul>
    {buttonList.map((button) => (
      <li key={button.id}>
        <button
          className={
              activeSort.buttonKey === button.id
              ? classes.ActiveSort
              : classes.SortDropdownButton
          }
          onClick={() => {
            setButtonActive(button.id);
            requestSort(
              button.id,
              button.primaryKey,
              button.secondaryKey,
              button.tertiaryKey,
              button.direction
            );
          }}
        >
          {button.name}
        </button>
      </li>
    ))}
  </ul>
);

export default ButtonList;
