import { useRef, useState } from "react";
import Header from "../../modules/Header";
import SideBar from "../../modules/SideBar";
import Footer from "../../modules/Footer";
import AppMain from "../../modules/AppMain";

export default function Home() {
    const [isCollapse, setIsCollapse] = useState(false);
    const sidebarClassName = useRef("sidebar-expand-lg");

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
                <SideBar></SideBar>
                <AppMain></AppMain>
                <Footer></Footer>
            </div>
        </div>
    );
}
