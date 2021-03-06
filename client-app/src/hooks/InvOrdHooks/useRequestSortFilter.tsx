import { useState } from "react"
import { IFilterConfig, ISortConfig } from "../../models/InvOrderModels/ISortFilterConfig";
import { ISortConfigForHeaders } from "../../models/InvOrderModels/ISortFilterConfig";


const useRequestSortFilter = () => {
    
  const [filterConfig, setFilterConfig] = useState<IFilterConfig>({id:0, primaryKey:"", secondaryKey:""});

  const requestFilterConfig = (id: number, primaryKey: string, secondaryKey: string) => {
    setFilterConfig({ id, primaryKey, secondaryKey });
  };

    const [sortConfig, setSortConfig] = useState<ISortConfig>({
        id: 0,
        primaryKey: "",
        secondaryKey: "",
        tertiaryKey: "",
        direction: "",
      });
    
      const [sortConfigForHeaders, setSortConfigForHeaders] = useState<ISortConfigForHeaders>({
        key: "",
        direction: ""
      });
    
    
      const [activeSort, toggleActiveSort] = useState({ buttonKey: 0 });
      const setButtonActive = (buttonKey: number) => {
        toggleActiveSort({ buttonKey });
      };
      
      const [activeHeaderSort, toggleHeaderActiveSort] = useState({ headerKey: 0 });
      const setHeaderActive = (headerKey: number) => {
        toggleHeaderActiveSort({ headerKey });
      };
    
    
      const [filterEnabled, toggleFilter] = useState(false);
    
      const requestSort = (
        id: number,
        primaryKey: string,
        secondaryKey: string,
        tertiaryKey: string,
        direction: string
      ) => {
        setSortConfig({
          id,
          primaryKey,
          secondaryKey,
          tertiaryKey,
          direction,
        });
         toggleHeaderActiveSort({ headerKey: 0 });
    
        if (!filterEnabled && sortConfig.id === id) {
          toggleActiveSort({ buttonKey: 0 });
          setSortConfig({
            id: 0,
            primaryKey: "",
            secondaryKey: "",
            tertiaryKey: "",
            direction: "",
          });
        }
    
        if (!filterEnabled) {
          requestFilterConfig(
            //only primary and secondary key are passed for the filter
            0,
            primaryKey,
            secondaryKey
          );
          toggleHeaderActiveSort({ headerKey: 0 });
        }
    
        if (filterEnabled) {
          requestFilterConfig(
            //only primary and secondary key are passed for the filter
            id,
            primaryKey,
            secondaryKey
          );
        }
    
        if (filterEnabled && filterConfig.id === id) {
            requestFilterConfig(
            //only primary and secondary key are passed for the filter
            0,
            primaryKey,
            secondaryKey
          );
    
          setSortConfig({
            id: 0,
            primaryKey: "",
            secondaryKey: "",
            tertiaryKey: "",
            direction: "",
          });
          toggleActiveSort({ buttonKey: 0 });
          setSortConfigForHeaders({key: 'VIN', direction:'descending'})
        }
      };
    
    
      const setFilterEnabled = (filterEnabled: boolean, 
        e:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        toggleFilter(!filterEnabled);
        e.stopPropagation();
    
        if (sortConfig) {
            requestFilterConfig(
            //only primary and secondary key are passed for the filter
            sortConfig.id,
            sortConfig.primaryKey,
            sortConfig.secondaryKey
          );
        }
        //'resets' the config id to 0 so that filtering stops if you have a sortConfig
        if (sortConfig.id === filterConfig.id) {
            requestFilterConfig(
            //only primary and secondary key are passed for the filter
            0,
            sortConfig.primaryKey,
            sortConfig.secondaryKey
          );
        }
        if (filterEnabled && filterConfig.id === 0) {
            setFilterConfig({
            id: 0,
            primaryKey: "",
            secondaryKey: "",
          });
            setSortConfig({
            id: 0,
            primaryKey: "",
            secondaryKey: "",
            tertiaryKey: "",
            direction: "",
          });
        }
        if (!!filterEnabled && sortConfigForHeaders.key !== "" && sortConfig.primaryKey === ""){
            toggleActiveSort({ buttonKey:0 });
         }
      };
    
      // console.log(filterEnabled);
    
      //the key here needs to be the column name which is of type string
    
      const requestSortForHeaders = (key: string) => {
        let direction = "ascending";
        if (
          sortConfigForHeaders.key === key &&
          sortConfigForHeaders.direction === "ascending"
        ) {
          direction = "descending";
          console.log("requestSort for headers")
        }
        
        if (sortConfig.primaryKey !== "") {
          setSortConfig({
            id: 0,
            primaryKey: "",
            secondaryKey: "",
            tertiaryKey: "",
            direction: "",
          });
        }
         setSortConfigForHeaders({ key, direction });
        if (!filterEnabled) toggleActiveSort({ buttonKey: 0 });
      };
    
     return [sortConfig, 
        filterConfig,
        sortConfigForHeaders, 
        activeSort,
        filterEnabled,
        requestSortForHeaders,
        setFilterEnabled,
        requestSort,
        setButtonActive,
        activeHeaderSort,
        setHeaderActive] as const
}
export default useRequestSortFilter;
