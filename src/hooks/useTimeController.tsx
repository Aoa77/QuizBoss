import { AppConfig } from "../app";
import { TimeController } from "../controllers";

export default function useTimeController(config: AppConfig): TimeController {
    return new TimeController();
}
