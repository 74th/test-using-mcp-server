/**
 * タスク
 */
export interface Task {
    id?: number;
    text: string;
    done?: boolean;
    expire?: string; // ISO date string format (YYYY-MM-DD)
}
