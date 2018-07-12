import { Collection } from "./collection";
import { isArray } from "util";

export async function LastDurations() {
    try {
        let data = await Collection();
        return ConvertTimeStampsToDates(
            await data.ExecuteSafely(GetLatestDurations)
        );
    } catch (e) {
        console.error(e.stack);
        return { error: e.message };
    }
}

export class DurationSummary {
    _id: string;
    duration: string;
    timestamp: number;
    date: string;
}

async function GetLatestDurations(data): Promise<Array<DurationSummary>> {
    return await data
        .aggregate([
            { $match: { pattern: /\w+/ } },
            { $sort: { timestamp: -1 } },
            {
                $group: {
                    _id: "$pattern",
                    duration: { $first: "$avgtxt" },
                    timestamp: { $first: "$timestamp" }
                }
            }
        ])
        .toArray();
}

function ConvertTimeStampsToDates(data) {
    if (isArray(data)) {
        data.forEach(rec => {
            rec.date = new Date(rec.timestamp);
        });
        return data;
    }
    throw new Error("ConvertTimeStampsToDates() received an empty array");
}
