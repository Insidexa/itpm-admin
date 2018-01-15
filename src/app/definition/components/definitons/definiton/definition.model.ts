import {BaseItem} from "../../../../shared/components/item/base-item";

export class Definition implements BaseItem {
    [key: string]: any;
    id: number;
    name: string;
    description: string;
    deleted_at: string | Date;

}