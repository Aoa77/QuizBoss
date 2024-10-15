import { Theme } from "../../styles/Theme";
import { MenuButton } from "./MenuButton";
import { ShareButton } from "./ShareButton";

export function Menu(theme: Theme) {
    const menu = [];
    for (let mock = 0; mock < 3; mock++) {
        menu.push(
            <div  key={mock}>
                <label>Settings</label>
                <div>
                    <ShareButton {...theme} />
                </div>
            </div>,
        );
    }

    return (
        <>
            <MenuButton {...theme} />
            <section className="menu hidden">
                <div className="menuGrid">{menu}</div>
            </section>
        </>
    );
}
