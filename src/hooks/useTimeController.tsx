import { TimeController } from "../controllers";
import { Config } from "../app";

export default function useTimeController(config: Config): TimeController {
    return new TimeController();
}
