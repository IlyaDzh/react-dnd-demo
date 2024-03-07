import { Header } from "./components/Header";
import { MainPage } from "./pages/MainPage";

export const App: React.FC = () => {
    return (
        <div>
            <Header />
            <main>
                <MainPage />
            </main>
        </div>
    );
};
