import { Header } from "./components/layout/Header";
import { ModalNest } from "./components/layout/ModalNest";
import { MainPage } from "./pages/MainPage";

export const App: React.FC = () => {
    return (
        <div>
            <Header />
            <main>
                <MainPage />
                <ModalNest />
            </main>
        </div>
    );
};
