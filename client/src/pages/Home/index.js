import { useRef, useState } from "react";
import Header from "../../modules/Header";
import SideBar from "../../modules/SideBar";
import Footer from "../../modules/Footer";
import AppMain from "../../modules/AppMain";
import ListMember from "../../modules/Member/ListMember";
import ListUser from "../../modules/User/ListUser";

export default function Home() {
    const modules = [<ListMember></ListMember>, <ListUser></ListUser>];

    const [isCollapse, setIsCollapse] = useState(false);
    const sidebarClassName = useRef("sidebar-expand-lg");
    const [whichActive, setWhichActive] = useState(0);

    const toggleSideBar = () => {
        sidebarClassName.current = !isCollapse
            ? "sidebar-collapse"
            : "sidebar-expand-lg";
        setIsCollapse(!isCollapse);
    };

    return (
        <div
            className={`layout-fixed bg-body-tertiary ${sidebarClassName.current}`}
        >
            <div className="app-wrapper">
                <Header toggleSideBar={toggleSideBar}></Header>
                <SideBar
                    whichActive={whichActive}
                    setWhichActive={setWhichActive}
                ></SideBar>
                <AppMain child={modules[whichActive]}></AppMain>
                <Footer></Footer>
            </div>
        </div>
    );
}
