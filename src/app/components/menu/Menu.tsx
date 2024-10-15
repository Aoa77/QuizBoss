import { Theme } from "../../styles/Theme";
import { MenuButton } from "./MenuButton";
import { ShareButton } from "./ShareButton";

export function Menu(theme: Theme) {
    const menu = [];
    for (let mock = 0; mock < 3; mock++) {
        menu.push(
            <>
                <label>Settings</label>
                <div>
                    <ShareButton {...theme} key={mock} />
                </div>
            </>,
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
