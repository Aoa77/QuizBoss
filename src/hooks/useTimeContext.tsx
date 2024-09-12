import { TimeContext } from "../context";
import { Config } from "../models";

export default function useTimeContext(config: Config): TimeContext {
    return new TimeContext();
}
