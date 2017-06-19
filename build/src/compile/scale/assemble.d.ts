import { VgDataRef } from '../../vega.schema';
import { Model } from '../model';
export declare function assembleScale(model: Model): {
    name: string;
    type: "time" | "linear" | "bin-linear" | "log" | "pow" | "sqrt" | "utc" | "sequential" | "ordinal" | "bin-ordinal" | "point" | "band";
    domain: any[] | VgDataRef | {
        fields: (any[] | VgDataRef | {
            signal: string;
        })[];
        sort?: boolean | {
            op: "count";
        };
    } | {
        data: string;
        fields: (string | {
            parent: string;
        } | {
            parent: string;
        }[])[];
        sort?: boolean | {
            op: "count";
        };
    } | {
        signal: string;
    };
    domainRaw?: {
        signal?: string;
        selection?: string;
        field?: string;
        encoding?: string;
    };
    range: string | VgDataRef | (string | number | VgDataRef)[] | {
        scheme: string;
        extent?: number[];
        count?: number;
    } | {
        step: number;
    };
    clamp?: boolean;
    exponent?: number;
    nice?: boolean | "year" | "month" | "day" | "second" | "minute" | "hour" | "week";
    padding?: number;
    paddingInner?: number;
    paddingOuter?: number;
    reverse?: boolean;
    round?: boolean;
    zero?: boolean;
}[];