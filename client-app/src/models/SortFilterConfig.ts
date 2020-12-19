export interface IFilterConfig {
    id: number;
    primaryKey: string,
    secondaryKey: string
}

export interface ISortConfig {
    id: number;
    primaryKey: string,
    secondaryKey: string,
    tertiaryKey: string,
    direction: string
}

export interface ISortConfigForHeaders {
    key: string, 
    direction: string
}