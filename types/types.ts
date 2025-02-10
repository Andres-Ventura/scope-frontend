export interface InsightDataType {
    id: number;
    text: string;
    isComplete: boolean;
}

export interface TimeTrackDataType {
    id: number;
    title: string;
    // One, Two or Three
    check:   number;
    border: string;
    time: string;
}
