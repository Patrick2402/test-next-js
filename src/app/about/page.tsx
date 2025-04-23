'use client';

export default function AboutPage() {
    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto my-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">O PakSafe</h1>
                
                <p className="text-lg mb-4 text-gray-600">
                    PakSafe to nowoczesne narzędzie do skanowania zależności npm w celu wykrywania podatności bezpieczeństwa
                    i potencjalnych ataków confusion.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Nasza misja</h2>
                <p className="text-lg mb-4 text-gray-600">
                    Naszą misją jest zapewnienie bezpieczeństwa aplikacji poprzez proaktywne wykrywanie zagrożeń
                    w łańcuchach zależności npm. Wierzymy, że bezpieczeństwo powinno być wbudowane w proces rozwoju
                    od samego początku.
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Co wykrywamy</h2>
                <ul className="list-disc list-inside text-lg mb-6 text-gray-600">
                    <li className="mb-2">Znane podatności bezpieczeństwa (CVE)</li>
                    <li className="mb-2">Potencjalne ataki typu dependency confusion</li>
                    <li className="mb-2">Nieaktualne zależności z znanymi problemami</li>
                    <li className="mb-2">Problemy z integralnością pakietów</li>
                    <li className="mb-2">Podejrzane zależności z potencjalnie złośliwym kodem</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Dlaczego PakSafe?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xl font-medium mb-2 text-primary-700">Łatwa integracja</h3>
                        <p className="text-gray-600">Proste w użyciu narzędzie wiersza poleceń, które można łatwo zintegrować z istniejącymi przepływami pracy CI/CD.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xl font-medium mb-2 text-primary-700">Kompleksowa analiza</h3>
                        <p className="text-gray-600">Skanujemy całe drzewo zależności, aby znaleźć ukryte zagrożenia.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xl font-medium mb-2 text-primary-700">Aktywnie rozwijane</h3>
                        <p className="text-gray-600">Regularnie aktualizujemy naszą bazę danych o nowych zagrożeniach i podatnościach.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xl font-medium mb-2 text-primary-700">Szczegółowe raporty</h3>
                        <p className="text-gray-600">Otrzymuj szczegółowe raporty z wyjaśnieniami i sugerowanymi działaniami naprawczymi.</p>
                    </div>
                </div>
                
                <p className="text-lg mt-8 text-gray-600">
                    Ta strona jest dostępna zarówno dla zalogowanych jak i niezalogowanych użytkowników.
                </p>
            </div>
        </div>
    );
}