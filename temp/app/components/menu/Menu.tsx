import { MenuButton } from "./MenuButton";
import { ShareButton } from "./ShareButton";

export function Menu() {
    const menu = [];
    for (let mock = 0; mock < 3; mock++) {
        menu.push(
            <div  key={mock}>
                <label>Settings</label>
                <div>
                    <ShareButton />
                </div>
            </div>,
        );
    }

    return (
        <>
            <MenuButton  />
            <section className="menu hidden">
                <div className="menuGrid">{menu}</div>
            </section>
        </>
    );
}
